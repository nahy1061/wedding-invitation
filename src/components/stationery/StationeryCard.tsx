import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BotanicalArt } from './BotanicalArt';
import { openGoogleCalendar } from '../../utils/calendar';
import type { WeddingDetails } from '../../config/weddingData';

interface StationeryCardProps {
  wedding: WeddingDetails;
  guestName: string | null;
}

export const StationeryCard: React.FC<StationeryCardProps> = ({ wedding, guestName }) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleAddToCalendar = () => {
    // Trigger sweet sparkle effect
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#dfcaa8', '#c5a880', '#9d815d'],
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
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[440px] sm:max-w-[480px] mx-auto my-4 sm:my-8 px-3"
    >
      {/* 350gsm Deckle-Edge Luxury Stationery Card */}
      <div className="relative rounded-sm p-7 sm:p-10 shadow-[0_25px_60px_-15px_rgba(56,50,44,0.2),0_0_0_1px_rgba(197,168,128,0.3)] bg-[#fdfbf7] paper-texture overflow-hidden text-center text-[#2c2724]">
        
        {/* Subtle Blind-Debossed Hairline Border Frame */}
        <div className="absolute inset-3.5 sm:inset-4.5 border border-[#c5a880]/40 rounded-sm pointer-events-none" />
        <div className="absolute inset-4.5 sm:inset-5.5 border border-[#c5a880]/20 border-dashed rounded-sm pointer-events-none" />

        {/* Corner Botanical Flourishes */}
        <BotanicalArt variant="corner-line" className="absolute top-5 left-5" />
        <BotanicalArt variant="corner-line" className="absolute top-5 right-5 rotate-90" />
        <BotanicalArt variant="corner-line" className="absolute bottom-5 left-5 -rotate-90" />
        <BotanicalArt variant="corner-line" className="absolute bottom-5 right-5 rotate-180" />

        {/* Top Header: Bismillah & Quranic Verse */}
        <div className="relative z-10 pt-2">
          <BotanicalArt variant="top-crest" className="mb-2" />

          {/* Bismillah */}
          <h2 className="font-arabic text-2xl sm:text-3xl text-[#8c7355] font-normal leading-relaxed">
            {wedding.bismillahArabic}
          </h2>

          {/* Quranic Verse */}
          <div className="my-4 px-2 sm:px-4">
            <p className="font-arabic text-xs sm:text-sm text-[#6e645a] leading-loose">
              {wedding.quranVerseArabic}
            </p>
            <p className="font-serif italic text-[11px] sm:text-xs text-[#8e8271] mt-2 leading-relaxed max-w-sm mx-auto">
              {wedding.quranVerseEnglish}
            </p>
            <span className="inline-block text-[9px] font-serif uppercase tracking-[0.25em] text-[#c5a880] mt-1">
              — {wedding.quranReference} —
            </span>
          </div>

          <BotanicalArt variant="botanical-divider" />
        </div>

        {/* Personalized Greeting (if present) */}
        {guestName && (
          <div className="my-3 py-1.5 px-4 rounded-sm bg-[#f7f3ec] border-y border-[#c5a880]/30 inline-block">
            <span className="text-[10px] font-sans italic text-[#8e8271] block">
              Cordially Invited
            </span>
            <span className="font-serif text-sm font-semibold tracking-wider text-[#2c2724]">
              {guestName}
            </span>
          </div>
        )}

        {/* Invitation Text */}
        <div className="my-4">
          <p className="text-[11px] font-serif tracking-[0.3em] uppercase text-[#8e8271]">
            Together With Their Families
          </p>
          <p className="text-[10px] font-sans tracking-[0.2em] text-[#6e645a] mt-1 uppercase">
            Request the honor of your presence to celebrate the Nikkah ceremony of
          </p>
        </div>

        {/* Bride & Groom Names */}
        <div className="my-6 py-2">
          <h1 className="font-display text-3xl sm:text-4xl text-[#2c2724] tracking-wide font-normal letterpress-deboss">
            {wedding.brideName}
          </h1>
          
          <div className="my-2 flex items-center justify-center gap-3">
            <div className="h-[0.5px] w-8 bg-[#c5a880]/60" />
            <span className="font-script text-3xl text-[#c5a880] italic">&</span>
            <div className="h-[0.5px] w-8 bg-[#c5a880]/60" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[#2c2724] tracking-wide font-normal letterpress-deboss">
            {wedding.groomName}
          </h1>
        </div>

        <BotanicalArt variant="botanical-divider" />

        {/* Date, Time & Venue */}
        <div className="my-5 space-y-4">
          {/* Date & Time */}
          <div>
            <p className="font-serif text-base sm:text-lg text-[#2c2724] font-semibold tracking-wider uppercase">
              {wedding.eventDateFormatted}
            </p>
            <p className="text-xs sm:text-sm font-serif text-[#8e8271] tracking-widest mt-0.5">
              {wedding.eventTimeFormatted}
            </p>
            <p className="text-[10px] text-[#c5a880] font-sans tracking-wider mt-0.5">
              {wedding.islamicDateFormatted}
            </p>
          </div>

          {/* Venue */}
          <div className="pt-2">
            <p className="font-serif text-sm sm:text-base text-[#2c2724] font-semibold tracking-wide">
              {wedding.venueHall}
            </p>
            <p className="font-serif text-xs sm:text-sm text-[#6e645a] tracking-wider mt-0.5">
              {wedding.venueName}
            </p>
            <p className="text-[11px] text-[#8e8271] font-sans mt-0.5">
              {wedding.venueAddress}
            </p>
          </div>
        </div>

        {/* Physical Stationery Enclosure Tags (Actions) */}
        <div className="mt-8 pt-5 border-t border-[#c5a880]/30 flex flex-col sm:flex-row items-center justify-center gap-3">
          
          {/* Add to Calendar Tag */}
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-[#f7f3ec] border border-[#c5a880]/50 hover:border-[#c5a880] hover:bg-[#eee8de] transition-all text-[#2c2724] text-xs font-serif tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {calendarAdded ? (
              <Check className="w-3.5 h-3.5 text-[#8c7355]" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
            )}
            <span>{calendarAdded ? 'Calendar Opened' : 'Add to Calendar'}</span>
          </button>

          {/* Venue Directions Tag */}
          <a
            href={wedding.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#3d3630] to-[#2e2823] text-[#fdfbf7] border border-[#c5a880]/40 hover:opacity-95 transition-all text-xs font-serif tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <MapPin className="w-3.5 h-3.5 text-[#dfcaa8]" />
            <span>Venue Directions</span>
          </a>
        </div>

        {/* Card Footer */}
        <div className="mt-6 pt-3 text-center">
          <p className="text-[10px] font-serif uppercase tracking-[0.3em] text-[#c5a880]/80">
            With Love & Prayers
          </p>
        </div>
      </div>
    </motion.div>
  );
};
