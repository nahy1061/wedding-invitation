import React from 'react';
import type { WeddingDetails } from '../../../config/weddingData';

interface InvitationFrontCardProps {
  wedding: WeddingDetails;
  guestName: string | null;
}

export const InvitationFrontCard: React.FC<InvitationFrontCardProps> = ({
  wedding,
  guestName,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center select-none overflow-hidden">

      {/* Warm Invitation Tint */}
      <div className="absolute inset-0 tint-invitation pointer-events-none" />

      {/* Floral Watermark */}
      <div className="card-watermark">✿</div>

      {/* Ornate Frame + Filigree Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

      {/* TOP: Bismillah & Verse */}
      <div className="relative z-10 pt-2 card-content-enter">
        <p className="font-arabic text-xl sm:text-2xl text-[#6e4f1c] font-semibold leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          {wedding.bismillahArabic}
        </p>

        {/* Ornamental Divider */}
        <div className="gold-ornament mt-4 mb-2">
          <span className="text-[#855e1a] text-[10px]">✦</span>
        </div>

        <p className="font-serif italic text-xs sm:text-sm text-[#24381f] font-medium leading-relaxed px-2">
          "And He placed between you love and mercy"
        </p>
        <span className="text-[9px] font-serif uppercase tracking-[0.25em] text-[#6d7e67] block mt-0.5">
          — Surah Ar-Rum 30:21 —
        </span>
      </div>

      {/* CENTER: Couple Names */}
      <div className="relative z-10 my-2 card-content-enter card-content-enter-delay-1">
        {/* Guest Pill */}
        {guestName && (
          <div className="mb-3 inline-block py-1.5 px-4 rounded-full bg-[#f0e8d8] border border-[#c5a880]/70 shadow-xs">
            <span className="text-[9px] font-sans italic text-[#384e32] font-medium block leading-tight">
              Cordially Invited
            </span>
            <span className="font-serif text-xs sm:text-sm font-bold text-[#142312] tracking-wide">
              {guestName}
            </span>
          </div>
        )}

        <p className="text-[10px] sm:text-[11px] font-serif tracking-[0.3em] uppercase text-[#2c4227] font-semibold mb-2">
          Cordially Inviting You To The Nikkah Of
        </p>

        <div className="my-2 space-y-1">
          <h1 className="font-display text-3xl sm:text-4xl text-[#12200f] font-semibold tracking-wide drop-shadow-xs">
            {wedding.brideName}
          </h1>

          <div className="my-1.5 flex items-center justify-center gap-3">
            <div className="h-[0.5px] w-10 bg-gradient-to-r from-transparent to-[#bfa378]" />
            <span className="font-script text-3xl sm:text-4xl text-[#855e1a] italic">&</span>
            <div className="h-[0.5px] w-10 bg-gradient-to-l from-transparent to-[#bfa378]" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[#12200f] font-semibold tracking-wide drop-shadow-xs">
            {wedding.groomName}
          </h1>
        </div>

        <p className="text-[11px] font-serif text-[#2c3d28] max-w-xs mx-auto mt-3 leading-relaxed italic">
          Together with their beloved parents, we request the honor of your presence and prayers.
        </p>
      </div>

      {/* BOTTOM: Swipe Hint */}
      <div className="relative z-10 pt-2 card-content-enter card-content-enter-delay-2">
        <div className="gold-ornament mb-2">
          <span className="text-[#855e1a] text-[9px]">✦ ✦ ✦</span>
        </div>
        <p className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#8a9985]">
          Swipe to view details →
        </p>
      </div>
    </div>
  );
};
