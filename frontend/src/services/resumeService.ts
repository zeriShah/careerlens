import api from './api';

export interface JobDescription {
  title: string;
  company: string;
  text: string;
  source: string;
  platform?: string;
  location?: string;
  applyLink?: string | null;
}

export interface JDScore {
  title: string;
  company: string;
  score: number;
  key_match: string;
  key_gap: string;
}

export interface KeywordMatch {
  word: string;
  in_cv: boolean;
}

export interface ResumeAnalysisResult {
  match_score: number;
  ats_score: number;
  jd_title: string;
  summary: string;
  strong_points: string[];
  weak_points: string[];
  per_jd_scores: JDScore[];
  ats_tips: string[];
  keywords: KeywordMatch[];
}

export interface RewriteSuggestion {
  weak_point: string;
  rewritten: string;
}

// 1. Upload & Parse CV
export async function parseCV(file: File): Promise<{ text: string }> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/resume/parse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

// 2. Analyze CV text against job descriptions
export async function analyzeCV(cvText: string, jds: JobDescription[]): Promise<{ analysis: ResumeAnalysisResult }> {
  const response = await api.post('/resume/analyze', { cvText, jds });
  return response.data;
}

// 3. Fetch Job Descriptions
export async function fetchJDs(role: string, location: string): Promise<{ jds: JobDescription[] }> {
  const response = await api.post('/resume/fetch-jobs', { role, location });
  return response.data;
}

// 4. Generate Cover Letter
export async function generateCoverLetter(payload: {
  candidateName: string;
  jobTitle: string;
  company: string;
  cvText: string;
  jdText: string;
}): Promise<{ letter: string }> {
  const response = await api.post('/resume/cover-letter', payload);
  return response.data;
}

// 5. Rewrite CV Weak Points
export async function rewriteCV(payload: {
  cvText: string;
  weakPoints: string[];
  jdContext?: string;
}): Promise<{ suggestions: RewriteSuggestion[] }> {
  const response = await api.post('/resume/rewrite', payload);
  return response.data;
}
