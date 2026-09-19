import React from 'react';
import { motion } from 'framer-motion';

interface PalaceStageBackdropProps {
  isOpened?: boolean;
  isOpening?: boolean;
}

export const PalaceStageBackdrop: React.FC<PalaceStageBackdropProps> = ({
  isOpened = false,
  isOpening = false,
}) => {
  const curtainsDrawn = isOpened || isOpening;

  return (
    <div className="fixed inset-0 w-full h-full min-h-[100dvh] overflow-hidden pointer-events-none select-none z-0">
      
      {/* 1. DEEP RICH VELVET STAGE BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#182315] via-[#23331f] to-[#121b10]" />

      {/* 2. WARM GOLDEN AMBIENT CENTRAL BACKLIGHT / SPOTLIGHT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] aspect-square rounded-full bg-radial from-[#d4af37]/22 via-[#aa841e]/8 to-transparent blur-3xl" />

      {/* 3. FLOATING GOLDEN STARDUST MOTES */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { top: '18%', left: '22%', size: 4, delay: 0, duration: 6 },
          { top: '35%', left: '78%', size: 5, delay: 1.5, duration: 7 },
          { top: '55%', left: '15%', size: 3, delay: 0.8, duration: 5.5 },
          { top: '70%', left: '85%', size: 4, delay: 2.2, duration: 6.5 },
          { top: '28%', left: '50%', size: 5, delay: 3, duration: 8 },
          { top: '65%', left: '42%', size: 3, delay: 1, duration: 5 },
          { top: '80%', left: '25%', size: 4, delay: 2.7, duration: 7.2 },
        ].map((mote, i) => (
          <motion.div
            key={`mote-${i}`}
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
              opacity: [0.2, 0.75, 0.2],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: mote.duration,
              repeat: Infinity,
              delay: mote.delay,
              ease: 'easeInOut',
            }}
            style={{
              top: mote.top,
              left: mote.left,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
            }}
            className="absolute rounded-full bg-[#faeed1] shadow-[0_0_8px_#d4af37]"
          />
        ))}
      </div>

      {/* 4. ROYAL PALACE SILHOUETTE (Grand Mughal Arches, Domes & Minarets) */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center opacity-35 mix-blend-screen pointer-events-none">
        <svg
          viewBox="0 0 1000 1200"
          className="w-full h-full max-w-[850px] object-contain text-[#c5a880]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="palaceGoldGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#faeed1" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#d4af37" stopOpacity="0.55" />
              <stop offset="85%" stopColor="#8f6f21" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3d2f0a" stopOpacity="0.05" />
            </linearGradient>

            <pattern id="jaliPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M15 0 L30 15 L15 30 L0 15 Z M15 5 L25 15 L15 25 L5 15 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.35"
              />
            </pattern>
          </defs>

          {/* Background Lattice Jali Wall */}
          <rect x="150" y="250" width="700" height="750" fill="url(#jaliPattern)" opacity="0.45" />

          {/* Central Grand Archway (Trefoil / Multi-Foil Mughal Arch) */}
          <path
            d="M 250 1100 
               L 250 550 
               C 250 420, 320 320, 420 270 
               C 460 250, 480 200, 500 150 
               C 520 200, 540 250, 580 270 
               C 680 320, 750 420, 750 550 
               L 750 1100 Z"
            fill="none"
            stroke="url(#palaceGoldGlow)"
            strokeWidth="3.5"
          />

          {/* Inner Decorative Arch Trim */}
          <path
            d="M 280 1100 
               L 280 570 
               C 280 460, 350 370, 440 320 
               C 470 300, 490 260, 500 220 
               C 510 260, 530 300, 560 320 
               C 650 370, 720 460, 720 570 
               L 720 1100"
            fill="none"
            stroke="url(#palaceGoldGlow)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Central Dome Spire & Crescent Finial */}
          <path d="M 500 150 L 500 90" stroke="url(#palaceGoldGlow)" strokeWidth="3" />
          <circle cx="500" cy="85" r="5" fill="#faeed1" />
          {/* Crescent Moon */}
          <path
            d="M 504 70 A 10 10 0 1 0 504 88 A 7.5 7.5 0 1 1 504 70 Z"
            fill="url(#palaceGoldGlow)"
          />

          {/* Left Palace Dome & Minaret */}
          <g transform="translate(100, 200)">
            {/* Minaret Spire */}
            <line x1="60" y1="900" x2="60" y2="200" stroke="url(#palaceGoldGlow)" strokeWidth="2.5" />
            <line x1="40" y1="900" x2="40" y2="200" stroke="url(#palaceGoldGlow)" strokeWidth="2.5" />
            {/* Minaret Balcony */}
            <rect x="35" y="320" width="30" height="8" rx="2" fill="url(#palaceGoldGlow)" />
            <rect x="30" y="200" width="40" height="12" rx="2" fill="url(#palaceGoldGlow)" />
            {/* Minaret Cupola Dome */}
            <path d="M 35 200 C 35 150, 50 140, 50 120 C 50 140, 65 150, 65 200 Z" fill="url(#palaceGoldGlow)" />
            <line x1="50" y1="120" x2="50" y2="90" stroke="url(#palaceGoldGlow)" strokeWidth="2" />
            <circle cx="50" cy="88" r="3" fill="#faeed1" />
          </g>

          {/* Right Palace Dome & Minaret */}
          <g transform="translate(740, 200)">
            {/* Minaret Spire */}
            <line x1="60" y1="900" x2="60" y2="200" stroke="url(#palaceGoldGlow)" strokeWidth="2.5" />
            <line x1="80" y1="900" x2="80" y2="200" stroke="url(#palaceGoldGlow)" strokeWidth="2.5" />
            {/* Minaret Balcony */}
            <rect x="55" y="320" width="30" height="8" rx="2" fill="url(#palaceGoldGlow)" />
            <rect x="50" y="200" width="40" height="12" rx="2" fill="url(#palaceGoldGlow)" />
            {/* Minaret Cupola Dome */}
            <path d="M 55 200 C 55 150, 70 140, 70 120 C 70 140, 85 150, 85 200 Z" fill="url(#palaceGoldGlow)" />
            <line x1="70" y1="120" x2="70" y2="90" stroke="url(#palaceGoldGlow)" strokeWidth="2" />
            <circle cx="70" cy="88" r="3" fill="#faeed1" />
          </g>
        </svg>
      </div>

      {/* 5. HANGING BRASS FANOOS LANTERNS (Left & Right with Candlelight Glow) */}
      {/* Left Lantern */}
      <motion.div
        animate={{
          rotate: [-1.2, 1.2, -1.2],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-0 left-4 sm:left-12 z-10 flex flex-col items-center pointer-events-none"
      >
        {/* Golden Hanging Chain */}
        <div className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-[#d4af37]/80 via-[#aa841e] to-[#d4af37]" />

        {/* Lantern Body */}
        <div className="relative flex flex-col items-center">
          {/* Radial Candle Glow */}
          <motion.div
            animate={{
              scale: [0.92, 1.15, 0.95, 1.08, 0.92],
              opacity: [0.55, 0.85, 0.6, 0.8, 0.55],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-radial from-[#ffca58]/45 via-[#e59b24]/20 to-transparent blur-xl pointer-events-none"
          />

          {/* Ornate Brass Lantern SVG */}
          <svg width="44" height="68" viewBox="0 0 50 80" className="drop-shadow-[0_8px_15px_rgba(0,0,0,0.8)]">
            {/* Cap */}
            <path d="M 25 0 L 28 8 L 22 8 Z" fill="#d4af37" />
            <circle cx="25" cy="10" r="3" fill="#e7ca6d" />
            <path d="M 12 18 C 18 12, 32 12, 38 18 L 42 28 L 8 28 Z" fill="#aa841e" stroke="#d4af37" strokeWidth="1" />
            {/* Glass Cage */}
            <path d="M 8 28 L 14 62 L 36 62 L 42 28 Z" fill="#faeed1" fillOpacity="0.2" stroke="#d4af37" strokeWidth="1.5" />
            {/* Inner Flame */}
            <ellipse cx="25" cy="45" rx="3.5" ry="7" fill="#ffeaa7" />
            <ellipse cx="25" cy="45" rx="2" ry="4" fill="#ff7675" />
            {/* Cage Filigree Ribs */}
            <line x1="25" y1="28" x2="25" y2="62" stroke="#d4af37" strokeWidth="1.5" />
            <line x1="17" y1="28" x2="20" y2="62" stroke="#aa841e" strokeWidth="1" />
            <line x1="33" y1="28" x2="30" y2="62" stroke="#aa841e" strokeWidth="1" />
            {/* Base / Finial */}
            <path d="M 14 62 L 36 62 L 32 70 L 18 70 Z" fill="#aa841e" stroke="#d4af37" strokeWidth="1" />
            <circle cx="25" cy="74" r="2.5" fill="#d4af37" />
          </svg>
        </div>
      </motion.div>

      {/* Right Lantern */}
      <motion.div
        animate={{
          rotate: [1.2, -1.2, 1.2],
        }}
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-0 right-4 sm:right-12 z-10 flex flex-col items-center pointer-events-none"
      >
        {/* Golden Hanging Chain */}
        <div className="w-[1.5px] h-28 sm:h-36 bg-gradient-to-b from-[#d4af37]/80 via-[#aa841e] to-[#d4af37]" />

        {/* Lantern Body */}
        <div className="relative flex flex-col items-center">
          {/* Radial Candle Glow */}
          <motion.div
            animate={{
              scale: [0.95, 1.18, 0.92, 1.1, 0.95],
              opacity: [0.6, 0.9, 0.55, 0.85, 0.6],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-radial from-[#ffca58]/45 via-[#e59b24]/20 to-transparent blur-xl pointer-events-none"
          />

          {/* Ornate Brass Lantern SVG */}
          <svg width="40" height="64" viewBox="0 0 50 80" className="drop-shadow-[0_8px_15px_rgba(0,0,0,0.8)]">
            {/* Cap */}
            <path d="M 25 0 L 28 8 L 22 8 Z" fill="#d4af37" />
            <circle cx="25" cy="10" r="3" fill="#e7ca6d" />
            <path d="M 12 18 C 18 12, 32 12, 38 18 L 42 28 L 8 28 Z" fill="#aa841e" stroke="#d4af37" strokeWidth="1" />
            {/* Glass Cage */}
            <path d="M 8 28 L 14 62 L 36 62 L 42 28 Z" fill="#faeed1" fillOpacity="0.2" stroke="#d4af37" strokeWidth="1.5" />
            {/* Inner Flame */}
            <ellipse cx="25" cy="45" rx="3.5" ry="7" fill="#ffeaa7" />
            <ellipse cx="25" cy="45" rx="2" ry="4" fill="#ff7675" />
            {/* Cage Filigree Ribs */}
            <line x1="25" y1="28" x2="25" y2="62" stroke="#d4af37" strokeWidth="1.5" />
            <line x1="17" y1="28" x2="20" y2="62" stroke="#aa841e" strokeWidth="1" />
            <line x1="33" y1="28" x2="30" y2="62" stroke="#aa841e" strokeWidth="1" />
            {/* Base / Finial */}
            <path d="M 14 62 L 36 62 L 32 70 L 18 70 Z" fill="#aa841e" stroke="#d4af37" strokeWidth="1" />
            <circle cx="25" cy="74" r="2.5" fill="#d4af37" />
          </svg>
        </div>
      </motion.div>

      {/* 6. ROYAL EMERALD VELVET STAGE CURTAINS (Left & Right with Gold Bullion Trim) */}
      
      {/* LEFT VELVET CURTAIN DRAPE */}
      <motion.div
        initial={false}
        animate={
          curtainsDrawn
            ? {
                x: '-72%',
                opacity: 0.85,
              }
            : {
                x: '0%',
                opacity: 1,
              }
        }
        transition={{
          duration: 3.0,
          ease: [0.25, 1, 0.5, 1], // Slow-mo heavy velvet gather
        }}
        style={{ transformOrigin: 'left top' }}
        className="absolute top-0 left-0 bottom-0 w-[55vw] sm:w-[50vw] max-w-[420px] z-20 flex"
      >
        {/* Deep Emerald Velvet Folds Texture */}
        <div className="relative w-full h-full bg-gradient-to-r from-[#122416] via-[#1f3d25] via-40% to-[#17301c] shadow-[15px_0_40px_rgba(0,0,0,0.85)] border-r-2 border-[#d4af37]/80 flex justify-end">
          {/* Velvet Vertical Drape Highlights */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.45)_0px,rgba(255,255,255,0.06)_18px,rgba(0,0,0,0.4)_36px)] opacity-75" />
          
          {/* Inner Golden Embroidered Ribbon Border */}
          <div className="relative h-full w-2.5 sm:w-3.5 bg-gradient-to-b from-[#faeed1] via-[#d4af37] to-[#aa841e] shadow-[0_0_10px_rgba(212,175,55,0.6)]" />

          {/* Golden Tassel Tie-Back (Appears when curtain is drawn open) */}
          {curtainsDrawn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1.0 }}
              className="absolute top-[45%] -right-3 sm:-right-4 flex flex-col items-center pointer-events-none"
            >
              <div className="w-5 h-2 rounded-full bg-[#d4af37] border border-[#faeed1] shadow-md" />
              <div className="w-1.5 h-6 bg-gradient-to-b from-[#d4af37] to-[#8f6f21]" />
              <div className="w-4 h-8 rounded-b-full bg-gradient-to-b from-[#d4af37] to-[#aa841e] shadow-lg border-t border-[#faeed1]" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* RIGHT VELVET CURTAIN DRAPE */}
      <motion.div
        initial={false}
        animate={
          curtainsDrawn
            ? {
                x: '72%',
                opacity: 0.85,
              }
            : {
                x: '0%',
                opacity: 1,
              }
        }
        transition={{
          duration: 3.0,
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{ transformOrigin: 'right top' }}
        className="absolute top-0 right-0 bottom-0 w-[55vw] sm:w-[50vw] max-w-[420px] z-20 flex"
      >
        {/* Deep Emerald Velvet Folds Texture */}
        <div className="relative w-full h-full bg-gradient-to-l from-[#122416] via-[#1f3d25] via-40% to-[#17301c] shadow-[-15px_0_40px_rgba(0,0,0,0.85)] border-l-2 border-[#d4af37]/80 flex justify-start">
          {/* Inner Golden Embroidered Ribbon Border */}
          <div className="relative h-full w-2.5 sm:w-3.5 bg-gradient-to-b from-[#faeed1] via-[#d4af37] to-[#aa841e] shadow-[0_0_10px_rgba(212,175,55,0.6)]" />

          {/* Velvet Vertical Drape Highlights */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.4)_0px,rgba(255,255,255,0.06)_18px,rgba(0,0,0,0.45)_36px)] opacity-75" />

          {/* Golden Tassel Tie-Back (Appears when curtain is drawn open) */}
          {curtainsDrawn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1.0 }}
              className="absolute top-[45%] -left-3 sm:-left-4 flex flex-col items-center pointer-events-none"
            >
              <div className="w-5 h-2 rounded-full bg-[#d4af37] border border-[#faeed1] shadow-md" />
              <div className="w-1.5 h-6 bg-gradient-to-b from-[#d4af37] to-[#8f6f21]" />
              <div className="w-4 h-8 rounded-b-full bg-gradient-to-b from-[#d4af37] to-[#aa841e] shadow-lg border-t border-[#faeed1]" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* 7. TOP SCALLOPED VELVET VALANCE / SWAG (Frames the stage header) */}
      <div className="absolute top-0 inset-x-0 h-14 sm:h-20 z-25 overflow-hidden flex flex-col pointer-events-none">
        <div className="relative w-full h-full bg-gradient-to-b from-[#0f1d12] via-[#1a331f] to-[#122416] shadow-[0_10px_25px_rgba(0,0,0,0.85)] border-b border-[#d4af37]/60 flex items-end justify-around px-2">
          {/* Swag Drape Curves */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
          
          {/* Gold Bullion Fringe Drops */}
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#faeed1] via-[#d4af37] to-[#aa841e] shadow-[0_2px_8px_rgba(212,175,55,0.7)]" />
        </div>
      </div>

    </div>
  );
};
