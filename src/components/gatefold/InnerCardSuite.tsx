import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InvitationFrontCard } from './cards/InvitationFrontCard';
import { CountdownCard } from './cards/CountdownCard';
import { VenueCard } from './cards/VenueCard';
import { DuaCard } from './cards/DuaCard';
import type { WeddingDetails } from '../../config/weddingData';

interface InnerCardSuiteProps {
  wedding: WeddingDetails;
  guestName: string | null;
}

export const InnerCardSuite: React.FC<InnerCardSuiteProps> = ({ wedding, guestName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    if (index >= 0 && index <= 3) {
      setActiveIndex(index);
    }
  };

  const nextCard = () => {
    if (activeIndex < 3) setActiveIndex(activeIndex + 1);
  };

  const prevCard = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const tabs = [
    { label: 'Invitation', index: 0 },
    { label: 'Date', index: 1 },
    { label: 'Venue', index: 2 },
    { label: 'Dua', index: 3 },
  ];

  const cards = [
    {
      id: 'invitation',
      component: (
        <InvitationFrontCard
          wedding={wedding}
          guestName={guestName}
        />
      ),
    },
    {
      id: 'countdown',
      component: (
        <CountdownCard
          wedding={wedding}
        />
      ),
    },
    {
      id: 'venue',
      component: (
        <VenueCard
          wedding={wedding}
        />
      ),
    },
    {
      id: 'dua',
      component: (
        <DuaCard
          guestName={guestName}
        />
      ),
    },
  ];

  return (
    <div className="relative w-full max-w-[100vw] sm:max-w-[560px] mx-auto px-2 select-none flex flex-col items-center overflow-hidden">
      
      {/* Top Deck Navigation Tabs */}
      <nav
        aria-label="Invitation Sections"
        className="mb-3 flex items-center justify-center gap-1 p-1 rounded-full bg-[#182615]/85 border border-gold-400/45 shadow-md backdrop-blur-md z-30"
      >
        {tabs.map((tab) => {
          const isActive = activeIndex === tab.index;
          return (
            <button
              key={tab.index}
              type="button"
              onClick={() => goTo(tab.index)}
              className={`relative px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.14em] transition-all cursor-pointer ${
                isActive
                  ? 'text-gold-200 font-bold bg-[#2d4229] shadow-xs'
                  : 'text-gold-400/70 hover:text-gold-300 font-medium'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="active-cover-indicator"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-gold-400"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* 3D Cover Flow Stage */}
      <div
        className="relative w-full h-[510px] sm:h-[550px] max-h-[78dvh] flex items-center justify-center"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {cards.map((card, i) => {
          const delta = i - activeIndex;
          const isActive = delta === 0;
          const isRight = delta === 1;
          const isLeft = delta === -1;
          const isFarRight = delta >= 2;
          const isFarLeft = delta <= -2;

          let targetX = '0%';
          let targetRotateY = 0;
          let targetScale = 1.0;
          let targetZ = 0;
          let targetOpacity = 1;
          let targetZIndex = 20;

          if (isRight) {
            targetX = '58%';
            targetRotateY = -35;
            targetScale = 0.84;
            targetZ = -120;
            targetOpacity = 0.65;
            targetZIndex = 10;
          } else if (isLeft) {
            targetX = '-58%';
            targetRotateY = 35;
            targetScale = 0.84;
            targetZ = -120;
            targetOpacity = 0.65;
            targetZIndex = 10;
          } else if (isFarRight) {
            targetX = '115%';
            targetRotateY = -45;
            targetScale = 0.7;
            targetZ = -250;
            targetOpacity = 0;
            targetZIndex = 0;
          } else if (isFarLeft) {
            targetX = '-115%';
            targetRotateY = 45;
            targetScale = 0.7;
            targetZ = -250;
            targetOpacity = 0;
            targetZIndex = 0;
          }

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x: targetX,
                rotateY: targetRotateY,
                scale: targetScale,
                z: targetZ,
                opacity: targetOpacity,
                zIndex: targetZIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 30,
                mass: 0.85,
              }}
              onClick={() => {
                if (!isActive) goTo(i);
              }}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, { offset, velocity }) => {
                if (!isActive) return;
                const swipeThreshold = 40;
                const velocityThreshold = 250;
                if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
                  nextCard();
                } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
                  prevCard();
                }
              }}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
              }}
              className={`absolute top-0 bottom-0 w-[305px] sm:w-[365px] h-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(4,20,12,0.5),0_0_0_1px_rgba(197,168,128,0.55)] cream-paper-texture overflow-hidden flex flex-col justify-between select-none ${
                isActive ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'cursor-pointer'
              }`}
            >
              {/* Inner Card Component */}
              <div className="w-full h-full relative">
                {card.component}

                {/* 3D Light Shading Overlay for Angled Peek Cards */}
                {!isActive && (
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                      isRight
                        ? 'bg-gradient-to-l from-black/25 via-black/10 to-transparent'
                        : isLeft
                        ? 'bg-gradient-to-r from-black/25 via-black/10 to-transparent'
                        : 'bg-black/40'
                    }`}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Pagination Dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5 pointer-events-none">
        {tabs.map((tab) => (
          <button
            key={tab.index}
            type="button"
            onClick={() => goTo(tab.index)}
            aria-label={`Go to ${tab.label}`}
            className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${
              activeIndex === tab.index ? 'w-5 bg-gold-300' : 'w-1.5 bg-gold-400/40 hover:bg-gold-400/70'
            }`}
          />
        ))}
      </div>

    </div>
  );
};
