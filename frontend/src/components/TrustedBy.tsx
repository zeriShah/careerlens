import { Sparkles, Cpu, Linkedin, CheckCircle } from 'lucide-react';

export default function TrustedBy() {
  return (
    <section id="about" className="py-20 bg-[#F3EDF7] border-y border-[#E7E0EC] px-6 relative overflow-hidden">
      {/* Subtle organic background decoration */}
      <div className="absolute top-1/2 left-1/4 w-[250px] h-[250px] rounded-full bg-[#6750A4]/5 blur-[60px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Mission and Product definition */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6750A4]/10 border border-[#6750A4]/20 rounded-full text-[10px] font-bold text-[#6750A4] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
            About Our Platform
          </div>
          
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#1C1B1F] tracking-tight leading-tight">
            Bridging the Gap Between Your Resume and LinkedIn
          </h2>
          
          <p className="text-[#49454F] text-sm sm:text-base leading-relaxed">
            Profiling is a next-generation personal branding platform designed for high-performance careers. We believe that your professional story shouldn't be fragmented between offline documents and online profiles.
          </p>

          <p className="text-[#49454F] text-sm sm:text-base leading-relaxed">
            Our platform serves as a smart, continuous synchronization layer. We analyze your experience text, audit keyword compatibility against target positions, and automate structured updates to your LinkedIn profile—ensuring you present a unified, recruiter-ready profile to the market.
          </p>

          <div className="pt-2">
            <a
              href="#preview"
              className="inline-flex items-center justify-center bg-transparent border border-[#79747E] hover:bg-[#6750A4]/8 text-[#6750A4] font-bold text-xs px-5 py-3 rounded-full transition-all duration-200 active:scale-95"
            >
              See the Sync Engine
            </a>
          </div>
        </div>

        {/* Right Column: Key Value Proposition Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Sync Engine */}
          <div className="bg-white border border-[#E7E0EC] rounded-2xl p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:scale-[1.01] text-left space-y-3">
            <div className="w-9 h-9 rounded-full bg-[#6750A4]/10 flex items-center justify-center text-[#6750A4]">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#1C1B1F]">Unified Sync Engine</h4>
            <p className="text-[11px] text-[#49454F] leading-relaxed">
              Connect your offline documents with your online brand. Write optimizations in your workspace and push them instantly.
            </p>
          </div>

          {/* Card 2: LinkedIn Impact */}
          <div className="bg-white border border-[#E7E0EC] rounded-2xl p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:scale-[1.01] text-left space-y-3">
            <div className="w-9 h-9 rounded-full bg-[#E8DEF8] flex items-center justify-center text-[#1D192B]">
              <Linkedin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#1C1B1F]">LinkedIn Optimizations</h4>
            <p className="text-[11px] text-[#49454F] leading-relaxed">
              Draft targeted posts, sync headlines, and track profile impressions systematically through clean integration interfaces.
            </p>
          </div>

          {/* Card 3: ATS Auditing */}
          <div className="bg-white border border-[#E7E0EC] rounded-2xl p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:scale-[1.01] text-left space-y-3 sm:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#1C1B1F]">Keyword Compatibility Check</h4>
            </div>
            <p className="text-[11px] text-[#49454F] leading-relaxed">
              Scan your resume text against target job descriptions. Our parser detects key gaps, scores compatibility, and highlights items to optimize your profile ranking.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
