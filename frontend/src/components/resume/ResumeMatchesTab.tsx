import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ResumeMatchesTabProps {
  setActiveTab: (tab: string) => void;
  setSelectedRole?: (role: any) => void;
}

export default function ResumeMatchesTab({ setActiveTab, setSelectedRole }: ResumeMatchesTabProps) {
  const [filter, setFilter] = useState<'all' | 'remote' | '90'>('all');

  // Load actual CV analysis and job listings from sessionStorage cache
  const cachedAnalysis = sessionStorage.getItem('careerlens_cv_analysis');
  const cachedJds = sessionStorage.getItem('careerlens_cv_jds');
  
  let analysisResult: any = null;
  let jobDetails: any[] = [];

  if (cachedAnalysis) {
    try {
      analysisResult = JSON.parse(cachedAnalysis);
    } catch (e) {}
  }
  if (cachedJds) {
    try {
      jobDetails = JSON.parse(cachedJds);
    } catch (e) {}
  }

  // Construct matching roles list dynamically
  let matches: any[] = [];
  
  if (analysisResult && analysisResult.per_jd_scores) {
    matches = analysisResult.per_jd_scores.map((item: any, index: number) => {
      // Find matching raw job from fetched Jds list to get actual location/link info
      const rawJob = jobDetails.find(
        (j: any) => j.title.toLowerCase() === item.title.toLowerCase() && j.company.toLowerCase() === item.company.toLowerCase()
      ) || jobDetails[index] || {};

      // Pull some dynamic keywords based on actual parsing
      const matchingKeywords = analysisResult.keywords
        ? analysisResult.keywords.filter((kw: any) => kw.in_cv).map((kw: any) => kw.word).slice(0, 3)
        : [item.key_match || 'Experience'];

      const missingKeywords = analysisResult.keywords
        ? analysisResult.keywords.filter((kw: any) => !kw.in_cv).map((kw: any) => kw.word).slice(0, 2)
        : [item.key_gap || 'Specialized skills'];

      return {
        id: `match-job-${index}`,
        title: item.title,
        company: item.company,
        location: rawJob.location || 'Remote',
        logo: (item.company.charAt(0) || 'J').toUpperCase(),
        score: item.score || 70,
        matchingSkills: matchingKeywords,
        missingSkills: missingKeywords,
        rawText: rawJob.text || '',
        applyLink: rawJob.applyLink || null
      };
    });
  }

  // Fallback defaults if no analysis exists yet (safety fallback)
  if (matches.length === 0) {
    return (
      <div className="text-center py-12 font-sans border border-dashed border-[#EEEEEE] rounded-2xl bg-[#FAFAFA]/50 select-none animate-fadeIn">
        <h3 className="text-sm font-bold text-[#8A8A8A] block">No job matches to show.</h3>
        <p className="text-xs text-[#8A8A8A] mt-1">Please complete Step 1 (Upload CV) and Step 2 (Target role) first.</p>
        <button
          onClick={() => setActiveTab('resume-upload')}
          className="mt-4 px-5 py-2.5 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-xs font-bold rounded-full transition-all active:scale-95 shadow-sm"
        >
          Go to Step 1
        </button>
      </div>
    );
  }

  // Filtering logic
  const filteredMatches = matches.filter(m => {
    if (filter === 'remote') return m.location.toLowerCase().includes('remote');
    if (filter === '90') return m.score >= 90;
    return true;
  });

  const handleRoleSelect = (role: any) => {
    if (setSelectedRole) setSelectedRole(role);
    setActiveTab('resume-gaps');
  };

  const targetRoleTitle = matches[0]?.title || 'Target Role';
  const targetLocation = matches[0]?.location || 'United States';

  return (
    <div className="space-y-6 font-sans text-left animate-fadeIn">
      
      {/* Header and Filter Pills */}
      <div className="flex justify-between items-end border-b border-[#EEEEEE] pb-4 select-none">
        <div>
          <h2 className="text-[22px] font-black text-[#121212] tracking-tight">{filteredMatches.length} roles matched</h2>
          <p className="text-xs text-[#8A8A8A] mt-0.5 font-medium">{targetRoleTitle} · {targetLocation} · sorted by fit</p>
        </div>
        
        {/* Filter Pills */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#121212] text-white'
                : 'bg-[#F3F3F3] text-[#5B5B5B] hover:text-[#121212]'
            }`}
          >
            All {matches.length}
          </button>
          <button
            onClick={() => setFilter('remote')}
            className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === 'remote'
                ? 'bg-[#121212] text-white'
                : 'bg-[#F3F3F3] text-[#5B5B5B] hover:text-[#121212]'
            }`}
          >
            Remote
          </button>
          <button
            onClick={() => setFilter('90')}
            className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === '90'
                ? 'bg-[#121212] text-white'
                : 'bg-[#F3F3F3] text-[#5B5B5B] hover:text-[#121212]'
            }`}
          >
            90%+
          </button>
        </div>
      </div>

      {/* Role Cards List */}
      <div className="space-y-3.5">
        {filteredMatches.map((m) => (
          <div
            key={m.id}
            onClick={() => handleRoleSelect(m)}
            className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-[#EEEEEE] hover:border-[#CCCCCC] transition-all bg-white cursor-pointer group shadow-xs hover:shadow-sm"
          >
            <div className="flex items-start gap-4 min-w-0">
              {/* Logo Placeholder */}
              <div className="w-[50px] h-[50px] rounded-xl bg-[#F0F0F0] text-[#5B5B5B] flex items-center justify-center font-extrabold text-base shrink-0 select-none">
                {m.logo}
              </div>
              <div className="min-w-0">
                <div className="text-[16px] font-black text-[#121212] tracking-tight">{m.title}</div>
                <div className="text-[12px] text-[#8A8A8A] mt-0.5 font-medium">{m.company} · {m.location}</div>
                
                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3 select-none animate-fadeIn">
                  {m.matchingSkills.map((s: string) => (
                    <span key={s} className="bg-[#E8F8EE] text-[#0E9E48] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-[#1DB954]/10">
                      {s}
                    </span>
                  ))}
                  {m.missingSkills.map((s: string) => (
                    <span key={s} className="bg-[#FDF2F2] text-[#E22134] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-[#E22134]/10">
                      - {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Score & Arrow Indicator */}
            <div className="flex items-center gap-6 shrink-0 select-none">
              <div className="flex items-center gap-3">
                <div className="w-[100px] h-2 bg-[#EBEBEB] rounded-full overflow-hidden shrink-0">
                  <div className="h-full bg-[#1DB954] rounded-full" style={{ width: `${m.score}%` }}></div>
                </div>
                <div className="text-right">
                  <span className="text-[16px] font-black text-[#121212] block leading-none">{m.score}</span>
                  <span className="text-[9.5px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block mt-1">match</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#121212] transition-colors" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
