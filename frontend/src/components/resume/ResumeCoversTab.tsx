import { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface ResumeCoversTabProps {
  setActiveTab: (tab: string) => void;
  selectedRole?: {
    company: string;
    title: string;
  };
}

export default function ResumeCoversTab({ setActiveTab, selectedRole }: ResumeCoversTabProps) {
  // Candidate Details State (dynamic sign-off & PDF header)
  const [candidateName, setCandidateName] = useState<string>('Syed Uzair Shah');
  const [candidateEmail, setCandidateEmail] = useState<string>('syeduzair7008@gmail.com');
  const [candidatePhone, setCandidatePhone] = useState<string>('+1 (555) 019-2834');
  const [candidateLocation, setCandidateLocation] = useState<string>('San Francisco, CA');

  // Styling Choices
  const [themeColor, setThemeColor] = useState<string>('#1DB954'); // Spotify green default
  const [fontFamily, setFontFamily] = useState<string>('helvetica');

  const [tone, setTone] = useState<'warm' | 'formal' | 'direct'>('warm');
  const [length, setLength] = useState<'short' | 'standard'>('standard');
  const [copied, setCopied] = useState(false);

  // Active Job selection dropdown state
  const [sessionJds, setSessionJds] = useState<any[]>([]);
  const [selectedJdId, setSelectedJdId] = useState<string>('');
  const [localRole, setLocalRole] = useState<{ company: string; title: string }>({
    company: selectedRole?.company || 'Northwind',
    title: selectedRole?.title || 'Sr. Product Designer'
  });

  // Load target jobs from active session cache upon mounting
  useEffect(() => {
    const cachedJds = sessionStorage.getItem('careerlens_cv_jds') || '[]';
    try {
      const parsed = JSON.parse(cachedJds);
      setSessionJds(parsed);
      
      if (selectedRole?.company) {
        const matched = parsed.find(
          (j: any) => 
            j.company.toLowerCase() === selectedRole.company.toLowerCase() || 
            j.title.toLowerCase() === selectedRole.title.toLowerCase()
        );
        if (matched) {
          setSelectedJdId(matched.title + " @ " + matched.company);
          setLocalRole({ company: matched.company, title: matched.title });
        } else if (parsed.length > 0) {
          setSelectedJdId(parsed[0].title + " @ " + parsed[0].company);
          setLocalRole({ company: parsed[0].company, title: parsed[0].title });
        }
      } else if (parsed.length > 0) {
        setSelectedJdId(parsed[0].title + " @ " + parsed[0].company);
        setLocalRole({ company: parsed[0].company, title: parsed[0].title });
      }
    } catch (e) {}
  }, [selectedRole]);

  const letterContent = {
    warm: {
      standard: `Dear Hiring Team at [companyName],

I was excited to see your opening for a [roleTitle]. Over the past seven years I've specialised in exactly the work your team is scaling — building design systems and running user research that ties design decisions to measurable outcomes.

At Loomly I led our design-token rollout across four product teams, working shoulder-to-shoulder with engineers in a TypeScript codebase — the same collaboration model your role describes.

I'd love to bring that momentum to [companyName]. Thank you for your consideration.

Warm regards,
[candidateName]`,
      short: `Dear Hiring Team at [companyName],

I was excited to see your opening for a [roleTitle]. I specialise in exactly the work your team is scaling — building design systems and running user research that ties design decisions to outcomes.

At Loomly I led our design-token rollout across four product teams, collaborating in a TypeScript codebase. I'd love to bring that momentum to [companyName].

Warm regards,
[candidateName]`
    },
    formal: {
      standard: `Dear Hiring Manager,

I am writing to express my strong interest in the [roleTitle] position at [companyName]. With over seven years of professional design experience specialising in design systems and user-centric research, I am confident in my ability to contribute value to your product team.

In my previous role at Loomly, I successfully managed the design-token infrastructure across multiple cross-functional teams, collaborating directly with engineering partners within a TypeScript framework.

Thank you for your time and consideration. I look forward to the possibility of discussing how my background aligns with the needs of [companyName].

Sincerely,
[candidateName]`,
      short: `Dear Hiring Manager,

I am writing to express my interest in the [roleTitle] position at [companyName]. With over seven years of experience in design systems and product design, I am confident in my qualifications.

At Loomly, I led design-token rollouts and collaborated closely with engineering in TypeScript. I look forward to discussing my application.

Sincerely,
[candidateName]`
    },
    direct: {
      standard: `Dear [companyName] Team,

I'm applying for the [roleTitle] role. Here is why I'm a fit: I have seven years of experience building design systems and leading user research that drives product metrics.

At Loomly, I spearheaded our design-token rollout across four separate product teams and worked daily in a TypeScript environment. This matches the exact workflow described in your job listing.

I'd love to join the team and get started. Let me know when you're free to chat.

Best,
[candidateName]`,
      short: `Dear [companyName] Team,

I'm applying for the [roleTitle] role. I have seven years of experience building design systems and user research that drives product metrics.

At Loomly, I led design-token rollouts in a TypeScript codebase. I'd love to join the team and get started.

Best,
[candidateName]`
    }
  };

  // State to hold the active editable letter text body
  const [editableLetterText, setEditableLetterText] = useState<string>('');

  // Automatically update/generate cover letter text when settings change
  useEffect(() => {
    const template = letterContent[tone][length];
    const generated = template
      .replace(/\[companyName\]/g, localRole.company)
      .replace(/\[roleTitle\]/g, localRole.title)
      .replace(/\[candidateName\]/g, candidateName);
    
    setEditableLetterText(generated);
  }, [tone, length, localRole.company, localRole.title, candidateName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic PDF Download using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 45;
    let y = 60;

    // Helper to convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 29, g: 185, b: 84 };
    };

    const primaryColor = hexToRgb(themeColor);

    // Font mapping
    let pdfFont = 'helvetica';
    if (['times', 'georgia', 'garamond'].includes(fontFamily)) {
      pdfFont = 'times';
    } else if (fontFamily === 'courier') {
      pdfFont = 'courier';
    }

    // 1. Header: Candidate Name
    doc.setFont(pdfFont, 'bold');
    doc.setFontSize(22);
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text(candidateName, margin, y);
    y += 22;

    // 2. Contact Details
    doc.setFont(pdfFont, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    const contactStr = `${candidateEmail}  |  ${candidatePhone}  |  ${candidateLocation}`;
    doc.text(contactStr, margin, y);
    y += 16;

    // 3. Separator Line
    doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 35;

    // 4. Date
    doc.setFont(pdfFont, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(18, 18, 18);
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(formattedDate, margin, y);
    y += 24;

    // 5. Recipient Block
    doc.setFont(pdfFont, 'bold');
    doc.text('Hiring Team', margin, y);
    y += 14;
    doc.setFont(pdfFont, 'normal');
    doc.text(localRole.company, margin, y);
    y += 30;

    // 6. Subject Line
    doc.setFont(pdfFont, 'bold');
    doc.text(`Subject: Application for ${localRole.title}`, margin, y);
    y += 25;

    // 7. Letter Body Paragraphs
    doc.setFont(pdfFont, 'normal');
    
    // Split text into paragraphs based on line breaks
    const paragraphs = editableLetterText.split('\n\n');
    
    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) continue;
      
      const lines = doc.splitTextToSize(paragraph, pageWidth - (margin * 2));
      doc.text(lines, margin, y);
      y += (lines.length * 15) + 16;
    }

    // Save Cover Letter PDF
    const filename = `${candidateName.replace(/\s+/g, '_')}_Cover_Letter_${localRole.company.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
  };

  return (
    <div className="space-y-6 font-sans text-left animate-fadeIn">
      
      {/* Workspace Sub-tabs for Step 4 (Tailored CV vs Cover Letter) */}
      <div className="flex border-b border-[#EBEBEB] select-none mb-2">
        <button
          onClick={() => setActiveTab('resume-tailor')}
          className="pb-3 text-sm font-extrabold border-b-2 px-4 transition-all border-transparent text-[#8A8A8A] hover:text-[#121212] focus:outline-none"
        >
          Tailored Resume
        </button>
        <button
          onClick={() => setActiveTab('resume-covers')}
          className="pb-3 text-sm font-extrabold border-b-2 px-4 transition-all border-[#1DB954] text-[#121212] focus:outline-none"
        >
          Cover Letter
        </button>
      </div>

      {/* Top action bar */}
      <div className="flex justify-between items-center select-none">
        <button
          onClick={() => setActiveTab('resume-tailor')}
          className="flex items-center gap-1.5 text-[#5B5B5B] hover:text-[#121212] font-bold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to tailored CV</span>
        </button>

        <div className="flex gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#CFCFCF] text-xs font-bold text-[#121212] hover:bg-[#F3F3F3] hover:border-[#121212] active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#0E9E48]" />
                <span className="text-[#0E9E48]">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY TEXT</span>
              </>
            )}
          </button>

          {/* Download PDF Button */}
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-xs font-bold rounded-full active:scale-95 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PDF</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-[22px] font-black text-[#121212] tracking-tight">Cover letter — {localRole.company}</h2>
      </div>

      {/* Grid: Settings Panel (Left) vs Live Editable A4 Document Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Settings Panel */}
        <div className="space-y-4">
          
          {/* JD selector & Candidate details */}
          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 space-y-4 shadow-sm text-left">
            <h3 className="text-[11px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">Target Job &amp; Details</h3>
            
            {/* Dynamic JD Dropdown Selection */}
            {sessionJds.length > 0 && (
              <div className="space-y-1 pb-2 border-b border-[#F0F0F0]">
                <label className="text-[10px] font-bold text-[#5B5B5B]">Target Job Description</label>
                <select
                  value={selectedJdId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedJdId(val);
                    const found = sessionJds.find(j => (j.title + " @ " + j.company) === val);
                    if (found) {
                      setLocalRole({ company: found.company, title: found.title });
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] text-xs font-semibold focus:outline-none focus:border-[#1DB954] transition-all bg-white text-[#121212]"
                >
                  {sessionJds.map((job, idx) => (
                    <option key={idx} value={job.title + " @ " + job.company}>
                      {job.title} — {job.company}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#5B5B5B]">Full Name</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all text-[#121212]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#5B5B5B]">Email Address</label>
                <input
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all text-[#121212]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#5B5B5B]">Phone Number</label>
                <input
                  type="text"
                  value={candidatePhone}
                  onChange={(e) => setCandidatePhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all text-[#121212]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#5B5B5B]">Location</label>
                <input
                  type="text"
                  value={candidateLocation}
                  onChange={(e) => setCandidateLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all text-[#121212]"
                />
              </div>
            </div>
          </div>

          {/* Style Options */}
          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 space-y-4 shadow-sm text-left">
            <h3 className="text-[11px] font-extrabold text-[#8A8A8A] uppercase tracking-wider">Style Options</h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#5B5B5B]">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all bg-white text-[#121212]"
                >
                  <option value="helvetica">Helvetica (Sans-Serif)</option>
                  <option value="times">Times New Roman (Serif)</option>
                  <option value="courier">Courier (Monospace)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#5B5B5B] block">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-[#EBEBEB]"
                  />
                  <input
                    type="text"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all uppercase text-[#121212]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tone & Length Toggles */}
          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 space-y-4 shadow-sm text-left select-none">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider block">Tone</label>
              <div className="flex gap-2">
                {['warm', 'formal', 'direct'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t as any)}
                    className={`flex-1 py-1.5 rounded-full text-[11px] font-bold transition-all capitalize ${
                      tone === t ? 'bg-[#121212] text-white' : 'bg-[#F3F3F3] text-[#5B5B5B] hover:text-[#121212]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 mt-4">
              <label className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider block">Length</label>
              <div className="flex gap-2">
                {['short', 'standard'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLength(l as any)}
                    className={`flex-1 py-1.5 rounded-full text-[11px] font-bold transition-all capitalize ${
                      length === l ? 'bg-[#121212] text-white' : 'bg-[#F3F3F3] text-[#5B5B5B] hover:text-[#121212]'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('resume-matches')}
            className="w-full text-center py-3 bg-[#F3F3F3] hover:bg-[#EBEBEB] rounded-full text-[11px] font-bold tracking-wider uppercase text-[#5B5B5B] hover:text-[#121212] active:scale-95 transition-all shadow-xs"
          >
            Back to matches
          </button>
        </div>

        {/* Right Side: Live Editable A4 Document Preview Mockup */}
        <div className="lg:col-span-2 select-text">
          <div 
            className="bg-white border border-[#EBEBEB] rounded-2xl p-12 shadow-sm min-h-[640px] text-left space-y-6 relative overflow-hidden flex flex-col"
            style={{ fontFamily: fontFamily === 'times' ? 'Georgia, serif' : fontFamily === 'courier' ? 'Courier, monospace' : 'inherit' }}
          >
            {/* Colored top decorative banner line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 animate-fadeIn" style={{ backgroundColor: themeColor }} />

            {/* Document Header */}
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight mb-1" style={{ color: themeColor }}>
                {candidateName}
              </h1>
              <p className="text-[11px] text-[#8A8A8A] font-semibold tracking-wide">
                {candidateEmail}  &bull;  {candidatePhone}  &bull;  {candidateLocation}
              </p>
            </div>

            {/* Separator line */}
            <div className="h-[1.5px]" style={{ backgroundColor: themeColor }} />

            {/* Date */}
            <div className="text-xs font-semibold text-[#121212]">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            {/* Recipient Box */}
            <div className="text-xs space-y-0.5">
              <p className="font-extrabold text-[#121212]">Hiring Team</p>
              <p className="font-medium text-[#5B5B5B]">{localRole.company}</p>
            </div>

            {/* Subject Line */}
            <div className="text-xs font-extrabold text-[#121212]">
              Subject: Application for {localRole.title}
            </div>

            {/* Cover Letter Body Text - Direct Rich Editable Textarea */}
            <div className="flex-1 flex flex-col pt-2">
              <textarea
                value={editableLetterText}
                onChange={(e) => setEditableLetterText(e.target.value)}
                rows={22}
                className="w-full flex-1 text-xs text-[#121212] leading-relaxed resize-none focus:outline-none bg-transparent focus:bg-[#FAFDFB]/30 rounded p-1 transition-all border-0"
                style={{ 
                  minHeight: '480px', 
                  fontFamily: fontFamily === 'times' ? 'Georgia, serif' : fontFamily === 'courier' ? 'Courier, monospace' : 'inherit',
                  lineHeight: '1.75'
                }}
                placeholder="Type your custom cover letter body paragraphs here..."
              />
            </div>

            <div className="text-[10px] text-[#B0B0B0] select-none text-right pt-2 border-t border-[#F5F5F5]">
              💡 Feel free to type/edit directly on the sheet. Your edits are preserved in the generated PDF.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
