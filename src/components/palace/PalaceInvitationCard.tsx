import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { openGoogleCalendar } from '../../utils/calendar';
import type { WeddingDetails } from '../../config/weddingData';

interface PalaceInvitationCardProps {
  wedding: WeddingDetails;
  guestName: string | null;
}

export const PalaceInvitationCard: React.FC<PalaceInvitationCardProps> = ({
  wedding,
  guestName,
}) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  // Live Countdown logic
  const calculateTimeLeft = () => {
    // 3 Oct 2026 19:00 PKT
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
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCalendar = () => {
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#faeed1', '#f3e0a6', '#d4af37'],
      });
    } catch {
      // fallback
    }

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
    openGoogleCalendar(wedding);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[440px] sm:max-w-[480px] mx-auto my-4 sm:my-8 px-3 select-none"
    >
      {/* Outer Royal Gilded Card Frame */}
      <div className="relative rounded-2xl p-6 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.25)] border border-gold-500/50 bg-gradient-to-b from-[#091510] via-[#050d0a] to-[#020604] overflow-hidden text-center text-[#faeed1]">
        
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-radial from-gold-500/20 to-transparent blur-2xl pointer-events-none" />

        {/* Double Gilded Inner Border Frame */}
        <div className="absolute inset-3 sm:inset-4 border border-gold-400/30 rounded-xl pointer-events-none" />
        <div className="absolute inset-4 sm:inset-5 border border-gold-500/15 border-dashed rounded-lg pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-gold-400" />

        {/* HEADER: Islamic Arch & Bismillah */}
        <div className="relative z-10 pt-2">
          {/* Top Arch SVG */}
          <svg
            viewBox="0 0 340 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[280px] mx-auto text-gold-400 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] mb-2"
          >
            <path
              d="M10 75 V 35 C 10 35, 65 30, 120 18 C 145 12, 170 3, 170 3 C 170 3, 195 12, 220 18 C 275 30, 330 35, 330 35 V 75"
              stroke="url(#cardGoldArch)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="170" cy="3" r="2.5" fill="#faeed1" />
            <defs>
              <linearGradient id="cardGoldArch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#faeed1" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa841e" />
              </linearGradient>
            </defs>
          </svg>

          {/* Bismillah */}
          <h2 className="font-arabic text-2xl sm:text-3xl text-gold-300 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] my-2">
            {wedding.bismillahArabic}
          </h2>

          {/* Quranic Verse Box */}
          <div className="my-4 px-3 sm:px-5 py-3 rounded-lg bg-[#071710]/80 border border-gold-500/25 backdrop-blur-sm">
            <p className="font-arabic text-xs sm:text-sm text-gold-200/90 leading-loose">
              {wedding.quranVerseArabic}
            </p>
            <p className="font-serif italic text-[11px] sm:text-xs text-gold-300/80 mt-2 leading-relaxed">
              {wedding.quranVerseEnglish}
            </p>
            <span className="inline-block text-[9px] font-serif uppercase tracking-[0.25em] text-gold-400/70 mt-1">
              — {wedding.quranReference} —
            </span>
          </div>
        </div>

        {/* Personalized Guest Greeting (if present) */}
        {guestName && (
          <div className="my-3 py-1.5 px-4 rounded bg-gradient-to-r from-gold-500/10 via-gold-500/20 to-gold-500/10 border border-gold-400/30 inline-block">
            <span className="text-[10px] font-sans italic text-gold-400/80 block">
              Honored Guest
            </span>
            <span className="font-serif text-sm sm:text-base font-semibold text-gold-100 tracking-wider">
              {guestName}
            </span>
          </div>
        )}

        {/* Invitation Announcement Text */}
        <div className="my-4 px-2">
          <p className="text-[10px] sm:text-[11px] font-serif tracking-[0.25em] text-gold-300/85 uppercase leading-relaxed">
            {wedding.invitationText}
          </p>
        </div>

        {/* Bride & Groom Names */}
        <div className="my-6 py-2">
          <h1 className="font-display text-3xl sm:text-4xl text-gold-200 font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)]">
            {wedding.brideName}
          </h1>

          <div className="my-2 flex items-center justify-center gap-3">
            <div className="h-[0.5px] w-8 bg-gold-400/60" />
            <span className="font-script text-3xl sm:text-4xl text-gold-300 italic">&</span>
            <div className="h-[0.5px] w-8 bg-gold-400/60" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-gold-200 font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)]">
            {wedding.groomName}
          </h1>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-28 mx-auto bg-gradient-to-r from-transparent via-gold-500/50 to-transparent my-4" />

        {/* Date, Time & Venue */}
        <div className="my-5 space-y-4">
          <div className="inline-block px-5 py-2 rounded-full bg-[#081f15]/80 border border-gold-500/40 shadow-sm">
            <p className="font-serif text-sm sm:text-base text-gold-200 font-semibold tracking-wider">
              {wedding.eventDateFormatted}
            </p>
            <p className="text-xs text-gold-300/90 font-serif tracking-widest mt-0.5">
              {wedding.eventTimeFormatted}
            </p>
            <p className="text-[10px] text-gold-400/70 font-sans tracking-wider mt-0.5">
              {wedding.islamicDateFormatted}
            </p>
          </div>

          <div className="pt-2">
            <p className="font-serif text-sm sm:text-base text-gold-200 font-semibold tracking-wide">
              {wedding.venueHall}
            </p>
            <p className="font-serif text-xs sm:text-sm text-gold-300/90 tracking-wider mt-0.5">
              {wedding.venueName}
            </p>
            <p className="text-xs text-gold-400/70 font-sans mt-0.5">
              {wedding.venueAddress}
            </p>
          </div>
        </div>

        {/* Live Ceremony Countdown */}
        <div className="my-6">
          <p className="text-[10px] font-serif uppercase tracking-[0.25em] text-gold-400/80 mb-2">
            Countdown to Celebration
          </p>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((unit, i) => (
              <div
                key={i}
                className="p-2 rounded bg-[#061811]/90 border border-gold-500/30 text-center shadow-sm"
              >
                <span className="font-serif text-base sm:text-lg font-bold text-gold-200 block">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[8px] text-gold-400/70 uppercase font-sans tracking-widest">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: Add to Calendar & Maps */}
        <div className="mt-8 pt-5 border-t border-gold-500/30 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Add to Calendar */}
          <button
            type="button"
            onClick={handleCalendar}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#081e14]/90 border border-gold-500/50 hover:border-gold-400 hover:bg-gold-500/20 transition-all text-gold-200 text-xs font-serif tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {calendarAdded ? (
              <Check className="w-3.5 h-3.5 text-gold-300" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
            )}
            <span>{calendarAdded ? 'Calendar Opened' : 'Add to Calendar'}</span>
          </button>

          {/* Venue Directions */}
          <a
            href={wedding.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-[#07130d] font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all text-xs font-serif tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <MapPin className="w-3.5 h-3.5 text-[#07130d]" />
            <span>Venue Directions</span>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-2 text-center">
          <p className="text-[10px] font-serif uppercase tracking-[0.3em] text-gold-400/70">
            With Love & Prayers
          </p>
        </div>
      </div>
    </motion.div>
  );
};
