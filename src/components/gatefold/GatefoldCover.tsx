import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bg1 from '../../assets/images/bg1.jpg';

interface GatefoldCoverProps {
  guestName: string | null;
  onOpenComplete: () => void;
}

export const GatefoldCover: React.FC<GatefoldCoverProps> = ({
  guestName,
  onOpenComplete,
}) => {
  const [openingState, setOpeningState] = useState<'closed' | 'opening'>('closed');

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openingState !== 'closed') return;

    setOpeningState('opening');

    setTimeout(() => {
      onOpenComplete();
    }, 1100);
  };

  return (
    <div
      onClick={handleOpen}
      className="fixed inset-0 w-full h-full min-h-[100dvh] overflow-hidden flex items-center justify-center cursor-pointer select-none bg-[#030a06] z-30"
      style={{ perspective: '1400px' }}
    >
      {/* LEFT GATEFOLD PANEL */}
      <motion.div
        initial={false}
        animate={
          openingState === 'opening'
            ? { rotateY: -105, x: '-8%', opacity: 0.1 }
            : { rotateY: 0, x: 0, opacity: 1 }
        }
        transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
        style={{
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
        }}
        className="absolute top-0 left-0 w-1/2 h-full border-r border-gold-400/80 shadow-[15px_0_40px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between p-4 sm:p-6"
      >
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Guest Name Pill on Left Bottom (if provided) */}
        {guestName && (
          <div className="relative z-10 self-start mt-auto mb-4 px-4 py-1.5 rounded-full bg-black/60 border border-gold-400/50 backdrop-blur-md shadow-lg">
            <span className="text-[9px] text-gold-400/90 font-sans italic block">
              Specially Invited
            </span>
            <p className="text-[11px] text-gold-200 font-serif tracking-wider font-semibold">
              {guestName}
            </p>
          </div>
        )}
      </motion.div>

      {/* RIGHT GATEFOLD PANEL */}
      <motion.div
        initial={false}
        animate={
          openingState === 'opening'
            ? { rotateY: 105, x: '8%', opacity: 0.1 }
            : { rotateY: 0, x: 0, opacity: 1 }
        }
        transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
        style={{
          transformOrigin: 'right center',
          transformStyle: 'preserve-3d',
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
        }}
        className="absolute top-0 right-0 w-1/2 h-full border-l border-gold-400/80 shadow-[-15px_0_40px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between p-4 sm:p-6"
      >
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-black/30 pointer-events-none" />
      </motion.div>

      {/* CENTER HAIRLINE GOLD VERTICAL SEAM */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gold-200 via-gold-400 to-gold-200 shadow-[0_0_15px_rgba(212,175,55,0.95)] z-20 pointer-events-none" />

      {/* CENTRAL 3D SCALLOPED DIE-CUT GOLD PLAQUE SEAL ("TAP TO OPEN") */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={
          openingState === 'opening'
            ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] }
            : { scale: [1, 1.025, 1], opacity: 1 }
        }
        transition={
          openingState === 'opening'
            ? { duration: 0.45, ease: 'easeInOut' }
            : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative z-30 w-48 sm:w-56 h-36 sm:h-40 flex items-center justify-center cursor-pointer select-none filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
      >
        {/* High-Fidelity Multi-Layer Scalloped Baroque Plaque SVG */}
        <svg
          viewBox="0 0 220 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            {/* Metallic Foil Shimmer Gradients */}
            <linearGradient id="richGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4D9" />
              <stop offset="25%" stopColor="#E6C875" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#96741D" />
              <stop offset="100%" stopColor="#FFF4D9" />
            </linearGradient>

            <linearGradient id="innerParchmentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="50%" stopColor="#F9F3E6" />
              <stop offset="100%" stopColor="#EDE3D1" />
            </linearGradient>

            <linearGradient id="goldFiligreeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#8C6D23" />
              <stop offset="100%" stopColor="#5A4514" />
            </linearGradient>

            {/* Specular Bevel Filter */}
            <filter id="goldBevel" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
              <feOffset in="blur" dx="1" dy="1.5" result="offset" />
              <feSpecularLighting in="blur" surfaceScale="2" specularConstant="1" specularExponent="15" lightingColor="#FFFDF7" result="spec">
                <fePointLight x="110" y="40" z="80" />
              </feSpecularLighting>
              <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="specOut" />
              </feMerge>
            </filter>
          </defs>

          {/* LAYER 1: Outer Scalloped Baroque Gold Frame */}
          <path
            d="M20 80 C20 56, 32 38, 48 32 C54 20, 70 14, 88 16 C98 8, 122 8, 132 16 C150 14, 166 20, 172 32 C188 38, 200 56, 200 80 C200 104, 188 122, 172 128 C166 140, 150 146, 132 144 C122 152, 98 152, 88 144 C70 146, 54 140, 48 128 C32 122, 20 104, 20 80 Z"
            fill="url(#richGoldGrad)"
            stroke="#96741D"
            strokeWidth="1.5"
            filter="url(#goldBevel)"
          />

          {/* LAYER 2: Inner Stepped Gold Rim */}
          <path
            d="M25 80 C25 58, 36 42, 51 36 C57 25, 72 19, 89 21 C99 13, 121 13, 131 21 C148 19, 163 25, 169 36 C184 42, 195 58, 195 80 C195 102, 184 118, 169 124 C163 135, 148 141, 131 139 C121 147, 99 147, 89 139 C72 141, 57 135, 51 124 C36 118, 25 102, 25 80 Z"
            fill="#B58F28"
            opacity="0.85"
          />

          {/* LAYER 3: Ivory / Cream Inset Bed */}
          <path
            d="M28 80 C28 60, 39 44, 53 39 C59 28, 73 23, 90 25 C100 17, 120 17, 130 25 C147 23, 161 28, 167 39 C181 44, 192 60, 192 80 C192 100, 181 116, 167 121 C161 132, 147 137, 130 135 C120 143, 100 143, 90 135 C73 137, 59 132, 53 121 C39 116, 28 100, 28 80 Z"
            fill="url(#innerParchmentGrad)"
            stroke="url(#richGoldGrad)"
            strokeWidth="2"
          />

          {/* LAYER 4: Inner Dotted Gold Filigree Ring */}
          <path
            d="M34 80 C34 64, 43 50, 56 46 C61 36, 74 32, 89 33 C98 26, 122 26, 131 33 C146 32, 159 36, 164 46 C177 50, 186 64, 186 80 C186 96, 177 110, 164 114 C159 124, 146 128, 131 127 C122 134, 98 134, 89 127 C74 128, 61 124, 56 114 C43 110, 34 96, 34 80 Z"
            stroke="url(#goldFiligreeGrad)"
            strokeWidth="1.2"
            strokeDasharray="3 2"
            fill="none"
          />

          {/* Top Filigree Crown Ornament */}
          <path
            d="M110 32 C104 36, 96 38, 90 35 C95 40, 102 41, 110 37 C118 41, 125 40, 130 35 C124 38, 116 36, 110 32 Z"
            fill="url(#richGoldGrad)"
          />
          <circle cx="110" cy="30" r="2.5" fill="url(#richGoldGrad)" />

          {/* Bottom Filigree Scroll Flourish */}
          <path
            d="M110 128 C104 124, 96 122, 90 125 C95 120, 102 119, 110 123 C118 119, 125 120, 130 125 C124 122, 116 124, 110 128 Z"
            fill="url(#richGoldGrad)"
          />
          <circle cx="110" cy="130" r="2.5" fill="url(#richGoldGrad)" />
        </svg>

        {/* Plaque Typography - Clean & Minimal (ONLY TAP TO OPEN) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-2">
          {/* Top Filigree Flourish */}
          <div className="flex items-center gap-1.5 text-gold-600 mb-1.5 opacity-90">
            <span className="h-[0.5px] w-5 bg-gradient-to-r from-transparent to-gold-600" />
            <span className="text-[10px]">✤</span>
            <span className="h-[0.5px] w-5 bg-gradient-to-l from-transparent to-gold-600" />
          </div>

          {/* Main Action Text */}
          <h3 className="font-serif text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#23311f] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
            Tap To Open
          </h3>

          {/* Bottom Filigree Flourish */}
          <div className="flex items-center gap-1.5 text-gold-600 mt-1.5 opacity-90">
            <span className="h-[0.5px] w-5 bg-gradient-to-r from-transparent to-gold-600" />
            <span className="text-[10px]">✤</span>
            <span className="h-[0.5px] w-5 bg-gradient-to-l from-transparent to-gold-600" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
