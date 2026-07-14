import { Layers, Triangle, Compass, Activity, Cpu, Zap, TrendingUp, GitBranch } from 'lucide-react';

export default function TrustedBy() {
  const brands = [
    { name: 'VELOCITY', icon: Layers, color: 'text-emerald-500' },
    { name: 'PRISM', icon: Triangle, color: 'text-blue-500' },
    { name: 'ORBIT', icon: Compass, color: 'text-amber-500' },
    { name: 'NEXUS', icon: Activity, color: 'text-rose-500' },
    { name: 'APEX', icon: Cpu, color: 'text-violet-500' },
    { name: 'QUANTUM', icon: Zap, color: 'text-cyan-500' },
    { name: 'ELEVATE', icon: TrendingUp, color: 'text-orange-500' },
    { name: 'SYNAPSE', icon: GitBranch, color: 'text-indigo-500' },
  ];

  // Repeat brands to ensure smooth infinite loop scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-10 bg-[#F3EDF7] border-y border-[#E7E0EC] overflow-hidden px-6 relative">
      
      {/* Marquee Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-slow {
          animation: marqueeScroll 25s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        
        {/* Title Label */}
        <div className="text-left max-w-xs shrink-0 select-none border-r border-[#E7E0EC] pr-6 hidden md:block">
          <p className="text-xs font-bold text-[#49454F] uppercase tracking-wider">
            Enterprise Partners
          </p>
          <p className="text-[11px] text-[#49454F]/70 mt-0.5">
            Integrated across top talent platforms.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex gap-16 md:gap-24 items-center animate-marquee-slow w-max py-1.5">
            {duplicatedBrands.map((brand, idx) => {
              const IconComponent = brand.icon;
              return (
                <div 
                  key={`${brand.name}-${idx}`} 
                  className="flex items-center gap-3 text-[#1C1B1F] font-extrabold text-sm tracking-widest select-none cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <div className={`w-8 h-8 rounded-full bg-white shadow-xs border border-[#E7E0EC] flex items-center justify-center`}>
                    <IconComponent className={`w-4.5 h-4.5 ${brand.color}`} />
                  </div>
                  <span>{brand.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
