import React from 'react';

interface BotanicalArtProps {
  className?: string;
  variant?: 'branch-left' | 'branch-right' | 'top-crest' | 'botanical-divider' | 'corner-line';
}

export const BotanicalArt: React.FC<BotanicalArtProps> = ({
  className = '',
  variant = 'top-crest',
}) => {
  if (variant === 'botanical-divider') {
    return (
      <div className={`flex items-center justify-center gap-3 my-5 ${className}`}>
        <div className="h-[0.5px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#c5a880]/50 to-[#c5a880]" />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#c5a880] opacity-80"
        >
          <path
            d="M12 3C12 3 13 8 16 11C19 14 21 14 21 14C21 14 16 15 13 18C10 21 12 21 12 21C12 21 14 16 11 13C8 10 3 12 3 12C3 12 8 11 11 8C14 5 12 3 12 3Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
        </svg>
        <div className="h-[0.5px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#c5a880]/50 to-[#c5a880]" />
      </div>
    );
  }

  if (variant === 'top-crest') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <svg
          width="64"
          height="40"
          viewBox="0 0 80 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#c5a880] opacity-85"
        >
          {/* Subtle botanical leaves */}
          <path
            d="M40 8 C30 18, 15 22, 10 32 C22 30, 32 24, 40 18 C48 24, 58 30, 70 32 C65 22, 50 18, 40 8 Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <path
            d="M40 2 C34 12, 24 16, 18 22 C26 21, 34 16, 40 10 C46 16, 54 21, 62 22 C56 16, 46 12, 40 2 Z"
            fill="currentColor"
            fillOpacity="0.7"
          />
          <circle cx="40" cy="42" r="1.5" fill="currentColor" />
          <circle cx="34" cy="42" r="1" fill="currentColor" />
          <circle cx="46" cy="42" r="1" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // Corner hairline border ornament
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#c5a880]/60 ${className}`}
    >
      <path d="M2 2H18M2 2V18" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    </svg>
  );
};
