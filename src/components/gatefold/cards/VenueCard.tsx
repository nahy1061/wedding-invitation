import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import type { WeddingDetails } from '../../../config/weddingData';

interface VenueCardProps {
  wedding: WeddingDetails;
}

export const VenueCard: React.FC<VenueCardProps> = ({ wedding }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center select-none overflow-hidden">

      {/* Earthy Tint */}
      <div className="absolute inset-0 tint-venue pointer-events-none" />

      {/* Pin Watermark */}
      <div className="card-watermark">♩</div>

      {/* Ornate Frame + Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

      {/* TOP: Venue Header */}
      <div className="relative z-10 pt-2 card-content-enter">
        <div className="flex items-center justify-center gap-1.5 text-[#2c4227]">
          <p className="text-[11px] sm:text-xs font-display tracking-[0.22em] uppercase font-bold">
            Venue & Directions
          </p>
        </div>

        <div className="gold-ornament my-2">
          <span className="text-[#855e1a] text-[10px]">✦</span>
        </div>
      </div>

      {/* CENTER: Venue Details */}
      <div className="relative z-10 my-2 space-y-4 max-w-[320px] mx-auto w-full card-content-enter card-content-enter-delay-1">
        <div className="p-5 rounded-2xl bg-[#f5efe4]/70 border border-[#c5a880]/50 shadow-xs space-y-2 backdrop-blur-xs">
          <div className="w-10 h-10 rounded-full bg-[#e9decb] text-[#6e4f1c] flex items-center justify-center mx-auto mb-2 border border-[#c5a880]/40">
            <MapPin className="w-5 h-5" />
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#12200f]">
            {wedding.venueHall}
          </h2>
          <p className="font-serif text-sm font-semibold text-[#24381f]">
            {wedding.venueName}
          </p>
          <p className="text-xs text-[#2e4627] font-sans font-medium">
            {wedding.venueAddress}
          </p>
        </div>

        {/* Google Maps Button */}
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

        <p className="text-[11px] font-serif italic text-[#384e32] mt-2">
          Under the graceful presence of<br />
          <span className="font-semibold text-[#142312] not-italic">The Salman & Rehman Families</span>
        </p>
      </div>

      {/* BOTTOM: Swipe Hint */}
      <div className="relative z-10 pt-2 card-content-enter card-content-enter-delay-2">
        <div className="gold-ornament mb-2">
          <span className="text-[#855e1a] text-[9px]">✦ ✦ ✦</span>
        </div>
        <p className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#8a9985]">
          Swipe for blessings →
        </p>
      </div>
    </div>
  );
};
