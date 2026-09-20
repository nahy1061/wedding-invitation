import React, { useState, useEffect } from 'react';
import { Calendar, Check, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { openGoogleCalendar } from '../../../utils/calendar';
import type { WeddingDetails } from '../../../config/weddingData';

interface CountdownCardProps {
  wedding: WeddingDetails;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ wedding }) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  const calculateTimeLeft = () => {
    const target = new Date('2026-10-03T19:00:00+05:00').getTime();
    const diff = target - new Date().getTime();
    const isArrived = diff <= 0;

    if (isArrived) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isArrived: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#faeed1', '#d4af37', '#aa841e', '#5e6f51', '#e8dcbe'],
      });
    } catch { /* fallback */ }
  };

  const handleCalendar = () => {
    triggerCelebrationConfetti();
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);

    // Open Google Calendar synchronously
    openGoogleCalendar(wedding);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center select-none overflow-hidden">
      {/* Green Tint */}
      <div className="absolute inset-0 tint-countdown pointer-events-none" />

      {/* Clock / Heart Watermark */}
      <div className="card-watermark select-none">{timeLeft.isArrived ? '✿' : '◷'}</div>

      {/* Ornate Frame + Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

      {/* TOP: Date Header (Always Visible in Both States) */}
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

      {/* CENTER: Countdown OR Celebration Mode */}
      <div className="relative z-10 my-2 card-content-enter card-content-enter-delay-1">
        {!timeLeft.isArrived ? (
          /* ACTIVE COUNTDOWN STATE */
          <>
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
                <span>{calendarAdded ? 'Calendar Opened' : 'Add to Google Calendar'}</span>
              </button>
            </div>
          </>
        ) : (
          /* CELEBRATION ZERO-STATE (When Event Day Arrives) */
          <div className="max-w-[325px] mx-auto space-y-3 py-1">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#fdfbf6]/95 to-[#f3ebd9]/95 border border-[#a88242]/80 shadow-[0_4px_16px_rgba(4,20,12,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xs space-y-2">
              <span className="font-arabic text-lg sm:text-xl text-[#7a531e] font-bold block leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
              </span>

              <h3 className="font-display text-sm sm:text-base font-semibold text-[#12200f] tracking-wide uppercase">
                ✦ The Blessed Day Is Here ✦
              </h3>

              <p className="font-serif italic text-[11px] sm:text-xs text-[#3a4d35] leading-relaxed">
                "May Allah bless their sacred union with everlasting peace, love, and barakah."
              </p>
            </div>

            {/* Celebration Sparkles Button */}
            <button
              type="button"
              onClick={triggerCelebrationConfetti}
              className="w-full max-w-64 mx-auto py-2.5 px-4 rounded-full bg-linear-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
              <span>Celebrate With Confetti</span>
              <Heart className="w-3.5 h-3.5 text-gold-300" />
            </button>
          </div>
        )}
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
    </div>
  );
};
