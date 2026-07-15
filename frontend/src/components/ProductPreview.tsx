import { useState, useEffect } from 'react';
import { FileText, Linkedin, Sparkles, CheckCircle, ArrowRight, Cpu } from 'lucide-react';

export default function ProductPreview() {
  const [atsScore, setAtsScore] = useState(72);
  const [impressions, setImpressions] = useState(8420);

  // Continually animate metrics for live feel
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setAtsScore(prev => {
        if (prev >= 94) return 72;
        return prev + 1;
      });
    }, 800);

    const impressionsInterval = setInterval(() => {
      setImpressions(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 1500);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(impressionsInterval);
    };
  }, []);

  return (
    <section id="preview" className="py-14 md:py-20 px-6 bg-white border-b border-[#EBEBEB]">
      
      {/* Styles for continuous keyframe animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanBeam {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { top: 98%; opacity: 0; }
        }
        @keyframes flowingStream {
          0% { stroke-dashoffset: 30; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        .animate-scan-beam {
          animation: scanBeam 3.5s ease-in-out infinite;
        }
        .animate-flow-stream {
          stroke-dasharray: 6, 4;
          animation: flowingStream 1.2s linear infinite;
        }
        .animate-pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#0E9E48] tracking-wider uppercase bg-[#1DB954]/10 px-3 py-1 rounded-full border border-[#1DB954]/20">
            Platform Demo
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#121212] mt-4 mb-4 tracking-tight">
            See the Profile Sync Engine in Action
          </h2>
          <p className="text-[#5B5B5B] text-base sm:text-lg leading-relaxed">
            Profiling connects your offline documents with your online presence. Watch our live scanner audit keywords and update your LinkedIn profile continuously.
          </p>
        </div>

        {/* Outer Interface Frame */}
        <div className="mx-auto max-w-5xl bg-white border border-[#EBEBEB] rounded-2xl p-4 md:p-8 shadow-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#dcdcdc_1px,transparent_1px)] [background-size:20px_20px] opacity-35 pointer-events-none" />

          {/* Sync Engine Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: The Resume Scanner (Light Theme card) */}
            <div className="lg:col-span-5 bg-[#FBFBFB] border border-[#EBEBEB] rounded-xl p-5 shadow-sm relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              
              {/* Animated scan beam line */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1DB954] to-transparent shadow-[0_0_10px_#1DB954] animate-scan-beam" />
              
              {/* Resume Header */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#1DB954]" />
                    <span className="font-bold text-xs text-[#121212] uppercase tracking-wide">Resume Parser</span>
                  </div>
                  <span className="text-[10px] text-[#0E9E48] bg-[#1DB954]/10 border border-[#1DB954]/20 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                    Live Score: {atsScore}%
                  </span>
                </div>

                <div className="space-y-4 text-left">
                  {/* Dummy Resume Details */}
                  <div className="space-y-1">
                    <h4 className="font-black text-sm text-[#121212] leading-tight">Alex Mercer</h4>
                    <p className="text-[10px] text-[#5B5B5B]">Senior Software Engineer · San Francisco, CA</p>
                  </div>

                  <hr className="border-[#EBEBEB]" />

                  {/* Experience Section */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-[#5B5B5B] uppercase tracking-wider block">Professional Experience</span>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-[#121212]">Software Engineer III @ Vercel</span>
                        <span className="text-[#5B5B5B]">2024 - Present</span>
                      </div>
                      <p className="text-[9px] text-[#5B5B5B] leading-normal">
                        Spearheaded developer relations tools and build systems optimization. 
                        Integrated TypeScript strict validation checks to reduce pipeline failures.
                      </p>
                      {/* Live scanned keyword badge pointer */}
                      <span className="inline-flex items-center gap-1 text-[8px] font-semibold text-[#0E9E48] bg-[#1DB954]/10 px-1.5 py-0.5 rounded border border-[#1DB954]/20 mt-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Scanned: TypeScript & Build Systems detected
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bullet optimization panel */}
              <div className="mt-4 pt-3 border-t border-[#EBEBEB] space-y-2 text-left">
                <span className="text-[9px] font-bold text-[#5B5B5B] uppercase tracking-wider block">AI Formatting Suggestions</span>
                <div className="p-2 bg-white rounded border border-[#EBEBEB] text-[9px] text-[#5B5B5B] flex items-start gap-2 shadow-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1DB954] shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="font-bold text-[#121212] block">STAR Formula Match</span>
                    <span>Action verb "Spearheaded" has strong metric density compatibility.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Middle Column: Visual Connector & Flow indicators */}
            <div className="lg:col-span-2 flex lg:flex-col justify-center items-center gap-2 h-12 lg:h-full py-4 lg:py-0">
              
              {/* CPU Center processing hub */}
              <div className="w-10 h-10 rounded-xl bg-[#121212] text-white border border-[#282828] shadow-md flex items-center justify-center relative shrink-0">
                <Cpu className="w-5 h-5 text-[#1DB954] animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#1DB954] animate-ping" />
              </div>

              {/* Connecting Line (Desktop) */}
              <div className="hidden lg:block w-px h-28 relative">
                <svg className="h-full w-full absolute left-1/2 -translate-x-1/2 overflow-visible">
                  <line x1="0" y1="0" x2="0" y2="110" stroke="url(#line-grad-preview)" strokeWidth="2.5" strokeDasharray="6,4" className="animate-flow-stream" />
                  <defs>
                    <linearGradient id="line-grad-preview" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1DB954" />
                      <stop offset="100%" stopColor="#121212" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Desktop horizontal flow arrow */}
              <div className="hidden lg:block text-[#5B5B5B] text-[10px] font-bold uppercase tracking-widest text-center rotate-90 my-2">
                Syncing
              </div>

            </div>

            {/* Right Column: The LinkedIn Dashboard (Dark Theme card) */}
            <div className="lg:col-span-5 bg-[#121212] border border-[#282828] rounded-xl p-5 shadow-sm relative min-h-[380px] flex flex-col justify-between text-white">
              
              {/* LinkedIn Header */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-[#1DB954]" />
                    <span className="font-bold text-xs text-neutral-400 uppercase tracking-wide">LinkedIn Sync Panel</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    Connected
                  </span>
                </div>

                {/* Dummy LinkedIn Profile details */}
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-[#1DB954] text-sm">
                      A
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">Alex Mercer</h4>
                      <p className="text-[9px] text-neutral-500">Staff Engineer @ Vercel | TypeScript Architect</p>
                    </div>
                  </div>

                  <hr className="border-neutral-800" />

                  {/* impressions dynamic stats */}
                  <div className="p-3 bg-neutral-950/60 border border-neutral-800/80 rounded-lg space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <div>
                        <span className="text-neutral-500 text-[8px] uppercase tracking-wider block font-bold">Total Profile Impressions</span>
                        <span className="text-base font-extrabold text-white tracking-tight">{impressions.toLocaleString()}</span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                        +14.2% growth
                      </span>
                    </div>

                    {/* Sparkline chart updating in real time */}
                    <div className="w-full h-8 pt-1">
                      <svg className="w-full h-full overflow-visible">
                        <path
                          d="M0,22 Q15,12 30,25 T60,8 T90,18 T120,4 T150,14 T180,9 T210,18 T240,11 T270,22 T300,5"
                          fill="none"
                          stroke="url(#sparkline-grad-preview)"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="sparkline-grad-preview" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1DB954" />
                            <stop offset="100%" stopColor="#121212" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheduled post list block */}
              <div className="mt-4 pt-3 border-t border-neutral-800 space-y-2 text-left">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Active Scheduled Updates</span>
                <div className="p-2.5 bg-neutral-950/40 rounded border border-neutral-800 text-[9px] text-neutral-400 space-y-1">
                  <div className="flex justify-between items-center text-[8px]">
                    <span className="font-bold text-white uppercase tracking-wider">Scheduled Post Draft</span>
                    <span className="text-primary font-bold">Tues 9:00 AM</span>
                  </div>
                  <p className="text-[9px] leading-relaxed italic text-neutral-500">
                    "Just deployed TypeScript strict configs inside our monorepo. Saved 14 developer hours of type compilation failures..."
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Connect CTA Info Card */}
          <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
            <div className="flex items-center gap-2 text-left">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <p className="text-xs text-text-secondary font-medium">
                No chrome extension required. All profile synchronizations process directly through UniPile integrations.
              </p>
            </div>
            <a
              href="/register"
              className="text-xs font-bold text-primary hover:text-primary-hover transition-colors flex items-center gap-1 bg-primary/10 border border-primary/20 hover:bg-primary/15 px-3.5 py-2 rounded-lg"
            >
              <span>Build your synchronized profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
