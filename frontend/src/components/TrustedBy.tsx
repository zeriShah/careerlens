import { Search, Sliders, RefreshCw, ArrowRight, Sparkles } from 'lucide-react';

export default function TrustedBy() {
  return (
    <section id="about" className="py-14 md:py-18 bg-[#FFFBFE] border-y border-[#E7E0EC] px-6 relative overflow-hidden">
      
      {/* Styles for Custom Micro-Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes miniScan {
          0% { top: 10%; opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { top: 90%; opacity: 0.2; }
        }
        @keyframes subtleRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .group:hover .animate-mini-scan {
          animation: miniScan 2s linear infinite;
        }
        .group:hover .animate-subtle-rotate {
          animation: subtleRotate 8s linear infinite;
        }
        .group:hover .animate-subtle-pulse {
          animation: subtlePulse 1.5s ease-in-out infinite;
        }
      `}} />

      {/* Decorative Blur Backglows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#6750A4]/5 blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Concise Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6750A4]/10 border border-[#6750A4]/20 rounded-full text-[10px] font-bold text-[#6750A4] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Core Philosophy
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1C1B1F] tracking-tight">
            One Story. Two Profiles. Zero Mismatch.
          </h2>
          <p className="text-[#49454F] text-sm md:text-base leading-relaxed">
            Recruiters audit your resume. Hiring managers check your LinkedIn. If your skills, titles, or metrics don't align, you get rejected. <strong>Profiling</strong> synchronizes your professional presence in three steps.
          </p>
        </div>

        {/* 3-Step Interactive Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Connector Arrows (Desktop only) */}
          <div className="hidden md:block absolute top-[45px] left-[29%] w-[8%] h-0.5 border-t-2 border-dashed border-[#E7E0EC] z-0" />
          <div className="hidden md:block absolute top-[45px] left-[63%] w-[8%] h-0.5 border-t-2 border-dashed border-[#E7E0EC] z-0" />

          {/* Step 1: Auditing */}
          <div className="group bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-[#F3EDF7]/90 text-left relative z-10">
            {/* Animated scan indicator */}
            <div className="absolute right-4 top-4 w-12 h-16 border border-[#6750A4]/10 rounded bg-[#FFFBFE]/40 hidden group-hover:block overflow-hidden pointer-events-none">
              <div className="absolute left-0 right-0 h-0.5 bg-[#6750A4] shadow-[0_0_6px_#6750A4] animate-mini-scan" />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#FFFBFE] shadow-xs border border-[#E7E0EC] flex items-center justify-center text-[#6750A4] shrink-0">
                <Search className="w-5 h-5 animate-subtle-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#6750A4]/75 uppercase tracking-wider block">Step 01</span>
                <h4 className="font-bold text-sm text-[#1C1B1F]">ATS Auditing</h4>
              </div>
            </div>
            <p className="text-[11px] text-[#49454F] leading-relaxed">
              Upload your resume and enter your target role. Our engine scans for critical ATS keyword gaps, formatting issues, and compliance scores.
            </p>
          </div>

          {/* Step 2: Optimizing */}
          <div className="group bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-[#F3EDF7]/90 text-left relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#FFFBFE] shadow-xs border border-[#E7E0EC] flex items-center justify-center text-[#6750A4] shrink-0">
                <Sliders className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#6750A4]/75 uppercase tracking-wider block">Step 02</span>
                <h4 className="font-bold text-sm text-[#1C1B1F]">STAR Formatting</h4>
              </div>
            </div>
            <p className="text-[11px] text-[#49454F] leading-relaxed">
              Revamp weak resume bullet points. Align experiences with the STAR method (Situation, Task, Action, Result) to maximize score density.
            </p>
          </div>

          {/* Step 3: Syncing */}
          <div className="group bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-[#F3EDF7]/90 text-left relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#FFFBFE] shadow-xs border border-[#E7E0EC] flex items-center justify-center text-[#6750A4] shrink-0">
                <RefreshCw className="w-5 h-5 animate-subtle-rotate" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#6750A4]/75 uppercase tracking-wider block">Step 03</span>
                <h4 className="font-bold text-sm text-[#1C1B1F]">LinkedIn Sync</h4>
              </div>
            </div>
            <p className="text-[11px] text-[#49454F] leading-relaxed">
              Deploy polished bio segments and updates directly to your LinkedIn profile. Maintain keyword alignment and engagement schedules effortlessly.
            </p>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="pt-2 flex justify-center">
          <a
            href="#preview"
            className="inline-flex items-center gap-2 bg-transparent border border-[#79747E] hover:bg-[#6750A4]/8 text-[#6750A4] font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-xs"
          >
            <span>See the platform in action</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
