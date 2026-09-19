import React from 'react';
import { motion } from 'framer-motion';
import type { WeddingDetails } from '../../config/weddingData';

interface RoyalTitleScreenProps {
  wedding: WeddingDetails;
  guestName?: string | null;
  isVisible: boolean;
}

export const RoyalTitleScreen: React.FC<RoyalTitleScreenProps> = ({
  wedding,
  guestName,
  isVisible,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#141e12] via-[#1f2f1c] to-[#0f170e] text-center px-4 select-none z-0">
      
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

      {/* Central Royal Title Content */}
      <motion.div
        initial={false}
        animate={
          isVisible
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.94, y: 15 }
        }
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[420px] w-full flex flex-col items-center py-6"
      >
        {/* Arabic Bismillah */}
        <p className="font-arabic text-2xl sm:text-3xl text-gold-300/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {wedding.bismillahArabic}
        </p>

        {/* Delicate Golden Flourish */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <span className="text-gold-400 text-xs">✦</span>
          <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Personalized Tag if present */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-2 px-3.5 py-1 rounded-full bg-black/50 border border-gold-400/40 backdrop-blur-sm"
          >
            <span className="text-[9px] text-gold-300/80 font-sans italic">
              Specially Invited
            </span>
            <p className="text-xs font-serif text-gold-200 font-semibold tracking-wider">
              {guestName}
            </p>
          </motion.div>
        )}

        {/* Subtitle */}
        <p className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.3em] text-gold-400/90 font-semibold mb-2 drop-shadow-sm">
          Nikkah Ceremony Invitation
        </p>

        {/* Bride & Groom Royal Names */}
        <div className="my-2 space-y-1">
          <h1 className="font-display text-2xl sm:text-3xl text-gold-100 font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {wedding.brideName}
          </h1>

          <div className="flex items-center justify-center gap-2.5 my-1">
            <div className="h-[0.5px] w-6 bg-gold-400/50" />
            <span className="font-script text-2xl sm:text-3xl text-gold-400 italic">&</span>
            <div className="h-[0.5px] w-6 bg-gold-400/50" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl text-gold-100 font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {wedding.groomName}
          </h1>
        </div>

        {/* Event Date */}
        <p className="mt-4 text-xs font-serif tracking-[0.2em] text-gold-300/80 uppercase">
          {wedding.eventDateFormatted}
        </p>

        {/* Subtle Indicator */}
        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-[9px] font-serif uppercase tracking-[0.25em] text-gold-400/60"
        >
          ✦ Opening Invitation Details ✦
        </motion.p>
      </motion.div>
    </div>
  );
};
