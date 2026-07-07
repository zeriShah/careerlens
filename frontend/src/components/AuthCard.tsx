import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-[420px] bg-white border border-slate-200/80 rounded-lg shadow-subtle p-6 sm:p-8 text-center flex flex-col justify-between relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600" />
      
      <div className="mb-6 space-y-1.5">
        <h2 className="font-sans font-extrabold text-2xl text-text-primary tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-text-secondary text-[13px] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
