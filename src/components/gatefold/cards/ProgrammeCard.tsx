import React, { useState, useEffect } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WeddingDetails } from '../../../config/weddingData';

interface ProgrammeCardProps {
  wedding: WeddingDetails;
  onPrev: () => void;
  onNext: () => void;
}

export const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ wedding, onPrev, onNext }) => {
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
      `Nikkah Ceremony & Reception of ${wedding.brideName} & ${wedding.groomName}.\n\nVenue: ${wedding.venueHall}, ${wedding.venueName}, ${wedding.venueAddress}\nTiming: 7:00 PM – 10:00 PM`
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
    <div className="relative w-full h-full flex flex-col justify-between p-5 sm:p-7 text-center select-none overflow-hidden">
      
      {/* Fine Gold Inner Hairline Frame */}
      <div className="absolute inset-3 border border-[#c5a880]/60 rounded-xl pointer-events-none" />
      <div className="absolute inset-4 border border-[#c5a880]/35 border-dashed rounded-lg pointer-events-none" />

      {/* Gilded Corner Accents */}
      <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#8c6b2d]" />
      <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#8c6b2d]" />
      <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#8c6b2d]" />
      <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#8c6b2d]" />

      {/* TOP: Header Title */}
      <div className="relative z-10 pt-1">
        <p className="text-[11px] sm:text-xs font-serif tracking-[0.28em] uppercase text-[#2c4227] font-bold">
          Programme of Events
        </p>
        <p className="text-[10px] font-sans uppercase tracking-widest text-[#3d5238] mt-0.5 font-medium">
          Counting Down To The Sacred Union
        </p>

        {/* Live Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 max-w-[280px] mx-auto mt-2.5">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((unit, i) => (
            <div
              key={i}
              className="py-1.5 px-1 rounded-lg bg-[#f0e8d8] border border-[#c5a880]/80 shadow-xs flex flex-col items-center justify-center"
            >
              <span className="font-serif text-base sm:text-lg font-bold text-[#12200f] leading-none">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[8.5px] font-sans uppercase tracking-wider text-[#3d5238] font-semibold mt-0.5">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-[#bfa378] to-transparent my-2.5" />
      </div>

      {/* CENTER: Timeline List */}
      <div className="relative z-10 my-0.5 space-y-2 max-w-[320px] mx-auto w-full text-left">
        {wedding.itinerary.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f5efe4] border border-[#c5a880]/40 shadow-xs"
          >
            <div className="mt-0.5 p-1 rounded-md bg-[#e9decb] text-[#6e4f1c] shrink-0">
              <Clock className="w-3 h-3" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-1">
                <p className="font-serif text-xs font-bold text-[#12200f] leading-tight">
                  {item.title}
                </p>
                <span className="text-[10px] font-serif font-semibold text-[#855e1a] shrink-0">
                  {item.time}
                </span>
              </div>
              {item.description && (
                <p className="text-[10px] font-sans text-[#2e4627] mt-0.5 leading-snug">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM: Add to Calendar & Navigation Buttons */}
      <div className="relative z-10 pt-2 border-t border-[#c5a880]/40 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleCalendar}
          className="w-full max-w-[240px] py-1.5 px-4 rounded-full bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] text-[#faeed1] border border-gold-500/50 text-[10.5px] font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
        >
          {calendarAdded ? (
            <Check className="w-3.5 h-3.5 text-gold-300" />
          ) : (
            <Calendar className="w-3.5 h-3.5 text-gold-300" />
          )}
          <span>{calendarAdded ? 'Calendar Opened' : 'Add to Calendar'}</span>
        </button>

        {/* Prev / Next Nav */}
        <div className="flex items-center justify-between w-full max-w-[300px] px-2 text-[10px] font-serif uppercase tracking-wider">
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
            <span>Venue & Dua</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#855e1a]" />
          </button>
        </div>
      </div>

    </div>
  );
};
