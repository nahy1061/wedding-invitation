import React from 'react';
import { motion } from 'framer-motion';

interface SplashOverlayProps {
  onEnter: () => void;
}

export const SplashOverlay: React.FC<SplashOverlayProps> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onEnter}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none bg-[#1a2617]"
    >
      {/* Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-radial from-gold-500/15 via-gold-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Decorative Top Flourish */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gold-400/60 text-lg tracking-[0.5em] font-serif mb-6"
      >
        ✦ ✦ ✦
      </motion.div>

      {/* Bismillah */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-arabic text-xl sm:text-2xl text-gold-300/80 mb-8 leading-relaxed"
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </motion.p>

      {/* Pulsing Tap Indicator */}
      <div className="relative mb-6">
        {/* Outer ring pulses */}
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 w-16 h-16 -m-2 rounded-full border-2 border-gold-400/40"
        />
        {/* Inner circle */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400/60 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3 h-3 rounded-full bg-gold-400"
          />
        </motion.div>
      </div>

      {/* Instruction Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ delay: 0.8, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.3em] text-gold-300/80"
      >
        Tap to enter
      </motion.p>

      {/* Bottom flourish */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute bottom-12 text-gold-400/40 text-xs tracking-[0.5em] font-serif"
      >
        ✦ ✦ ✦
      </motion.div>
    </motion.div>
  );
};
