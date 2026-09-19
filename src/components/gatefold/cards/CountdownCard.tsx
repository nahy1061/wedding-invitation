import React, { useState, useEffect } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WeddingDetails } from '../../../config/weddingData';

interface CountdownCardProps {
  wedding: WeddingDetails;
  onPrev: () => void;
  onNext: () => void;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ wedding, onPrev, onNext }) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  // Live countdown to Oct 3, 2026, 19:00 PKT
  const calculateTimeLeft = () => {
    const target = new Date('2026-10-03T19:00:00+05:00').getTime();
    const diff = target - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
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
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#faeed1', '#d4af37', '#aa841e', '#5e6f51'],
      });
    } catch {
      // fallback
    }

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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

      {/* TOP: Date Header */}
      <div className="relative z-10 pt-2">
        <p className="text-[11px] sm:text-xs font-serif tracking-[0.28em] uppercase text-[#2c4227] font-bold">
          The Auspicious Date
        </p>

        <div className="mt-3 space-y-1">
          <h2 className="font-serif text-lg sm:text-xl text-[#12200f] font-bold tracking-wider uppercase">
            {wedding.eventDateFormatted}
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#24381f] font-serif font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#855e1a]" />
            <span>{wedding.eventTimeFormatted}</span>
          </div>
          <p className="text-xs text-[#2e4627] font-serif font-medium tracking-wide">
            {wedding.islamicDateFormatted}
          </p>
        </div>

        <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#bfa378] to-transparent my-4" />
      </div>

      {/* CENTER: Live Floating Countdown Dials */}
      <div className="relative z-10 my-2">
        <p className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] text-[#3d5238] font-semibold mb-3">
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
              className="py-2.5 px-1.5 rounded-xl bg-[#f0e8d8] border border-[#c5a880]/80 shadow-xs flex flex-col items-center justify-center"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#12200f] leading-none">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-sans uppercase tracking-wider text-[#3d5238] font-bold mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Add to Calendar Button */}
        <button
          type="button"
          onClick={handleCalendar}
          className="mt-5 w-full max-w-[240px] py-2 px-4 rounded-full bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
        >
          {calendarAdded ? (
            <Check className="w-3.5 h-3.5 text-gold-300" />
          ) : (
            <Calendar className="w-3.5 h-3.5 text-gold-300" />
          )}
          <span>{calendarAdded ? 'Calendar Opened' : 'Add to Google Calendar'}</span>
        </button>
      </div>

      {/* BOTTOM: Navigation */}
      <div className="relative z-10 pt-2 border-t border-[#c5a880]/40 flex items-center justify-between w-full max-w-[320px] mx-auto px-2 text-[10.5px] font-serif uppercase tracking-wider">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-1 text-[#2c4227] hover:text-[#12200f] font-semibold cursor-pointer py-1"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#855e1a]" />
          <span>Invitation</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1 text-[#2c4227] hover:text-[#12200f] font-semibold cursor-pointer py-1"
        >
          <span>Venue & Location</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#855e1a]" />
        </button>
      </div>

    </div>
  );
};
