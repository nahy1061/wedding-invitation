import React, { useState } from 'react';
import { MapPin, Heart, Send, CheckCircle2, ChevronLeft, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WeddingDetails } from '../../../config/weddingData';

interface VenueDuaCardProps {
  wedding: WeddingDetails;
  guestName: string | null;
  onPrev: () => void;
  onGoToFirst: () => void;
}

export const VenueDuaCard: React.FC<VenueDuaCardProps> = ({
  wedding,
  guestName,
  onPrev,
  onGoToFirst,
}) => {
  const [duaInput, setDuaInput] = useState('');
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const handleSendDua = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duaInput.trim()) return;

    const message = duaInput.trim();
    setSentMessage(message);
    setDuaInput('');

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#faeed1', '#d4af37', '#aa841e', '#5e6f51'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-5 sm:p-7 text-center select-none overflow-hidden">
      
      {/* Fine Gold Inner Hairline Frame */}
      <div className="absolute inset-3 border border-[#c5a880]/60 rounded-xl pointer-events-none" />
      <div className="absolute inset-4 border border-[#c5a880]/35 border-dashed rounded-lg pointer-events-none" />

      {/* Gilded Corner Accents */}
      <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#8c6b2d]" />
      <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#8c6b2d]" />
      <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#8c6b2d]" />
      <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#8c6b2d]" />

      {/* TOP: Venue Details */}
      <div className="relative z-10 pt-1">
        <p className="text-[11px] sm:text-xs font-serif tracking-[0.28em] uppercase text-[#2c4227] font-bold">
          Venue & Directions
        </p>

        <div className="mt-2 space-y-0.5">
          <p className="font-serif text-sm sm:text-base text-[#12200f] font-bold">
            {wedding.venueHall}
          </p>
          <p className="font-serif text-xs text-[#24381f] font-semibold">
            {wedding.venueName}
          </p>
          <p className="text-[11px] text-[#2e4627] font-sans font-medium">
            {wedding.venueAddress}
          </p>
        </div>

        {/* Exact Google Maps Location Button */}
        <a
          href={wedding.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#f0e8d8] hover:bg-[#e6dccb] border border-[#bfa378] text-[#142312] text-[10.5px] font-serif font-semibold tracking-[0.15em] uppercase transition-all shadow-xs active:scale-95"
        >
          <MapPin className="w-3.5 h-3.5 text-[#855e1a]" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-[#855e1a]/70" />
        </a>

        <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-[#bfa378] to-transparent my-2.5" />
      </div>

      {/* CENTER: Interactive Guest Dua / Blessing */}
      <div className="relative z-10 my-0.5 max-w-[320px] mx-auto w-full">
        <div className="flex items-center justify-center gap-1.5 text-[#2c4227]">
          <Heart className="w-3 h-3 text-[#855e1a] fill-[#855e1a]/20" />
          <p className="text-[11px] font-serif tracking-[0.2em] uppercase font-bold">
            Guest Blessings & Dua
          </p>
        </div>

        {sentMessage ? (
          <div className="mt-2 p-2.5 rounded-lg bg-[#eef5eb] border border-[#86a87e]/60 text-center shadow-xs animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-center gap-1 text-[#24421f] text-xs font-serif font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3b6d33]" />
              <span>Dua Received with Gratitude!</span>
            </div>
            <p className="text-[10.5px] font-serif italic text-[#12200f] mt-1 leading-snug">
              "{sentMessage}"
            </p>
            <span className="text-[9px] font-sans text-[#4d6a47] block mt-1">
              — {guestName || 'Honored Guest'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSendDua} className="mt-2 space-y-2">
            <div className="relative">
              <input
                type="text"
                value={duaInput}
                onChange={(e) => setDuaInput(e.target.value)}
                placeholder="Write a prayer for Hafsa & Abdul Rehman..."
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#f8f5ee] border border-[#c5a880]/60 text-[#12200f] placeholder:text-[#8a9985] focus:outline-hidden focus:border-[#855e1a] shadow-inner font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={!duaInput.trim()}
              className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] disabled:opacity-50 text-[#faeed1] border border-gold-500/50 text-[10.5px] font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              <Send className="w-3 h-3 text-gold-300" />
              <span>Send Blessing</span>
            </button>
          </form>
        )}
      </div>

      {/* BOTTOM: Navigation */}
      <div className="relative z-10 pt-2 border-t border-[#c5a880]/40 flex flex-col items-center gap-1.5">
        <p className="text-[9.5px] font-serif uppercase tracking-[0.25em] text-[#3d5336] font-semibold">
          With Warmest Blessings
        </p>

        <div className="flex items-center justify-between w-full max-w-[300px] px-2 text-[10px] font-serif uppercase tracking-wider">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-1 text-[#2c4227] hover:text-[#12200f] font-semibold cursor-pointer py-1"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#855e1a]" />
            <span>Programme</span>
          </button>
          <button
            type="button"
            onClick={onGoToFirst}
            className="text-[#855e1a] hover:text-[#5a3e0f] font-semibold cursor-pointer py-1 underline decoration-gold-400/50 underline-offset-2"
          >
            Back to Cover
          </button>
        </div>
      </div>

    </div>
  );
};
