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
      <div className="bg-[#FFFFFF] border border-[#EBEBEB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
        {/* Top-edge decorative brand line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1DB954]" />
        
        <div className="space-y-1 relative z-10 text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1DB954]/10 rounded-full text-[10px] font-bold text-[#0E9E48] uppercase tracking-wider border border-[#1DB954]/20">
            Workspace Panel
          </span>
          <h2 className="text-xl font-extrabold text-[#121212] tracking-tight leading-tight pt-1 font-sans">
            Welcome back, {currentUser.fullName.split(' ')[0]}!
          </h2>
          <p className="text-xs text-[#5B5B5B]">
            Your AI Career workspace has updated analysis matrices. Ensure your resume and LinkedIn keywords are synced.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('resume-analyzer')}
          className="px-5 py-3 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-1.5 shrink-0 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Upload New Resume
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Resume Overview Widget Card */}
        <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 shadow-xs flex flex-col justify-between gap-5 transition-all hover:scale-[1.01] hover:shadow-md">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#1DB954]" />
                <h3 className="font-extrabold text-sm text-[#121212]">Résumé Intelligence</h3>
              </div>
              <p className="text-xs text-[#5B5B5B] block">
                Current Status: <span className="font-bold text-[#121212]">{analysisResult ? 'CV Scanned & Cached' : 'No CV Uploaded'}</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F3F3F3] rounded-full text-[9px] font-bold text-[#5B5B5B]">
              <Clock className="w-3.5 h-3.5 text-[#5B5B5B]/80" />
              <span>Cached Locally</span>
            </div>
          </div>

          {/* Circular ATS Score Graph */}
          <div className="flex items-center gap-6 py-2 bg-[#F9F9F9] p-4 rounded-xl border border-[#EBEBEB] text-left">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" className="stroke-[#EBEBEB] fill-none" strokeWidth="4.5" />
                <circle cx="32" cy="32" r="28" className="stroke-[#1DB954] fill-none" strokeWidth="4.5" strokeDasharray="175.9" strokeDashoffset={dashOffset} strokeLinecap="round" />
              </svg>
              <span className="absolute font-sans font-extrabold text-sm text-[#121212]">{analysisResult ? `${analysisResult.ats_score}%` : '0%'}</span>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#121212] block">
                {analysisResult 
                  ? (analysisResult.ats_score >= 75 ? 'Excellent ATS compatibility' : 'Moderate ATS compatibility')
                  : 'No Active Resume Audit'}
              </span>
              <p className="text-[11px] text-[#5B5B5B] leading-relaxed">
                {analysisResult
                  ? `Keyword optimizations align with ${analysisResult.jd_title} job requirements.`
                  : 'Upload your CV and target positions to evaluate and audit formatting alignment.'}
              </p>
            </div>
          </div>

          {/* Metrics Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border border-[#EBEBEB] rounded-xl p-3.5 text-left bg-[#F9F9F9]">
              <span className="text-[#5B5B5B] block mb-0.5 text-[9px] font-bold uppercase tracking-wider">Active job matches</span>
              <span className="font-extrabold text-lg text-[#121212] tracking-tight">
                {listingsCount}
              </span>
            </div>
            <div className="border border-[#EBEBEB] rounded-xl p-3.5 text-left bg-[#F9F9F9]">
              <span className="text-[#5B5B5B] block mb-0.5 text-[9px] font-bold uppercase tracking-wider">Key feedback points</span>
              <span className="font-extrabold text-lg text-[#121212] tracking-tight">
                {feedbackCount}
              </span>
            </div>
          </div>

          {/* Go to Analyzer Link */}
          <button
            onClick={() => setActiveTab('resume-analyzer')}
            className="w-full text-center py-2.5 bg-[#F3F3F3] hover:bg-[#EBEBEB] rounded-full text-xs font-bold text-[#121212] transition-all flex items-center justify-center gap-1.5 border border-[#EBEBEB] active:scale-95"
          >
            <span>{analysisResult ? 'View CV feedback details' : 'Audit your resume now'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#5B5B5B]" />
          </button>
        </div>

        {/* LinkedIn Overview Widget Card */}
        <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 shadow-xs flex flex-col justify-between gap-5 transition-all hover:scale-[1.01] hover:shadow-md">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4.5 h-4.5 text-[#1DB954]" />
                <h3 className="font-extrabold text-sm text-[#121212]">LinkedIn Workspace</h3>
              </div>
              <p className="text-xs text-[#5B5B5B] block">
                Sync account: <span className="font-bold text-[#121212]">{currentUser.fullName}</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1DB954]/10 rounded-full text-[9px] font-bold text-[#0E9E48] border border-[#1DB954]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
              Synced
            </span>
          </div>

          {/* Mini Sparkline Graph */}
          <div className="bg-[#F9F9F9] p-4 rounded-xl border border-[#EBEBEB] space-y-2">
            <div className="flex justify-between items-center text-xs text-left">
              <div>
                <span className="text-[10px] font-bold text-[#5B5B5B] uppercase tracking-wider block">Weekly profile impressions</span>
                <span className="font-extrabold text-lg text-[#121212] tracking-tight">4,820</span>
              </div>
              <span className="text-[9px] font-bold text-[#0E9E48] bg-[#1DB954]/10 px-2.5 py-0.5 rounded-full border border-[#1DB954]/20">
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
                    <stop offset="0%" stopColor="#1DB954" />
                    <stop offset="100%" stopColor="#121212" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Metrics Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border border-[#EBEBEB] rounded-xl p-3.5 text-left bg-[#F9F9F9]">
              <span className="text-[#5B5B5B] block mb-0.5 text-[9px] font-bold uppercase tracking-wider">Scheduled posts</span>
              <span className="font-extrabold text-lg text-[#121212] tracking-tight">2 Active</span>
            </div>
            <div className="border border-[#EBEBEB] rounded-xl p-3.5 text-left bg-[#F9F9F9]">
              <span className="text-[#5B5B5B] block mb-0.5 text-[9px] font-bold uppercase tracking-wider">Followers grow</span>
              <span className="font-extrabold text-lg text-[#121212] tracking-tight">+84 new</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('linkedin-enhancer')}
            className="w-full text-center py-2.5 bg-[#F3F3F3] hover:bg-[#EBEBEB] rounded-full text-xs font-bold text-[#121212] transition-all flex items-center justify-center gap-1.5 border border-[#EBEBEB] active:scale-95"
          >
            <span>Manage scheduled updates</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#5B5B5B]" />
          </button>
        </div>

      </div>

      {/* Activity Log and AI Suggestions side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-[#EBEBEB] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F0F0F0] pb-3 text-left">
            <History className="w-4.5 h-4.5 text-[#5B5B5B]" />
            <h3 className="font-extrabold text-sm text-[#121212]">Recent Workspace Activity</h3>
          </div>

          <div className="divide-y divide-[#F0F0F0] text-xs">
            
            <div className="py-3 flex justify-between items-center gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1DB954]/10 flex items-center justify-center text-[#0E9E48] shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-[#121212] block">Resume upload optimized</span>
                  <p className="text-[11px] text-[#5B5B5B] leading-normal">
                    Added missing keywords to target job description audit matrices.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-[#5B5B5B] shrink-0 font-semibold">Recently updated</span>
            </div>

            <div className="py-3 flex justify-between items-center gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#121212]/10 flex items-center justify-center text-[#121212] shrink-0 mt-0.5">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-[#121212] block">LinkedIn scheduled post configured</span>
                  <p className="text-[11px] text-[#5B5B5B] leading-normal">
                    Post regarding React compiler features scheduled for Tuesday morning.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-[#5B5B5B] shrink-0 font-semibold">Yesterday</span>
            </div>

            <div className="py-3 flex justify-between items-center gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1DB954]/15 flex items-center justify-center text-[#0E9E48] shrink-0 mt-0.5">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-[#121212] block">LinkedIn Profile scan generated</span>
                  <p className="text-[11px] text-[#5B5B5B] leading-normal">
                    Analyzed bio structure; recommended highlighting Staff engineer experiences.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-[#5B5B5B] shrink-0 font-semibold">2 days ago</span>
            </div>

          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F0F0F0] pb-3 text-left">
            <Sparkles className="w-4.5 h-4.5 text-[#1DB954] animate-pulse" />
            <h3 className="font-extrabold text-sm text-[#121212]">AI Optimization Tasks</h3>
          </div>

          <div className="space-y-3.5 text-xs text-left">
            
            <div className="p-3 bg-[#F9F9F9] border border-[#EBEBEB] rounded-xl space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-[#121212] text-[11px] leading-tight">Missing Keyword Detect</span>
                <span className="px-1.5 py-0.5 bg-[#E22134]/10 text-[#E22134] text-[9px] font-extrabold rounded-md">Critical</span>
              </div>
              <p className="text-[11px] text-[#5B5B5B] leading-normal">
                Some target position skills are missing from your experience text.
              </p>
              <button
                onClick={() => setActiveTab('resume-analyzer')}
                className="text-[10px] text-[#1DB954] font-bold hover:underline flex items-center gap-1 active:scale-95"
              >
                <span>Fix in Resume Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 bg-[#F9F9F9] border border-[#EBEBEB] rounded-xl space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-[#121212] text-[11px] leading-tight">LinkedIn Engagement Tips</span>
                <span className="px-1.5 py-0.5 bg-[#1DB954]/10 text-[#0E9E48] text-[9px] font-extrabold rounded-md">Suggested</span>
              </div>
              <p className="text-[11px] text-[#5B5B5B] leading-normal">
                You haven't posted in 5 days. Draft a short update to maintain impressions momentum.
              </p>
              <button
                onClick={() => setActiveTab('linkedin-generator')}
                className="text-[10px] text-[#1DB954] font-bold hover:underline flex items-center gap-1 active:scale-95"
              >
                <span>Draft LinkedIn Post</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

