import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import mammoth from 'mammoth';
import Groq from 'groq-sdk';

// Safely require pdf-parse to avoid declaration conflicts
const pdfParse = require('pdf-parse');

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper to sanitize strings for JSON compliance
function cleanStr(str: string = ''): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/[\x00-\x1F\x7F]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// 1. Upload & Parse CV
router.post('/parse', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const ext = path.extname(file.originalname).toLowerCase();
    let text = '';

    if (ext === '.txt') {
      text = file.buffer.toString('utf-8');
    } else if (ext === '.docx') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value;
    } else if (ext === '.pdf') {
      const data = await pdfParse(file.buffer);
      text = data.text;
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Use .pdf, .docx, or .txt' });
    }

    if (!text.trim()) {
      return res.status(400).json({ error: 'Parsed text is empty. The file may contain only scanned images.' });
    }

    return res.json({ text });
  } catch (err: any) {
    console.error('[Parse CV Error]:', err);
    return res.status(500).json({ error: `Failed to parse CV: ${err.message || 'Unknown error'}` });
  }
});

// 2. Analyze CV against Job Descriptions
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { cvText, jds } = req.body;

    if (!cvText) {
      return res.status(400).json({ error: 'CV Text is required' });
    }
    if (!jds || !Array.isArray(jds) || jds.length < 5) {
      return res.status(400).json({ error: 'At least 5 job descriptions (JDs) are required for analysis' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GROQ_API_KEY is not configured in backend .env file. Please add your key to proceed.'
      });
    }

    const groq = new Groq({ apiKey });

    // Format first 10 job descriptions for context
    const jdBlock = jds
      .slice(0, 10)
      .map((jd, i) => `JD ${i + 1} — ${jd.title} @ ${jd.company}:\n${jd.text}`)
      .join('\n\n---\n\n');

    const prompt = `You are an expert ATS and career coach. Analyze this CV against ${jds.length} job descriptions.

CV:
${cvText}

JOB DESCRIPTIONS:
${jdBlock}

Return ONLY valid JSON matching this exact schema (no markdown blocks, no other text):
{
  "match_score": <0-100 integer, overall match across all JDs>,
  "ats_score": <0-100 integer, ATS parse-ability score>,
  "jd_title": "<title of best-matching JD>",
  "summary": "<2-3 sentence overall assessment>",
  "strong_points": [<exactly 10 strings, specific strengths>],
  "weak_points": [<exactly 10 strings, specific gaps/improvements>],
  "per_jd_scores": [
    {
      "title": "<JD title>",
      "company": "<company>",
      "score": <0-100>,
      "key_match": "<one key match phrase>",
      "key_gap": "<one key gap phrase>"
    }
  ],
  "ats_tips": [<exactly 4 strings, ATS improvement tips>],
  "keywords": [
    { "word": "<core technical skill/tool/concept from the JDs>", "in_cv": <true if present in the CV, false if missing from the CV> }
  ]
}

CRITICAL RULES FOR KEYWORDS:
1. Extract at least 15 core technical skills, programming languages, frameworks, methodologies, and concepts explicitly required by the Job Descriptions.
2. Carefully evaluate whether each extracted skill is present in the CV text.
3. If a required skill is NOT present in the CV, set "in_cv" to false. Do not be lenient; if the skill is not explicitly stated in the CV, mark "in_cv" as false. Ensure at least 4-7 keywords are marked false to reflect genuine gaps.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 2500,
      response_format: { type: 'json_object' }
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';
    const analysis = JSON.parse(raw);

    return res.json({ analysis });
  } catch (err: any) {
    console.error('[Analyze Error]:', err);
    return res.status(500).json({ error: `Analysis failed: ${err.message || 'Unknown error'}` });
  }
});

// 3. Fetch Job Descriptions from RapidAPI JSearch
router.post('/fetch-jobs', async (req: Request, res: Response) => {
  try {
    const { role, location } = req.body;
    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'RAPIDAPI_KEY is not configured in backend .env file. Please add your JSearch key to fetch live jobs.'
      });
    }

    const query = `${role} ${location ?? ''}`.trim();
    const url = `https://jsearch.p.rapidapi.com/search-v2?query=${encodeURIComponent(query)}&num_pages=2&page=1&country=us&date_posted=all`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      },
      signal: AbortSignal.timeout(35000)
    });

    const raw = await response.text();
    // Remove control characters that could break JSON parsing
    const sanitized = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ');
    const data = JSON.parse(sanitized);

    if (!response.ok) {
      throw new Error(data?.message ?? `JSearch returned HTTP ${response.status}`);
    }

    const jobs = data?.data?.jobs ?? [];
    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found for this role.' });
    }

    const jds = jobs.slice(0, 10).map((job: any) => ({
      title: cleanStr(job.job_title ?? 'Unknown Role'),
      company: cleanStr(job.employer_name ?? 'Unknown Company'),
      text: cleanStr(job.job_description ?? '').slice(0, 800),
      source: 'live',
      platform: job.job_publisher ?? 'JSearch',
      location: job.job_city
        ? `${job.job_city}, ${job.job_country ?? ''}`.trim()
        : (job.job_country ?? 'Remote'),
      applyLink: job.job_apply_link ?? null
    }));

    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return res.json({ jds });
  } catch (err: any) {
    console.error('[Fetch Jobs Error]:', err);
    return res.status(502).json({ error: `Failed to fetch live jobs: ${err.message || 'Unknown error'}` });
  }
});

