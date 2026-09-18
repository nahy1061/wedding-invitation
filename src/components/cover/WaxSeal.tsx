import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface WaxSealProps {
  monogram?: string;
  onClick: () => void;
  isOpening: boolean;
  guestName?: string | null;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  monogram = 'A&Z',
  onClick,
  isOpening,
  guestName,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpening) return;

    // Trigger celebratory gold sparkles from the wax seal center
    try {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 45,
        spread: 70,
        origin: { x, y },
        colors: ['#faeed1', '#d4af37', '#aa841e', '#e7ca6d', '#ffffff'],
        ticks: 120,
        gravity: 0.8,
        scalar: 0.9,
        shapes: ['circle'],
      });
    } catch {
      // Fallback
    }

    onClick();
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Personalized Tag Ribbon if guest name exists */}
      {guestName && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 px-4 py-1.5 rounded-sm bg-gradient-to-r from-parchment-200 via-parchment-100 to-parchment-200 text-emerald-950 text-xs sm:text-sm font-serif tracking-widest uppercase shadow-[0_4px_15px_rgba(0,0,0,0.4)] border-y border-gold-500/40 text-center"
        >
          <span className="text-[10px] block text-gold-700 font-sans tracking-widest normal-case italic">
            Specially Invited
          </span>
          <span className="font-semibold text-emerald-950 font-serif tracking-wider">
            {guestName}
          </span>
        </motion.div>
      )}

      {/* Wax Seal Body */}
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={isOpening}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={
          isOpening
            ? { scale: [1, 1.25, 0], opacity: [1, 1, 0], rotate: [0, 15, -25] }
            : { scale: [1, 1.03, 1] }
        }
        transition={
          isOpening
            ? { duration: 0.6, ease: 'easeInOut' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative group cursor-pointer w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center select-none focus:outline-none"
        aria-label="Break Wax Seal to Open Invitation"
      >
        {/* Outer Wax Irregular Rim */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c93b2b] via-[#8f1d16] to-[#590e09] shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(201,59,43,0.3)] border-2 border-[#e65a4c]/30 transform group-hover:rotate-12 transition-transform duration-500" />
        
        {/* Inner Wax Stamped Bevel */}
        <div className="absolute inset-2 sm:inset-2.5 rounded-full bg-gradient-to-br from-[#8f1d16] via-[#6e130d] to-[#450905] shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center border border-[#d43d2e]/40">
          
          {/* Monogram / Stamp Text */}
          <div className="relative text-center">
            <span className="block font-serif text-gold-200 text-base sm:text-lg font-bold tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {monogram}
            </span>
            <span className="block text-[8px] sm:text-[9px] text-gold-300/80 uppercase font-sans tracking-widest">
              Nikkah
            </span>
          </div>
        </div>

        {/* Ambient Pulsing Ring Indicator */}
        {!isOpening && (
          <span className="absolute -inset-3 rounded-full border border-gold-400/40 animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>

      {/* Prompt Instruction */}
      {!isOpening && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-xs sm:text-sm text-gold-300/90 font-serif tracking-widest uppercase text-center drop-shadow-md"
        >
          ✦ Tap Wax Seal to Open ✦
        </motion.p>
      )}
    </div>
  );
};
