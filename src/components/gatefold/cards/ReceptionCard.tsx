import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import type { WeddingDetails } from '../../../config/weddingData';

interface ReceptionCardProps {
  wedding: WeddingDetails;
}

export const ReceptionCard: React.FC<ReceptionCardProps> = ({ wedding }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-5 sm:p-7 text-center select-none overflow-hidden">
      {/* Warm Tint Background */}
      <div className="absolute inset-0 tint-invitation pointer-events-none" />

      {/* Ornate Watermark */}
      <div className="card-watermark select-none text-[130px] opacity-[0.035]">✿</div>

      {/* Ornate Double Frame + Filigree Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

      {/* ── TOP: Header with Balanced Spacing ── */}
      <div className="relative z-10 pt-3 sm:pt-4 pb-1 card-content-enter">
        <span className="font-arabic text-2xl sm:text-3xl text-[#7a531e] font-bold block leading-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]">
          استقبالیہ
        </span>

        <h2 className="font-display text-[11px] sm:text-xs tracking-[0.26em] uppercase text-[#1b2e18] font-bold mt-1.5">
          Reception Committee
        </h2>

        {/* Elegant Gold Divider with proper vertical spacing */}
        <div className="gold-ornament my-2.5 sm:my-3">
          <span className="text-[#855e1a] text-[10px]">✦</span>
        </div>

        <p className="font-serif italic text-[11px] sm:text-xs text-[#3a4d35] max-w-[280px] mx-auto leading-relaxed px-1">
          "Awaiting with joy to receive and welcome you to our celebration"
        </p>
      </div>

      {/* ── CENTER: 3 Bespoke Host Contact Cards ── */}
      <div className="relative z-10 my-auto py-1 space-y-2.5 sm:space-y-3 max-w-[340px] mx-auto w-full card-content-enter card-content-enter-delay-1">
        {wedding.receptionHosts.map((host, idx) => (
          <div
            key={idx}
            className="relative group rounded-2xl bg-gradient-to-b from-[#fbf8f1]/95 to-[#f3ebd9]/95 border border-[#c5a880]/60 shadow-[0_2px_12px_rgba(4,20,12,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] pl-[7px] pr-2.5 py-2.5 sm:pr-3 sm:py-3 backdrop-blur-xs flex items-center justify-between transition-all duration-300 hover:border-[#c5a880]/90 hover:shadow-[0_4px_20px_rgba(180,150,80,0.12)]"
          >
            {/* Soft gold left accent bar */}
            <div className="absolute left-0 top-2.5 bottom-2.5 w-[2px] rounded-full bg-gradient-to-b from-[#d4af37]/50 via-[#c5a880]/70 to-[#d4af37]/50" />

            {/* Left: Monogram Crest & Host Details */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1 text-left pl-1.5">
              {/* Monogram Seal */}
              <div className="w-9 h-9 sm:w-[38px] sm:h-[38px] rounded-full bg-gradient-to-br from-[#faf5ea] to-[#e8dcc4] border border-[#d4c49a]/80 shadow-[0_1px_4px_rgba(140,110,45,0.12),inset_0_1px 2px_rgba(255,255,255,0.95)] flex items-center justify-center text-[#7a531e] font-serif font-bold text-[13px] sm:text-sm shrink-0 transition-shadow duration-300 group-hover:shadow-[0_2px_8px_rgba(212,175,55,0.2)]">
                {host.name.charAt(0)}
              </div>

              {/* Name & Phone */}
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[13px] sm:text-[14px] text-[#12200f] font-semibold tracking-wide leading-snug truncate">
                  {host.name}
                </h3>
                <p className="text-[9.5px] sm:text-[10.5px] font-numerals font-light text-[#455241c1] tracking-wide mt-0.5">
                  {host.phone}
                </p>
              </div>
            </div>

            {/* Right: Jewel Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 pr-0.5">
              {/* Call Button */}
              <a
                href={`tel:${host.phone.replace(/[^0-9+]/g, '')}`}
                title={`Call ${host.name}`}
                aria-label={`Call ${host.name}`}
                className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-full bg-gradient-to-b from-[#253921] to-[#142312] hover:from-[#324d2c] hover:to-[#1d331a] text-gold-200 hover:text-white border border-gold-400/60 shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] text-gold-300 drop-shadow-xs" />
              </a>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${host.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`WhatsApp ${host.name}`}
                aria-label={`WhatsApp ${host.name}`}
                className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-full bg-gradient-to-b from-[#1b431e] to-[#102b12] hover:from-[#265e2b] hover:to-[#173e1a] text-gold-200 hover:text-white border border-gold-400/60 shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] text-gold-300 drop-shadow-xs" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM: Swipe Hint with Proper Clearance ── */}
      <div className="relative z-10 pt-1 pb-1 sm:pb-2 card-content-enter card-content-enter-delay-2">
        <div className="gold-ornament mb-1.5">
          <span className="text-[#855e1a] text-[9px]">✦ ✦ ✦</span>
        </div>
        <p className="text-[9px] font-serif uppercase tracking-[0.22em] text-[#7d8f78]">
          Swipe for prayer blessings →
        </p>
      </div>
    </div>
  );
};
