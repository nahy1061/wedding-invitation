import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvitationFrontCard } from './cards/InvitationFrontCard';
import { CountdownCard } from './cards/CountdownCard';
import { VenueCard } from './cards/VenueCard';
import { DuaCard } from './cards/DuaCard';
import type { WeddingDetails } from '../../config/weddingData';

interface InnerCardSuiteProps {
  wedding: WeddingDetails;
  guestName: string | null;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.94,
    rotateZ: direction > 0 ? 3 : -3,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 350,
      damping: 28,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.94,
    rotateZ: direction > 0 ? -3 : 3,
    transition: {
      type: 'spring' as const,
      stiffness: 350,
      damping: 28,
      mass: 0.8,
    },
  }),
};

export const InnerCardSuite: React.FC<InnerCardSuiteProps> = ({ wedding, guestName }) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const paginate = (newDirection: number) => {
    const nextIndex = page + newDirection;
    if (nextIndex >= 0 && nextIndex <= 3) {
      setPage([nextIndex, newDirection]);
    }
  };

  const goToPage = (index: number) => {
    if (index === page) return;
    setPage([index, index > page ? 1 : -1]);
  };

  const tabs = [
    { label: 'Invitation', index: 0 },
    { label: 'Date', index: 1 },
    { label: 'Venue', index: 2 },
    { label: 'Dua', index: 3 },
  ];

  return (
    <div className="relative w-full max-w-[440px] sm:max-w-[480px] mx-auto px-3 select-none flex flex-col items-center">
      
      {/* Top Deck Navigation Tabs */}
      <nav aria-label="Invitation Sections" className="mb-2.5 flex items-center justify-center gap-1 p-1 rounded-full bg-[#182615]/85 border border-gold-400/45 shadow-md backdrop-blur-md z-30">
        {tabs.map((tab) => {
          const isActive = page === tab.index;
          return (
            <button
              key={tab.index}
              type="button"
              onClick={() => goToPage(tab.index)}
              className={`relative px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.14em] transition-all cursor-pointer ${
                isActive
                  ? 'text-gold-200 font-bold bg-[#2d4229] shadow-xs'
                  : 'text-gold-400/70 hover:text-gold-300 font-medium'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-gold-400"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* 3D Stack Container with Peeking Card Base */}
      <div className="relative w-full h-[540px] sm:h-[570px] max-h-[82dvh]">
        
        {/* Layer 2: Behind-Card Stack Shadow Peek (Physical 3D Deck illusion) */}
        {page < 3 && (
          <div
            className="absolute inset-0 w-full h-full rounded-2xl bg-[#eee5d5] border border-[#c5a880]/40 shadow-lg pointer-events-none transition-all duration-300 transform translate-y-2 scale-[0.96] opacity-60 z-0"
          />
        )}
        {page < 2 && (
          <div
            className="absolute inset-0 w-full h-full rounded-2xl bg-[#e6dbca] border border-[#c5a880]/30 shadow-md pointer-events-none transition-all duration-300 transform translate-y-3.5 scale-[0.93] opacity-40 -z-10"
          />
        )}

        {/* Layer 1: Active 350gsm Luxury Card Enclosure */}
        <div className="relative w-full h-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(4,20,12,0.5),0_0_0_1px_rgba(197,168,128,0.55)] cream-paper-texture overflow-hidden flex flex-col justify-between z-10">
          
          {/* Swipable / Drag Content Area with Elastic Physics */}
          <div className="relative w-full h-full flex-1 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -8000 || offset.x < -35) {
                    paginate(1);
                  } else if (swipe > 8000 || offset.x > 35) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              >
                {page === 0 && (
                  <InvitationFrontCard
                    wedding={wedding}
                    guestName={guestName}
                    onNext={() => paginate(1)}
                  />
                )}
                {page === 1 && (
                  <CountdownCard
                    wedding={wedding}
                    onPrev={() => paginate(-1)}
                    onNext={() => paginate(1)}
                  />
                )}
                {page === 2 && (
                  <VenueCard
                    wedding={wedding}
                    onPrev={() => paginate(-1)}
                    onNext={() => paginate(1)}
                  />
                )}
                {page === 3 && (
                  <DuaCard
                    guestName={guestName}
                    onPrev={() => paginate(-1)}
                    onGoToFirst={() => goToPage(0)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="relative z-20 pb-2.5 flex items-center justify-center gap-1.5 pointer-events-none">
            {tabs.map((tab) => (
              <div
                key={tab.index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  page === tab.index ? 'w-5 bg-[#6e4f1c]' : 'w-1.5 bg-[#c5a880]/50'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Floating Animated Swipe Prompt */}
      <motion.p
        animate={{ x: [-3, 3, -3], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-2 text-[9.5px] font-serif uppercase tracking-[0.2em] text-[#faeed1]/75 pointer-events-none"
      >
        ✦ Swipe to flip cards ✦
      </motion.p>

    </div>
  );
};
