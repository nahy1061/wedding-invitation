import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { WeddingDetails } from '../../config/weddingData';

interface PalaceGateCoverProps {
  wedding: WeddingDetails;
  guestName: string | null;
  onOpenComplete: () => void;
}

export const PalaceGateCover: React.FC<PalaceGateCoverProps> = ({
  wedding,
  guestName,
  onOpenComplete,
}) => {
  const [gateState, setGateState] = useState<'locked' | 'unlocking' | 'doors-opening'>('locked');

  const handleOpenGate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gateState !== 'locked') return;

    // Trigger radiant gold sparkle bursts
    try {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { x, y },
        colors: ['#faeed1', '#f3e0a6', '#d4af37', '#aa841e', '#ffffff'],
        ticks: 120,
        gravity: 0.7,
        scalar: 0.85,
        shapes: ['circle'],
      });
    } catch {
      // fallback
    }

    setGateState('unlocking');

    setTimeout(() => {
      setGateState('doors-opening');
    }, 450);

    setTimeout(() => {
      onOpenComplete();
    }, 1850);
  };

  return (
    <div className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center p-3 select-none">
      
      {/* 3D Gate Viewport Container */}
      <div className="relative w-full max-w-[390px] sm:max-w-[440px] aspect-[4/5.6] rounded-2xl p-3 sm:p-4 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.2)] border border-gold-500/40 bg-[#070b09] flex flex-col justify-between overflow-hidden perspective-1200">
        
        {/* Subtle Ambient Backlight when opening */}
        <motion.div
          animate={
            gateState === 'doors-opening'
              ? { opacity: 1, scale: 1.2 }
              : { opacity: 0.2, scale: 1 }
          }
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-radial from-gold-500/30 via-gold-600/10 to-transparent pointer-events-none z-0"
        />

        {/* Top Moroccan Palace Arch Header */}
        <div className="relative z-20 text-center pt-2">
          {/* Islamic Arch SVG */}
          <svg
            viewBox="0 0 340 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[280px] mx-auto text-gold-400 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
          >
            <path
              d="M10 75 V 35 C 10 35, 65 30, 120 18 C 145 12, 170 3, 170 3 C 170 3, 195 12, 220 18 C 275 30, 330 35, 330 35 V 75"
              stroke="url(#goldArchGrad)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="170" cy="3" r="2.5" fill="#faeed1" />
            <defs>
              <linearGradient id="goldArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#faeed1" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa841e" />
              </linearGradient>
            </defs>
          </svg>

          <p className="font-arabic text-gold-300 text-lg sm:text-xl drop-shadow mt-1">
            {wedding.bismillahArabic}
          </p>
          <p className="font-arabic text-xs text-gold-400/90 italic mt-0.5">
            {wedding.subVerseArabic}
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] font-serif uppercase text-gold-300/80 mt-1">
            Royal Nikkah Celebration
          </p>
        </div>

        {/* Center: The Double 3D Grand Doors Frame */}
        <div
          onClick={handleOpenGate}
          className="relative z-10 flex-1 my-3 flex items-center justify-center cursor-pointer transform-style-3d group"
        >
          {/* Door Frame Outer Border */}
          <div className="absolute inset-1 sm:inset-2 rounded-xl border-2 border-gold-500/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden flex">
            
            {/* LEFT 3D DOOR */}
            <motion.div
              initial={false}
              animate={
                gateState === 'doors-opening'
                  ? { rotateY: -105, x: -15, opacity: 0.15 }
                  : { rotateY: 0, x: 0, opacity: 1 }
              }
              transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
              style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
              className="w-1/2 h-full bg-[#120e0c] border-r border-gold-500/60 p-2.5 flex flex-col justify-between shadow-[5px_0_15px_rgba(0,0,0,0.8)] relative mashrabiya-pattern"
            >
              {/* Gold Filigree Corner Accents */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold-400" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold-400" />

              {/* Inner Decorative Panels */}
              <div className="w-full h-full border border-gold-500/30 rounded-md p-2 flex flex-col justify-between bg-[#181310]/70">
                <div className="h-1/3 border border-gold-400/20 rounded flex items-center justify-center">
                  <div className="w-3 h-3 rotate-45 border border-gold-400/40" />
                </div>
                <div className="h-1/3 border border-gold-400/20 rounded my-2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border border-gold-400/40" />
                </div>
                <div className="h-1/3 border border-gold-400/20 rounded flex items-center justify-center">
                  <div className="w-3 h-3 rotate-45 border border-gold-400/40" />
                </div>
              </div>
            </motion.div>

            {/* RIGHT 3D DOOR */}
            <motion.div
              initial={false}
              animate={
                gateState === 'doors-opening'
                  ? { rotateY: 105, x: 15, opacity: 0.15 }
                  : { rotateY: 0, x: 0, opacity: 1 }
              }
              transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
              style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
              className="w-1/2 h-full bg-[#120e0c] border-l border-gold-500/60 p-2.5 flex flex-col justify-between shadow-[-5px_0_15px_rgba(0,0,0,0.8)] relative mashrabiya-pattern"
            >
              {/* Gold Filigree Corner Accents */}
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold-400" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold-400" />

              {/* Inner Decorative Panels */}
              <div className="w-full h-full border border-gold-500/30 rounded-md p-2 flex flex-col justify-between bg-[#181310]/70">
                <div className="h-1/3 border border-gold-400/20 rounded flex items-center justify-center">
                  <div className="w-3 h-3 rotate-45 border border-gold-400/40" />
                </div>
                <div className="h-1/3 border border-gold-400/20 rounded my-2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border border-gold-400/40" />
                </div>
                <div className="h-1/3 border border-gold-400/20 rounded flex items-center justify-center">
                  <div className="w-3 h-3 rotate-45 border border-gold-400/40" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Glowing Central Palace Medallion / Lock */}
          <motion.div
            animate={
              gateState === 'locked'
                ? { scale: [1, 1.05, 1] }
                : { scale: [1, 1.3, 0], opacity: [1, 1, 0] }
            }
            transition={
              gateState === 'locked'
                ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.5 }
            }
            className="absolute z-30 w-22 h-22 sm:w-26 sm:h-26 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform"
          >
            {/* Radiant Ambient Ring */}
            <div className="absolute -inset-3 rounded-full border border-gold-400/40 animate-ping opacity-30 pointer-events-none" />

            {/* Outer Gold Medallion Rim */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f3e0a6] via-[#d4af37] to-[#8c6d23] shadow-[0_0_25px_rgba(212,175,55,0.6),0_10px_30px_rgba(0,0,0,0.8)] p-0.5 border border-[#faeed1]" />

            {/* Inner Emerald / Noir Inset */}
            <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-[#0a1e16] to-[#040c09] flex flex-col items-center justify-center border border-gold-500/50 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]">
              <span className="font-serif font-bold text-base sm:text-lg text-gold-200 tracking-widest drop-shadow">
                H & A
              </span>
              <span className="text-[8px] text-gold-400 font-sans tracking-[0.25em] uppercase">
                Nikkah
              </span>
            </div>
          </motion.div>
        </div>

        {/* Personalized Guest Ribbon (if present) */}
        {guestName && gateState === 'locked' && (
          <div className="relative z-20 text-center my-1">
            <div className="inline-block px-4 py-1 rounded bg-gradient-to-r from-transparent via-gold-500/20 to-transparent border-y border-gold-500/40">
              <span className="text-[10px] text-gold-400/80 font-sans italic block">
                Specially Invited
              </span>
              <span className="font-serif text-xs sm:text-sm font-semibold text-gold-200 tracking-wider">
                {guestName}
              </span>
            </div>
          </div>
        )}

        {/* Gate Footer Prompt */}
        <div className="relative z-20 pb-4 text-center">
          {gateState === 'locked' ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs sm:text-sm font-serif tracking-[0.25em] uppercase text-gold-300 drop-shadow flex items-center justify-center gap-2"
            >
              <span>✦</span> Tap Gate to Open <span>✦</span>
            </motion.p>
          ) : (
            <p className="text-xs font-serif tracking-[0.2em] uppercase text-gold-400/70 animate-pulse">
              Entering Ceremony...
            </p>
          )}

          <p className="text-[10px] text-gold-400/60 font-sans tracking-wider mt-1">
            {wedding.eventDateFormatted} • Islamabad
          </p>
        </div>
      </div>
    </div>
  );
};
