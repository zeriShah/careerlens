import { useState, useEffect } from 'react';
import { Sparkles, Download, Plus, Trash2, Check, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../services/api';
import type { JobDescription } from '../../services/resumeService';
import { generateTailoredResumePDF } from '../../lib/generateTailoredResumePDF';
import type { TailoredResumeData } from '../../lib/generateTailoredResumePDF';

interface ResumeTailorProps {
  setActiveTab: (tab: string) => void;
}

export default function ResumeTailor({ setActiveTab }: ResumeTailorProps) {
  const [cvText, setCvText] = useState<string>('');
  const [jdText, setJdText] = useState<string>('');
  const [selectedJdId, setSelectedJdId] = useState<string>('');
  const [sessionJds, setSessionJds] = useState<JobDescription[]>([]);
  
  const [tailoredResume, setTailoredResume] = useState<TailoredResumeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Styling Choices
  const [themeColor, setThemeColor] = useState<string>('#0f172a'); // Hex color picker default
  const [fontFamily, setFontFamily] = useState<string>('helvetica'); // Expanded font select

  // Bullet optimization loading map
  const [optimizingMap, setOptimizingMap] = useState<Record<string, boolean>>({});

  // Load active session cache upon mounting
  useEffect(() => {
    const cachedText = sessionStorage.getItem('careerlens_cv_text') || '';
    const cachedJds = sessionStorage.getItem('careerlens_cv_jds') || '[]';
    
    setCvText(cachedText);
    try {
      const parsed = JSON.parse(cachedJds);
      setSessionJds(parsed);
      if (parsed.length > 0) {
        setSelectedJdId(parsed[0].title);
        setJdText(parsed[0].text);
      }
    } catch (e) {}
  }, []);

  const handleJdSelect = (title: string) => {
    setSelectedJdId(title);
    const found = sessionJds.find(j => j.title === title);
    if (found) {
      setJdText(found.text);
    }
  };

  const handleTailor = async () => {
    if (!cvText.trim() || !jdText.trim()) {
      setError('Please provide both your original resume and the target job description.');
      return;
    }

    setLoading(true);
    setError('');
    setTailoredResume(null);
    try {
      const res = await api.post('/resume/tailor', { cvText, jdText });
      
      const parsedResume = res.data.tailoredResume;
      if (parsedResume && !parsedResume.projects) {
        parsedResume.projects = [];
      }
      
      setTailoredResume(parsedResume);
      setSuccess('Resume successfully tailored! Review and edit the sections below.');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Tailoring request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Inline Bullet Optimizer
  const optimizeSingleBullet = async (type: 'exp' | 'proj', parentIdx: number, bulletIdx: number, currentText: string) => {
    if (!currentText.trim()) return;
    const key = `${type}-${parentIdx}-${bulletIdx}`;
    setOptimizingMap(prev => ({ ...prev, [key]: true }));

    try {
      const res = await api.post('/resume/optimize-bullet', {
        bulletText: currentText,
        jdText
      });

      if (res.data.optimizedText && tailoredResume) {
        if (type === 'exp') {
          const list = [...tailoredResume.work_experience];
          list[parentIdx].bullets[bulletIdx] = res.data.optimizedText;
          setTailoredResume({ ...tailoredResume, work_experience: list });
        } else {
          const list = [...(tailoredResume.projects || [])];
          list[parentIdx].bullets[bulletIdx] = res.data.optimizedText;
          setTailoredResume({ ...tailoredResume, projects: list });
        }
      }
    } catch (err) {
      console.error('Bullet optimization failed:', err);
    } finally {
      setOptimizingMap(prev => ({ ...prev, [key]: false }));
    }
  };

  // Structured editing handlers
  const handleContactChange = (field: string, value: string) => {
    if (!tailoredResume) return;
    setTailoredResume({
      ...tailoredResume,
      contact_info: {
        ...tailoredResume.contact_info,
        [field]: value
      }
    });
  };

  const handleSummaryChange = (value: string) => {
    if (!tailoredResume) return;
    setTailoredResume({
      ...tailoredResume,
      professional_summary: value
    });
  };

  const handleExperienceChange = (idx: number, field: string, value: string) => {
    if (!tailoredResume) return;
    const list = [...tailoredResume.work_experience];
    (list[idx] as any)[field] = value;
    setTailoredResume({ ...tailoredResume, work_experience: list });
  };

  const handleBulletChange = (expIdx: number, bulletIdx: number, value: string) => {
    if (!tailoredResume) return;
    const list = [...tailoredResume.work_experience];
    list[expIdx].bullets[bulletIdx] = value;
    setTailoredResume({ ...tailoredResume, work_experience: list });
  };

  const addBullet = (expIdx: number) => {
    if (!tailoredResume) return;
    const list = [...tailoredResume.work_experience];
    list[expIdx].bullets.push('');
    setTailoredResume({ ...tailoredResume, work_experience: list });
  };

  const removeBullet = (expIdx: number, bulletIdx: number) => {
    if (!tailoredResume) return;
    const list = [...tailoredResume.work_experience];
    list[expIdx].bullets = list[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    setTailoredResume({ ...tailoredResume, work_experience: list });
  };

  // Projects handlers
  const handleProjectNameChange = (idx: number, value: string) => {
    if (!tailoredResume) return;
    const list = [...(tailoredResume.projects || [])];
    list[idx].name = value;
    setTailoredResume({ ...tailoredResume, projects: list });
  };

  const handleProjectBulletChange = (projIdx: number, bulletIdx: number, value: string) => {
    if (!tailoredResume) return;
    const list = [...(tailoredResume.projects || [])];
    list[projIdx].bullets[bulletIdx] = value;
    setTailoredResume({ ...tailoredResume, projects: list });
  };

  const addProjectBullet = (projIdx: number) => {
    if (!tailoredResume) return;
    const list = [...(tailoredResume.projects || [])];
    list[projIdx].bullets.push('');
    setTailoredResume({ ...tailoredResume, projects: list });
  };

  const removeProjectBullet = (projIdx: number, bulletIdx: number) => {
    if (!tailoredResume) return;
    const list = [...(tailoredResume.projects || [])];
    list[projIdx].bullets = list[projIdx].bullets.filter((_, i) => i !== bulletIdx);
    setTailoredResume({ ...tailoredResume, projects: list });
  };

  const addProject = () => {
    if (!tailoredResume) return;
    setTailoredResume({
      ...tailoredResume,
      projects: [...(tailoredResume.projects || []), { name: '', bullets: [''] }]
    });
  };

  const removeProject = (idx: number) => {
    if (!tailoredResume) return;
    setTailoredResume({
      ...tailoredResume,
      projects: (tailoredResume.projects || []).filter((_, i) => i !== idx)
    });
  };

  const handleEducationChange = (idx: number, field: string, value: string) => {
    if (!tailoredResume) return;
    const list = [...tailoredResume.education];
    (list[idx] as any)[field] = value;
    setTailoredResume({ ...tailoredResume, education: list });
  };

  const handleSkillChange = (idx: number, value: string) => {
    if (!tailoredResume) return;
    const list = [...tailoredResume.skills];
    list[idx] = value;
    setTailoredResume({ ...tailoredResume, skills: list });
  };

  const addSkill = () => {
    if (!tailoredResume) return;
    setTailoredResume({
      ...tailoredResume,
      skills: [...tailoredResume.skills, '']
    });
  };

  const removeSkill = (idx: number) => {
    if (!tailoredResume) return;
    setTailoredResume({
      ...tailoredResume,
      skills: tailoredResume.skills.filter((_, i) => i !== idx)
    });
  };

  const handleCertChange = (idx: number, value: string) => {
    if (!tailoredResume) return;
    const list = [...(tailoredResume.certifications || [])];
    list[idx] = value;
    setTailoredResume({ ...tailoredResume, certifications: list });
  };

  const addCert = () => {
    if (!tailoredResume) return;
    setTailoredResume({
      ...tailoredResume,
      certifications: [...(tailoredResume.certifications || []), '']
    });
  };

  const removeCert = (idx: number) => {
    if (!tailoredResume) return;
    setTailoredResume({
      ...tailoredResume,
      certifications: (tailoredResume.certifications || []).filter((_, i) => i !== idx)
    });
  };

  const handleExportPDF = () => {
    if (!tailoredResume) return;
    generateTailoredResumePDF(tailoredResume, themeColor, fontFamily);
  };

  // Font class switcher helper for real-time CSS rendering
  const fontClassMap: Record<string, string> = {
    helvetica: 'font-sans',
    times: 'font-serif',
    courier: 'font-mono',
    georgia: 'font-[Georgia,serif]',
    garamond: 'font-[Garamond,serif]',
    arial: 'font-[Arial,sans-serif]',
    trebuchet: 'font-["Trebuchet_MS",sans-serif]',
    verdana: 'font-[Verdana,sans-serif]'
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2 text-left">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span>Structured Resume Editor & Tailor</span>
          </h2>
          <p className="text-sm text-slate-500">
            Optimize your resume bullet points and download a high-fidelity PDF formatted template.
          </p>
        </div>
        
        {tailoredResume && (
          <button
            onClick={() => setTailoredResume(null)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 hover:text-red-600 hover:border-red-100 hover:bg-red-50/50 transition-all font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Editor</span>
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm animate-fadeIn">
          <AlertCircle className="w-4.5 h-4.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-sm animate-fadeIn">
          <Check className="w-4.5 h-4.5 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {!tailoredResume ? (
        /* Inputs workspace */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-slate-100 bg-white p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Job Description</h3>
            
            {sessionJds.length > 0 && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Select Target Position</label>
                <select
                  value={selectedJdId}
                  onChange={(e) => handleJdSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 text-slate-700 bg-white"
                >
                  {sessionJds.map((jd, idx) => (
                    <option key={idx} value={jd.title}>
                      {jd.title} @ {jd.company}
                    </option>
                  ))}
                  <option value="custom">-- Enter custom JD --</option>
                </select>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Job Requirements Context</label>
              <textarea
                value={jdText}
                onChange={(e) => {
                  setJdText(e.target.value);
                  if (selectedJdId !== 'custom') setSelectedJdId('custom');
                }}
                placeholder="Paste the job description or target requirements here..."
                rows={8}
                className="w-full rounded-xl border border-slate-200 bg-white text-slate-700 p-3 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
            </div>
          </div>

          <div className="border border-slate-100 bg-white p-5 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Original CV Context</h3>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your original resume text here..."
                rows={11}
                className="w-full rounded-xl border border-slate-200 bg-white text-slate-700 p-3 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                onClick={handleTailor}
                disabled={loading || !cvText.trim() || !jdText.trim()}
                className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing & Restructuring Resume...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Structured Tailored Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Dynamic Split Screen: Left Editor Form vs Right Live A4 Preview */
        <div className="space-y-6">
          {/* Workspace Sub-tabs for Step 4 (Tailored CV vs Cover Letter) */}
          <div className="flex border-b border-slate-200 select-none mb-2">
            <button
              onClick={() => setActiveTab('resume-tailor')}
              className="pb-3 text-sm font-extrabold border-b-2 px-4 transition-all border-emerald-500 text-slate-800 focus:outline-none"
            >
              Tailored Resume
            </button>
            <button
              onClick={() => setActiveTab('resume-covers')}
              className="pb-3 text-sm font-extrabold border-b-2 px-4 transition-all border-transparent text-slate-400 hover:text-slate-800 focus:outline-none"
            >
              Cover Letter
            </button>
          </div>

          {/* Accent Customizer Controls Panel */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {/* Color picker palette */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Accent Color Theme</span>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  {/* Preset color circle selectors */}
                  <div className="flex items-center gap-1.5 border-r border-slate-100 pr-2">
                    {[
                      { name: 'Navy', hex: '#1e3a8a' },
                      { name: 'Forest Green', hex: '#14532d' },
                      { name: 'Slate', hex: '#334155' },
                      { name: 'Burgundy', hex: '#7f1d1d' }
                    ].map((preset) => (
                      <button
                        key={preset.hex}
                        title={preset.name}
                        onClick={() => setThemeColor(preset.hex)}
                        className={`w-5 h-5 rounded-full border transition-all ${
                          themeColor.toLowerCase() === preset.hex.toLowerCase()
                            ? 'ring-2 ring-offset-1 ring-blue-500 scale-105 border-transparent'
                            : 'border-slate-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: preset.hex }}
                      />
                    ))}
                  </div>
                  {/* Custom color input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-5 h-5 border-0 p-0 rounded-lg cursor-pointer bg-transparent"
                    />
                    <span className="text-[9px] font-mono text-slate-500 uppercase">{themeColor}</span>
                  </div>
                </div>
              </div>

              {/* Font Dropdown Selection */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Typography Style</span>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="helvetica">Helvetica (Sans-Serif Classic)</option>
                  <option value="times">Times New Roman (Elegant Serif)</option>
                  <option value="courier">Courier (Monospace Modern)</option>
                  <option value="georgia">Georgia (Editorial Serif)</option>
                  <option value="garamond">Garamond (Sophisticated Serif)</option>
                  <option value="arial">Arial (Modern Clean)</option>
                  <option value="trebuchet">Trebuchet MS (Dynamic Sans)</option>
                  <option value="verdana">Verdana (Readable Screen)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleExportPDF}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Tailored Resume (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT SIDE: Structured Editor Inputs Form */}
            <div className="lg:col-span-7 space-y-6 max-h-[750px] overflow-y-auto pr-1">
              
              <div className="border border-slate-100 bg-white rounded-2xl shadow-sm p-5 space-y-6">
                
                {/* 1. Contact Info Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                    1. Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        value={tailoredResume.contact_info.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                        className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={tailoredResume.contact_info.title}
                        onChange={(e) => handleContactChange('title', e.target.value)}
                        className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        value={tailoredResume.contact_info.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={tailoredResume.contact_info.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                        className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Location</label>
                      <input
                        type="text"
                        value={tailoredResume.contact_info.location}
                        onChange={(e) => handleContactChange('location', e.target.value)}
                        className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Website / LinkedIn</label>
                      <input
                        type="text"
                        value={tailoredResume.contact_info.website}
                        onChange={(e) => handleContactChange('website', e.target.value)}
                        className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Professional Summary Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                    2. Professional Summary
                  </h4>
                  <textarea
                    value={tailoredResume.professional_summary}
                    onChange={(e) => handleSummaryChange(e.target.value)}
                    rows={4}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                  />
                </div>

                {/* 3. Work Experience Section */}
                <div className="space-y-6 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                    3. Work Experience
                  </h4>
                  <div className="space-y-6 divide-y divide-slate-100">
                    {tailoredResume.work_experience.map((exp, expIdx) => (
                      <div key={expIdx} className={`space-y-4 ${expIdx > 0 ? 'pt-6' : ''}`}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Role Title</label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => handleExperienceChange(expIdx, 'title', e.target.value)}
                              className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Company Name</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(expIdx, 'company', e.target.value)}
                              className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Dates Employed</label>
                            <input
                              type="text"
                              value={exp.dates}
                              onChange={(e) => handleExperienceChange(expIdx, 'dates', e.target.value)}
                              className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* Bullets Sub-section */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase">Achievements & Responsibilities</label>
                            <button
                              onClick={() => addBullet(expIdx)}
                              className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:underline"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Achievement</span>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {exp.bullets.map((bullet, bulletIdx) => {
                              const optKey = `exp-${expIdx}-${bulletIdx}`;
                              const isOptLoading = optimizingMap[optKey];
                              return (
                                <div key={bulletIdx} className="flex items-center space-x-2">
                                  <div className="flex-1 relative">
                                    <input
                                      type="text"
                                      value={bullet}
                                      onChange={(e) => handleBulletChange(expIdx, bulletIdx, e.target.value)}
                                      className={`w-full text-xs bg-white border rounded-xl pl-3.5 pr-20 py-2 text-slate-700 focus:outline-none focus:border-blue-500 transition-all duration-300 ${
                                        isOptLoading ? 'border-blue-300 bg-blue-50/30 animate-pulse' : 'border-slate-200'
                                      }`}
                                      disabled={isOptLoading}
                                    />
                                    <button
                                      onClick={() => optimizeSingleBullet('exp', expIdx, bulletIdx, bullet)}
                                      disabled={isOptLoading || !bullet.trim()}
                                      className="absolute right-2 top-1.5 px-2 py-0.5 rounded bg-blue-50 border border-blue-100 hover:bg-blue-100 text-[10px] font-bold text-blue-600 flex items-center gap-1 disabled:opacity-50 transition-all"
                                    >
                                      {isOptLoading ? (
                                        <div className="w-2.5 h-2.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <>
                                          <Sparkles className="w-2.5 h-2.5" />
                                          <span>Optimize</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeBullet(expIdx, bulletIdx)}
                                    disabled={isOptLoading}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3.5. Key Projects Section */}
                <div className="space-y-6 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                      3.5. Key Projects
                    </h4>
                    <button
                      onClick={addProject}
                      className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:underline"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-6 divide-y divide-slate-100">
                    {(tailoredResume.projects || []).map((proj, projIdx) => (
                      <div key={projIdx} className={`space-y-4 ${projIdx > 0 ? 'pt-6' : ''}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex-1 max-w-md">
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Project Name</label>
                            <input
                              type="text"
                              value={proj.name}
                              onChange={(e) => handleProjectNameChange(projIdx, e.target.value)}
                              placeholder="e.g. Portfolio Website or E-Commerce platform"
                              className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <button
                            onClick={() => removeProject(projIdx)}
                            className="p-2 mt-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Project Bullets Sub-section */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase">Project Accomplishments & Tech Stack</label>
                            <button
                              onClick={() => addProjectBullet(projIdx)}
                              className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:underline"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Bullet</span>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {proj.bullets.map((bullet, bulletIdx) => {
                              const optKey = `proj-${projIdx}-${bulletIdx}`;
                              const isOptLoading = optimizingMap[optKey];
                              return (
                                <div key={bulletIdx} className="flex items-center space-x-2">
                                  <div className="flex-1 relative">
                                    <input
                                      type="text"
                                      value={bullet}
                                      onChange={(e) => handleProjectBulletChange(projIdx, bulletIdx, e.target.value)}
                                      className={`w-full text-xs bg-white border rounded-xl pl-3.5 pr-20 py-2 text-slate-700 focus:outline-none focus:border-blue-500 transition-all duration-300 ${
                                        isOptLoading ? 'border-blue-300 bg-blue-50/30 animate-pulse' : 'border-slate-200'
                                      }`}
                                      disabled={isOptLoading}
                                    />
                                    <button
                                      onClick={() => optimizeSingleBullet('proj', projIdx, bulletIdx, bullet)}
                                      disabled={isOptLoading || !bullet.trim()}
                                      className="absolute right-2 top-1.5 px-2 py-0.5 rounded bg-blue-50 border border-blue-100 hover:bg-blue-100 text-[10px] font-bold text-blue-600 flex items-center gap-1 disabled:opacity-50 transition-all"
                                    >
                                      {isOptLoading ? (
                                        <div className="w-2.5 h-2.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <>
                                          <Sparkles className="w-2.5 h-2.5" />
                                          <span>Optimize</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeProjectBullet(projIdx, bulletIdx)}
                                    disabled={isOptLoading}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Education Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                    4. Education
                  </h4>
                  <div className="space-y-4">
                    {tailoredResume.education.map((edu, eduIdx) => (
                      <div key={eduIdx} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Degree & Field</label>
                          <input
                            type="text"
                            value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`}
                            onChange={(e) => handleEducationChange(eduIdx, 'degree', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(eduIdx, 'institution', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Dates</label>
                          <input
                            type="text"
                            value={edu.dates}
                            onChange={(e) => handleEducationChange(eduIdx, 'dates', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Skills Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                      5. Core Skills
                    </h4>
                    <button
                      onClick={addSkill}
                      className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:underline"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tailoredResume.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(idx, e.target.value)}
                          className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => removeSkill(idx)}
                          className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Certifications Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                      6. Certifications
                    </h4>
                    <button
                      onClick={addCert}
                      className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:underline"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Certification</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(tailoredResume.certifications || []).map((cert, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => handleCertChange(idx, e.target.value)}
                          className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => removeCert(idx)}
                          className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE: Live A4 Preview Canvas */}
            <div className="lg:col-span-5 border border-slate-200 bg-slate-50 rounded-2xl p-6 sticky top-6 max-h-[750px] overflow-y-auto flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <span>A4 Live Template</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time Sync</span>
                </span>
              </div>
              <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] border border-slate-100 w-full min-h-[760px] shrink-0 p-8 text-slate-800 leading-normal text-left relative selection:bg-blue-100 rounded-sm">
                
                {/* Visual A4 paper borders */}
                <div className={`${fontClassMap[fontFamily]} space-y-4`}>
                  
                  {/* Header Area */}
                  <div className="text-center space-y-1">
                    <h2
                      className="text-xl font-extrabold uppercase tracking-wide"
                      style={{ color: themeColor }}
                    >
                      {tailoredResume.contact_info.name || 'Your Name'}
                    </h2>
                    {tailoredResume.contact_info.title && (
                      <p className="text-[9.5px] font-bold text-slate-500 uppercase tracking-widest">
                        {tailoredResume.contact_info.title}
                      </p>
                    )}
                    
                    <p className="text-[8px] text-slate-400 font-medium">
                      {[
                        tailoredResume.contact_info.location,
                        tailoredResume.contact_info.email,
                        tailoredResume.contact_info.phone,
                        tailoredResume.contact_info.website
                      ].filter(Boolean).join('  |  ')}
                    </p>
                    
                    <div
                      className="h-[1.5px] w-full mt-2"
                      style={{ backgroundColor: themeColor }}
                    />
                  </div>
 
                  {/* 1. Summary Block */}
                  {tailoredResume.professional_summary && (
                    <div className="space-y-1 text-[8.5px]">
                      <h4
                        className="font-bold uppercase tracking-wider border-b border-slate-100 pb-0.5"
                        style={{ color: themeColor }}
                      >
                        Professional Summary
                      </h4>
                      <p className="text-slate-600 text-justify leading-relaxed">
                        {tailoredResume.professional_summary}
                      </p>
                    </div>
                  )}
 
                  {/* 2. Experience Block */}
                  {tailoredResume.work_experience.length > 0 && (
                    <div className="space-y-1.5 text-[8.5px]">
                      <h4
                        className="font-bold uppercase tracking-wider border-b border-slate-100 pb-0.5"
                        style={{ color: themeColor }}
                      >
                        Work Experience
                      </h4>
                      <div className="space-y-2">
                        {tailoredResume.work_experience.map((exp, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-slate-800">{exp.title}</span>
                              <span className="text-slate-500 text-[8px] font-medium">{exp.dates}</span>
                            </div>
                            <p className="text-slate-500 italic text-[8px]">{exp.company}</p>
                            <ul className="list-disc pl-3.5 space-y-0.5 text-slate-600 text-[8px] leading-relaxed">
                              {exp.bullets.map((b, bIdx) => b.trim() && <li key={bIdx}>{b}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
 
                  {/* 3. Projects Block */}
                  {(tailoredResume.projects || []).length > 0 && (
                    <div className="space-y-1.5 text-[8.5px]">
                      <h4
                        className="font-bold uppercase tracking-wider border-b border-slate-100 pb-0.5"
                        style={{ color: themeColor }}
                      >
                        Key Projects
                      </h4>
                      <div className="space-y-2">
                        {(tailoredResume.projects || []).map((proj, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <span className="font-bold text-slate-800 block">{proj.name}</span>
                            <ul className="list-disc pl-3.5 space-y-0.5 text-slate-600 text-[8px] leading-relaxed">
                              {proj.bullets.map((b, bIdx) => b.trim() && <li key={bIdx}>{b}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
 
                  {/* 4. Education Block */}
                  {tailoredResume.education.length > 0 && (
                    <div className="space-y-1.5 text-[8.5px]">
                      <h4
                        className="font-bold uppercase tracking-wider border-b border-slate-100 pb-0.5"
                        style={{ color: themeColor }}
                      >
                        Education
                      </h4>
                      <div className="space-y-1.5">
                        {tailoredResume.education.map((edu, idx) => (
                          <div key={idx} className="flex justify-between items-baseline">
                            <div>
                              <span className="font-bold text-slate-800">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                              <p className="text-slate-500 text-[8px]">{edu.institution}</p>
                            </div>
                            <span className="text-slate-500 text-[8px] font-medium">{edu.dates}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
 
                  {/* 5. Skills Block */}
                  {tailoredResume.skills.length > 0 && (
                    <div className="space-y-1 text-[8.5px]">
                      <h4
                        className="font-bold uppercase tracking-wider border-b border-slate-100 pb-0.5"
                        style={{ color: themeColor }}
                      >
                        Skills
                      </h4>
                      <p className="text-slate-600 text-[8px] leading-relaxed">
                        {tailoredResume.skills.filter(Boolean).join(', ')}
                      </p>
                    </div>
                  )}
 
                  {/* 6. Certifications Block */}
                  {(tailoredResume.certifications || []).length > 0 && (
                    <div className="space-y-1 text-[8.5px]">
                      <h4
                        className="font-bold uppercase tracking-wider border-b border-slate-100 pb-0.5"
                        style={{ color: themeColor }}
                      >
                        Certifications
                      </h4>
                      <p className="text-slate-600 text-[8px] leading-relaxed">
                        {tailoredResume.certifications?.filter(Boolean).join(', ')}
                      </p>
                    </div>
                  )}
 
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