// 4. Generate Cover Letter
router.post('/cover-letter', async (req: Request, res: Response) => {
  try {
    const { candidateName, jobTitle, company, cvText, jdText } = req.body;

    if (!candidateName || !jobTitle || !company) {
      return res.status(400).json({ error: 'Missing candidateName, jobTitle, or company' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GROQ_API_KEY is not configured in backend .env file. Please add your key to proceed.'
      });
    }

    const groq = new Groq({ apiKey });

    const prompt = `Write a professional cover letter for the following candidate.

Candidate Name: ${candidateName}
Job Title: ${jobTitle}
Company: ${company}

CV Summary:
${cvText?.slice(0, 2000) ?? 'Not provided'}

Job Description:
${jdText?.slice(0, 1500) ?? 'Not provided'}

Requirements:
- Industry-standard cover letter format
- Under 300 words
- 3 paragraphs: opening hook, value proposition with specific skills/achievements, closing CTA
- Professional but personable tone
- No placeholders or brackets
- Plain text only, no markdown`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 600
    });

    const letter = completion.choices[0]?.message?.content ?? '';
    return res.json({ letter });
  } catch (err: any) {
    console.error('[Cover Letter Error]:', err);
    return res.status(500).json({ error: `Cover letter generation failed: ${err.message || 'Unknown error'}` });
  }
});

