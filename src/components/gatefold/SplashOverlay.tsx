import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Volume2 } from 'lucide-react';
import { WEDDING_DATA } from '../../config/weddingData';

interface SplashOverlayProps {
  onEnter: () => void;
}

export const SplashOverlay: React.FC<SplashOverlayProps> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onEnter}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs select-none cursor-pointer"
    >
      {/* Centered Modal Card with Gentle Breathing Pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: [1, 1.018, 1],
          boxShadow: [
            '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(197,168,128,0.4)',
            '0 25px 60px rgba(212,175,55,0.22), 0 0 16px rgba(212,175,55,0.3), 0 0 0 1px rgba(197,168,128,0.7)',
            '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(197,168,128,0.4)',
          ],
        }}
        exit={{ opacity: 0, scale: 0.93, y: 8 }}
        transition={{
          opacity: { duration: 0.4 },
          y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          scale: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
          boxShadow: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
        }}
        onClick={(e) => {
          e.stopPropagation();
          onEnter();
        }}
        className="relative w-full max-w-[330px] sm:max-w-[360px] cream-paper-texture rounded-2xl p-6 sm:p-7 text-center shadow-2xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
      >
        {/* Ornate Frame & Corner Filigrees */}
        <div className="absolute inset-2.5 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
        <div className="absolute inset-0 filigree-corners pointer-events-none" />
        <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

        {/* Ambient Warm Tint */}
        <div className="absolute inset-0 tint-invitation pointer-events-none opacity-40" />

        {/* Modal Inner Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Top Flourish */}
          <div className="gold-ornament mb-2">
            <span className="text-[#855e1a] text-xs">✦ ✦ ✦</span>
          </div>

          {/* Invitation Label */}
          <p className="text-[10px] sm:text-[11px] font-display tracking-[0.25em] uppercase text-[#2c4227] font-bold">
            The Wedding Celebration Of
          </p>

          {/* Couple Names */}
          <div className="my-2.5 space-y-0.5">
            <h2 className="font-display text-2xl sm:text-3xl text-[#12200f] font-semibold tracking-wide">
              {WEDDING_DATA.brideName}
            </h2>
            <div className="flex items-center justify-center gap-2.5 py-0.5">
              <div className="h-[0.5px] w-8 bg-gradient-to-r from-transparent to-[#bfa378]" />
              <span className="font-script text-2xl sm:text-3xl text-[#855e1a] italic">&</span>
              <div className="h-[0.5px] w-8 bg-gradient-to-l from-transparent to-[#bfa378]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#12200f] font-semibold tracking-wide">
              {WEDDING_DATA.groomName}
            </h2>
          </div>

          {/* Subtitle Message */}
          <p className="font-serif italic text-xs sm:text-[13px] text-[#2c3d28] mt-1 mb-5 leading-relaxed max-w-[260px]">
            You are cordially invited to celebrate this sacred union
          </p>

          {/* Enter Button */}
          <button
            type="button"
            onClick={onEnter}
            className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-gradient-to-r from-[#23351f] via-[#182615] to-[#23351f] text-[#faeed1] border border-[#c5a880]/70 shadow-md hover:shadow-lg hover:border-gold-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400 group-hover:rotate-12 transition-transform" />
            <span className="font-serif text-xs uppercase tracking-[0.2em] font-semibold text-gold-200">
              Open Invitation
            </span>
            <Sparkles className="w-3.5 h-3.5 text-gold-400 group-hover:-rotate-12 transition-transform" />
          </button>

          {/* Clear Volume Instruction */}
          <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[10.5px] sm:text-[11px] font-serif italic text-[#4a5f44]">
            <Volume2 className="w-3.5 h-3.5 text-[#855e1a] animate-pulse" />
            <span>Please turn up your volume for music</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
