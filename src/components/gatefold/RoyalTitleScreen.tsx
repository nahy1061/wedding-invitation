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
        className="relative z-10 max-w-[420px] w-full flex flex-col items-center py-6"
      >
        {/* Delicate Golden Top Flourish */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[0.5px] w-14 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <span className="text-gold-300 text-sm">✦</span>
          <div className="h-[0.5px] w-14 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Grand Title */}
        <h1 className="font-display text-2xl sm:text-3xl tracking-[0.3em] uppercase text-gold-100 font-medium drop-shadow-[0_2px_16px_rgba(212,175,55,0.6)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          Nikkah Ceremony<br />
          <span className="text-xl sm:text-2xl tracking-[0.25em] text-gold-200 font-light block mt-1">
            Invitation
          </span>
        </h1>

        {/* Delicate Golden Bottom Flourish */}
        <div className="flex items-center justify-center gap-3 mt-4 mb-2">
          <div className="h-[0.5px] w-14 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <span className="text-gold-300 text-sm">✦</span>
          <div className="h-[0.5px] w-14 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Subtle Bottom Indicator */}
        <motion.p
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-[10px] font-serif uppercase tracking-[0.28em] text-gold-300/80 font-medium"
        >
          ✦ Opening Invitation ✦
        </motion.p>
      </motion.div>
    </div>
  );
};
