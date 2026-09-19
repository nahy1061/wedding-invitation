import React, { useState } from 'react';
import { Heart, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DuaCardProps {
  guestName: string | null;
}

export const DuaCard: React.FC<DuaCardProps> = ({ guestName }) => {
  const [duaInput, setDuaInput] = useState('');
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const quickChips = [
    'Barakallahu Lakuma 🤲',
    'Mabrook & Endless Joy! ✨',
    'May Allah bless this union ❤️',
  ];

  const handleSendDua = (messageToSend?: string) => {
    const text = (messageToSend || duaInput).trim();
    if (!text) return;

    setSentMessage(text);
    setDuaInput('');

    try {
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.7 },
        colors: ['#faeed1', '#d4af37', '#aa841e', '#5e6f51'],
      });
    } catch { /* fallback */ }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center select-none overflow-hidden">

      {/* Soft Purple Tint */}
      <div className="absolute inset-0 tint-dua pointer-events-none" />

      {/* Star Watermark */}
      <div className="card-watermark">☽</div>

      {/* Ornate Frame + Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

      {/* TOP: Header */}
      <div className="relative z-10 pt-2 card-content-enter">
        <div className="flex items-center justify-center gap-1.5 text-[#2c4227]">
          <Heart className="w-3.5 h-3.5 text-[#855e1a] fill-[#855e1a]/20" />
          <p className="text-[11px] sm:text-xs font-display tracking-[0.22em] uppercase font-bold">
            Prayers & Blessings
          </p>
        </div>

        <div className="gold-ornament my-2">
          <span className="text-[#855e1a] text-[10px]">✦</span>
        </div>

        <p className="font-serif italic text-xs sm:text-sm text-[#283d24] max-w-xs mx-auto leading-relaxed">
          "May Allah bless this sacred union with eternal peace, happiness, and abundant barakah."
        </p>
      </div>

      {/* CENTER: Guestbook */}
      <div className="relative z-10 my-1 max-w-[320px] mx-auto w-full card-content-enter card-content-enter-delay-1">
        {sentMessage ? (
          <div className="p-4 rounded-2xl bg-[#eef5eb]/80 border border-[#86a87e]/60 text-center shadow-xs backdrop-blur-xs animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-center gap-1.5 text-[#24421f] text-sm font-serif font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#3b6d33]" />
              <span>Dua Received with Gratitude!</span>
            </div>
            <p className="text-xs font-serif italic text-[#12200f] mt-2 leading-snug">
              "{sentMessage}"
            </p>
            <span className="text-[10px] font-sans text-[#4d6a47] font-medium block mt-2">
              — {guestName || 'Honored Guest'}
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Quick Tap Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendDua(chip)}
                  className="px-3 py-1.5 rounded-full bg-[#f0e8d8]/80 hover:bg-[#e6dccb] border border-[#c5a880]/60 text-[10px] font-serif text-[#142312] font-semibold cursor-pointer transition-all active:scale-95 shadow-2xs backdrop-blur-xs"
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
              className="space-y-2"
            >
              <input
                type="text"
                value={duaInput}
                onChange={(e) => setDuaInput(e.target.value)}
                placeholder="Or write your personal prayer..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#f8f5ee]/80 border border-[#c5a880]/60 text-[#12200f] placeholder:text-[#8a9985] focus:outline-hidden focus:border-[#855e1a] shadow-inner font-sans backdrop-blur-xs"
              />
              <button
                type="submit"
                disabled={!duaInput.trim()}
                className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#243620] to-[#162413] hover:from-[#2e4429] hover:to-[#1e301a] disabled:opacity-50 text-[#faeed1] border border-gold-500/50 text-xs font-serif font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-gold-300" />
                <span>Send Blessing</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* BOTTOM: Thank You */}
      <div className="relative z-10 pt-2 card-content-enter card-content-enter-delay-2">
        <div className="gold-ornament mb-2">
          <span className="text-[#855e1a] text-[9px]">✦ ✦ ✦</span>
        </div>
        <p className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#8a9985]">
          JazakAllahu Khairan
        </p>
      </div>
    </div>
  );
};