// 5. Rewrite CV weak points
router.post('/rewrite', async (req: Request, res: Response) => {
  try {
    const { cvText, weakPoints, jdContext } = req.body;

    if (!cvText || !weakPoints || !Array.isArray(weakPoints) || !weakPoints.length) {
      return res.status(400).json({ error: 'cvText and weakPoints are required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GROQ_API_KEY is not configured in backend .env. Please add your key to proceed.'
      });
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are an expert CV rewriter. For each weak point, provide a specific rewrite suggestion for the CV.

CV:
${cvText.slice(0, 3000)}

Job Context: ${jdContext ?? 'Not provided'}

Weak Points to Address:
${weakPoints.map((wp, i) => `${i + 1}. ${wp}`).join('\n')}

Return ONLY valid JSON (no markdown blocks, no other text):
{
  "suggestions": [
    {
      "weak_point": "<original weak point>",
      "rewritten": "<specific improved version or addition for the CV>"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';
    const result = JSON.parse(raw);
    return res.json(result);
  } catch (err: any) {
    console.error('[Rewrite Error]:', err);
    return res.status(500).json({ error: `Rewrite failed: ${err.message || 'Unknown error'}` });
  }
});

// 6. Tailor Resume against a target Job Description (JD)
router.post('/tailor', async (req: Request, res: Response) => {
  try {
    const { cvText, jdText } = req.body;

    if (!cvText || !jdText) {
      return res.status(400).json({ error: 'Both cvText and jdText are required for tailoring' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GROQ_API_KEY is not configured in backend .env file. Please add your key to proceed.'
      });
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are a master resume writer and career strategist with 10 years of experience.
Your job is to tailor the candidate's Resume (CV) to align perfectly with the target Job Description (JD).

CANDIDATE RESUME:
${cvText}

TARGET JOB DESCRIPTION:
${jdText}

Return ONLY a valid JSON object matching this exact schema:
{
  "contact_info": {
    "name": "<name>",
    "title": "<subtitle>",
    "email": "<email>",
    "phone": "<phone>",
    "location": "<location>",
    "website": "<linkedin or github website link>"
  },
  "professional_summary": "<tailored professional summary>",
  "work_experience": [
    {
      "title": "<job title>",
      "company": "<company>",
      "dates": "<employment dates>",
      "bullets": [
        "<tailored bullet point incorporating keywords>",
        "<tailored bullet point using strong action verbs>"
      ]
    }
  ],
  "projects": [
    {
      "name": "<project name>",
      "bullets": [
        "<tailored project bullet point 1>",
        "<tailored project bullet point 2>"
      ]
    }
  ],
  "education": [
    {
      "degree": "<degree>",
      "field": "<field of study>",
      "institution": "<institution>",
      "dates": "<graduation dates>"
    }
  ],
  "skills": ["<skill 1>", "<skill 2>"],
  "certifications": ["<cert 1>"]
}

Rules:
1. Do NOT fabricate fake jobs, titles, or fake educational credentials. Ground all edits strictly in the candidate's actual CV details.
2. Optimize the Professional Summary to emphasize target keywords and match JD requirements.
3. Improve action verbs in work experience bullets (e.g. Optimized, Developed, Automated, Engineered).
4. Do NOT wrap in markdown fences. Return ONLY the raw JSON string.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 2500,
      response_format: { type: 'json_object' }
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';
    const tailoredResume = JSON.parse(raw);
    return res.json({ tailoredResume });
  } catch (err: any) {
    console.error('[Tailor Error]:', err);
    return res.status(500).json({ error: `Tailoring failed: ${err.message || 'Unknown error'}` });
  }
});

// 7. 1-Click Bullet Optimizer Route
router.post('/optimize-bullet', async (req: Request, res: Response) => {
  try {
    const { bulletText, jdText } = req.body;

    if (!bulletText || !jdText) {
      return res.status(400).json({ error: 'Both bulletText and jdText are required for optimization' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GROQ_API_KEY is not configured in backend .env file.'
      });
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are an expert resume writer. Rephrase this single resume bullet point to align with the target job requirements.
Follow the STAR/XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]).
Use strong action verbs and inject realistic metrics or context if possible. Keep it to a single concise sentence.

ORIGINAL BULLET POINT:
${bulletText}

TARGET JOB REQUIREMENTS:
${jdText}

Return ONLY the optimized bullet point text. Do not wrap in quotes or return markdown.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 200
    });

    const optimizedText = completion.choices[0]?.message?.content?.trim().replace(/^"|"$/g, '') ?? bulletText;
    return res.json({ optimizedText });
  } catch (err: any) {
    console.error('[Optimize Bullet Error]:', err);
    return res.status(500).json({ error: `Optimization failed: ${err.message || 'Unknown error'}` });
  }
});

// 8. Suggest Projects to bridge missing skill gaps
router.post('/suggest-projects', async (req: Request, res: Response) => {
  try {
    const { missingSkills } = req.body;

    if (!missingSkills || !Array.isArray(missingSkills) || missingSkills.length === 0) {
      return res.json({ projects: [] });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY is not configured in backend .env file.' });
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are a technical career advisor. Suggest 2 hands-on, ADVANCED, production-grade coding projects (NOT beginner or basic projects) that the candidate can build to bridge their missing skills/gaps.
The projects should feature high scalability, microservices, complex design patterns, or event-driven architectures.
Group the missing skills together (e.g. up to 3 gaps per project) so the candidate can learn them efficiently.

MISSING SKILLS GAPS:
${missingSkills.join(', ')}

Return ONLY a valid JSON object matching this exact schema:
{
  "projects": [
    {
      "title": "<short advanced project name>",
      "gaps_fulfilled": ["<skill 1>", "<skill 2>"],
      "description": "<2-sentence description of the advanced architectures, tech stack, and scalability patterns used to learn these skills>",
      "recommended_course_search": "<highly optimized search term to find a full tutorial course or playlist for this project on YouTube, e.g. 'Build a microservice with Node.js and Docker step by step'>",
      "roadmap_tasks": [
        "<Task 1: Project Setup & local environments initialization>",
        "<Task 2: Core modules logic development & feature coding>",
        "<Task 3: Integration testing and unit test configuration>",
        "<Task 4: Production deployment packaging and CI/CD pipelines setup>"
      ]
    }
  ]
}

Do not wrap in markdown fences. Return ONLY the raw JSON string.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const raw = completion.choices[0]?.message?.content ?? '{"projects":[]}';
    const result = JSON.parse(raw);
    return res.json({ projects: result.projects || [] });
  } catch (err: any) {
    console.error('[Suggest Projects Error]:', err);
    return res.status(500).json({ error: `Projects suggestion failed: ${err.message || 'Unknown error'}` });
  }
});

export default router;
