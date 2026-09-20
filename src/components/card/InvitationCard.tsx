import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { IslamicArch } from '../ui/IslamicArch';
import { CountdownTimer } from './CountdownTimer';
import { EventSchedule } from './EventSchedule';
import { GoldButton } from '../ui/GoldButton';
import { openGoogleCalendar, downloadIcsFile } from '../../utils/calendar';
import type { WeddingConfig } from '../../types/invitation';

interface InvitationCardProps {
  config: WeddingConfig;
  guestName: string | null;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ config, guestName }) => {
  const [duaMessage, setDuaMessage] = useState('');
  const [duaSubmitted, setDuaSubmitted] = useState(false);
  const [wishesList, setWishesList] = useState<Array<{ name: string; message: string; time: string }>>([
    {
      name: 'Uncle Tariq & Family',
      message: 'Barakallahu lakuma wa baraka alaykuma wa jama\'a baynakuma fee khayr. May Allah bless your union with eternal happiness and peace!',
      time: 'Just now',
    },
  ]);

  const handleSendDua = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duaMessage.trim()) return;

    setWishesList((prev) => [
      {
        name: guestName || 'Honored Guest',
        message: duaMessage.trim(),
        time: 'Just now',
      },
      ...prev,
    ]);

    setDuaMessage('');
    setDuaSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#faeed1', '#d4af37', '#aa841e', '#e7ca6d'],
      });
    } catch {
      // fallback
    }

    setTimeout(() => setDuaSubmitted(false), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full max-w-[520px] mx-auto my-6 sm:my-10 px-4 sm:px-0"
    >
      {/* Outer Card Luxury Container */}
      <div
        className="relative rounded-2xl p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(212,175,55,0.15)] border border-gold-500/40 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 15%, #0a2e23 0%, #061a14 60%, #030d0a 100%)',
        }}
      >
        {/* Subtle Moroccan Tile Geometric Texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Double Gilded Inner Border */}
        <div className="absolute inset-3 sm:inset-4 border border-gold-400/30 rounded-xl pointer-events-none" />
        <div className="absolute inset-4 sm:inset-5 border border-gold-500/15 border-dashed rounded-lg pointer-events-none" />

        {/* Corner Flourishes */}
        <IslamicArch variant="corner-ornament" className="absolute top-5 left-5" />
        <IslamicArch variant="corner-ornament" className="absolute top-5 right-5 rotate-90" />
        <IslamicArch variant="corner-ornament" className="absolute bottom-5 left-5 -rotate-90" />
        <IslamicArch variant="corner-ornament" className="absolute bottom-5 right-5 rotate-180" />

        {/* SECTION 1: Spiritual Header */}
        <div className="relative z-10 text-center pt-4">
          <IslamicArch variant="top-arch" className="mb-2" />

          {/* Bismillah */}
          <h2 className="font-arabic text-2xl sm:text-3xl text-gold-300 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] my-3">
            {config.bismillahArabic}
          </h2>

          {/* Quranic Verse */}
          <div className="my-4 px-3 sm:px-6 py-3 rounded-lg bg-emerald-950/60 border border-gold-500/20 backdrop-blur-sm">
            <p className="font-arabic text-sm sm:text-base text-gold-200/90 leading-relaxed drop-shadow-sm">
              {config.quranVerseArabic}
            </p>
            <p className="font-serif italic text-xs sm:text-sm text-parchment-100/80 mt-2 leading-relaxed">
              {config.quranVerseEnglish}
            </p>
            <span className="inline-block font-sans text-[10px] uppercase tracking-widest text-gold-400/70 mt-1">
              — {config.quranReference}
            </span>
          </div>

          <IslamicArch variant="divider" />
        </div>

        {/* SECTION 2: Personalized Guest Greeting */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-4 p-3 rounded-lg bg-gradient-to-r from-gold-500/10 via-gold-500/20 to-gold-500/10 border border-gold-400/40 text-center"
          >
            <span className="text-[11px] font-serif uppercase tracking-widest text-gold-300 block">
              Honored Guest
            </span>
            <h3 className="font-serif text-lg sm:text-xl text-gold-100 font-semibold mt-0.5">
              {guestName}
            </h3>
            <p className="text-xs text-parchment-200/75 font-sans mt-1">
              We warmly request the honor of your presence and prayers.
            </p>
          </motion.div>
        )}

        {/* SECTION 3: Parents' Invitation & Announcement */}
        <div className="text-center my-6 space-y-1.5 px-2">
          <p className="text-xs sm:text-sm text-parchment-100/90 font-serif tracking-widest uppercase">
            {config.brideParents}
          </p>
          <p className="text-[11px] font-sans text-gold-400/80 tracking-widest uppercase italic">
            &
          </p>
          <p className="text-xs sm:text-sm text-parchment-100/90 font-serif tracking-widest uppercase">
            {config.groomParents}
          </p>
          <p className="text-xs text-gold-300/80 font-serif tracking-widest uppercase pt-3">
            Cordially invite you to celebrate the Nikkah & Wedding of their beloved children
          </p>
        </div>

        {/* SECTION 4: Bride & Groom Typography */}
        <div className="text-center my-8">
          <div className="py-2">
            <h1 className="font-serif text-2xl sm:text-4xl text-gold-200 font-bold tracking-wide drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
              {config.brideName}
            </h1>
            <div className="my-2 flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-gold-400/50" />
              <span className="font-script text-2xl sm:text-3xl text-gold-300 italic">&</span>
              <div className="h-[1px] w-8 bg-gold-400/50" />
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-gold-200 font-bold tracking-wide drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
              {config.groomName}
            </h1>
          </div>
        </div>

        <IslamicArch variant="divider" />

        {/* SECTION 5: Date, Time & Venue Details */}
        <div className="text-center my-6 space-y-3">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/60 border border-gold-500/30">
            <p className="font-serif text-sm sm:text-base text-gold-200 font-semibold tracking-wider">
              {config.eventDateFormatted}
            </p>
            <p className="text-[11px] text-gold-400/80 font-sans tracking-widest">
              {config.islamicDateFormatted}
            </p>
          </div>

          <div className="pt-3">
            <h4 className="font-serif text-lg text-gold-200 font-semibold">
              {config.venueName}
            </h4>
            <p className="text-xs sm:text-sm text-parchment-100/80 font-sans max-w-xs mx-auto mt-1 leading-relaxed">
              {config.venueAddress}
            </p>
            {config.dressCode && (
              <p className="text-xs text-gold-400/90 font-serif tracking-widest uppercase mt-2">
                Dress Code: <span className="font-sans normal-case text-parchment-200">{config.dressCode}</span>
              </p>
            )}
          </div>
        </div>

        {/* SECTION 6: Live Countdown Timer */}
        <CountdownTimer targetDate={config.eventDate} />

        {/* SECTION 7: Event Schedule / Programme */}
        <EventSchedule items={config.itinerary} />

        {/* SECTION 8: Utility Hub (Add to Calendar & Map Directions) */}
        <div className="my-8 pt-4 border-t border-gold-500/20">
          <p className="text-center text-xs font-serif uppercase tracking-widest text-gold-300 mb-4">
            Guest Actions & Directions
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Google Calendar */}
            <GoldButton
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => openGoogleCalendar(config)}
              icon={<Calendar className="w-4 h-4" />}
            >
              Google Calendar
            </GoldButton>

            {/* Apple Calendar .ics */}
            <GoldButton
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => downloadIcsFile(config)}
              icon={<Calendar className="w-4 h-4" />}
            >
              Apple Calendar (.ics)
            </GoldButton>

            {/* Google Maps Directions */}
            <a
              href={config.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <GoldButton
                variant="primary"
                size="sm"
                className="w-full"
                icon={<MapPin className="w-4 h-4 text-emerald-950" />}
              >
                Get Directions
              </GoldButton>
            </a>
          </div>
        </div>

        {/* SECTION 9: Send Dua & Blessing Wall */}
        <div className="my-8 p-4 sm:p-6 rounded-xl bg-emerald-950/70 border border-gold-500/30">
          <div className="flex items-center justify-center gap-2 mb-2 text-gold-300">
            <Heart className="w-4 h-4 text-gold-400 fill-gold-400/30" />
            <h4 className="font-serif text-sm sm:text-base tracking-widest uppercase font-semibold">
              Send Blessings & Duas
            </h4>
          </div>
          <p className="text-center text-xs text-parchment-200/70 mb-4 font-sans">
            Leave your heartfelt prayers and congratulations for the bride & groom.
          </p>

          <form onSubmit={handleSendDua} className="space-y-3">
            <textarea
              rows={3}
              value={duaMessage}
              onChange={(e) => setDuaMessage(e.target.value)}
              placeholder="Write your dua or warm wishes for the couple..."
              className="w-full p-3 rounded-lg bg-emerald-900/40 border border-gold-500/30 text-sm text-parchment-50 placeholder-gold-300/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 resize-none font-sans"
            />
            <div className="flex justify-end">
              <GoldButton
                type="submit"
                size="sm"
                icon={duaSubmitted ? <CheckCircle2 className="w-4 h-4 text-emerald-950" /> : <Send className="w-3.5 h-3.5 text-emerald-950" />}
              >
                {duaSubmitted ? 'Dua Sent!' : 'Send Dua'}
              </GoldButton>
            </div>
          </form>

          {/* Recent Wishes */}
          <div className="mt-6 space-y-3 pt-4 border-t border-gold-500/20">
            <span className="text-[10px] uppercase tracking-widest text-gold-400/70 font-serif block">
              Recent Blessings
            </span>
            {wishesList.map((wish, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-emerald-900/30 border border-gold-500/20 text-left"
              >
                <div className="flex justify-between items-center text-xs text-gold-300 font-serif font-semibold">
                  <span>{wish.name}</span>
                  <span className="text-[10px] text-gold-400/50 font-sans">{wish.time}</span>
                </div>
                <p className="text-xs text-parchment-100/80 font-sans mt-1 leading-relaxed">
                  "{wish.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="text-center pt-4 pb-2">
          <IslamicArch variant="divider" />
          <p className="text-[11px] font-serif text-gold-400/70 uppercase tracking-widest">
            Barakallahu Feekum
          </p>
        </div>
      </div>
    </motion.div>
  );
};
