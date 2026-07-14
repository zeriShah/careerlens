import { useState } from 'react';
import { ArrowRight, Play, FileText, Linkedin, TrendingUp, Sparkles, CheckCircle, Cpu, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  
  // Parallax tilt state for the 3D wrapper
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<'resume' | 'linkedin' | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredCard(null);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 px-6 bg-background">
      {/* Subtle Background Accent Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5ded2_1px,transparent_1px),linear-gradient(to_bottom,#e5ded2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Text Column */}
        <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[11px] font-bold tracking-wide uppercase text-primary mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Next-Gen Profile Operating System
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-[44px] xl:text-[54px] leading-[1.1] tracking-tight text-text-primary mb-6">
            Optimize Your Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-accent">Identity with AI</span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary mb-8 leading-relaxed max-w-lg">
            Profiling is a premium workspace that connects your offline resume and online professional presence. Analyze resume scores, tailor CVs dynamically, and schedule AI content for LinkedIn from a single dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/register')}
              className="bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98] w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white border border-border hover:bg-slate-50 text-text-primary font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 w-full sm:w-auto">
              <Play className="w-4 h-4 text-text-secondary fill-text-secondary" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right 3D Parallax Visual Column */}
        <div className="lg:col-span-7 w-full flex items-center justify-center h-[460px] md:h-[500px]">
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[500px] h-full flex items-center justify-center cursor-default"
            style={{ perspective: '1200px' }}
          >
            {/* The 3D container that tilts */}
            <div 
              className="relative w-full h-[400px] transition-transform duration-200 ease-out flex items-center justify-center"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
              }}
            >
              
              {/* Backglow decoration */}
              <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-primary/20 to-violet-500/10 blur-[60px] -z-10 transform translate-z-[-50px]" />

              {/* 3D Connecting Core */}
              <div 
                className="absolute w-12 h-12 rounded-2xl bg-white border border-border shadow-lg flex items-center justify-center transition-all duration-300 z-20"
                style={{ 
                  transform: 'translateZ(60px)',
                  boxShadow: '0 10px 30px -10px rgba(164, 122, 140, 0.3)'
                }}
              >
                <Cpu className="w-6 h-6 text-primary animate-pulse" />
              </div>

              {/* Linking dashed SVG connector lines in 3D */}
              <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                <svg className="w-full h-full absolute" style={{ transform: 'translateZ(10px)' }}>
                  <path 
                    d="M 120 120 L 250 200 L 380 280" 
                    fill="none" 
                    stroke="url(#dash-grad)" 
                    strokeWidth="2" 
                    strokeDasharray="5,5"
                    className="animate-[dash_10s_linear_infinite]"
                  />
                  <defs>
                    <linearGradient id="dash-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B56CFF" />
                      <stop offset="100%" stopColor="#FFB37A" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Card 1: Resume Niche Card (Top Left - tilted forward) */}
              <div 
                onMouseEnter={() => setHoveredCard('resume')}
                className={`absolute left-[5%] top-[10%] w-[230px] bg-white border rounded-xl p-4 transition-all duration-300 flex flex-col text-left justify-between shadow-[0_8px_30px_rgba(164,122,140,0.06)] ${
                  hoveredCard === 'resume' ? 'border-primary scale-[1.03]' : 'border-border'
                }`}
                style={{ 
                  transform: 'translateZ(100px) rotateY(-5deg)',
                  boxShadow: hoveredCard === 'resume' 
                    ? '0 20px 40px -15px rgba(164, 122, 140, 0.15)' 
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-100 uppercase tracking-wide">ATS Verified</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Resume Integrity</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-text-primary">94%</span>
                    <span className="text-[10px] text-text-secondary font-semibold">ATS Compatibility</span>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[10px] text-text-secondary font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Missing Skills Patched</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-text-secondary font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>STAR Formatted Bullets</span>
                  </div>
                </div>
              </div>

              {/* Card 2: LinkedIn Niche Card (Bottom Right - tilted back) */}
              <div 
                onMouseEnter={() => setHoveredCard('linkedin')}
                className={`absolute right-[5%] bottom-[10%] w-[230px] bg-dark border rounded-xl p-4 transition-all duration-300 flex flex-col text-left justify-between shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${
                  hoveredCard === 'linkedin' ? 'border-primary/80 scale-[1.03]' : 'border-neutral-800'
                }`}
                style={{ 
                  transform: 'translateZ(40px) rotateY(5deg)',
                  boxShadow: hoveredCard === 'linkedin' 
                    ? '0 20px 40px -15px rgba(164, 122, 140, 0.3)' 
                    : '0 10px 35px -10px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Linkedin className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <span className="text-[10px] text-primary bg-primary/20 px-2 py-0.5 rounded font-bold border border-primary/30 uppercase tracking-wide font-sans">UniPile Connect</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">LinkedIn Impressions</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-white">+14.2K</span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      18.4%
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-neutral-800 pt-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-medium">
                    <Layers className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Auto Post Schedule Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    <span>Magic Post Draft Ready</span>
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


