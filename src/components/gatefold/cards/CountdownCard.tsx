import React, { useState, useEffect } from 'react';
import { Calendar, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WeddingDetails } from '../../../config/weddingData';

interface CountdownCardProps {
  wedding: WeddingDetails;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ wedding }) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  const calculateTimeLeft = () => {
    const target = new Date('2026-10-03T19:00:00+05:00').getTime();
    const diff = target - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCalendar = () => {
    const startDate = '20261003T140000Z';
    const endDate = '20261003T170000Z';
    const title = encodeURIComponent(`Nikkah Ceremony: ${wedding.brideName} & ${wedding.groomName}`);
    const details = encodeURIComponent(
      `Nikkah Ceremony of ${wedding.brideName} & ${wedding.groomName}.\n\nVenue: ${wedding.venueHall}, ${wedding.venueName}, ${wedding.venueAddress}\nTiming: 7:00 PM – 10:00 PM`
    );
    const location = encodeURIComponent(`${wedding.venueHall}, ${wedding.venueName}, ${wedding.venueAddress}`);
    const webUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    const appUrl = `googlecalendar://render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

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

    // Try opening the Google Calendar app first, fall back to browser
    const appWindow = window.open(appUrl, '_blank');
    setTimeout(() => {
      if (appWindow && !appWindow.closed) return;
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }, 1500);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center select-none overflow-hidden">

      {/* Green Tint */}
      <div className="absolute inset-0 tint-countdown pointer-events-none" />

      {/* Clock Watermark */}
      <div className="card-watermark">◷</div>

      {/* Ornate Frame + Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

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

        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-[300px] mx-auto">
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
        <button
          type="button"
          onClick={handleCalendar}
          className="mt-5 w-full max-w-[240px] py-2.5 px-4 rounded-full bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
        >
          {calendarAdded ? (
            <Check className="w-3.5 h-3.5 text-gold-300" />
          ) : (
            <Calendar className="w-3.5 h-3.5 text-gold-300" />
          )}
          <span>{calendarAdded ? 'Calendar Opened' : 'Add to Google Calendar'}</span>
        </button>
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
