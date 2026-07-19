import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-[#E8E9E8] flex flex-col justify-between overflow-y-auto relative font-sans">
      
      {/* Decorative structural grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#DCDCDC_1px,transparent_1px),linear-gradient(to_bottom,#DCDCDC_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      {/* Premium dual-tone background radial glow spotlights */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-[#1DB954]/5 rounded-full blur-[120px] pointer-events-none animate-glow-spot" />
      <div className="absolute top-1/2 left-2/3 w-[450px] h-[450px] bg-[#5B5B5B]/5 rounded-full blur-[120px] pointer-events-none animate-glow-spot [animation-delay:4s]" />
      
      {/* Vector Geometry Lines in background */}
      <div className="absolute top-16 left-16 w-32 h-32 rounded-full border border-[#1DB954]/10 animate-float pointer-events-none" />
      <div className="absolute bottom-24 right-24 w-48 h-48 rounded-full border border-[#5B5B5B]/10 animate-float pointer-events-none [animation-delay:2s]" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10 shrink-0">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <Logo variant="light" size={36} />
          <div className="flex flex-col text-left" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="text-[20px] font-extrabold text-[#121212] tracking-[-0.025em] leading-none">
              Profiling
            </span>
            <span className="text-[8.5px] font-bold text-[#8A8A8A] leading-none tracking-[0.3em] uppercase mt-1">
              by morpheralabs
            </span>
          </div>
        </div>
        <a
          href="/"
          className="text-xs font-bold text-[#5B5B5B] hover:text-[#121212] transition-colors flex items-center gap-1"
        >
          ← Back to Home
        </a>
      </header>

      {/* Main Form Content */}
      <div className="w-full flex items-center justify-center px-6 relative z-10 flex-grow">
        <div className="w-full flex justify-center">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-text-secondary/50 relative z-10 shrink-0 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <span>© {new Date().getFullYear()} Profiling Inc. All rights reserved.</span>
      </footer>
    </div>
  );
}
