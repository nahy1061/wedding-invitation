import React from 'react';

interface IslamicArchProps {
  className?: string;
  variant?: 'top-arch' | 'corner-ornament' | 'divider' | 'bismillah-frame';
}

export const IslamicArch: React.FC<IslamicArchProps> = ({ className = '', variant = 'top-arch' }) => {
  if (variant === 'divider') {
    return (
      <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-500/60 to-gold-400" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gold-400 shrink-0"
        >
          <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <circle cx="12" cy="12" r="2" fill="#04120d" />
        </svg>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-gold-500/60 to-gold-400" />
      </div>
    );
  }

  if (variant === 'corner-ornament') {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`text-gold-500/70 ${className}`}
      >
        <path
          d="M4 4H24C24 15.0457 15.0457 24 4 24V4Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M8 8H20C20 14.6274 14.6274 20 8 20V8Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          fill="none"
        />
        <circle cx="4" cy="4" r="2.5" fill="currentColor" />
        <path d="M4 32V4" stroke="currentColor" strokeWidth="1" />
        <path d="M32 4H4" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }

  // Top Andalusian Arch frame
  return (
    <div className={`w-full flex flex-col items-center pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 400 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[340px] sm:max-w-[420px] text-gold-400/80 drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]"
      >
        <path
          d="M20 120 V 45 C 20 45, 90 40, 160 25 C 185 18, 200 4, 200 4 C 200 4, 215 18, 240 25 C 310 40, 380 45, 380 45 V 120"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M32 120 V 52 C 32 52, 95 48, 162 33 C 185 27, 200 14, 200 14 C 200 14, 215 27, 238 33 C 305 48, 368 52, 368 52 V 120"
          stroke="url(#goldGradient)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          fill="none"
        />
        {/* Star at apex */}
        <circle cx="200" cy="4" r="3" fill="#faeed1" />
        
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faeed1" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#aa841e" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
