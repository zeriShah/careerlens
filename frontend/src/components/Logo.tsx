import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 32, className = '' }) => {
  const isDarkBg = variant === 'dark';
  const fill = isDarkBg ? '#FFFFFF' : '#121212';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#3BEB86"/>
          <stop offset="1" stop-color="#12B36A"/>
        </linearGradient>
      </defs>
      <rect x="18" y="12" width="8" height="40" rx="4" fill={fill} />
      <circle 
        cx="35.5" 
        cy="25" 
        r="12.5" 
        fill="none" 
        stroke="url(#pg)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeDasharray="66 12" 
        transform="rotate(-42 35.5 25)" 
      />
      <circle cx="35.5" cy="25" r="3.6" fill={fill} />
    </svg>
  );
};
