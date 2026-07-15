import { useState, useEffect } from 'react';
import { Award, CheckCircle2, AlertCircle, Lightbulb, Search, Sparkles, ExternalLink, Github, Loader2, LayoutGrid, List, Check, HelpCircle } from 'lucide-react';
import api from '../../services/api';
import type { KeywordMatch } from '../../services/resumeService';

interface SuggestedProject {
  title: string;
  gaps_fulfilled: string[];
  description: string;
}

function getExampleBullet(word: string): string {
  const lower = word.toLowerCase();
  if (lower.includes('react')) {
    return 'Architected and built modular user interface components using React, reducing bundle size by 20% and increasing page rendering speed.';
  }
  if (lower.includes('typescript')) {
    return 'Refactored key frontend modules to TypeScript, enhancing code reliability and preventing pre-release compile-time exceptions.';
  }
  if (lower.includes('node')) {
    return 'Developed and optimized secure RESTful APIs using Node.js, improving database query response times by 30% under load.';
  }
  if (lower.includes('postgres') || lower.includes('sql') || lower.includes('database')) {
    return 'Designed relational database schemas and optimized indexing in PostgreSQL, reducing query latency across core endpoints by 45%.';
  }
  if (lower.includes('prisma')) {
    return 'Integrated Prisma ORM for database layer transactions, simplifying schema migrations and ensuring type-safe SQL query operations.';
  }
  if (lower.includes('docker') || lower.includes('container')) {
    return 'Containerized application microservices using Docker, streamlining local setup and automating cloud deployment processes.';
  }
  if (lower.includes('aws') || lower.includes('cloud')) {
    return 'Configured scalable AWS infrastructure with ECS and RDS databases, maintaining 99.9% uptime for production workloads.';
  }
  if (lower.includes('graphql')) {
    return 'Consolidated multiple legacy REST API endpoints into a unified GraphQL gateway, reducing data payload size by 35%.';
  }
  if (lower.includes('test') || lower.includes('jest') || lower.includes('cypress')) {
    return 'Authored end-to-end and unit test suites using Jest and Cypress, elevating project test coverage from 40% to 85%.';
  }
  if (lower.includes('tailwind')) {
    return 'Implemented responsive, accessible design systems utilizing Tailwind CSS, ensuring clean layout presentation across desktop and mobile.';
  }
  if (lower.includes('next.js') || lower.includes('nextjs')) {
    return 'Designed high-performance pages using Next.js Server Side Rendering (SSR), improving SEO visibility and speed index by 25%.';
  }
  if (lower.includes('git') || lower.includes('cicd') || lower.includes('github')) {
    return 'Designed and implemented automated CI/CD deployment pipelines using GitHub Actions, decreasing release cycle times by 50%.';
  }
  return `Integrated ${word} methodologies to design and deploy critical functionalities, boosting team velocity and system efficiency by 15%.`;
}


