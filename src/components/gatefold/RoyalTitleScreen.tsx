import React from 'react';
import { motion } from 'framer-motion';
import type { WeddingDetails } from '../../config/weddingData';

interface RoyalTitleScreenProps {
  wedding?: WeddingDetails;
  guestName?: string | null;
  isVisible: boolean;
}

export const RoyalTitleScreen: React.FC<RoyalTitleScreenProps> = ({
  isVisible,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#141e12] via-[#1f2f1c] to-[#0f170e] text-center px-4 select-none z-0 text-gold-200">
      
      {/* Warm Ambient Golden Spotlight */}
      <motion.div
        animate={{
          scale: [0.92, 1.1, 0.92],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[550px] aspect-square rounded-full bg-radial from-[#d4af37]/25 via-[#aa841e]/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* Floating Golden Stardust Motes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: '18%', left: '25%', size: 4, delay: 0, duration: 6 },
          { top: '35%', left: '75%', size: 5, delay: 1.2, duration: 7 },
          { top: '55%', left: '18%', size: 3, delay: 0.6, duration: 5.5 },
          { top: '72%', left: '82%', size: 4, delay: 2.0, duration: 6.5 },
          { top: '28%', left: '50%', size: 5, delay: 2.8, duration: 8 },
        ].map((mote, i) => (
          <motion.div
            key={`title-mote-${i}`}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
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

      {/* Central Royal Title Teaser */}
      <motion.div
        initial={false}
        animate={
          isVisible
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.94, y: 15 }
        }
        transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          willChange: 'transform, opacity',
        }}
        className="relative z-10 max-w-[480px] w-full flex flex-col items-center py-6 px-4"
      >
        {/* Delicate Golden Top Flourish */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent" />
          <span className="text-gold-300 text-xs sm:text-sm tracking-widest drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">✦ ❖ ✦</span>
          <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent" />
        </div>

        {/* Grand Royal Title */}
        <div className="flex flex-col items-center select-none text-center">
          <h1
            style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif" }}
            className="text-2xl sm:text-3.5xl md:text-4xl tracking-[0.22em] sm:tracking-[0.26em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fffaf0] via-[#eed58a] to-[#a88220] drop-shadow-[0_2px_14px_rgba(212,175,55,0.7)] drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] leading-tight"
          >
            Nikkah Ceremony
          </h1>

          <span
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            className="text-sm sm:text-base md:text-lg tracking-[0.45em] uppercase font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#e7ca6d] via-[#faeed1] to-[#c59c35] mt-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          >
            Invitation
          </span>
        </div>

        {/* Delicate Golden Bottom Flourish */}
        <div className="flex items-center justify-center gap-3 mt-5 mb-2">
          <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent" />
          <span className="text-gold-300 text-xs sm:text-sm tracking-widest drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">✦ ❖ ✦</span>
          <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent" />
        </div>

        {/* Subtle Bottom Status Indicator */}
        <motion.p
          animate={{ opacity: [0.45, 0.95, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="mt-6 text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-300/85 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
        >
          ✦ Opening Invitation ✦
        </motion.p>
      </motion.div>
    </div>
  );
};
