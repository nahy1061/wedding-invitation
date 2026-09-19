import React, { useState, useEffect } from 'react';
import { Heart, Send, CheckCircle2, X, MessageSquareHeart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export interface DuaItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface DuaCardProps {
  guestName: string | null;
}

export const DuaCard: React.FC<DuaCardProps> = ({ guestName }) => {
  const [duas, setDuas] = useState<DuaItem[]>(() => {
    try {
      const cached = localStorage.getItem('wedding_duas_list');
      if (cached) {
        const parsed = JSON.parse(cached);
        // Filter out any leftover seed items from testing
        if (Array.isArray(parsed)) {
          return parsed.filter((d: DuaItem) => !d.id.startsWith('seed-'));
        }
      }
    } catch {}
    return [];
  });

  const [activeDuaIndex, setActiveDuaIndex] = useState(0);
  const [duaInput, setDuaInput] = useState('');
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickChips = [
    'بارك الله لكما 🤲',
    'Mabrook & Endless Joy! ✨',
    'May Allah bless this union ❤️',
  ];

  // Fetch live duas from API on mount
  useEffect(() => {
    const fetchDuas = async () => {
      try {
        const res = await fetch('/api/duas');
        if (res.ok) {
          const liveDuas = await res.json();
          if (Array.isArray(liveDuas)) {
            const cleanList = liveDuas.filter((d: DuaItem) => !d.id.startsWith('seed-'));
            setDuas(cleanList);
            localStorage.setItem('wedding_duas_list', JSON.stringify(cleanList));
          }
        }
      } catch (err) {
        console.warn('Using local cached duas:', err);
      }
    };

    fetchDuas();
  }, []);

  // Auto-cycle live ticker every 5 seconds
  useEffect(() => {
    if (duas.length <= 1) return;
    const interval = setInterval(() => {
      setActiveDuaIndex((prev) => (prev + 1) % duas.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [duas.length]);

  const handleSendDua = (message?: string) => {
    const text = (message || duaInput).trim();
    if (!text) return;
    setPendingMessage(text);
    setDuaInput('');

    // If guest name is known from URL, submit directly without asking
    if (guestName) {
      executeSubmit(text, guestName);
    } else {
      setShowNameModal(true);
    }
  };

  const executeSubmit = async (messageText: string, senderName: string) => {
    setIsSubmitting(true);
    const newDua: DuaItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: senderName,
      message: messageText,
      createdAt: new Date().toISOString(),
    };

    // 1. Optimistic UI update
    const updated = [newDua, ...duas.filter((d) => d.id !== newDua.id)];
    setDuas(updated);
    setActiveDuaIndex(0);
    localStorage.setItem('wedding_duas_list', JSON.stringify(updated));

    // 2. Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.7 },
        colors: ['#faeed1', '#d4af37', '#aa841e', '#5e6f51'],
      });
    } catch {}

    // 3. API POST
    try {
      await fetch('/api/duas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: senderName, message: messageText }),
      });
    } catch (err) {
      console.warn('Saved locally (network offline):', err);
    }

    setIsSubmitting(false);
    setShowNameModal(false);
    setPendingMessage(null);
    setNameInput('');
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 3500);
  };

  const handleModalSubmit = () => {
    if (!pendingMessage) return;
    const sender = nameInput.trim() || guestName || 'Well-Wisher';
    executeSubmit(pendingMessage, sender);
  };

  const activeDua = duas[activeDuaIndex] || duas[0];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-5 sm:p-7 text-center select-none overflow-hidden">
      {/* Soft Violet Tint */}
      <div className="absolute inset-0 tint-dua pointer-events-none" />

      {/* Star Watermark */}
      <div className="card-watermark">☽</div>

      {/* Ornate Frame + Filigree Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

      {/* TOP: Header */}
      <div className="relative z-10 pt-1 card-content-enter">
        <div className="flex items-center justify-center gap-1.5 text-[#2c4227]">
          <Heart className="w-3.5 h-3.5 text-[#855e1a] fill-[#855e1a]/20" />
          <p className="text-[11px] sm:text-xs font-display tracking-[0.22em] uppercase font-bold">
            Prayers & Blessings
          </p>
        </div>

        <div className="gold-ornament my-1.5">
          <span className="text-[#855e1a] text-[10px]">✦</span>
        </div>

        <p className="font-serif italic text-[11px] sm:text-xs text-[#283d24] max-w-xs mx-auto leading-relaxed">
          "May Allah bless this sacred union with eternal love, harmony, and barakah."
        </p>
      </div>

      {/* CENTER: Live Wishes Ticker & Input */}
      <div className="relative z-10 my-1 max-w-[320px] mx-auto w-full space-y-2.5 card-content-enter card-content-enter-delay-1">
        {/* LIVE WISHES TICKER */}
        <div className="p-3 rounded-xl bg-[#f5efe4]/85 border border-[#c5a880]/60 shadow-xs backdrop-blur-xs relative overflow-hidden text-left">
          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#c5a880]/30">
            <div className="flex items-center gap-1 text-[9px] font-display uppercase tracking-wider text-[#855e1a] font-bold">
              <Sparkles className="w-2.5 h-2.5 text-[#855e1a]" />
              <span>Live Guestbook</span>
            </div>
            {duas.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAllModal(true)}
                className="text-[9px] font-serif text-[#2c4227] hover:text-[#855e1a] font-semibold underline underline-offset-2 cursor-pointer transition-colors"
              >
                View All ({duas.length}) →
              </button>
            )}
          </div>

          {/* Sliding Quote / Empty State */}
          <div className="min-h-[44px] flex flex-col justify-center">
            {duas.length === 0 ? (
              <div className="text-center py-1">
                <p className="font-serif italic text-[11px] sm:text-xs text-[#4d5f47]">
                  Be the first to send a prayer & blessing...
                </p>
                <span className="text-[9px] font-sans text-[#7a8c75] block mt-0.5">
                  Your dua will appear here live
                </span>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDua.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="font-serif italic text-[11px] sm:text-xs text-[#1c2e19] line-clamp-2 leading-snug">
                    "{activeDua.message}"
                  </p>
                  <p className="text-[10px] font-display font-semibold text-[#855e1a] mt-1 flex items-center justify-between">
                    <span>— {activeDua.name}</span>
                  </p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Ticker Controls */}
          {duas.length > 1 && (
            <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#c5a880]/20 text-[9px] text-[#788973]">
              <span>Swipe or wait to cycle</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDuaIndex((prev) => (prev === 0 ? duas.length - 1 : prev - 1))
                  }
                  className="p-0.5 hover:text-[#12200f] cursor-pointer"
                  aria-label="Previous dua"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <span>
                  {activeDuaIndex + 1}/{duas.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveDuaIndex((prev) => (prev + 1) % duas.length)
                  }
                  className="p-0.5 hover:text-[#12200f] cursor-pointer"
                  aria-label="Next dua"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* INPUT / SUBMISSION STATE */}
        {justSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 rounded-xl bg-[#eef5eb]/90 border border-[#86a87e]/70 text-center shadow-xs backdrop-blur-xs"
          >
            <div className="flex items-center justify-center gap-1.5 text-[#24421f] text-xs font-serif font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#3b6d33]" />
              <span>Dua Added to Guestbook!</span>
            </div>
            <p className="text-[10px] font-serif italic text-[#385233] mt-0.5">
              JazakAllahu Khairan for your blessings
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {/* Quick Tap Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendDua(chip)}
                  className="px-2.5 py-1 rounded-full bg-[#f0e8d8]/85 hover:bg-[#e6dccb] border border-[#c5a880]/60 text-[9.5px] font-serif text-[#142312] font-semibold cursor-pointer transition-all active:scale-95 shadow-2xs backdrop-blur-xs"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendDua();
              }}
              className="space-y-1.5"
            >
              <input
                type="text"
                value={duaInput}
                onChange={(e) => setDuaInput(e.target.value)}
                placeholder="Or write your personal prayer..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f5ee]/90 border border-[#c5a880]/60 text-[#12200f] placeholder:text-[#8a9985] focus:outline-hidden focus:border-[#855e1a] shadow-inner font-sans backdrop-blur-xs"
              />
              <button
                type="submit"
                disabled={!duaInput.trim() || isSubmitting}
                className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] disabled:opacity-50 text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-gold-300" />
                <span>{isSubmitting ? 'Sending...' : 'Send Blessing'}</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* BOTTOM: Thank You */}
      <div className="relative z-10 pt-1 card-content-enter card-content-enter-delay-2">
        <div className="gold-ornament mb-1">
          <span className="text-[#855e1a] text-[9px]">✦ ✦ ✦</span>
        </div>
        <p className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#8a9985]">
          JazakAllahu Khairan
        </p>
      </div>

      {/* MODAL 1: SENDER NAME PROMPT */}
      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xs cream-paper-texture border border-[#c5a880]/70 rounded-2xl shadow-2xl p-5 space-y-3 relative overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <p className="font-display text-sm font-semibold text-[#12200f] tracking-wide">
                Your Name
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowNameModal(false);
                  setPendingMessage(null);
                  setNameInput('');
                }}
                className="text-[#8a9985] hover:text-[#12200f] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] font-serif italic text-[#3d5238]">
              So the couple knows who sent this beautiful blessing
            </p>

            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Uncle Farooq, Zara & Ali"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleModalSubmit();
              }}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#c5a880]/60 text-[#12200f] placeholder:text-[#8a9985] focus:outline-hidden focus:border-[#855e1a] shadow-inner font-sans"
            />

            <button
              type="button"
              onClick={handleModalSubmit}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-gold-300" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Dua'}</span>
            </button>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: VIEW ALL BLESSINGS GUESTBOOK */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="w-full max-w-sm max-h-[82vh] flex flex-col cream-paper-texture border border-[#c5a880]/80 rounded-2xl shadow-2xl p-5 relative overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-2.5 border-b border-[#c5a880]/40">
              <div className="flex items-center gap-1.5">
                <MessageSquareHeart className="w-4 h-4 text-[#855e1a]" />
                <h3 className="font-display text-sm font-bold text-[#12200f] tracking-wide">
                  Guestbook of Blessings
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="p-1 text-[#8a9985] hover:text-[#12200f] transition-colors cursor-pointer rounded-full"
                aria-label="Close guestbook"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Subtitle */}
            <p className="text-[10px] font-serif italic text-[#384e32] my-2">
              {duas.length > 0
                ? `${duas.length} prayers & heartfelt wishes from family and friends`
                : 'No blessings submitted yet'}
            </p>

            {/* Scrollable Dua Cards / Empty State */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 my-1 custom-scrollbar">
              {duas.length === 0 ? (
                <div className="py-8 text-center space-y-1">
                  <p className="font-serif italic text-xs text-[#5e6f51]">
                    The guestbook is currently empty.
                  </p>
                  <p className="text-[10px] font-sans text-[#8a9985]">
                    Be the first to write a prayer below!
                  </p>
                </div>
              ) : (
                duas.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white/70 border border-[#c5a880]/40 text-left space-y-1 shadow-2xs"
                  >
                    <p className="font-serif italic text-xs text-[#1c2e19] leading-relaxed">
                      "{item.message}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-[#855e1a] font-display font-semibold pt-1 border-t border-[#c5a880]/20">
                      <span>— {item.name}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Close action */}
            <button
              type="button"
              onClick={() => setShowAllModal(false)}
              className="mt-3 w-full py-2 rounded-full bg-[#f0e8d8] border border-[#c5a880]/60 text-xs font-serif font-semibold text-[#142312] hover:bg-[#e6dccb] cursor-pointer transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
