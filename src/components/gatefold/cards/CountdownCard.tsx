import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CardFrame } from '../../common/CardFrame';
import { useCountdown } from '../../../hooks/useCountdown';
import { addToCalendar } from '../../../utils/calendar';
import type { WeddingDetails } from '../../../config/weddingData';

interface CountdownCardProps {
  wedding: WeddingDetails;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ wedding }) => {
  const [calendarAdded, setCalendarAdded] = useState(false);
  const timeLeft = useCountdown(wedding.eventDateISO);

  const handleCalendar = () => {
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#faeed1', '#d4af37', '#aa841e', '#5e6f51'],
      });
    } catch { /* fallback */ }

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);

    // Open Calendar natively on phone / web on desktop
    addToCalendar(wedding);
  };

  return (
    <CardFrame tint="countdown" watermark="◷">
      {/* TOP: Date Header */}
      <div className="relative z-10 pt-2 card-content-enter">
        <p className="text-[11px] sm:text-xs font-display tracking-[0.22em] uppercase text-[#2c4227] font-bold">
          The Auspicious Date
        </p>

        <div className="gold-ornament my-2">
          <span className="text-[#855e1a] text-[10px]">✦</span>
        </div>

        <div className="space-y-1">
          <h2 className="font-display text-xl sm:text-2xl text-[#12200f] font-semibold tracking-wider uppercase">
            {wedding.eventDateFormatted}
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#24381f] font-serif font-semibold">
            <span>{wedding.eventTimeFormatted}</span>
          </div>
          <p className="text-xs text-[#2e4627] font-serif font-medium tracking-wide">
            {wedding.islamicDateFormatted}
          </p>
        </div>
      </div>

      {/* CENTER: Countdown */}
      <div className="relative z-10 my-2 card-content-enter card-content-enter-delay-1">
        <p className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] text-[#3d5238] font-semibold mb-4">
          ✦ Counting Down To The Sacred Union ✦
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-75 mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((unit, i) => (
            <div
              key={i}
              className="py-3 px-1.5 rounded-xl bg-[#f0e8d8]/80 border border-[#c5a880]/60 shadow-xs flex flex-col items-center justify-center backdrop-blur-xs"
            >
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[#12200f] leading-none">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-sans uppercase tracking-wider text-[#3d5238] font-bold mt-1.5">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCalendar}
            className="mt-5 w-full max-w-60 py-2.5 px-4 rounded-full bg-linear-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            {calendarAdded ? (
              <Check className="w-3.5 h-3.5 text-gold-300" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-gold-300" />
            )}
            <span>{calendarAdded ? 'Added to Calendar' : 'Add to Calendar'}</span>
          </button>
        </div>
      </div>

      {/* BOTTOM: Swipe Hint */}
      <div className="relative z-10 pt-2 card-content-enter card-content-enter-delay-2">
        <div className="gold-ornament mb-2">
          <span className="text-[#855e1a] text-[9px]">✦ ✦ ✦</span>
        </div>
        <p className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#8a9985]">
          Swipe to continue →
        </p>
      </div>
    </CardFrame>
  );
};
