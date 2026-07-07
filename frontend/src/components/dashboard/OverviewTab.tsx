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
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Workspace Panel</span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Welcome back, {currentUser.fullName.split(' ')[0]}!
          </h2>
          <p className="text-xs text-slate-500">
            Your AI Career workspace has updated analysis matrices. Ensure your resume and LinkedIn keywords are synced.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('resume-analyzer')}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Upload New Resume
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Resume Overview Widget Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between gap-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-primary" />
                <h3 className="font-bold text-sm text-slate-900">Resume Intelligence</h3>
              </div>
              <p className="text-xs text-slate-400 block">
                Current Status: <span className="font-semibold text-slate-700">{analysisResult ? 'CV Scanned & Cached' : 'No CV Uploaded'}</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600">
              <Clock className="w-3.5 h-3.5" />
              <span>Cached Locally</span>
            </div>
          </div>

          {/* Circular ATS Score Graph */}
          <div className="flex items-center gap-6 py-2 bg-slate-50/50 p-4 rounded-lg border border-slate-100">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" className="stroke-slate-200 fill-none" strokeWidth="4.5" />
                <circle cx="32" cy="32" r="28" className={`${analysisResult && analysisResult.ats_score >= 75 ? 'stroke-success' : 'stroke-blue-600'} fill-none`} strokeWidth="4.5" strokeDasharray="175.9" strokeDashoffset={dashOffset} strokeLinecap="round" />
              </svg>
              <span className="absolute font-sans font-extrabold text-sm text-slate-800">{analysisResult ? `${analysisResult.ats_score}%` : '0%'}</span>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900 block">
                {analysisResult 
                  ? (analysisResult.ats_score >= 75 ? 'Excellent ATS compatibility' : 'Moderate ATS compatibility')
                  : 'No Active Resume Audit'}
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {analysisResult
                  ? `Keyword optimizations align with ${analysisResult.jd_title} job requirements.`
                  : 'Upload your CV and target positions to evaluate and audit formatting alignment.'}
              </p>
            </div>
          </div>

          {/* Metrics Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-100 rounded-lg p-3">
              <span className="text-slate-400 block mb-0.5 text-[10px] font-semibold">Active job matches</span>
              <span className="font-extrabold text-lg text-slate-800 tracking-tight">
                {listingsCount}
              </span>
            </div>
            <div className="border border-slate-100 rounded-lg p-3">
              <span className="text-slate-400 block mb-0.5 text-[10px] font-semibold">Key feedback points</span>
              <span className="font-extrabold text-lg text-slate-800 tracking-tight">
                {feedbackCount}
              </span>
            </div>
          </div>

          {/* Go to Analyzer Link */}
          <button
            onClick={() => setActiveTab('resume-analyzer')}
            className="w-full text-center py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
          >
            <span>{analysisResult ? 'View CV feedback details' : 'Audit your resume now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* LinkedIn Overview Widget Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between gap-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4.5 h-4.5 text-primary" />
                <h3 className="font-bold text-sm text-slate-900">LinkedIn Workspace</h3>
              </div>
              <p className="text-xs text-slate-400 block">
                Sync account: <span className="font-semibold text-slate-700">{currentUser.fullName}</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-success/15 rounded text-[10px] font-bold text-success">
              <span className="w-1 h-1 rounded-full bg-success" />
              Synced
            </span>
          </div>

          {/* Mini Sparkline Graph */}
          <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Weekly profile impressions</span>
                <span className="font-extrabold text-lg text-slate-800 tracking-tight">4,820</span>
              </div>
              <span className="text-[10px] font-bold text-success bg-success/15 px-2 py-0.5 rounded">
                +12.4%
              </span>
            </div>
            
            <div className="w-full h-8 pt-2">
              <svg className="w-full h-full overflow-visible">
                <path
                  d="M0,25 Q15,10 30,28 T60,5 T90,20 T120,3 T150,15 T180,8 T210,18 T240,12 T270,26 T300,4 T330,12 T360,18 T390,6 T420,2"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Metrics Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-100 rounded-lg p-3">
              <span className="text-slate-400 block mb-0.5 text-[10px] font-semibold">Scheduled posts</span>
              <span className="font-extrabold text-lg text-slate-800 tracking-tight">2 Active</span>
            </div>
            <div className="border border-slate-100 rounded-lg p-3">
              <span className="text-slate-400 block mb-0.5 text-[10px] font-semibold">Followers grow</span>
              <span className="font-extrabold text-lg text-slate-800 tracking-tight">+84 new</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('linkedin-enhancer')}
            className="w-full text-center py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
          >
            <span>Manage scheduled updates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Activity Log and AI Suggestions side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <History className="w-4.5 h-4.5 text-slate-500" />
            <h3 className="font-bold text-sm text-slate-900">Recent Workspace Activity</h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            
            <div className="py-3 flex justify-between items-center gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 block">Resume upload optimized</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Added missing keywords to target job description audit matrices.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-medium">Recently updated</span>
            </div>

            <div className="py-3 flex justify-between items-center gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0 mt-0.5">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 block">LinkedIn scheduled post configured</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Post regarding React compiler features scheduled for Tuesday morning.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-medium">Yesterday</span>
            </div>

            <div className="py-3 flex justify-between items-center gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-success/10 flex items-center justify-center text-success shrink-0 mt-0.5">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 block">LinkedIn Profile scan generated</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Analyzed bio structure; recommended highlighting Staff engineer experiences.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-medium">2 days ago</span>
            </div>

          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4.5 h-4.5 text-primary animate-pulse" />
            <h3 className="font-bold text-sm text-slate-900">AI Optimization Tasks</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-slate-800 text-[11px] leading-tight">Missing Keyword Detect</span>
                <span className="px-1.5 py-0.5 bg-danger/10 text-danger text-[9px] font-extrabold rounded">Critical</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Some target position skills are missing from your experience text.
              </p>
              <button
                onClick={() => setActiveTab('resume-feedback')}
                className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1"
              >
                <span>Fix in Resume Workspace</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-slate-800 text-[11px] leading-tight">LinkedIn Engagement Tips</span>
                <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[9px] font-extrabold rounded">Suggested</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                You haven't posted in 5 days. Draft a short update to maintain impressions momentum.
              </p>
              <button
                onClick={() => setActiveTab('linkedin-generator')}
                className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1"
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
