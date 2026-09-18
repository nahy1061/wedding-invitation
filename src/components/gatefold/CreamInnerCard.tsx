import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Check } from 'lucide-react';
import type { WeddingDetails } from '../../config/weddingData';

interface CreamInnerCardProps {
  wedding: WeddingDetails;
  guestName: string | null;
}

export const CreamInnerCard: React.FC<CreamInnerCardProps> = ({ wedding, guestName }) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleCalendar = () => {
    // 3 Oct 2026 19:00 to 22:00 PKT (14:00 to 17:00 UTC)
    const startDate = '20261003T140000Z';
    const endDate = '20261003T170000Z';
    const title = encodeURIComponent(`Nikkah Ceremony: ${wedding.brideName} & ${wedding.groomName}`);
    const details = encodeURIComponent(
      `Nikkah Ceremony of ${wedding.brideName} & ${wedding.groomName}.\n\nVenue: ${wedding.venueHall}, ${wedding.venueName}, ${wedding.venueAddress}\nTiming: 7:00 PM – 10:00 PM`
    );
    const location = encodeURIComponent(`${wedding.venueHall}, ${wedding.venueName}, ${wedding.venueAddress}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[440px] sm:max-w-[480px] mx-auto my-3 sm:my-6 px-3 select-none"
    >
      {/* 350gsm Warm Cream Handmade Paper Card */}
      <div className="relative rounded-2xl p-6 sm:p-9 shadow-[0_25px_60px_-15px_rgba(4,20,12,0.45),0_0_0_1px_rgba(212,175,55,0.4)] cream-paper-texture overflow-hidden text-center text-[#243320]">
        
        {/* Fine Gold Hairline Inner Border */}
        <div className="absolute inset-3 sm:inset-4 border border-[#c5a880]/50 rounded-xl pointer-events-none" />
        <div className="absolute inset-4 sm:inset-5 border border-[#c5a880]/25 border-dashed rounded-lg pointer-events-none" />

        {/* Delicate Corner Accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold-600/70" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold-600/70" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold-600/70" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold-600/70" />

        {/* SECTION 1: Bismillah & Quranic Verse */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative z-10 pt-1"
        >
          <p className="font-arabic text-2xl sm:text-3xl text-[#7e6345] leading-relaxed">
            {wedding.bismillahArabic}
          </p>

          <p className="font-arabic text-xs sm:text-sm text-[#4d5f47] mt-1 italic font-semibold">
            {wedding.subVerseArabic}
          </p>
          <p className="font-serif italic text-[11px] text-[#6d7e67]">
            {wedding.subVerseEnglish}
          </p>

          <div className="h-[0.5px] w-20 mx-auto bg-gradient-to-r from-transparent via-[#c5a880]/60 to-transparent my-3" />
        </motion.div>

        {/* Personalized Recipient Tag (if present) */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="my-2 py-1 px-4 rounded-full bg-[#eee7d8] border border-[#c5a880]/40 inline-block"
          >
            <span className="text-[9px] font-sans italic text-[#5a6b54] block">
              Cordially Invited
            </span>
            <span className="font-serif text-xs sm:text-sm font-semibold text-[#243320]">
              {guestName}
            </span>
          </motion.div>
        )}

        {/* SECTION 2: Title Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="my-3"
        >
          <p className="text-[10px] sm:text-[11px] font-serif tracking-[0.3em] uppercase text-[#5a6b54] font-semibold">
            Nikkah Ceremony
          </p>
        </motion.div>

        {/* SECTION 3: Bride & Groom Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="my-4 py-1"
        >
          <h1 className="font-display text-3xl sm:text-4xl text-[#1f2d1c] font-normal tracking-wide drop-shadow-sm">
            {wedding.brideName}
          </h1>

          <div className="my-1.5 flex items-center justify-center gap-3">
            <div className="h-[0.5px] w-6 bg-[#c5a880]/70" />
            <span className="font-script text-3xl text-gold-600 italic">&</span>
            <div className="h-[0.5px] w-6 bg-[#c5a880]/70" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[#1f2d1c] font-normal tracking-wide drop-shadow-sm">
            {wedding.groomName}
          </h1>
        </motion.div>

        {/* Divider */}
        <div className="h-[0.5px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#c5a880]/60 to-transparent my-3" />

        {/* SECTION 4: Date, Time & Venue Sections */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="my-4 space-y-3"
        >
          {/* Date & Time */}
          <div>
            <p className="font-serif text-base sm:text-lg text-[#1f2d1c] font-semibold tracking-wider uppercase">
              {wedding.eventDateFormatted}
            </p>
            <p className="text-xs text-[#4d5f47] font-serif tracking-widest mt-0.5">
              {wedding.eventTimeFormatted}
            </p>
            <p className="text-[10px] text-[#7a8c74] font-sans tracking-wider mt-0.5">
              {wedding.islamicDateFormatted}
            </p>
          </div>

          {/* Venue */}
          <div className="pt-1">
            <p className="font-serif text-sm sm:text-base text-[#1f2d1c] font-semibold tracking-wide">
              {wedding.venueHall}
            </p>
            <p className="font-serif text-xs sm:text-sm text-[#4d5f47] tracking-wider mt-0.5">
              {wedding.venueName}
            </p>
            <p className="text-[11px] text-[#6d7e67] font-sans mt-0.5">
              {wedding.venueAddress}
            </p>
          </div>
        </motion.div>

        {/* SECTION 5: Interactive Enclosure Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-6 pt-4 border-t border-[#c5a880]/35 flex flex-col sm:flex-row items-center justify-center gap-2.5"
        >
          {/* Add to Calendar */}
          <button
            type="button"
            onClick={handleCalendar}
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#eee7d8] border border-[#c5a880]/60 hover:bg-[#e4dbca] transition-all text-[#243320] text-xs font-serif tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {calendarAdded ? (
              <Check className="w-3.5 h-3.5 text-gold-700" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-gold-700" />
            )}
            <span>{calendarAdded ? 'Calendar Opened' : 'Add to Calendar'}</span>
          </button>

          {/* Venue Directions */}
          <a
            href={wedding.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-gradient-to-r from-[#3e5239] to-[#2e3e29] text-[#faf6ef] border border-gold-500/40 hover:opacity-95 transition-all text-xs font-serif tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <MapPin className="w-3.5 h-3.5 text-gold-300" />
            <span>Venue Directions</span>
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-4 pt-1 text-center">
          <p className="text-[9px] font-serif uppercase tracking-[0.25em] text-[#7a8c74]">
            With Warmest Blessings
          </p>
        </div>
      </div>
    </motion.div>
  );
};
