import { FileText, Clock, ArrowRight, Linkedin, History, BarChart2, Sparkles, Plus } from 'lucide-react';
import type { ResumeAnalysisResult } from '../../services/resumeService';

interface OverviewTabProps {
  currentUser: {
    fullName: string;
  };
  analysisResult: ResumeAnalysisResult | null;
  setActiveTab: (tab: string) => void;
}

export default function OverviewTab({ currentUser, analysisResult, setActiveTab }: OverviewTabProps) {
  const dashOffset = 175.9 * (1 - (analysisResult ? analysisResult.ats_score : 0) / 100);
  const listingsCount = analysisResult ? `${analysisResult.per_jd_scores.length} Listings` : '0 Listings';
  const feedbackCount = analysisResult ? `${analysisResult.weak_points.length} Actions` : '0 Actions';

  return (
    <>
      {/* Welcome Header Hero */}
      <div className="bg-[#F3EDF7] border border-[#E7E0EC] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
        {/* Top-edge decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-accent" />
        <div className="absolute inset-0 bg-[radial-gradient(#e7e0ec_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        
        <div className="space-y-1 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6750A4]/10 rounded-full text-[10px] font-bold text-[#6750A4] uppercase tracking-wider border border-[#6750A4]/20">
            Workspace Panel
          </span>
          <h2 className="text-xl font-bold text-[#1C1B1F] tracking-tight leading-tight pt-1 font-sans">
            Welcome back, {currentUser.fullName.split(' ')[0]}!
          </h2>
          <p className="text-xs text-[#49454F]">
            Your AI Career workspace has updated analysis matrices. Ensure your resume and LinkedIn keywords are synced.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('resume-analyzer')}
          className="px-5 py-3 bg-[#6750A4] hover:bg-[#6750A4]/90 text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1.5 shrink-0 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Upload New Resume
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Resume Overview Widget Card */}
        <div className="bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-5 transition-all hover:scale-[1.01] hover:shadow-md">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#6750A4]" />
                <h3 className="font-bold text-sm text-[#1C1B1F]">Resume Intelligence</h3>
              </div>
              <p className="text-xs text-[#49454F] block">
                Current Status: <span className="font-semibold text-[#1C1B1F]">{analysisResult ? 'CV Scanned & Cached' : 'No CV Uploaded'}</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E7E0EC] rounded-full text-[9px] font-bold text-[#49454F]">
              <Clock className="w-3.5 h-3.5 text-[#49454F]/80" />
              <span>Cached Locally</span>
            </div>
          </div>

          {/* Circular ATS Score Graph */}
          <div className="flex items-center gap-6 py-2 bg-[#E7E0EC]/40 p-4 rounded-xl border border-[#E7E0EC]/50">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" className="stroke-[#E7E0EC] fill-none" strokeWidth="4.5" />
                <circle cx="32" cy="32" r="28" className={`${analysisResult && analysisResult.ats_score >= 75 ? 'stroke-[#22C55E]' : 'stroke-[#6750A4]'} fill-none`} strokeWidth="4.5" strokeDasharray="175.9" strokeDashoffset={dashOffset} strokeLinecap="round" />
              </svg>
              <span className="absolute font-sans font-extrabold text-sm text-[#1C1B1F]">{analysisResult ? `${analysisResult.ats_score}%` : '0%'}</span>
            </div>
            
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-[#1C1B1F] block">
                {analysisResult 
                  ? (analysisResult.ats_score >= 75 ? 'Excellent ATS compatibility' : 'Moderate ATS compatibility')
                  : 'No Active Resume Audit'}
              </span>
              <p className="text-[11px] text-[#49454F] leading-relaxed">
                {analysisResult
                  ? `Keyword optimizations align with ${analysisResult.jd_title} job requirements.`
                  : 'Upload your CV and target positions to evaluate and audit formatting alignment.'}
              </p>
            </div>
          </div>

          {/* Metrics Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border border-[#E7E0EC] rounded-xl p-3.5 text-left bg-[#E7E0EC]/30">
              <span className="text-[#49454F] block mb-0.5 text-[9px] font-bold uppercase tracking-wider">Active job matches</span>
              <span className="font-extrabold text-lg text-[#1C1B1F] tracking-tight">
                {listingsCount}
              </span>
            </div>
            <div className="border border-[#E7E0EC] rounded-xl p-3.5 text-left bg-[#E7E0EC]/30">
              <span className="text-[#49454F] block mb-0.5 text-[9px] font-bold uppercase tracking-wider">Key feedback points</span>
              <span className="font-extrabold text-lg text-[#1C1B1F] tracking-tight">
                {feedbackCount}
              </span>
            </div>
          </div>

          {/* Go to Analyzer Link */}
          <button
            onClick={() => setActiveTab('resume-analyzer')}
            className="w-full text-center py-2.5 bg-[#E7E0EC]/50 hover:bg-[#E7E0EC] rounded-full text-xs font-bold text-[#1C1B1F] transition-all flex items-center justify-center gap-1.5 border border-[#E7E0EC] active:scale-95"
          >
            <span>{analysisResult ? 'View CV feedback details' : 'Audit your resume now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* LinkedIn Overview Widget Card */}
        <div className="bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-5 transition-all hover:scale-[1.01] hover:shadow-md">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4.5 h-4.5 text-[#6750A4]" />
                <h3 className="font-bold text-sm text-[#1C1B1F]">LinkedIn Workspace</h3>
              </div>
              <p className="text-xs text-[#49454F] block">
                Sync account: <span className="font-semibold text-[#1C1B1F]">{currentUser.fullName}</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#22C55E]/10 rounded-full text-[9px] font-bold text-[#22C55E] border border-[#22C55E]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Synced
            </span>
          </div>

          {/* Mini Sparkline Graph with Peach-Purple-Orange Gradient */}
          <div className="bg-[#E7E0EC]/40 p-4 rounded-xl border border-[#E7E0EC]/50 space-y-2">
            <div className="flex justify-between items-center text-xs text-left">
              <div>
                <span className="text-[10px] font-bold text-[#49454F] uppercase tracking-wider block">Weekly profile impressions</span>
                <span className="font-extrabold text-lg text-[#1C1B1F] tracking-tight">4,820</span>
              </div>
              <span className="text-[9px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-0.5 rounded-full border border-[#22C55E]/20">
                +12.4%
              </span>
            </div>
            
            <div className="w-full h-8 pt-2">
              <svg className="w-full h-full overflow-visible">
                <path
                  d="M0,25 Q15,10 30,28 T60,5 T90,20 T120,3 T150,15 T180,8 T210,18 T240,12 T270,26 T300,4 T330,12 T360,18 T390,6 T420,2"
                  fill="none"
                  stroke="url(#sparkline-grad-tab)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="sparkline-grad-tab" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6750A4" />
                    <stop offset="50%" stopColor="#7D5260" />
                    <stop offset="100%" stopColor="#E8DEF8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Metrics Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border border-[#E7E0EC] rounded-xl p-3.5 text-left bg-[#E7E0EC]/30">
              <span className="text-[#49454F] block mb-0.5 text-[9px] font-bold uppercase tracking-wider">Scheduled posts</span>
              <span className="font-extrabold text-lg text-[#1C1B1F] tracking-tight">2 Active</span>
            </div>
            <div className="border border-[#E7E0EC] rounded-xl p-3.5 text-left bg-[#E7E0EC]/30">
              <span className="text-[#49454F] block mb-0.5 text-[9px] font-bold uppercase tracking-wider">Followers grow</span>
              <span className="font-extrabold text-lg text-[#1C1B1F] tracking-tight">+84 new</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('linkedin-enhancer')}
            className="w-full text-center py-2.5 bg-[#E7E0EC]/50 hover:bg-[#E7E0EC] rounded-full text-xs font-bold text-[#1C1B1F] transition-all flex items-center justify-center gap-1.5 border border-[#E7E0EC] active:scale-95"
          >
            <span>Manage scheduled updates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Activity Log and AI Suggestions side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E7E0EC]/60 pb-3">
            <History className="w-4.5 h-4.5 text-[#49454F]" />
            <h3 className="font-bold text-sm text-[#1C1B1F]">Recent Workspace Activity</h3>
          </div>

          <div className="divide-y divide-[#E7E0EC]/60 text-xs">
            
            <div className="py-3 flex justify-between items-center gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#6750A4]/10 flex items-center justify-center text-[#6750A4] shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-[#1C1B1F] block">Resume upload optimized</span>
                  <p className="text-[11px] text-[#49454F] leading-normal">
                    Added missing keywords to target job description audit matrices.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-[#49454F] shrink-0 font-semibold">Recently updated</span>
            </div>

            <div className="py-3 flex justify-between items-center gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#7D5260]/10 flex items-center justify-center text-[#7D5260] shrink-0 mt-0.5">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-[#1C1B1F] block">LinkedIn scheduled post configured</span>
                  <p className="text-[11px] text-[#49454F] leading-normal">
                    Post regarding React compiler features scheduled for Tuesday morning.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-[#49454F] shrink-0 font-semibold">Yesterday</span>
            </div>

            <div className="py-3 flex justify-between items-center gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] shrink-0 mt-0.5">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-[#1C1B1F] block">LinkedIn Profile scan generated</span>
                  <p className="text-[11px] text-[#49454F] leading-normal">
                    Analyzed bio structure; recommended highlighting Staff engineer experiences.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-[#49454F] shrink-0 font-semibold">2 days ago</span>
            </div>

          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E7E0EC]/60 pb-3">
            <Sparkles className="w-4.5 h-4.5 text-[#6750A4] animate-pulse" />
            <h3 className="font-bold text-sm text-[#1C1B1F]">AI Optimization Tasks</h3>
          </div>

          <div className="space-y-3.5 text-xs text-left">
            
            <div className="p-3 bg-[#E7E0EC]/40 border border-[#E7E0EC] rounded-xl space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-[#1C1B1F] text-[11px] leading-tight">Missing Keyword Detect</span>
                <span className="px-1.5 py-0.5 bg-[#EF4444]/10 text-[#EF4444] text-[9px] font-extrabold rounded-md">Critical</span>
              </div>
              <p className="text-[11px] text-[#49454F] leading-normal">
                Some target position skills are missing from your experience text.
              </p>
              <button
                onClick={() => setActiveTab('resume-analyzer')}
                className="text-[10px] text-[#6750A4] font-bold hover:underline flex items-center gap-1 active:scale-95"
              >
                <span>Fix in Resume Workspace</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-[#E7E0EC]/40 border border-[#E7E0EC] rounded-xl space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-[#1C1B1F] text-[11px] leading-tight">LinkedIn Engagement Tips</span>
                <span className="px-1.5 py-0.5 bg-[#6750A4]/10 text-[#6750A4] text-[9px] font-extrabold rounded-md">Suggested</span>
              </div>
              <p className="text-[11px] text-[#49454F] leading-normal">
                You haven't posted in 5 days. Draft a short update to maintain impressions momentum.
              </p>
              <button
                onClick={() => setActiveTab('linkedin-generator')}
                className="text-[10px] text-[#6750A4] font-bold hover:underline flex items-center gap-1 active:scale-95"
              >
                <span>Draft LinkedIn Post</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

