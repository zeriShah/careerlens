import { ArrowRight, Play, CheckCircle, TrendingUp, Sparkles, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24 px-6 bg-background">
      {/* Subtle Background Accent Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Text Column */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Career Copilot
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-[44px] xl:text-[52px] leading-tight tracking-tight text-text-primary mb-6">
            Optimize Your <br />
            <span className="text-primary">Career with AI</span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary mb-8 leading-relaxed max-w-lg">
            CareerLens helps professionals analyze resumes, optimize LinkedIn profiles, create AI-powered content, and grow their careers from one intelligent platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/register')}
              className="bg-primary text-white hover:bg-primary-hover font-medium text-sm px-6 py-3.5 rounded-lg shadow-subtle transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98] w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white border border-border hover:bg-black/5 text-text-primary font-medium text-sm px-6 py-3.5 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 w-full sm:w-auto">
              <Play className="w-4 h-4 text-text-secondary fill-text-secondary" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Dashboard Mockup Column */}
        <div className="lg:col-span-7 w-full">
          {/* Main Browser Mockup Container */}
          <div className="w-full bg-white border border-border rounded-lg shadow-xl overflow-hidden animate-fade-in-up duration-300">
            {/* Header / Title Bar */}
            <div className="bg-slate-50 border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-danger/60" />
                <span className="w-3 h-3 rounded-full bg-warning/60" />
                <span className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="text-xs text-text-secondary font-medium bg-white px-6 py-1 rounded-md border border-border/60">
                app.careerlens.io/dashboard
              </div>
              <div className="w-12" />
            </div>

            {/* Mockup Dashboard Content */}
            <div className="p-6 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* 1. Resume Score Card */}
              <div className="bg-white p-4 border border-border rounded-lg shadow-subtle flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Resume Score</span>
                  <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full font-medium">ATS Approved</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <div className="relative flex items-center justify-center">
                    {/* SVG Radial Progress */}
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                      <circle cx="32" cy="32" r="28" stroke="#2563EB" strokeWidth="6" fill="transparent" strokeDasharray="175.9" strokeDashoffset="31.6" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-sm font-bold text-text-primary">82%</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-text-primary">Resume Optimized</span>
                    <span className="text-xs text-text-secondary">Ready to apply to 12 target roles</span>
                  </div>
                </div>
                <div className="border-t border-border pt-3 mt-2 flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    Keywords matched: 8/10
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                    Add: React Query experience
                  </div>
                </div>
              </div>

              {/* 2. LinkedIn Overview Card */}
              <div className="bg-white p-4 border border-border rounded-lg shadow-subtle flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">LinkedIn Analytics</span>
                  <span className="text-[11px] text-text-secondary bg-slate-100 px-2 py-0.5 rounded font-medium">7 Days</span>
                </div>
                <div>
                  <span className="text-xs text-text-secondary">Total Impressions</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold text-text-primary">14.2K</span>
                    <span className="text-xs text-success font-medium flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      +18.4%
                    </span>
                  </div>
                </div>
                {/* SVG Sparkline */}
                <div className="h-10 w-full mt-2">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d="M0,25 Q15,22 30,18 T60,10 T90,5 L100,2"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,25 Q15,22 30,18 T60,10 T90,5 L100,2 L100,30 L0,30 Z"
                      fill="url(#sparkline-grad)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="text-[10px] text-text-secondary text-left mt-2">
                  Engagement rate is up 4.2% since post optimization
                </div>
              </div>

              {/* 3. AI Suggestions Card */}
              <div className="bg-white p-4 border border-border rounded-lg shadow-subtle text-left flex flex-col justify-between">
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">AI Optimization Tasks</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-text-primary">Update Profile Headline</span>
                      <span className="text-[10px] text-text-secondary">Matches top recruiter search queries</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border-2 border-border shrink-0 mt-0.5 flex items-center justify-center" />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-text-primary">Format Experience Section</span>
                      <span className="text-[10px] text-text-secondary">Standardize achievements into bullet points</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border-2 border-border shrink-0 mt-0.5 flex items-center justify-center" />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-text-primary">Publish Trend Analysis Post</span>
                      <span className="text-[10px] text-text-secondary">Ready to post on LinkedIn Workspace</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Content Calendar Card */}
              <div className="bg-white p-4 border border-border rounded-lg shadow-subtle text-left flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-text-secondary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Content Schedule</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-text-secondary px-1.5 py-0.5 rounded font-semibold">Weekly</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-slate-50 border border-border/60 p-2 rounded flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-text-secondary block">MON 09:00 AM</span>
                      <span className="text-xs font-medium text-text-primary">Building in Public: React Router v7</span>
                    </div>
                    <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded font-medium">Ready</span>
                  </div>
                  <div className="bg-slate-50 border border-border/60 p-2 rounded flex items-center justify-between opacity-70">
                    <div>
                      <span className="text-[10px] font-bold text-text-secondary block">WED 02:30 PM</span>
                      <span className="text-xs font-medium text-text-primary">ATS Optimization Strategies</span>
                    </div>
                    <span className="text-[10px] text-text-secondary bg-slate-200 px-1.5 py-0.5 rounded font-medium">Draft</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
