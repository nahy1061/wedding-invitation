import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BotanicalArt } from './BotanicalArt';
import type { WeddingDetails } from '../../config/weddingData';

interface StationeryEnvelopeProps {
  wedding: WeddingDetails;
  guestName: string | null;
  onOpenComplete: () => void;
}

export const StationeryEnvelope: React.FC<StationeryEnvelopeProps> = ({
  wedding,
  guestName,
  onOpenComplete,
}) => {
  const [openingPhase, setOpeningPhase] = useState<'sealed' | 'unsealing' | 'flap-opened' | 'card-rising'>('sealed');

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openingPhase !== 'sealed') return;

    // Trigger subtle gold & pearl dust particles
    try {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x, y },
        colors: ['#dfcaa8', '#c5a880', '#fdfbf7', '#9d815d'],
        ticks: 100,
        gravity: 0.6,
        scalar: 0.8,
        shapes: ['circle'],
      });
    } catch {
      // fallback
    }

    setOpeningPhase('unsealing');

    setTimeout(() => {
      setOpeningPhase('flap-opened');
    }, 500);

    setTimeout(() => {
      setOpeningPhase('card-rising');
    }, 1100);

    setTimeout(() => {
      onOpenComplete();
    }, 2100);
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center p-4">
      {/* 3D Envelope Body */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[380px] sm:max-w-[430px] aspect-[4/5.2] rounded-lg shadow-[0_25px_60px_-15px_rgba(56,50,44,0.35),0_0_0_1px_rgba(197,168,128,0.25)] flex flex-col justify-between overflow-hidden cursor-pointer select-none"
        style={{
          background: 'linear-gradient(145deg, #3d3630 0%, #2e2823 100%)',
        }}
        onClick={handleOpen}
      >
        {/* Subtle Linen Paper Texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#dfcaa8 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Delicate Gold Foil Frame */}
        <div className="absolute inset-3 sm:inset-4 border border-[#c5a880]/30 rounded pointer-events-none" />
        <div className="absolute inset-4 sm:inset-5 border border-[#c5a880]/15 border-dashed rounded pointer-events-none" />

        {/* Corner Flourishes */}
        <BotanicalArt variant="corner-line" className="absolute top-4 left-4" />
        <BotanicalArt variant="corner-line" className="absolute top-4 right-4 rotate-90" />
        <BotanicalArt variant="corner-line" className="absolute bottom-4 left-4 -rotate-90" />
        <BotanicalArt variant="corner-line" className="absolute bottom-4 right-4 rotate-180" />

        {/* Envelope Top Calligraphy */}
        <div className="relative z-10 pt-8 sm:pt-10 text-center px-6">
          <p className="font-arabic text-[#dfcaa8] text-base sm:text-lg opacity-90 tracking-wide">
            {wedding.bismillahArabic}
          </p>
          <BotanicalArt variant="top-crest" className="my-2" />
          <p className="text-[10px] tracking-[0.3em] font-serif uppercase text-[#c5a880]/90">
            Nikkah Invitation
          </p>
        </div>

        {/* Center: Wax Seal & 3D Flap */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-2">
          
          {/* 3D Flap */}
          <motion.div
            initial={false}
            animate={
              openingPhase === 'flap-opened' || openingPhase === 'card-rising'
                ? { rotateX: 180, zIndex: 5 }
                : { rotateX: 0, zIndex: 15 }
            }
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute -top-14 w-full flex justify-center pointer-events-none"
          >
            <svg
              viewBox="0 0 380 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[92%] drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
            >
              <path
                d="M10 10 L190 120 L370 10"
                fill="#342d27"
                stroke="#c5a880"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Sliding Card Preview */}
          <AnimatePresence>
            {openingPhase === 'card-rising' && (
              <motion.div
                initial={{ y: 90, scale: 0.9, opacity: 0 }}
                animate={{ y: -60, scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                className="absolute w-[86%] h-[82%] rounded-md bg-[#fdfbf7] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)] border border-[#c5a880]/40 flex flex-col items-center justify-center text-center z-10 paper-texture"
              >
                <span className="font-serif text-[10px] tracking-[0.25em] text-[#8e8271] uppercase">
                  Solemnization of Marriage
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-[#2c2724] font-normal tracking-wide mt-2">
                  {wedding.brideName} & {wedding.groomName}
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Guest Name Ribbon (if provided) */}
          {guestName && openingPhase === 'sealed' && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 px-4 py-1.5 rounded-sm bg-[#fdfbf7] text-[#2c2724] text-xs font-serif tracking-widest uppercase shadow-md border-y border-[#c5a880]/50 text-center"
            >
              <span className="text-[9px] block text-[#8e8271] normal-case italic font-sans">
                Cordially Invited
              </span>
              <span className="font-semibold text-[#2c2724] font-serif">
                {guestName}
              </span>
            </motion.div>
          )}

          {/* Tactile Wax Seal Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            animate={
              openingPhase !== 'sealed'
                ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] }
                : { scale: [1, 1.02, 1] }
            }
            transition={
              openingPhase !== 'sealed'
                ? { duration: 0.5 }
                : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center select-none"
          >
            {/* Wax Organic Outer Rim */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8f281f] via-[#751b14] to-[#470f0b] shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.3)] border border-[#a8382d]/30" />
            
            {/* Wax Stamped Center */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#7a1e16] to-[#450e0a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center border border-[#9e2e23]/40">
              <div className="text-center">
                <span className="font-serif text-[#fdfbf7] text-base sm:text-lg font-bold tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  H & A
                </span>
              </div>
            </div>

            {/* Ambient Pulse Ring */}
            {openingPhase === 'sealed' && (
              <span className="absolute -inset-2 rounded-full border border-[#c5a880]/30 animate-ping opacity-25 pointer-events-none" />
            )}
          </motion.div>

          {openingPhase === 'sealed' && (
            <p className="mt-3 text-[11px] sm:text-xs text-[#dfcaa8]/90 font-serif tracking-[0.2em] uppercase text-center">
              ✦ Tap to Open ✦
            </p>
          )}
        </div>

        {/* Envelope Footer */}
        <div className="relative z-10 pb-6 sm:pb-8 text-center px-4">
          <p className="text-[11px] font-serif text-[#c5a880]/90 tracking-[0.2em] uppercase">
            {wedding.eventDateFormatted}
          </p>
          <p className="text-[10px] text-[#c5a880]/60 font-sans tracking-wider mt-0.5">
            Islamabad, Pakistan
          </p>
        </div>
      </motion.div>
    </div>
  );
};
