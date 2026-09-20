import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InvitationFrontCard } from './cards/InvitationFrontCard';
import { CountdownCard } from './cards/CountdownCard';
import { VenueCard } from './cards/VenueCard';
import { ReceptionCard } from './cards/ReceptionCard';
import { DuaCard } from './cards/DuaCard';
import type { WeddingDetails } from '../../config/weddingData';

interface InnerCardSuiteProps {
  wedding: WeddingDetails;
  guestName: string | null;
}

export const InnerCardSuite: React.FC<InnerCardSuiteProps> = ({ wedding, guestName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    if (index >= 0 && index <= 4) {
      setActiveIndex(index);
    }
  };

  const nextCard = () => {
    if (activeIndex < 4) setActiveIndex(activeIndex + 1);
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
    { label: 'Invite', fullLabel: 'Invitation', index: 0 },
    { label: 'Date', fullLabel: 'Date', index: 1 },
    { label: 'Venue', fullLabel: 'Venue', index: 2 },
    { label: 'Hosts', fullLabel: 'Reception', index: 3 },
    { label: 'Dua', fullLabel: 'Dua', index: 4 },
  ];

  const cards = [
    {
      id: 'invitation',
      component: (
        <InvitationFrontCard
          wedding={wedding}
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
      id: 'reception',
      component: (
        <ReceptionCard
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
        className="mb-2.5 sm:mb-3 flex items-center justify-center gap-0.5 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#0e1a0b]/92 border border-gold-400/70 shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.15)] backdrop-blur-md z-30 max-w-[98vw] sm:max-w-fit mx-auto"
      >
        {tabs.map((tab) => {
          const isActive = activeIndex === tab.index;
          return (
            <button
              key={tab.index}
              type="button"
              onClick={() => goTo(tab.index)}
              className={`relative px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-serif uppercase tracking-[0.06em] sm:tracking-[0.14em] transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-gold-100 font-bold bg-[#2d4229] shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                  : 'text-gold-400/80 hover:text-gold-200 hover:bg-[#1a2d16]/60 font-medium'
              }`}
            >
              <span className="sm:hidden">{tab.label}</span>
              <span className="hidden sm:inline">{tab.fullLabel}</span>
              {isActive && (
                <motion.div
                  layoutId="active-cover-indicator"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-0.5 rounded-full bg-gold-300 shadow-[0_0_6px_rgba(212,175,55,0.5)]"
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
                touchAction: 'pan-y',
                willChange: 'transform, opacity',
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
      <div className="mt-5 flex items-center justify-center gap-2 pointer-events-none">
        {tabs.map((tab) => (
          <button
            key={tab.index}
            type="button"
            onClick={() => goTo(tab.index)}
            aria-label={`Go to ${tab.label}`}
            className={`rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${
              activeIndex === tab.index
                ? 'w-6 h-2 bg-gold-300 shadow-[0_0_8px_rgba(212,175,55,0.45)]'
                : 'w-2 h-2 bg-gold-400/60 hover:bg-gold-300/80 hover:shadow-[0_0_6px_rgba(212,175,55,0.3)]'
            }`}
          />
        ))}
      </div>

    </div>
  );
};
