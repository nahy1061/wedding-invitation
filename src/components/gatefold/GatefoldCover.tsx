import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gateLeft from '../../assets/images/gate2_left.webp';
import gateRight from '../../assets/images/gate2_right.webp';
import sealImage from '../../assets/images/tap_to_open_seal.webp';
import { RoyalTitleScreen } from './RoyalTitleScreen';
import { RoyalVelvetCurtains } from './RoyalVelvetCurtains';
import { WEDDING_DATA } from '../../config/weddingData';

interface GatefoldCoverProps {
  guestName: string | null;
  onOpenStart?: () => void;
  onOpenComplete: () => void;
}

export const GatefoldCover: React.FC<GatefoldCoverProps> = ({
  guestName,
  onOpenStart,
  onOpenComplete,
}) => {
  const [openingState, setOpeningState] = useState<'closed' | 'opening'>('closed');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all cover images before showing the gatefold
  useEffect(() => {
    const imageSources = [gateLeft, gateRight, sealImage];
    let loadedCount = 0;

    imageSources.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageSources.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageSources.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openingState === 'opening') {
      // Allow user to tap to skip directly to inner card
      onOpenComplete();
      return;
    }

    onOpenStart?.();
    setOpeningState('opening');

    // 4.5s total showcase: gates swing open (0-2.5s) -> curtains part (0.6-3.4s) -> title shines -> card reveals
    setTimeout(() => {
      onOpenComplete();
    }, 4500);
  };

  // Elegant loading state while images preload
  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 w-full h-full min-h-dvh flex items-center justify-center bg-[#5e6f51] z-30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Subtle gold spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 rounded-full border-2 border-gold-400/30 border-t-gold-400"
          />
          <p className="text-[11px] font-serif text-gold-300/80 tracking-[0.25em] uppercase">
            Preparing Your Invitation
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      onClick={handleOpen}
      className="fixed inset-0 w-full h-full min-h-dvh overflow-hidden flex items-center justify-center cursor-pointer select-none bg-[#141e12] z-30"
      style={{ perspective: '2600px' }}
    >
      {/* 1. ROYAL TITLE SCREEN (Unveiled as velvet curtains part) */}
      <RoyalTitleScreen
        wedding={WEDDING_DATA}
        guestName={guestName}
        isVisible={openingState === 'opening'}
      />

      {/* 2. REALISTIC ROYAL VELVET CURTAINS (Parting smoothly to sides) */}
      <RoyalVelvetCurtains
        isOpening={openingState === 'opening'}
      />

      {/* AMBIENT PULSING GOLDEN HALO (Breathes during idle, softly expands & fades out during opening) */}
      <motion.div
        initial={false}
        animate={
          openingState === 'opening'
            ? { scale: 1.35, opacity: 0 }
            : {
                scale: [0.92, 1.1, 0.95, 1.06, 0.92],
                opacity: [0.35, 0.65, 0.42, 0.58, 0.35],
              }
        }
        transition={
          openingState === 'opening'
            ? { duration: 1.5, ease: 'easeOut' }
            : {
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-radial from-gold-400/40 via-gold-500/10 to-transparent blur-xl pointer-events-none z-15"
      />

      {/* LEFT GATEFOLD PANEL */}
      <motion.div
        initial={false}
        animate={
          openingState === 'opening'
            ? { rotateY: -105, x: '-8%', opacity: 0.1 }
            : { rotateY: 0, x: 0, opacity: 1 }
        }
        transition={{ duration: 3, ease: [0.25, 1, 0.5, 1] }}
        style={{
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          backgroundImage: `url(${gateLeft})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute top-0 left-0 w-1/2 h-full border-r border-gold-400/80 shadow-[15px_0_40px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between p-4 sm:p-6 z-10"
      >
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Guest Name Pill on Left Bottom (if provided) */}
        {guestName && (
          <div className="relative z-10 self-start mt-auto mb-4 px-4 py-1.5 rounded-full bg-black/60 border border-gold-400/50 backdrop-blur-md shadow-lg">
            <span className="text-[9px] text-gold-400/90 font-sans italic block">
              Specially Invited
            </span>
            <p className="text-[11px] text-gold-200 font-serif tracking-wider font-semibold">
              {guestName}
            </p>
          </div>
        )}
      </motion.div>

      {/* RIGHT GATEFOLD PANEL */}
      <motion.div
        initial={false}
        animate={
          openingState === 'opening'
            ? { rotateY: 105, x: '8%', opacity: 0.1 }
            : { rotateY: 0, x: 0, opacity: 1 }
        }
        transition={{ duration: 3, ease: [0.25, 1, 0.5, 1] }}
        style={{
          transformOrigin: 'right center',
          transformStyle: 'preserve-3d',
          backgroundImage: `url(${gateRight})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute top-0 right-0 w-1/2 h-full border-l border-gold-400/80 shadow-[-15px_0_40px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between p-4 sm:p-6 z-10"
      >
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-linear-to-l from-black/50 via-transparent to-black/30 pointer-events-none" />
      </motion.div>

      {/* CENTER HAIRLINE GOLD VERTICAL SEAM (Smoothly fades out on tap) */}
      <motion.div
        initial={false}
        animate={openingState === 'opening' ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-linear-to-b from-gold-200 via-gold-400 to-gold-200 shadow-[0_0_15px_rgba(212,175,55,0.95)] z-20 pointer-events-none"
      />

      {/* CENTRAL 3D SCALLOPED DIE-CUT GOLD PLAQUE SEAL ("TAP TO OPEN") */}
      <motion.div
        initial={false}
        animate={
          openingState === 'opening'
            ? { scale: [1, 1.15, 0.9], opacity: [1, 0.85, 0] }
            : { scale: [0.94, 1.08, 0.96, 1.04, 0.94], opacity: 1 }
        }
        transition={
          openingState === 'opening'
            ? { duration: 1.8, ease: 'easeOut' }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative z-30 w-44 sm:w-52 aspect-square flex items-center justify-center cursor-pointer select-none [filter:drop-shadow(0_20px_35px_rgba(0,0,0,0.85))_drop-shadow(0_0_15px_rgba(212,175,55,0.4))]"
      >
        <img
          src={sealImage}
          alt="Tap To Open"
          className="w-full h-full object-contain pointer-events-none"
        />
      </motion.div>
    </div>
  );
};


