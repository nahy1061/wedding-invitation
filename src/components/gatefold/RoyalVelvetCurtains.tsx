import React from 'react';
import { motion } from 'framer-motion';
import curtainLeftImg from '../../assets/images/velvet_curtain_left.webp';
import curtainRightImg from '../../assets/images/velvet_curtain_right.webp';

interface RoyalVelvetCurtainsProps {
  isOpening: boolean;
}

export const RoyalVelvetCurtains: React.FC<RoyalVelvetCurtainsProps> = ({ isOpening }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10">
      
      {/* LEFT VELVET CURTAIN PANEL */}
      <motion.div
        initial={false}
        animate={
          isOpening
            ? {
                scaleX: [1, 0.12],
                x: ['0%', '-45%'],
                opacity: [1, 0.95, 0.7],
              }
            : {
                scaleX: 1,
                x: '0%',
                opacity: 1,
              }
        }
        transition={{
          duration: 2.8,
          delay: 0.6, // Starts as the outer gatefold doors begin parting
          ease: [0.25, 1, 0.5, 1], // Realistic heavy velvet gather
        }}
        style={{
          transformOrigin: 'left center',
        }}
        className="absolute top-0 left-0 bottom-0 w-1/2 h-full overflow-hidden [filter:drop-shadow(15px_0_30px_rgba(0,0,0,0.9))]"
      >
        <img
          src={curtainLeftImg}
          alt="Left Velvet Curtain"
          className="w-full h-full object-cover object-left"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/25 pointer-events-none" />
      </motion.div>

      {/* RIGHT VELVET CURTAIN PANEL */}
      <motion.div
        initial={false}
        animate={
          isOpening
            ? {
                scaleX: [1, 0.12],
                x: ['0%', '45%'],
                opacity: [1, 0.95, 0.7],
              }
            : {
                scaleX: 1,
                x: '0%',
                opacity: 1,
              }
        }
        transition={{
          duration: 2.8,
          delay: 0.6,
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{
          transformOrigin: 'right center',
        }}
        className="absolute top-0 right-0 bottom-0 w-1/2 h-full overflow-hidden [filter:drop-shadow(-15px_0_30px_rgba(0,0,0,0.9))]"
      >
        <img
          src={curtainRightImg}
          alt="Right Velvet Curtain"
          className="w-full h-full object-cover object-right"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/25 pointer-events-none" />
      </motion.div>

    </div>
  );
};