export default function ResumeSkills() {
  const [keywords, setKeywords] = useState<KeywordMatch[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'matched' | 'missing'>('all');
  const [selectedSkill, setSelectedSkill] = useState<KeywordMatch | null>(null);

  // Suggested projects state
  const [suggestedProjects, setSuggestedProjects] = useState<SuggestedProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);

  // Premium animated gauge states
  const [animatedOffset, setAnimatedOffset] = useState<number>(251.2);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    const cachedAnalysis = sessionStorage.getItem('careerlens_cv_analysis');
    if (cachedAnalysis) {
      try {
        const parsed = JSON.parse(cachedAnalysis);
        if (parsed.keywords && Array.isArray(parsed.keywords)) {
          setKeywords(parsed.keywords);
          if (parsed.keywords.length > 0) {
            const firstMissing = parsed.keywords.find((k: any) => !k.in_cv);
            setSelectedSkill(firstMissing || parsed.keywords[0]);
          }

          // Fetch suggested projects for missing skills
          const missing = parsed.keywords.filter((k: any) => !k.in_cv).map((k: any) => k.word);
          if (missing.length > 0) {
            fetchProjectSuggestions(missing);
          }
        }
      } catch (e) {}
    }
  }, []);

  const fetchProjectSuggestions = async (missing: string[]) => {
    setProjectsLoading(true);
    try {
      const res = await api.post('/resume/suggest-projects', { missingSkills: missing });
      setSuggestedProjects(res.data.projects || []);
    } catch (e) {
      console.error('Failed to fetch project suggestions:', e);
    } finally {
      setProjectsLoading(false);
    }
  };

  const presentKeywords = keywords.filter((k) => k.in_cv);
  const missingKeywords = keywords.filter((k) => !k.in_cv);
  const matchRate = keywords.length ? Math.round((presentKeywords.length / keywords.length) * 100) : 0;

  useEffect(() => {
    if (keywords.length > 0) {
      const targetOffset = 251.2 - (251.2 * matchRate) / 100;
      const timer = setTimeout(() => {
        setAnimatedOffset(targetOffset);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setAnimatedOffset(251.2);
    }
  }, [matchRate, keywords.length]);

  const filteredKeywords = keywords.filter((k) => {
    const matchesSearch = k.word.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'matched' && k.in_cv) ||
      (filterType === 'missing' && !k.in_cv);
    return matchesSearch && matchesFilter;
  });

  if (!keywords.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 max-w-md mx-auto text-left">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
          <Award className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-800">No Active Skills Audit Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Run an initial audit scan in the <strong>Resume Analyzer</strong> tab first. We will extract critical keywords from target positions and map them to your CV to identify matching and missing skills.
          </p>
        </div>
      </div>
    );
  }

  // strokeDashoffset is calculated via animated state


  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2 text-left">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-[#121212] flex items-center gap-2">
          <Award className="w-5.5 h-5.5 text-[#1DB954]" />
          <span>Gaps &amp; Matching Skills Audit</span>
        </h2>
        <p className="text-xs text-[#5B5B5B]">
          Identify matching capabilities and critical gaps dynamically. Build advanced projects to fulfill outstanding requirements.
        </p>
      </div>

      {/* High-Fidelity Stats Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* SVG Circular Match Gauge Card */}
        <div className="border border-[#EBEBEB] bg-white p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider block">Skill Alignment</span>
            <h3 className="text-2xl font-extrabold text-[#121212]">{matchRate}%</h3>
            <span className="text-[10px] font-medium text-[#8A8A8A]">Matched density score</span>
          </div>

          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1DB954" />
                  <stop offset="100%" stopColor="#0E9E48" />
                </linearGradient>
                <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={
                  matchRate >= 75 ? 'url(#emeraldGrad)' : matchRate >= 50 ? 'url(#amberGrad)' : 'url(#redGrad)'
                }
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={animatedOffset}
                className="transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-[#121212]">{presentKeywords.length}/{keywords.length}</span>
            </div>
          </div>
        </div>

        {/* Matched Stats Card */}
        <div className="border border-[#EBEBEB] bg-white p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-[#1DB954]/10 text-[#0E9E48] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider">Matched in CV</span>
            <p className="text-lg font-extrabold text-[#121212] mt-0.5">{presentKeywords.length} Keywords</p>
            <span className="text-[10px] text-[#0E9E48] font-bold bg-[#1DB954]/10 border border-[#1DB954]/20 px-1.5 py-0.5 rounded uppercase">Optimal</span>
          </div>
        </div>

        {/* Missing Stats Card */}
        <div className="border border-[#EBEBEB] bg-white p-5 rounded-2xl shadow-xs flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-[#FBEAEA] text-[#C0432A] flex items-center justify-center shrink-0">
            <AlertCircle className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider">Missing Gaps</span>
            <p className="text-lg font-extrabold text-[#121212] mt-0.5">{missingKeywords.length} Gaps</p>
            <span className="text-[10px] text-[#C0432A] font-bold bg-[#FBEAEA] border border-rose-100/60 px-1.5 py-0.5 rounded uppercase">Actionable</span>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: side-by-side Gaps & Matching Layout */}
        <div className="lg:col-span-2 border border-[#EBEBEB] bg-white rounded-2xl shadow-xs p-5 space-y-4 flex flex-col h-[480px]">
          
          {/* Filters Bar & View Mode Selector */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8A8A8A]" />
              <input
                type="text"
                placeholder="Search keywords/skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#EBEBEB] rounded-xl text-xs bg-[#FBFBFB] focus:outline-none focus:bg-white focus:border-[#1DB954] transition-all text-[#121212] placeholder-[#8A8A8A]"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Type Filter */}
              <div className="flex bg-[#F3F3F3] p-0.5 rounded-full">
                {(['all', 'matched', 'missing'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all capitalize ${
                      filterType === type ? 'bg-white text-[#121212] shadow-xs' : 'text-[#5B5B5B] hover:text-[#121212]'
                    }`}
                  >
                    {type === 'missing' ? 'Gaps' : type}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex bg-[#F3F3F3] p-0.5 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white text-[#121212] shadow-xs' : 'text-[#5B5B5B] hover:text-[#121212]'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Table View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            /* Modern Visual Grid View */
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredKeywords.length > 0 ? (
                filteredKeywords.map((k, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSkill(k)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-300 focus:outline-none animate-fadeIn flex justify-between items-start ${
                      k.in_cv
                        ? 'bg-emerald-50/5 border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50/15'
                        : 'bg-red-50/5 border-red-100 hover:border-red-200 hover:bg-red-50/15'
                    } ${
                      selectedSkill?.word === k.word
                        ? 'ring-2 ring-blue-500 ring-offset-1 scale-[1.01] shadow-sm'
                        : 'hover:translate-y-[-1px]'
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0 flex-1 pr-2">
                      <div className="flex items-center space-x-2">
                        {k.in_cv ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <HelpCircle className="w-3.5 h-3.5 text-red-400 shrink-0 animate-pulse" />
                        )}
                        <span className="text-xs font-bold text-slate-800 truncate">{k.word}</span>
                      </div>
                      <p className="text-[9px] text-slate-400 leading-normal line-clamp-1">
                        {k.in_cv 
                          ? 'Present in candidate experiences' 
                          : 'Actionable skills gap in current CV'}
                      </p>
                    </div>

                    <span className={`text-[8.5px] font-extrabold px-2.5 py-0.5 rounded-full border shrink-0 ${
                      k.in_cv ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-red-700 bg-red-50 border-red-100'
                    }`}>
                      {k.in_cv ? 'Matched' : 'Gap'}
                    </span>
                  </button>
                ))
              ) : (
                <div className="col-span-full h-full flex flex-col items-center justify-center text-slate-300 py-12">
                  <Search className="w-8 h-8 text-slate-200" />
                  <p className="text-xs font-bold mt-2">No matching keywords found</p>
                </div>
              )}
            </div>
          ) : (
            /* Premium Audit Spreadsheet Table */
            <div className="flex-1 overflow-hidden border border-slate-100 rounded-2xl flex flex-col">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-slate-50/80 p-3 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none shrink-0">
                <div className="col-span-5">Keyword / Skill</div>
                <div className="col-span-3">CV Status</div>
                <div className="col-span-4">Audit Action</div>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {filteredKeywords.length > 0 ? (
                  filteredKeywords.map((k, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSkill(k)}
                      className={`w-full grid grid-cols-12 p-3.5 items-center hover:bg-slate-50/30 text-left transition-all focus:outline-none animate-fadeIn ${
                        selectedSkill?.word === k.word ? 'bg-blue-50/10' : ''
                      }`}
                    >
                      <div className="col-span-5 flex items-center space-x-2.5 min-w-0">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${k.in_cv ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-red-400 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`} />
                        <span className="text-xs font-bold text-slate-700 truncate">{k.word}</span>
                      </div>

                      <div className="col-span-3">
                        <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                          k.in_cv ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-red-700 bg-red-50 border-red-100'
                        }`}>
                          {k.in_cv ? 'Matched' : 'Missing Gap'}
                        </span>
                      </div>

                      <div className="col-span-4 text-[10px] font-bold">
                        {k.in_cv ? (
                          <span className="text-emerald-600">✓ Present in CV</span>
                        ) : (
                          <span className="text-amber-600 flex items-center gap-1">
                            ⚠️ Needs Project Bridge
                          </span>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 py-12">
                    <Search className="w-8 h-8 text-slate-200" />
                    <p className="text-xs font-bold mt-2">No matching keywords found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Skill Assistant Inspector */}
        <div className="border border-slate-100 bg-white rounded-2xl shadow-sm p-5 space-y-4 flex flex-col h-[480px]">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-50 flex items-center space-x-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Keyword Gap Assistant</span>
          </h3>

          {selectedSkill ? (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5">
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                    selectedSkill.in_cv ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-red-700 bg-red-50 border-red-100'
                  }`}>
                    {selectedSkill.in_cv ? 'CV Active' : 'Critical Gaps'}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-800 mt-2">{selectedSkill.word}</h4>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Impact Assessment</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedSkill.in_cv
                      ? `Great job! Having "${selectedSkill.word}" contextually positioned helps satisfy standard ATS parser parameters and recruiter search syntax.`
                      : `Failing to address "${selectedSkill.word}" may flag your CV as a low match for standard parsing queries on this target profile.`}
                  </p>
                </div>

                {!selectedSkill.in_cv && (
                  <div className="space-y-2 p-3.5 bg-[#FBFBFB] border border-[#EBEBEB] rounded-xl relative group animate-fadeIn">
                    <div className="flex items-center justify-between text-[#0E9E48]">
                      <div className="flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1DB954]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Example Integration Bullet</span>
                      </div>
                      <button
                        onClick={() => {
                          const text = getExampleBullet(selectedSkill.word);
                          navigator.clipboard.writeText(text);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="text-[10px] font-bold hover:underline flex items-center gap-1 text-[#5B5B5B] hover:text-[#121212] transition-colors"
                      >
                        {copied ? 'Copied!' : 'Copy Example'}
                      </button>
                    </div>
                    <p className="text-xs text-[#5B5B5B] font-medium leading-relaxed italic">
                      "{getExampleBullet(selectedSkill.word)}"
                    </p>
                  </div>
                )}
              </div>

              {!selectedSkill.in_cv && (
                <div className="pt-2 border-t border-[#EBEBEB]">
                  <div className="flex items-center space-x-1 text-[10px] text-[#5B5B5B] font-medium">
                    <span>Use the <strong>Resume Tailor</strong> tab to weave this skill in contextually.</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-300 text-center">
              <Lightbulb className="w-10 h-10 text-slate-200" />
              <p className="text-xs font-bold mt-2">No skill selected</p>
              <p className="text-[10px] text-slate-400">Click any keyword block on the left to inspect detailed recommendations.</p>
            </div>
          )}
        </div>
      </div>

      {/* NEW: Bridge Your Skills Gaps with Advanced Projects Section */}
      {missingKeywords.length > 0 && (
        <div className="border border-[#EBEBEB] bg-white p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#EBEBEB]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#1DB954] animate-pulse" />
              <h3 className="text-xs font-bold text-[#121212] uppercase tracking-wider">Bridge Gaps via Advanced Project-Based Learning</h3>
            </div>
            <span className="text-[10px] font-bold text-[#8A8A8A]">Enterprise scalability roadmaps bridging skill gaps</span>
          </div>

          {projectsLoading ? (
            <div className="py-10 flex flex-col items-center justify-center space-y-2 text-[#8A8A8A]">
              <Loader2 className="w-6 h-6 animate-spin text-[#1DB954]" />
              <p className="text-xs font-medium">Generating advanced hands-on architectures based on gaps...</p>
            </div>
          ) : suggestedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {suggestedProjects.map((project, idx) => {
                const searchQ = encodeURIComponent(project.gaps_fulfilled.join(' '));
                const githubUrl = `https://github.com/search?q=${searchQ}`;
                return (
                  <div key={idx} className="p-5 border border-[#EBEBEB] hover:border-[#1DB954]/40 rounded-2xl bg-[#FBFBFB] hover:bg-[#F3F3F3]/10 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#0E9E48]">Advanced Project suggestion #{idx + 1}</span>
                        <h4 className="text-xs font-extrabold text-[#121212] mt-1">{project.title}</h4>
                      </div>

                      <p className="text-[11px] text-[#5B5B5B] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Fulfills gaps tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.gaps_fulfilled.map((gap, gIdx) => (
                          <span key={gIdx} className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-amber-800 flex items-center space-x-1">
                            <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                            <span>{gap}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-[#CFCFCF] hover:bg-[#F3F3F3] rounded-full text-xs font-bold text-[#121212] transition-all w-full text-center"
                    >
                      <Github className="w-4 h-4 text-[#121212]" />
                      <span>Learn & View Code on GitHub</span>
                      <ExternalLink className="w-3 h-3 text-[#8A8A8A]" />
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#8A8A8A]">
              No project suggestions generated. Try running another scan to refresh gaps.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
