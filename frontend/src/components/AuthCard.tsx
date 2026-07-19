import type { ReactNode } from 'react';
import { Logo } from './Logo';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthCard({ title, description, children }: AuthCardProps) {
  const isRegister = title.toLowerCase().includes('create') || title.toLowerCase().includes('register') || title.toLowerCase().includes('sign up');

  return (
    <div className="w-full max-w-[1000px] md:min-h-[640px] bg-white border border-[#EBEBEB] rounded-2xl shadow-card grid grid-cols-1 md:grid-cols-2 overflow-hidden animate-in fade-in zoom-in-95 duration-300">

      {/* Left Column: Brand Panel (Connect UIUX style) — hidden on mobile to keep the form front-and-center */}
      <div className="relative bg-[#121212] p-10 hidden md:flex flex-col justify-between overflow-hidden text-left text-white select-none">
        
        {/* Glow Spotlight */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-[#1DB954]/25 to-transparent rounded-full blur-[80px] pointer-events-none" />
        
        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <Logo variant="dark" size={36} />
          <div className="flex flex-col text-left" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="text-[20px] font-extrabold text-white tracking-[-0.025em] leading-none">Profiling</span>
            <span className="text-[8.5px] font-bold text-[#3BEB86] leading-none tracking-[0.3em] uppercase mt-1">by morpheralabs</span>
          </div>
        </div>

        {/* Content Segment */}
        <div className="relative space-y-6">
          {isRegister ? (
            <>
              <h2 className="font-extrabold text-3xl leading-tight tracking-tight text-white">
                Join the future <br />
                of career <br />
                optimization.
              </h2>
              <p className="text-sm text-[#B3B3B3] leading-relaxed max-w-[340px]">
                Create your account to unlock automated ATS keyword compatibility audits, STAR experience formatting, and scheduled LinkedIn publishing updates.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-extrabold text-3xl leading-tight tracking-tight text-white">
                Welcome back. <br />
                Let's find your <br />
                next match.
              </h2>
              <p className="text-sm text-[#B3B3B3] leading-relaxed max-w-[340px]">
                Pick up right where you left off — your resume analyses, cover letter templates, and scheduled posts are waiting for you.
              </p>
            </>
          )}

          {/* Inline Graphic: Match badge */}
          <div className="flex items-center gap-3.5 bg-[#181818] border border-[#282828] rounded-xl p-4 max-w-[340px]">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" className="stroke-[#282828] fill-none" strokeWidth="4.5" />
                <circle cx="24" cy="24" r="20" className="stroke-[#1DB954] fill-none" strokeWidth="4.5" strokeDasharray="125.6" strokeDashoffset="12" strokeLinecap="round" />
              </svg>
              <span className="absolute font-sans font-extrabold text-xs text-white">94</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-xs text-white">Best matches available</div>
              <div className="text-[10px] text-[#A7A7A7] mt-0.5">Staff Software Engineer · Northwind</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative text-[10px] text-[#767676]">
          © {new Date().getFullYear()} Profiling. All rights reserved.
        </div>
      </div>

      {/* Right Column: Form Panel */}
      <div className="p-8 sm:p-12 flex flex-col justify-center text-left bg-white relative">
        <div className="mb-6 space-y-1">
          <h3 className="font-sans font-extrabold text-2xl text-[#121212] tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-[#5B5B5B] text-xs leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-4">
          {children}
        </div>
      </div>

    </div>
  );
}
