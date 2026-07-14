import { useState } from 'react';
import { ArrowRight, Play, Sparkles, Cpu } from 'lucide-react';
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
    <section className="relative overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16 px-6 bg-background">
      {/* Subtle Background Accent Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#E7E0EC_1px,transparent_1px),linear-gradient(to_bottom,#E7E0EC_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Text Column */}
        <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6750A4]/10 border border-[#6750A4]/20 rounded-full text-[11px] font-bold tracking-wider uppercase text-[#6750A4] mb-6 shadow-xs font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#6750A4]" />
            Next-Gen Profile Operating System
          </div>

          <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-[44px] xl:text-[54px] leading-[1.1] tracking-tight text-[#1C1B1F] mb-6">
            Optimize Your Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-accent">Identity with AI</span>
          </h1>

          <p className="text-base sm:text-lg text-[#49454F] mb-8 leading-relaxed max-w-lg">
            Profiling is a premium workspace that connects your offline resume and online professional presence. Analyze resume scores, tailor CVs dynamically, and schedule AI content for LinkedIn from a single dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/register')}
              className="bg-[#6750A4] hover:bg-[#6750A4]/90 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-transparent border border-[#79747E] hover:bg-[#6750A4]/8 text-[#6750A4] font-bold text-sm px-6 py-3.5 rounded-full shadow-xs transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 w-full sm:w-auto">
              <Play className="w-4 h-4 text-[#6750A4] fill-[#6750A4]" />
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
              
              {/* Backglow decoration - Organic MD3 Blur Shapes */}
              <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#6750A4]/20 to-[#7D5260]/10 blur-[70px] -z-10 transform translate-z-[-60px]" />
              <div className="absolute w-[200px] h-[200px] rounded-full bg-[#E8DEF8]/30 blur-[50px] -z-10 transform translate-x-20 -translate-y-20 translate-z-[-80px]" />
 
              {/* 3D Connecting Core */}
              <div 
                className="absolute w-12 h-12 rounded-2xl bg-[#F3EDF7] border border-[#E7E0EC] shadow-md flex items-center justify-center transition-all duration-300 z-20"
                style={{ 
                  transform: 'translateZ(60px)',
                  boxShadow: '0 10px 30px -10px rgba(103, 80, 164, 0.2)'
                }}
              >
                <Cpu className="w-6 h-6 text-[#6750A4] animate-pulse" />
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
                      <stop offset="0%" stopColor="#6750A4" />
                      <stop offset="100%" stopColor="#7D5260" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Styles for continuous 3D turn around animations */}
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes rotateCV {
                  0% { transform: translate3d(0, 0, 90px) rotateY(-18deg) rotateX(12deg); }
                  50% { transform: translate3d(8px, -15px, 120px) rotateY(18deg) rotateX(-8deg); }
                  100% { transform: translate3d(0, 0, 90px) rotateY(-18deg) rotateX(12deg); }
                }
                @keyframes rotateLI {
                  0% { transform: translate3d(0, 0, 35px) rotateY(18deg) rotateX(-12deg); }
                  50% { transform: translate3d(-8px, 15px, 60px) rotateY(-18deg) rotateX(8deg); }
                  100% { transform: translate3d(0, 0, 35px) rotateY(18deg) rotateX(-12deg); }
                }
                .animate-cv-3d {
                  animation: rotateCV 8s ease-in-out infinite;
                }
                .animate-li-3d {
                  animation: rotateLI 8s ease-in-out infinite;
                }
              `}} />

              {/* Card 1: Actual Styled A4 CV Layout Mockup (Top Left - tilted forward) */}
              <div 
                onMouseEnter={() => setHoveredCard('resume')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`absolute left-[2%] top-[5%] w-[240px] h-[340px] bg-white border rounded-lg p-4 transition-all duration-300 flex flex-col text-left justify-between shadow-[0_15px_35px_rgba(0,0,0,0.06)] font-sans border-border/80 overflow-hidden ${
                  hoveredCard === 'resume' ? 'scale-[1.03] z-30 border-primary' : 'animate-cv-3d border-border/80'
                }`}
                style={hoveredCard === 'resume' ? {
                  transform: `translateZ(130px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                  boxShadow: '0 25px 50px -12px rgba(255, 187, 0, 0.2)'
                } : undefined}
              >
                {/* CV Content Container */}
                <div className="space-y-3 h-full flex flex-col">
                  {/* CV Header */}
                  <div className="text-center border-b border-border/60 pb-2">
                    <h3 className="font-extrabold text-[12px] text-text-primary tracking-tight uppercase">Syed Uzair Shah</h3>
                    <p className="text-[7px] text-primary font-bold uppercase tracking-wider">Staff Software Engineer</p>
                    <p className="text-[6px] text-text-secondary mt-0.5">syeduzair7008@gmail.com · San Francisco, CA</p>
                  </div>

                  {/* CV Body */}
                  <div className="flex-1 space-y-2.5 overflow-hidden">
                    {/* Summary */}
                    <div className="space-y-0.5 text-[6px]">
                      <span className="font-bold text-text-primary uppercase tracking-wide block border-b border-border/40 pb-0.5">Executive Summary</span>
                      <p className="text-text-secondary leading-normal">
                        Experienced Software Engineer specializing in scalable full-stack React systems, database architectures, and continuous AI synchronization layers.
                      </p>
                    </div>

                    {/* Experience */}
                    <div className="space-y-1.5 text-[6px]">
                      <span className="font-bold text-text-primary uppercase tracking-wide block border-b border-border/40 pb-0.5">Professional Experience</span>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[6px] font-bold text-text-primary">
                          <span>Staff Frontend Engineer — Stripe</span>
                          <span className="text-text-secondary">2024 - Present</span>
                        </div>
                        <p className="text-text-secondary leading-normal">
                          • Designed robust checkout checkout visual flows using React and TypeScript.
                          <br />
                          • Leveraged real-time sync systems to improve transactional audit pipeline speed by 40%.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[6px] font-bold text-text-primary">
                          <span>Senior Software Dev — Google</span>
                          <span className="text-text-secondary">2022 - 2024</span>
                        </div>
                        <p className="text-text-secondary leading-normal">
                          • Optimized API latency times by integrating caching models in NestJS engines.
                        </p>
                      </div>
                    </div>

                    {/* Education & Skills */}
                    <div className="grid grid-cols-2 gap-2 text-[6px]">
                      <div>
                        <span className="font-bold text-text-primary uppercase tracking-wide block border-b border-border/40 pb-0.5">Education</span>
                        <p className="text-text-secondary font-bold mt-1">Stanford University</p>
                        <p className="text-text-secondary">BS Computer Science</p>
                      </div>
                      <div>
                        <span className="font-bold text-text-primary uppercase tracking-wide block border-b border-border/40 pb-0.5">Core Skills</span>
                        <p className="text-text-secondary leading-tight mt-1">
                          React, Next.js, TypeScript, Node.js, Express, Postgres, Prisma, Docker.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Actual LinkedIn Profile Mockup Card (Bottom Right - tilted back) */}
              <div 
                onMouseEnter={() => setHoveredCard('linkedin')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`absolute right-[2%] bottom-[5%] w-[240px] h-[240px] bg-white border rounded-lg transition-all duration-300 flex flex-col text-left justify-between shadow-[0_15px_35px_rgba(0,0,0,0.06)] border-border overflow-hidden ${
                  hoveredCard === 'linkedin' ? 'scale-[1.03] z-30 border-primary' : 'animate-li-3d border-border'
                }`}
                style={hoveredCard === 'linkedin' ? {
                  transform: `translateZ(75px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                  boxShadow: '0 25px 50px -12px rgba(255, 187, 0, 0.2)'
                } : undefined}
              >
                {/* LinkedIn Mockup Header Background Banner */}
                <div className="h-12 bg-dark relative flex-shrink-0">
                  {/* Decorative digital layout grid in banner */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:8px_8px] opacity-20" />
                  
                  {/* Rounded Profile Photo overlapping the banner */}
                  <div className="absolute left-4 bottom-[-14px] w-12 h-12 rounded-full border-2 border-white bg-gradient-accent flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                    S
                  </div>
                </div>

                {/* LinkedIn Details Section */}
                <div className="flex-1 pt-5 px-4 pb-3 flex flex-col justify-between">
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-1">
                      <h4 className="font-extrabold text-[11px] text-text-primary">Syed Uzair Shah</h4>
                      <div className="w-2.5 h-2.5 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      </div>
                    </div>
                    
                    <p className="text-[7px] text-text-primary leading-tight font-medium">
                      Staff Software Engineer @ Stripe | Tech Creator | Ex-Google | Building Profiling AI
                    </p>
                    
                    <p className="text-[6px] text-text-secondary">
                      San Francisco Bay Area · <span className="text-primary font-bold hover:underline">12,480 followers</span>
                    </p>
                  </div>

                  {/* LinkedIn Action Buttons */}
                  <div className="flex gap-1.5 my-1">
                    <button className="flex-1 py-1 bg-primary text-on-primary text-[7px] font-bold rounded-full hover:bg-primary-hover transition-colors shadow-xs">
                      Open to work
                    </button>
                    <button className="flex-1 py-1 border border-border text-text-primary text-[7px] font-bold rounded-full hover:bg-slate-50 transition-colors">
                      Message
                    </button>
                  </div>

                  {/* About Section snippet */}
                  <div className="border-t border-border/60 pt-1.5 text-[6px]">
                    <span className="font-bold text-text-primary uppercase tracking-wide block mb-0.5">About</span>
                    <p className="text-text-secondary leading-normal">
                      Passionate about building high-performance React architectures, optimizing build systems, and help software engineers synchronize their professional profiles.
                    </p>
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


