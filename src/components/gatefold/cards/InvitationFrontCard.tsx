import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { WeddingDetails } from '../../../config/weddingData';

interface InvitationFrontCardProps {
  wedding: WeddingDetails;
  guestName: string | null;
  onNext: () => void;
}

export const InvitationFrontCard: React.FC<InvitationFrontCardProps> = ({
  wedding,
  guestName,
  onNext,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center select-none overflow-hidden">
      
      {/* Fine Gold Inner Hairline Frame */}
      <div className="absolute inset-3.5 border border-[#c5a880]/60 rounded-xl pointer-events-none" />
      <div className="absolute inset-4.5 border border-[#c5a880]/30 border-dashed rounded-lg pointer-events-none" />

      {/* Gilded Corner Accents */}
      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-[#8c6b2d]" />
      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-[#8c6b2d]" />
      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-[#8c6b2d]" />
      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-[#8c6b2d]" />

      {/* TOP: Sacred Bismillah & Poetic Verse */}
      <div className="relative z-10 pt-1">
        <p className="font-arabic text-2xl sm:text-3xl text-[#6e4f1c] font-semibold leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          {wedding.bismillahArabic}
        </p>

        {/* Delicate Golden Divider */}
        <div className="flex items-center justify-center gap-2.5 my-1.5">
          <div className="h-[0.5px] w-8 bg-[#bfa378]" />
          <span className="text-[#855e1a] text-[10px]">✦</span>
          <div className="h-[0.5px] w-8 bg-[#bfa378]" />
        </div>

        <p className="font-serif italic text-xs sm:text-sm text-[#24381f] font-medium leading-relaxed px-2">
          “And He placed between you love and mercy”
        </p>
        <span className="text-[9px] font-serif uppercase tracking-[0.25em] text-[#6d7e67] block mt-0.5">
          — Surah Ar-Rum 30:21 —
        </span>
      </div>

      {/* CENTER: Couple Names & Invitation */}
      <div className="relative z-10 my-2">
        {/* Guest Pill (if present) */}
        {guestName && (
          <div className="mb-2 inline-block py-1 px-3.5 rounded-full bg-[#f0e8d8] border border-[#c5a880]/70 shadow-xs">
            <span className="text-[9px] font-sans italic text-[#384e32] font-medium block leading-tight">
              Cordially Invited
            </span>
            <span className="font-serif text-xs sm:text-sm font-bold text-[#142312] tracking-wide">
              {guestName}
            </span>
          </div>
        )}

        <p className="text-[10px] sm:text-[11px] font-serif tracking-[0.28em] uppercase text-[#2c4227] font-semibold mb-1">
          Cordially Inviting You To The Nikkah Of
        </p>

        <div className="my-2 space-y-0.5">
          <h1 className="font-display text-3xl sm:text-4xl text-[#12200f] font-semibold tracking-wide drop-shadow-xs">
            {wedding.brideName}
          </h1>

          <div className="my-1 flex items-center justify-center gap-2.5">
            <div className="h-[0.5px] w-8 bg-[#bfa378]" />
            <span className="font-script text-3xl sm:text-4xl text-[#855e1a] italic font-normal">&</span>
            <div className="h-[0.5px] w-8 bg-[#bfa378]" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[#12200f] font-semibold tracking-wide drop-shadow-xs">
            {wedding.groomName}
          </h1>
        </div>

        <p className="text-xs font-serif text-[#2c3d28] max-w-xs mx-auto mt-2 leading-relaxed italic">
          Together with their beloved parents, we request the honor of your presence and prayers.
        </p>
      </div>

      {/* BOTTOM: Next Card Prompt */}
      <div className="relative z-10 pt-2 border-t border-[#c5a880]/40 flex flex-col items-center">
        <button
          type="button"
          onClick={onNext}
          className="px-5 py-2 rounded-full bg-[#f0e8d8] hover:bg-[#e6dccb] border border-[#bfa378] text-[#142312] text-xs font-serif font-semibold tracking-[0.15em] uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <span>Date & Countdown</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#855e1a]" />
        </button>
      </div>

    </div>
  );
};
