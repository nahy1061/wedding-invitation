import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaxSeal } from './WaxSeal';
import { IslamicArch } from '../ui/IslamicArch';
import type { WeddingConfig } from '../../types/invitation';

interface EnvelopeCoverProps {
  config: WeddingConfig;
  guestName: string | null;
  onOpenComplete: () => void;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({
  config,
  guestName,
  onOpenComplete,
}) => {
  const [openingState, setOpeningState] = useState<'idle' | 'unsealing' | 'flap-opened' | 'card-sliding'>('idle');

  const handleSealClick = () => {
    if (openingState !== 'idle') return;
    
    // Step 1: Break seal
    setOpeningState('unsealing');

    // Step 2: Open Flap after 500ms
    setTimeout(() => {
      setOpeningState('flap-opened');
    }, 600);

    // Step 3: Slide card up after flap is open
    setTimeout(() => {
      setOpeningState('card-sliding');
    }, 1200);

    // Step 4: Transition to full card view
    setTimeout(() => {
      onOpenComplete();
    }, 2200);
  };

  const getMonogram = () => {
    const b = config.brideName.charAt(0) || 'A';
    const g = config.groomName.charAt(0) || 'Z';
    return `${b}&${g}`;
  };

  return (
    <div className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center p-4">
      {/* 3D Envelope Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[370px] sm:max-w-[430px] aspect-[4/5] sm:aspect-[3/4] rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(4,18,13,0.9)] perspective-1000 flex flex-col justify-between overflow-hidden border border-gold-500/30"
        style={{
          background: 'radial-gradient(circle at 50% 40%, #0d3829 0%, #072218 60%, #04120d 100%)',
        }}
      >
        {/* Subtle Moroccan Geometric Backdrop Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Gold Border Lining */}
        <div className="absolute inset-2.5 sm:inset-3.5 border border-gold-400/40 rounded-lg pointer-events-none" />
        <div className="absolute inset-3.5 sm:inset-4.5 border border-gold-500/20 border-dashed rounded-md pointer-events-none" />

        {/* Corner Accents */}
        <IslamicArch variant="corner-ornament" className="absolute top-4 left-4" />
        <IslamicArch variant="corner-ornament" className="absolute top-4 right-4 rotate-90" />
        <IslamicArch variant="corner-ornament" className="absolute bottom-4 left-4 -rotate-90" />
        <IslamicArch variant="corner-ornament" className="absolute bottom-4 right-4 rotate-180" />

        {/* Top Header of Envelope */}
        <div className="relative z-10 pt-8 sm:pt-10 text-center px-6">
          <p className="font-arabic text-gold-300 text-lg sm:text-xl drop-shadow mb-1">
            {config.bismillahArabic}
          </p>
          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-gold-400/50 to-transparent my-2" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] font-serif uppercase text-gold-300/80">
            The Wedding Celebration Of
          </p>
          <h2 className="font-serif text-lg sm:text-xl text-gold-200 font-semibold tracking-wider mt-1 drop-shadow">
            {config.brideName.split(' ')[0]} & {config.groomName.split(' ')[0]}
          </h2>
        </div>

        {/* Interactive Center: The Envelope Flap & Wax Seal */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-4">
          
          {/* Animated 3D Flap */}
          <motion.div
            initial={false}
            animate={
              openingState === 'flap-opened' || openingState === 'card-sliding'
                ? { rotateX: 180, zIndex: 5 }
                : { rotateX: 0, zIndex: 15 }
            }
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute -top-12 w-full flex justify-center pointer-events-none"
          >
            <svg
              viewBox="0 0 380 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[90%] text-emerald-900 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
            >
              <path
                d="M10 10 L190 130 L370 10"
                fill="#072218"
                stroke="#d4af37"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Sliding Card Teaser */}
          <AnimatePresence>
            {openingState === 'card-sliding' && (
              <motion.div
                initial={{ y: 80, scale: 0.85, opacity: 0 }}
                animate={{ y: -60, scale: 0.98, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute w-[88%] h-[85%] rounded-lg bg-parchment-100 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.7)] border border-gold-500/50 flex flex-col items-center justify-center text-center z-10"
              >
                <span className="font-serif text-xs text-gold-700 uppercase tracking-widest">
                  Unfolding Invitation
                </span>
                <h3 className="font-serif text-emerald-950 font-bold text-lg mt-1">
                  {config.brideName} & {config.groomName}
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wax Seal Trigger */}
          <WaxSeal
            monogram={getMonogram()}
            onClick={handleSealClick}
            isOpening={openingState !== 'idle'}
            guestName={guestName}
          />
        </div>

        {/* Envelope Footer */}
        <div className="relative z-10 pb-6 sm:pb-8 text-center px-4">
          <p className="text-[11px] sm:text-xs font-serif text-gold-300/70 tracking-widest uppercase">
            {config.eventDateFormatted}
          </p>
          <p className="text-[10px] text-gold-400/50 font-sans tracking-wider mt-0.5">
            {config.islamicDateFormatted}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
