import { ArrowRight } from 'lucide-react';

interface OverviewTabProps {
  currentUser: {
    fullName: string;
  };
  setActiveTab: (tab: string) => void;
}

export default function OverviewTab({ currentUser, setActiveTab }: OverviewTabProps) {
  // Extract user first name
  const firstName = currentUser.fullName.split(' ')[0] || 'Alex';

  // Load CV text and analysis result from sessionStorage
  const cachedAnalysis = sessionStorage.getItem('careerlens_cv_analysis');
  const cachedCV = sessionStorage.getItem('careerlens_cv_text');
  
  let analysisResult: any = null;
  if (cachedAnalysis) {
    try {
      analysisResult = JSON.parse(cachedAnalysis);
    } catch (e) {}
  }

  const hasAnalysis = !!analysisResult && !!cachedCV;

  // Calculate actual statistics dynamically based on real data
  const avgScore = hasAnalysis && analysisResult.per_jd_scores?.length > 0
    ? Math.round(analysisResult.per_jd_scores.reduce((acc: number, curr: any) => acc + curr.score, 0) / analysisResult.per_jd_scores.length)
    : 0;
  
  const analysesRun = hasAnalysis ? 1 : 0;
  
  // Check if tailored CV exists in sessionStorage cache
  const tailoredCVs = hasAnalysis && sessionStorage.getItem('careerlens_cv_tailored') ? 1 : 0;

  // Latest best match calculation
  let bestMatch: any = null;
  if (hasAnalysis && analysisResult.per_jd_scores?.length > 0) {
    bestMatch = [...analysisResult.per_jd_scores].sort((a: any, b: any) => b.score - a.score)[0];
  }

  // Get current hour for greeting
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 font-sans animate-fadeIn text-left">
      
      {/* Welcome Title Greeting Block */}
      <div>
        <div className="text-sm font-bold text-[#8A8A8A] leading-none mb-1">{getGreeting()}</div>
        <h2 className="text-[28px] font-extrabold text-[#121212] tracking-tight flex items-center gap-2">
          Welcome back, {firstName} <span className="animate-wave inline-block origin-[70%_70%]">👋</span>
        </h2>
      </div>

      {/* Grid of 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1: Avg Match Score */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 relative overflow-hidden select-none hover:shadow-sm transition-all">
          <div className="text-[11.5px] font-extrabold text-[#8A8A8A] uppercase tracking-wider">Avg match score</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[32px] font-black text-[#121212] tracking-tight leading-none">{avgScore}</span>
            {hasAnalysis && (
              <span className="text-xs font-bold text-[#1DB954] bg-[#1DB954]/10 px-1.5 py-0.5 rounded-md leading-none">+6</span>
            )}
          </div>
          <div className="absolute right-4 top-4 text-[#1DB954]/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
        </div>

        {/* Stat 2: Analyses Run */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 relative overflow-hidden select-none hover:shadow-sm transition-all">
          <div className="text-[11.5px] font-extrabold text-[#8A8A8A] uppercase tracking-wider">Analyses run</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[32px] font-black text-[#121212] tracking-tight leading-none">{analysesRun}</span>
          </div>
          <div className="absolute right-4 top-4 text-[#8A8A8A]/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
          </div>
        </div>

        {/* Stat 3: Tailored CVs */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 relative overflow-hidden select-none hover:shadow-sm transition-all">
          <div className="text-[11.5px] font-extrabold text-[#8A8A8A] uppercase tracking-wider">Tailored CVs</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[32px] font-black text-[#121212] tracking-tight leading-none">{tailoredCVs}</span>
          </div>
          <div className="absolute right-4 top-4 text-[#8A8A8A]/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>
          </div>
        </div>

        {/* Stat 4: LinkedIn Impressions - ZERO since not connected */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 relative overflow-hidden select-none hover:shadow-sm transition-all">
          <div className="text-[11.5px] font-extrabold text-[#8A8A8A] uppercase tracking-wider">Linkedin Impressions</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[32px] font-black text-[#121212] tracking-tight leading-none">0</span>
          </div>
          <div className="absolute right-4 top-4 text-[#8A8A8A]/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /></svg>
          </div>
        </div>
      </div>

      {/* Grid of Core Module Entry Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Module Card 1: Résumé Analyzer */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 flex flex-col justify-between gap-5 hover:shadow-sm transition-all group">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-lg bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                </div>
                <h3 className="font-extrabold text-[15.5px] text-[#121212]">Résumé analyzer</h3>
              </div>
              <button 
                onClick={() => setActiveTab('resume-upload')}
                className="text-[#8A8A8A] group-hover:text-[#1DB954] transition-colors"
              >
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <p className="text-[13px] text-[#5B5B5B] leading-relaxed">
              Upload a CV, pick a role, and get 10 scored matches with tailored CVs and cover letters.
            </p>
          </div>

          {/* Latest Best Match Inner Widget Card */}
          <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {bestMatch ? (
                <>
                  {/* Circular gauge showing score */}
                  <div className="relative w-11 h-11 flex items-center justify-center shrink-0 select-none">
                    <svg className="w-11 h-11 transform -rotate-90">
                      <circle cx="22" cy="22" r="19" className="stroke-[#EBEBEB] fill-none" strokeWidth="3" />
                      <circle cx="22" cy="22" r="19" className="stroke-[#1DB954] fill-none" strokeWidth="3" strokeDasharray="119.3" strokeDashoffset={119.3 * (1 - bestMatch.score / 100)} strokeLinecap="round" />
                    </svg>
                    <span className="absolute font-sans font-extrabold text-[12px] text-[#121212]">{bestMatch.score}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider leading-none">Latest best match</div>
                    <div className="text-[13.5px] font-extrabold text-[#121212] leading-tight mt-1 truncate">
                      {bestMatch.title} · {bestMatch.company}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-left py-1">
                  <div className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider leading-none">Latest best match</div>
                  <div className="text-[12.5px] font-bold text-[#8A8A8A] leading-tight mt-1">
                    No active resume analysis run.
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => setActiveTab(bestMatch ? 'resume-matches' : 'resume-upload')}
              className="bg-[#1DB954] text-white text-[11px] font-bold px-4 py-2 rounded-full hover:scale-95 active:scale-90 transition-all shadow-sm shrink-0"
            >
              {bestMatch ? 'OPEN' : 'START'}
            </button>
          </div>
        </div>

        {/* Module Card 2: LinkedIn Growth - ZERO KPIs */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 flex flex-col justify-between gap-5 hover:shadow-sm transition-all group">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-lg bg-[#0E9E48]/10 flex items-center justify-center text-[#0E9E48]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /></svg>
                </div>
                <h3 className="font-extrabold text-[15.5px] text-[#121212]">LinkedIn growth</h3>
              </div>
              <button 
                onClick={() => setActiveTab('linkedin-posts')}
                className="text-[#8A8A8A] group-hover:text-[#1DB954] transition-colors"
              >
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <p className="text-[13px] text-[#5B5B5B] leading-relaxed">
              Draft, schedule, and track posts. Watch impressions and connects climb.
            </p>
          </div>

          {/* LinkedIn Scheduled Stats Widget Card - Zeroed */}
          <div className="grid grid-cols-2 gap-3.5 select-none">
            <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 relative overflow-hidden">
              <div className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">This week</div>
              <div className="text-[13.5px] font-extrabold text-[#121212] mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A8A]" />
                0 posts scheduled
              </div>
            </div>
            <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 relative overflow-hidden">
              <div className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">New connects</div>
              <div className="text-[13.5px] font-extrabold text-[#121212] mt-1">
                <span className="text-[#8A8A8A] font-bold">0</span> last 7 days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Recent Analyses */}
      <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-extrabold text-[16px] text-[#121212]">Recent analyses</h3>
          <button 
            onClick={() => setActiveTab('history')}
            className="text-xs font-bold text-[#1DB954] hover:underline"
          >
            View all
          </button>
        </div>

        {/* List of Recent Scans */}
        <div className="space-y-3.5">
          {hasAnalysis && analysisResult.per_jd_scores?.length > 0 ? (
            analysisResult.per_jd_scores.slice(0, 3).map((item: any, index: number) => {
              const letters = ['N', 'H', 'V', 'L', 'C'];
              const letter = letters[index % letters.length];
              const isTailored = tailoredCVs > 0 && index === 0;

              return (
                <div key={index} className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-[#EEEEEE] hover:border-[#CCCCCC] transition-all bg-[#FAFAFA]/50">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#EBEBEB] text-[#5B5B5B] flex items-center justify-center font-extrabold text-sm shrink-0">
                      {letter}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14px] font-extrabold text-[#121212] truncate">{item.title || item.jd_title}</div>
                      <div className="text-[11.5px] text-[#8A8A8A] mt-0.5">{item.company || 'Target Company'} · Analyzed recently</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border select-none ${
                      isTailored 
                        ? 'text-[#0E9E48] bg-[#1DB954]/10 border-[#1DB954]/20' 
                        : 'text-[#5B5B5B] bg-[#F3F3F3] border-[#EEEEEE]'
                    }`}>
                      {isTailored ? '✓ Tailored' : 'Draft ready'}
                    </span>
                    {/* Progress Fit bar */}
                    <div className="flex items-center gap-3 select-none">
                      <div className="w-20 h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1DB954] rounded-full" style={{ width: `${item.score}%` }}></div>
                      </div>
                      <span className="text-[13.5px] font-extrabold text-[#121212] w-6 text-right">{item.score}</span>
                    </div>
                    <button 
                      onClick={() => setActiveTab(isTailored ? 'resume-tailor' : 'resume-gaps')} 
                      className="text-[#8A8A8A] hover:text-[#121212] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-[#8A8A8A] border border-dashed border-[#EEEEEE] rounded-xl bg-[#FAFAFA]/50 select-none">
              No recent resume analyses found. Click "+ New Analysis" in the top bar to begin.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
