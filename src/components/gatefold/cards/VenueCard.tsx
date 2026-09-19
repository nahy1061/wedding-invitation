import React from 'react';
import { MapPin, ExternalLink, ChevronLeft, ChevronRight, Navigation } from 'lucide-react';
import type { WeddingDetails } from '../../../config/weddingData';

interface VenueCardProps {
  wedding: WeddingDetails;
  onPrev: () => void;
  onNext: () => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({ wedding, onPrev, onNext }) => {
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

      {/* TOP: Venue Header */}
      <div className="relative z-10 pt-2">
        <p className="text-[11px] sm:text-xs font-serif tracking-[0.28em] uppercase text-[#2c4227] font-bold">
          Venue & Directions
        </p>

        {/* Delicate Golden Divider */}
        <div className="flex items-center justify-center gap-2.5 my-2">
          <div className="h-[0.5px] w-8 bg-[#bfa378]" />
          <span className="text-[#855e1a] text-[10px]">✦</span>
          <div className="h-[0.5px] w-8 bg-[#bfa378]" />
        </div>
      </div>

      {/* CENTER: Hall Details & Map Pill */}
      <div className="relative z-10 my-2 space-y-4 max-w-[320px] mx-auto w-full">
        <div className="p-4 rounded-2xl bg-[#f5efe4] border border-[#c5a880]/50 shadow-xs space-y-1.5">
          <div className="w-8 h-8 rounded-full bg-[#e9decb] text-[#6e4f1c] flex items-center justify-center mx-auto mb-2">
            <MapPin className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#12200f]">
            {wedding.venueHall}
          </h2>
          <p className="font-serif text-sm font-semibold text-[#24381f]">
            {wedding.venueName}
          </p>
          <p className="text-xs text-[#2e4627] font-sans font-medium">
            {wedding.venueAddress}
          </p>
        </div>

        {/* Direct Google Maps Action Button */}
        <a
          href={wedding.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full max-w-[240px] py-2.5 px-4 rounded-full bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase shadow-sm active:scale-95 transition-all"
        >
          <Navigation className="w-3.5 h-3.5 text-gold-300" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-gold-400" />
        </a>

        <p className="text-[11px] font-serif italic text-[#384e32] mt-3">
          Under the graceful presence of<br />
          <span className="font-semibold text-[#142312] not-italic">The Salman & Rehman Families</span>
        </p>
      </div>

      {/* BOTTOM: Navigation */}
      <div className="relative z-10 pt-2 border-t border-[#c5a880]/40 flex items-center justify-between w-full max-w-[320px] mx-auto px-2 text-[10.5px] font-serif uppercase tracking-wider">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-1 text-[#2c4227] hover:text-[#12200f] font-semibold cursor-pointer py-1"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#855e1a]" />
          <span>Date & Time</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1 text-[#2c4227] hover:text-[#12200f] font-semibold cursor-pointer py-1"
        >
          <span>Prayers & Dua</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#855e1a]" />
        </button>
      </div>

    </div>
  );
};
