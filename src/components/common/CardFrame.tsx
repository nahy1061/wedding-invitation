import React from 'react';

interface CardFrameProps {
  tint?: 'invitation' | 'countdown' | 'venue' | 'dua';
  watermark?: string;
  watermarkClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const CardFrame: React.FC<CardFrameProps> = ({
  tint = 'invitation',
  watermark,
  watermarkClassName = '',
  className = '',
  children,
}) => {
  const tintClass = `tint-${tint}`;

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-5 sm:p-7 text-center select-none overflow-hidden ${className}`}
    >
      {/* Background Tint Overlay */}
      <div className={`absolute inset-0 ${tintClass} pointer-events-none`} />

      {/* Decorative Watermark */}
      {watermark && (
        <div className={`card-watermark ${watermarkClassName}`}>
          {watermark}
        </div>
      )}

      {/* Ornate Frame & Filigree Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

      {/* Card Content Slot */}
      {children}
    </div>
  );
};
