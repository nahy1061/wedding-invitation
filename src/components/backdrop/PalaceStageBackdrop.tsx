import React from 'react';
import { motion } from 'framer-motion';
import leftCurtain from '../../assets/images/left_curtain.png';
import rightCurtain from '../../assets/images/right_curtain.png';
import topCurtain from '../../assets/images/top_curtain.png';
import palaceBg from '../../assets/images/palace_scenery_bg.webp';

interface PalaceStageBackdropProps {
  isOpened?: boolean;
  isOpening?: boolean;
}

export const PalaceStageBackdrop: React.FC<PalaceStageBackdropProps> = ({
  isOpening = false,
}) => {
  return (
    <div className="fixed inset-0 w-full h-full min-h-[100dvh] overflow-hidden pointer-events-none select-none z-0">
      
      {/* 1. ILLUMINATED MOONLIT PALACE COURTYARD SCENERY */}
      <motion.div
        initial={false}
        animate={
          isOpening
            ? { scale: [1.06, 1], opacity: [0.7, 1] }
            : { scale: 1.04, opacity: 0.85 }
        }
        transition={{
          duration: 3.0,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={palaceBg}
          alt="Palace Courtyard"
          className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.05]"
        />
        {/* Soft Vignette Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50 pointer-events-none" />
      </motion.div>

      {/* 2. WARM AMBIENT SPOTLIGHT GLOW */}
      <motion.div
        animate={{
          scale: [0.95, 1.08, 0.95],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] aspect-square rounded-full bg-radial from-[#ffca58]/35 via-[#e59b24]/10 to-transparent blur-3xl"
      />

      {/* 3. FLOATING GOLDEN STARDUST PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { top: '15%', left: '20%', size: 4, delay: 0, duration: 6 },
          { top: '32%', left: '80%', size: 5, delay: 1.2, duration: 7 },
          { top: '50%', left: '12%', size: 3, delay: 0.5, duration: 5.5 },
          { top: '68%', left: '88%', size: 4, delay: 2.0, duration: 6.5 },
          { top: '25%', left: '52%', size: 5, delay: 2.8, duration: 8 },
          { top: '60%', left: '40%', size: 3, delay: 1.4, duration: 5 },
          { top: '78%', left: '28%', size: 4, delay: 2.5, duration: 7.2 },
        ].map((mote, i) => (
          <motion.div
            key={`mote-${i}`}
            animate={{
              y: [-16, 16, -16],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: mote.duration,
              repeat: Infinity,
              delay: mote.delay,
              ease: 'easeInOut',
            }}
            style={{
              top: mote.top,
              left: mote.left,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
            }}
            className="absolute rounded-full bg-[#faeed1] shadow-[0_0_10px_#d4af37]"
          />
        ))}
      </div>

      {/* 4. LEFT CARVED PILLAR & CHAMPAGNE SATIN CURTAIN DRAPE */}
      <motion.div
        initial={false}
        animate={
          isOpening
            ? { x: ['-20%', '0%'], opacity: [0.75, 1] }
            : { x: '0%', opacity: 1 }
        }
        transition={{
          duration: 3.0,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="absolute top-0 bottom-0 left-0 h-full w-[45vw] max-w-[280px] sm:max-w-[340px] z-10 flex items-stretch [filter:drop-shadow(10px_0_25px_rgba(0,0,0,0.85))]"
      >
        <img
          src={leftCurtain}
          alt="Left Curtain"
          className="w-full h-full object-fill object-left pointer-events-none"
        />
      </motion.div>

      {/* 5. RIGHT CARVED PILLAR & CHAMPAGNE SATIN CURTAIN DRAPE */}
      <motion.div
        initial={false}
        animate={
          isOpening
            ? { x: ['20%', '0%'], opacity: [0.75, 1] }
            : { x: '0%', opacity: 1 }
        }
        transition={{
          duration: 3.0,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="absolute top-0 bottom-0 right-0 h-full w-[45vw] max-w-[280px] sm:max-w-[340px] z-10 flex items-stretch [filter:drop-shadow(-10px_0_25px_rgba(0,0,0,0.85))]"
      >
        <img
          src={rightCurtain}
          alt="Right Curtain"
          className="w-full h-full object-fill object-right pointer-events-none"
        />
      </motion.div>

      {/* 6. TOP SCALLOPED SATIN VALANCE SWAG */}
      <motion.div
        initial={false}
        animate={
          isOpening
            ? { y: ['-14%', '0%'], opacity: [0.7, 1] }
            : { y: '0%', opacity: 1 }
        }
        transition={{
          duration: 2.8,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="absolute top-0 inset-x-0 w-full z-20 flex justify-center [filter:drop-shadow(0_12px_25px_rgba(0,0,0,0.85))]"
      >
        <img
          src={topCurtain}
          alt="Top Valance"
          className="w-full max-w-[650px] sm:max-w-[800px] max-h-[26vh] object-contain object-top pointer-events-none"
        />
      </motion.div>

    </div>
  );
};
