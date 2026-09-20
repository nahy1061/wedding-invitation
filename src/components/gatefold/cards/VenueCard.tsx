import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { CardFrame } from '../../common/CardFrame';
import venueImg from '../../../assets/images/venue5.webp';
import type { WeddingDetails } from '../../../config/weddingData';

interface VenueCardProps {
  wedding: WeddingDetails;
}

export const VenueCard: React.FC<VenueCardProps> = ({ wedding }) => {
  return (
    <CardFrame tint="venue" watermark="♩">
      {/* TOP: Venue Header */}
      <div className="relative z-10 pt-1 card-content-enter">
        <p className="text-[11px] sm:text-xs font-display tracking-[0.22em] uppercase text-[#2c4227] font-bold">
          Venue & Directions
        </p>
        <div className="gold-ornament my-1.5">
          <span className="text-[#855e1a] text-[10px]">✦</span>
        </div>
      </div>

      {/* CENTER: Venue Details Container */}
      <div className="relative z-10 my-1 space-y-2.5 max-w-[320px] mx-auto w-full card-content-enter card-content-enter-delay-1">
        <div className="rounded-2xl bg-[#f5efe4]/85 border border-[#c5a880]/50 shadow-xs overflow-hidden backdrop-blur-xs">
          {/* Venue Image */}
          <div className="w-full h-36 sm:h-40 overflow-hidden bg-[#1b2b18]">
            <img
              src={venueImg}
              alt={wedding.venueName}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Venue Details */}
          <div className="px-3.5 py-2 space-y-0.5">
            <div className="flex items-center justify-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-[#855e1a]" />
              <p className="text-[9px] font-serif uppercase tracking-[0.12em] text-[#3d5238] font-semibold">
                {wedding.venueHall}
              </p>
            </div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#12200f]">
              {wedding.venueName}
            </h2>
            <p className="text-[10px] text-[#2e4627] font-sans font-medium">
              {wedding.venueAddress}
            </p>
          </div>
        </div>

        {/* Google Maps Button */}
        <a
          href={wedding.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full max-w-[240px] py-2 px-4 rounded-full bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 text-gold-300" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-gold-400" />
        </a>
      </div>

      {/* BOTTOM: Swipe Hint */}
      <div className="relative z-10 pt-1 card-content-enter card-content-enter-delay-2">
        <div className="gold-ornament mb-1">
          <span className="text-[#855e1a] text-[9px]">✦ ✦ ✦</span>
        </div>
        <p className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#8a9985]">
          Swipe for reception & hosts →
        </p>
      </div>
    </CardFrame>
  );
};
