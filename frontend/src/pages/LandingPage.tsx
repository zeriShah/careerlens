import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Cpu, Play } from 'lucide-react';
import { Logo } from '../components/Logo';

export default function LandingPage() {
  const navigate = useNavigate();

  // FAQ Accordion State
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Parallax Tilt State for the Hero 3D Graphic
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
  };

  const faqs = [
    {
      q: 'How does the match score work?',
      a: "We compare your résumé against each job's requirements — skills, keywords, seniority, and phrasing — and weight them by how important they are to that specific role."
    },
    {
      q: 'Is it safe to connect my LinkedIn?',
      a: 'Absolutely. We connect securely through official authentication portals (like Unipile). We never store your login credentials, and your data is encrypted at rest and in transit.'
    },
    {
      q: 'What résumé formats can I upload?',
      a: 'We support PDF, DOCX, and plain TXT file formats. For best parsing accuracy, we recommend cleanly formatted PDF documents.'
    },
    {
      q: 'Can I schedule posts in advance?',
      a: 'Yes, with a Pro account you can queue multiple AI-generated LinkedIn posts in advance and set them to auto-publish on a schedule during peak engagement hours.'
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes, every account starts with a 30-day Free Trial of our Pro plan. After your trial ends, subscription is just 299 PKR/month. No credit card is required to sign up.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#121212', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Scope animations block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes clUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @keyframes clFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes clRing { from { stroke-dashoffset: 327; } to { stroke-dashoffset: 22; } }
        @keyframes clBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes clDraw { from { stroke-dashoffset: 260; } to { stroke-dashoffset: 0; } }
        .clbar { transform-origin: left; animation: clBar 1s cubic-bezier(.2,.7,.2,1) both; }
        
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

      {/* Top Background Gradient Aura */}
      <div style={{ position: 'absolute', top: '-320px', left: '50%', transform: 'translateX(-50%)', width: '1200px', height: '680px', background: 'radial-gradient(ellipse at center,rgba(29,185,84,.10),transparent 66%)', pointerEvents: 'none' }}></div>

      <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '0 40px' }}>

        {/* ===================== NAVBAR ===================== */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <Logo variant="light" size={36} />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1, color: '#121212' }}>Profiling</span>
              <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#8A8A8A', letterSpacing: '.3em', textTransform: 'uppercase', marginTop: '4px', lineHeight: 1 }}>by morpheralabs</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '34px', fontSize: '14px', color: '#5B5B5B', fontWeight: 700 }}>
            <a href="#features" style={{ color: '#5B5B5B' }}>Product</a>
            <a href="#how-it-works" style={{ color: '#5B5B5B' }}>Features</a>
            <a href="#pricing" style={{ color: '#5B5B5B' }}>Pricing</a>
            <a href="#faq" style={{ color: '#5B5B5B' }}>FAQ</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <button 
              onClick={() => navigate('/login')} 
              style={{ fontSize: '14px', color: '#5B5B5B', fontWeight: 700, border: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              Sign in
            </button>
            <button 
              onClick={() => navigate('/register')} 
              style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#FFFFFF', background: '#1DB954', padding: '11px 22px', borderRadius: '9999px', border: 'none', cursor: 'pointer', outline: 'none' }}
            >
              Get started
            </button>
          </div>
        </nav>

        <div style={{ height: '1px', background: '#EBEBEB' }}></div>

        {/* ===================== HERO SECTION ===================== */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.04fr 1fr', gap: '56px', alignItems: 'center', padding: '76px 0 68px' }}>
          
          {/* Hero Left Content */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: '#F4F5F3', border: '1px solid #E6E7E4', borderRadius: '9999px', padding: '6px 13px', animation: 'clUp .6s both' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: '#1DB954' }}></span>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', color: '#5B5B5B', textTransform: 'uppercase' }}>AI résumé &amp; LinkedIn optimization</span>
            </div>

            <h1 style={{ fontWeight: 800, fontSize: '64px', lineHeight: 1.06, letterSpacing: '-.03em', color: '#121212', margin: '22px 0 0', textWrap: 'balance', animation: 'clUp .6s .05s both' }}>
              Your résumé, matched to the job that wants it.
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#5B5B5B', margin: '22px 0 0', maxWidth: '508px', animation: 'clUp .6s .12s both' }}>
              Profiling reads the ten most relevant openings for your role, scores your fit against each one, and rewrites your CV and cover letter to close the gap — then keeps your LinkedIn growing on a schedule.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '32px', animation: 'clUp .6s .18s both' }}>
              <button 
                onClick={() => navigate('/register')} 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#FFFFFF', background: '#1DB954', padding: '15px 26px', borderRadius: '9999px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 26px rgba(29,185,84,.28)' }}
              >
                Analyze my résumé 
                <ArrowRight className="w-4.5 h-4.5" style={{ stroke: '#FFFFFF', strokeWidth: '2.6px' }} />
              </button>
              <a 
                href="#how-it-works" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#121212', background: 'transparent', border: '1px solid #CFCFCF', padding: '15px 24px', borderRadius: '9999px' }}
              >
                <Play className="w-3.5 h-3.5 fill-[#121212]" />
                How it works
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '34px', animation: 'clUp .6s .24s both' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '33px', height: '33px', borderRadius: '9999px', background: '#E4E4E4', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#5B5B5B' }}>JK</div>
                <div style={{ width: '33px', height: '33px', borderRadius: '9999px', background: '#1DB954', border: '2px solid #FFFFFF', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#FFFFFF' }}>SM</div>
                <div style={{ width: '33px', height: '33px', borderRadius: '9999px', background: '#E4E4E4', border: '2px solid #FFFFFF', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#5B5B5B' }}>RA</div>
              </div>
              <div style={{ fontSize: '13px', color: '#767676', lineHeight: 1.4 }}>Joined by <b style={{ color: '#121212' }}>12,000+</b> engineers, designers &amp; PMs<br/>No credit card to start.</div>
            </div>
          </div>

          {/* Hero Right 3D Visual Panel */}
          <div style={{ position: 'relative', animation: 'clUp .7s .2s both', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: '1200px', width: '100%', maxWidth: '500px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
            >
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '400px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                  transition: 'transform 200ms ease-out'
                }}
              >
                {/* Backglow green radial light */}
                <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '9999px', background: 'radial-gradient(circle, rgba(29,185,84,0.15) 0%, rgba(29,185,84,0) 70%)', filter: 'blur(40px)', zIndex: -1, transform: 'translateZ(-60px)' }} />

                {/* 3D CPU Core */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '16px', 
                    background: '#FFFFFF', 
                    border: '1px solid #EBEBEB', 
                    boxShadow: '0 10px 30px -10px rgba(29, 185, 84, 0.2)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 20, 
                    transform: 'translateZ(60px)' 
                  }}
                >
                  <Cpu className="w-6 h-6 text-[#1DB954] animate-pulse" />
                </div>

                {/* Linking Line SVG */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg className="w-full h-full absolute" style={{ transform: 'translateZ(10px)' }}>
                    <path 
                      d="M 120 120 L 250 200 L 380 280" 
                      fill="none" 
                      stroke="url(#dash-grad)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                    <defs>
                      <linearGradient id="dash-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1DB954" />
                        <stop offset="100%" stopColor="#121212" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

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
                      <p className="text-[7px] text-[#1DB954] font-bold uppercase tracking-wider">Staff Software Engineer</p>
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
                  <div className="h-12 bg-[#121212] relative flex-shrink-0">
                    {/* Decorative digital layout grid in banner */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:8px_8px] opacity-20" />
                    
                    {/* Rounded Profile Photo overlapping the banner */}
                    <div className="absolute left-4 bottom-[-14px] w-12 h-12 rounded-full border-2 border-white bg-[#1DB954] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                      S
                    </div>
                  </div>

                  {/* LinkedIn Details Section */}
                  <div className="flex-grow pt-5 px-4 pb-3 flex flex-col justify-between">
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
                      <button className="flex-1 py-1 bg-primary text-on-primary text-[7px] font-bold rounded-full hover:bg-primary-hover transition-colors shadow-sm">
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

        {/* ===================== OUTCOME STRIP ===================== */}
        <div style={{ borderTop: '1px solid #EBEBEB', padding: '30px 0', display: 'flex', flexWrap: 'wrap', gap: '20px 56px', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l5 5L20 6"/>
            </svg>
            <span style={{ fontSize: '14px', color: '#5B5B5B', fontWeight: 500 }}>Works with LinkedIn, Indeed &amp; Wellfound job posts</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.2">
              <rect x="4" y="9" width="16" height="11" rx="2"/>
              <path d="M8 9V7a4 4 0 0 1 8 0v2"/>
            </svg>
            <span style={{ fontSize: '14px', color: '#5B5B5B', fontWeight: 500 }}>Your data stays private &amp; encrypted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
              <circle cx="12" cy="12" r="4"/>
            </svg>
            <span style={{ fontSize: '14px', color: '#5B5B5B', fontWeight: 500 }}>Results in under 60 seconds</span>
          </div>
        </div>

      </div>

      {/* ===================== HOW IT WORKS ===================== */}
      <div id="how-it-works" style={{ background: '#F7F8F7', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '82px 40px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#0E9E48' }}>How it works</span>
            <h2 style={{ fontWeight: 800, fontSize: '40px', letterSpacing: '-.02em', color: '#121212', margin: '14px 0 0', lineHeight: '1.1' }}>From upload to tailored application in three steps.</h2>
            <p style={{ fontSize: '16px', color: '#5B5B5B', margin: '16px 0 0', lineHeight: '1.6' }}>No forms, no guesswork. Give us your CV and the role you want — we handle the rest.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px', marginTop: '52px' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '12px', padding: '26px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(29,185,84,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 16V4M8 8l4-4 4 4"/>
                    <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, color: '#C4C4C4' }}>01</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#121212', margin: '18px 0 0' }}>Upload your CV &amp; target role</h3>
              <p style={{ fontSize: '14px', color: '#5B5B5B', lineHeight: '1.6', margin: '9px 0 0' }}>Drop your résumé, tell us the role and location. That's all the setup there is.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '12px', padding: '26px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(29,185,84,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7"/>
                    <path d="M20 20l-3.5-3.5"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, color: '#C4C4C4' }}>02</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#121212', margin: '18px 0 0' }}>We fetch &amp; score 10 live roles</h3>
              <p style={{ fontSize: '14px', color: '#5B5B5B', lineHeight: '1.6', margin: '9px 0 0' }}>Profiling pulls the most relevant openings and rates your fit, keyword by keyword.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '12px', padding: '26px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(29,185,84,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
                    <path d="M14 4v5h5M8 14h8M8 17h5"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, color: '#C4C4C4' }}>03</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#121212', margin: '18px 0 0' }}>Get a tailored CV &amp; cover letter</h3>
              <p style={{ fontSize: '14px', color: '#5B5B5B', lineHeight: '1.6', margin: '9px 0 0' }}>One click rewrites your CV and drafts a cover letter for each role — ready to send.</p>
            </div>
          </div>

        </div>
      </div>

      {/* ===================== FEATURE: RESUME ANALYZER ===================== */}
      <div id="features" style={{ maxWidth: '1240px', margin: '0 auto', padding: '88px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: '60px', alignItems: 'center' }}>
          
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#0E9E48' }}>Résumé analyzer</span>
            <h2 style={{ fontWeight: 800, fontSize: '38px', letterSpacing: '-.02em', color: '#121212', margin: '14px 0 0', lineHeight: '1.12' }}>See exactly why you match — and what's missing.</h2>
            <p style={{ fontSize: '16px', color: '#5B5B5B', margin: '16px 0 0', lineHeight: '1.6' }}>Every role gets a fit score, a keyword breakdown, and the precise gaps holding you back. Then we close them for you.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '28px' }}>
              <div style={{ display: 'flex', gap: '13px' }}>
                <div style={{ width: '34px', height: '34px', flexShrink: 0, borderRadius: '9px', background: 'rgba(29,185,84,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
                    <circle cx="12" cy="12" r="4"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#121212' }}>Match &amp; ATS score</div>
                  <div style={{ fontSize: '13.5px', color: '#5B5B5B', lineHeight: '1.55' }}>A single number for fit, plus an ATS readability check.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '13px' }}>
                <div style={{ width: '34px', height: '34px', flexShrink: 0, borderRadius: '9px', background: 'rgba(29,185,84,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h10M4 12h16M4 17h7"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#121212' }}>Keywords &amp; gaps</div>
                  <div style={{ fontSize: '13.5px', color: '#5B5B5B', lineHeight: '1.55' }}>Which terms you cover, which you're missing, and how much each matters.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '13px' }}>
                <div style={{ width: '34px', height: '34px', flexShrink: 0, borderRadius: '9px', background: 'rgba(29,185,84,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
                    <path d="M14 4v5h5"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#121212' }}>Tailored CV per role</div>
                  <div style={{ fontSize: '13.5px', color: '#5B5B5B', lineHeight: '1.55' }}>A rewritten, role-specific version of your résumé in one click.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '13px' }}>
                <div style={{ width: '34px', height: '34px', flexShrink: 0, borderRadius: '9px', background: 'rgba(29,185,84,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16v12H4z"/>
                    <path d="M4 7l8 6 8-6"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#121212' }}>Cover letters</div>
                  <div style={{ fontSize: '13.5px', color: '#5B5B5B', lineHeight: '1.55' }}>A tailored draft for every job, matched to its tone and requirements.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gap analysis mockup */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '12px', boxShadow: '0 24px 60px rgba(18,18,18,.08)', padding: '22px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#121212' }}>Gap analysis · Northwind</div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#0E9E48', background: 'rgba(29,185,84,.12)', padding: '4px 9px', borderRadius: '9999px' }}>96 match</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#121212', fontWeight: 600 }}>Design systems</span>
                  <span style={{ color: '#0E9E48', fontWeight: 700 }}>Strong</span>
                </div>
                <div style={{ height: '7px', borderRadius: '9999px', background: '#EDEDED', overflow: 'hidden' }}>
                  <div className="clbar" style={{ height: '100%', width: '94%', background: '#1DB954' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#121212', fontWeight: 600 }}>User research</span>
                  <span style={{ color: '#0E9E48', fontWeight: 700 }}>Strong</span>
                </div>
                <div style={{ height: '7px', borderRadius: '9999px', background: '#EDEDED', overflow: 'hidden' }}>
                  <div className="clbar" style={{ height: '100%', width: '86%', background: '#1DB954' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#5B5B5B', fontWeight: 600 }}>TypeScript</span>
                  <span style={{ color: '#E22134', fontWeight: 700 }}>Missing</span>
                </div>
                <div style={{ height: '7px', borderRadius: '9999px', background: '#EDEDED', overflow: 'hidden' }}>
                  <div className="clbar" style={{ height: '100%', width: '38%', background: '#E7A6AD' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#5B5B5B', fontWeight: 600 }}>Design tokens</span>
                  <span style={{ color: '#E22134', fontWeight: 700 }}>Missing</span>
                </div>
                <div style={{ height: '7px', borderRadius: '9999px', background: '#EDEDED', overflow: 'hidden' }}>
                  <div className="clbar" style={{ height: '100%', width: '30%', background: '#E7A6AD' }}></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '18px', background: '#F7F8F7', border: '1px solid #EBEBEB', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2 5 5 .5-4 3.5 1.5 5-4.5-3-4.5 3 1.5-5-4-3.5 5-.5z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#121212' }}>Add 2 keywords to reach 98</div>
                <div style={{ fontSize: '12px', color: '#5B5B5B' }}>Profiling can rewrite these bullets for you.</div>
              </div>
              <button 
                onClick={() => navigate('/register')}
                style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#FFFFFF', background: '#1DB954', padding: '8px 13px', borderRadius: '9999px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Fix
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ===================== FEATURE: LINKEDIN ===================== */}
      <div style={{ background: '#F7F8F7', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '88px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '60px', alignItems: 'center' }}>
            
            {/* LinkedIn Preview Graphic Card */}
            <div style={{ background: '#121212', borderRadius: '14px', padding: '24px', boxShadow: '0 24px 60px rgba(18,18,18,.18)', order: 2, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: '15px' }}>in</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>Your LinkedIn</span>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1DB954' }}>This week</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '18px' }}>
                <div style={{ background: '#181818', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#A7A7A7' }}>Impressions</div>
                  <div style={{ fontWeight: 800, fontSize: '24px', color: '#FFFFFF', marginTop: '4px' }}>18.4k <span style={{ fontSize: '12px', color: '#1DB954', fontWeight: 700 }}>+212%</span></div>
                </div>
                <div style={{ background: '#181818', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#A7A7A7' }}>New connects</div>
                  <div style={{ fontWeight: 800, fontSize: '24px', color: '#FFFFFF', marginTop: '4px' }}>+48 <span style={{ fontSize: '12px', color: '#1DB954', fontWeight: 700 }}>this wk</span></div>
                </div>
              </div>

              <div style={{ background: '#181818', borderRadius: '10px', padding: '14px', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#A7A7A7' }}>Scheduled posts</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#1DB954' }}>3 queued</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '11px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#1DB954' }}></div><span style={{ fontSize: '12.5px', color: '#FFFFFF', flex: 1 }}>"5 lessons from shipping a design system"</span><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#A7A7A7' }}>Tue 9:00</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#535353' }}></div><span style={{ fontSize: '12.5px', color: '#B3B3B3', flex: 1 }}>"Why I stopped chasing pixel-perfect"</span><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#A7A7A7' }}>Thu 12:30</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#535353' }}></div><span style={{ fontSize: '12.5px', color: '#B3B3B3', flex: 1 }}>"Portfolio teardown: before &amp; after"</span><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#A7A7A7' }}>Fri 17:00</span></div>
                </div>
              </div>
            </div>

            {/* LinkedIn copy content */}
            <div style={{ order: 1, textAlign: 'left' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#0E9E48' }}>LinkedIn growth</span>
              <h2 style={{ fontWeight: 800, fontSize: '38px', letterSpacing: '-.02em', color: '#121212', margin: '14px 0 0', lineHeight: '1.12' }}>Show up consistently — without the daily effort.</h2>
              <p style={{ fontSize: '16px', color: '#5B5B5B', margin: '16px 0 0', lineHeight: '1.6' }}>Draft posts, schedule them for peak hours, and track what's actually working. Connected securely.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '28px' }}>
                <div style={{ display: 'flex', gap: '11px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#121212' }}>AI post drafts</div>
                    <div style={{ fontSize: '13px', color: '#5B5B5B' }}>In your voice, from your wins.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '11px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <rect x="3" y="5" width="18" height="16" rx="2"/>
                    <path d="M3 9h18M8 3v4M16 3v4"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#121212' }}>Scheduling</div>
                    <div style={{ fontSize: '13px', color: '#5B5B5B' }}>Queue for peak-time reach.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '11px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <circle cx="9" cy="8" r="3.2"/>
                    <path d="M3.5 20a5.5 5.5 0 0 1 11 0"/>
                    <path d="M16 5.2a3.2 3.2 0 0 1 0 5.9"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#121212' }}>Connects</div>
                    <div style={{ fontSize: '13px', color: '#5B5B5B' }}>Grow the right network.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '11px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E9E48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <path d="M4 19V10M10 19V5M16 19v-7M22 19V8"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#121212' }}>Impressions</div>
                    <div style={{ fontSize: '13px', color: '#5B5B5B' }}>Know what's landing.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===================== PRICING ===================== */}
      <div id="pricing" style={{ maxWidth: '1240px', margin: '0 auto', padding: '88px 40px' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#0E9E48' }}>Pricing</span>
          <h2 style={{ fontWeight: 800, fontSize: '40px', letterSpacing: '-.02em', color: '#121212', margin: '14px 0 0', lineHeight: '1.1' }}>Start free. Upgrade when it lands you interviews.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', maxWidth: '840px', margin: '48px auto 0' }}>
          {/* Free Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '14px', padding: '30px', textAlign: 'left' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#121212' }}>Trial</div>
            <div style={{ margin: '12px 0 4px' }}><span style={{ fontWeight: 800, fontSize: '44px', letterSpacing: '-.03em', color: '#121212' }}>Rs. 0</span><span style={{ fontSize: '15px', color: '#8A8A8A' }}>/1st month</span></div>
            <div style={{ fontSize: '13.5px', color: '#5B5B5B' }}>Try all Pro features free for 30 days.</div>
            <button 
              onClick={() => navigate('/register')}
              style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: '22px', fontSize: '13px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#121212', background: 'transparent', border: '1px solid #CFCFCF', padding: '13px', borderRadius: '9999px', cursor: 'pointer' }}
            >
              Start Free Trial
            </button>
            <div style={{ height: '1px', background: '#F0F0F0', margin: '24px 0' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#5B5B5B' }}>
              <div style={{ display: 'flex', gap: '10px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>Full AI résumé analysis</div>
              <div style={{ display: 'flex', gap: '10px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>Unlimited tailored CVs &amp; gaps</div>
              <div style={{ display: 'flex', gap: '10px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>LinkedIn posting &amp; analytics</div>
            </div>
          </div>

          {/* Pro Card */}
          <div style={{ background: '#121212', borderRadius: '14px', padding: '30px', position: 'relative', boxShadow: '0 24px 60px rgba(18,18,18,.22)', textAlign: 'left' }}>
            <div style={{ position: 'absolute', top: '24px', right: '26px', fontSize: '10px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#121212', background: '#1DB954', padding: '5px 11px', borderRadius: '9999px' }}>Popular</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>Pro</div>
            <div style={{ margin: '12px 0 4px' }}><span style={{ fontWeight: 800, fontSize: '44px', letterSpacing: '-.03em', color: '#FFFFFF' }}>Rs. 299</span><span style={{ fontSize: '15px', color: '#A7A7A7' }}>/month</span></div>
            <div style={{ fontSize: '13.5px', color: '#B3B3B3' }}>Full premium access after your trial.</div>
            <button 
              onClick={() => navigate('/register')}
              style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: '22px', fontSize: '13px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#FFFFFF', background: '#1DB954', padding: '13px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}
            >
              Get Pro Access
            </button>
            <div style={{ height: '1px', background: '#282828', margin: '24px 0' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#B3B3B3' }}>
              <div style={{ display: 'flex', gap: '10px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg><span style={{ color: '#FFFFFF' }}>Unlimited analyses &amp; CVs</span></div>
              <div style={{ display: 'flex', gap: '10px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>Cover letters for every role</div>
              <div style={{ display: 'flex', gap: '10px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>LinkedIn posting &amp; scheduling</div>
              <div style={{ display: 'flex', gap: '10px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>Impressions &amp; connects analytics</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== FAQ ===================== */}
      <div id="faq" style={{ background: '#F7F8F7', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '82px 40px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#0E9E48' }}>FAQ</span>
            <h2 style={{ fontWeight: 800, fontSize: '36px', letterSpacing: '-.02em', color: '#121212', margin: '14px 0 0' }}>Questions, answered.</h2>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '12px', padding: '20px 22px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '15.5px', fontWeight: 700, color: '#121212' }}>{faq.q}</span>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={isOpen ? '#1DB954' : '#8A8A8A'} 
                      strokeWidth="2.2" 
                      strokeLinecap="round"
                      style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}
                    >
                      <path d="M6 15l6-6 6 6"/>
                    </svg>
                  </div>
                  {isOpen && (
                    <p style={{ fontSize: '14px', color: '#5B5B5B', lineHeight: '1.6', margin: '12px 0 0', animation: 'clUp 0.3s both' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================== FINAL CTA ===================== */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '88px 40px' }}>
        <div style={{ background: '#121212', borderRadius: '20px', padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Radial brand overlay light */}
          <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse at center,rgba(29,185,84,.28),transparent 66%)', pointerEvents: 'none' }}></div>
          
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontWeight: 800, fontSize: '44px', letterSpacing: '-.03em', color: '#FFFFFF', margin: 0, lineHeight: '1.08' }}>Ready to grow your career?</h2>
            <p style={{ fontSize: '16px', color: '#B3B3B3', margin: '16px auto 0', maxWidth: '480px', lineHeight: '1.6' }}>Analyze your résumé, tailor every application, and keep your LinkedIn working while you sleep.</p>
            
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/register')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#FFFFFF', background: '#1DB954', padding: '15px 28px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}
              >
                Start free 
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('/register')}
                style={{ display: 'inline-flex', alignItems: 'center', fontSize: '13px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#FFFFFF', background: 'transparent', border: '1px solid #535353', padding: '15px 26px', borderRadius: '9999px', cursor: 'pointer' }}
              >
                Schedule a demo
              </button>
            </div>
            <div style={{ fontSize: '12px', color: '#767676', marginTop: '20px' }}>No credit card required · 1-day trial of premium features</div>
          </div>
        </div>
      </div>

      {/* ===================== FOOTER ===================== */}
      <div style={{ borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '52px 40px 36px', textAlign: 'left' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <Logo variant="light" size={36} />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1, color: '#121212' }}>Profiling</span>
                  <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#8A8A8A', letterSpacing: '.3em', textTransform: 'uppercase', marginTop: '4px', lineHeight: 1 }}>by morpheralabs</span>
                </div>
              </div>
              <p style={{ fontSize: '13.5px', color: '#8A8A8A', lineHeight: '1.6', margin: '14px 0 0', maxWidth: '280px' }}>The AI career platform for résumé analysis and LinkedIn growth.</p>
            </div>
            
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A8A8A' }}>Product</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginTop: '16px', fontSize: '14px', color: '#5B5B5B' }}>
                <a href="#features" style={{ color: '#5B5B5B', textDecoration: 'none' }}>Résumé analyzer</a>
                <a href="#features" style={{ color: '#5B5B5B', textDecoration: 'none' }}>LinkedIn growth</a>
                <a href="#pricing" style={{ color: '#5B5B5B', textDecoration: 'none' }}>Pricing</a>
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A8A8A' }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginTop: '16px', fontSize: '14px', color: '#5B5B5B' }}>
                <a href="#how-it-works" style={{ color: '#5B5B5B', textDecoration: 'none' }}>About</a>
                <a href="#how-it-works" style={{ color: '#5B5B5B', textDecoration: 'none' }}>Careers</a>
                <a href="#how-it-works" style={{ color: '#5B5B5B', textDecoration: 'none' }}>Contact</a>
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A8A8A' }}>Legal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginTop: '16px', fontSize: '14px', color: '#5B5B5B' }}>
                <a href="#" style={{ color: '#5B5B5B', textDecoration: 'none' }}>Privacy</a>
                <a href="#" style={{ color: '#5B5B5B', textDecoration: 'none' }}>Terms</a>
                <a href="#" style={{ color: '#5B5B5B', textDecoration: 'none' }}>Security</a>
              </div>
            </div>
          </div>
          
          <div style={{ height: '1px', background: '#EBEBEB', margin: '36px 0 20px' }}></div>
          <div style={{ fontSize: '13px', color: '#9A9A9A' }}>© 2026 Profiling. All rights reserved.</div>
        </div>
      </div>

    </div>
  );
}
