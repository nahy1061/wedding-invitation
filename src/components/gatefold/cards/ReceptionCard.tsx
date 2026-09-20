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

      {/* Watermark */}
      <div className="card-watermark">✿</div>

      {/* Ornate Frame + Corners */}
      <div className="absolute inset-3 border border-[#c5a880]/70 rounded-xl ornate-card-frame pointer-events-none" />
      <div className="absolute inset-0 filigree-corners pointer-events-none" />
      <div className="absolute inset-0 filigree-corners-reverse pointer-events-none" />

      {/* TOP: Header */}
      <div className="relative z-10 pt-1 card-content-enter">
        <span className="font-arabic text-xl sm:text-2xl text-[#6e4f1c] font-semibold block leading-tight">
          استقبالیہ
        </span>
        <p className="text-[10px] sm:text-[11px] font-display tracking-[0.22em] uppercase text-[#2c4227] font-bold mt-1">
          Awaiting to Welcome You
        </p>
        <div className="gold-ornament my-2">
          <span className="text-[#855e1a] text-[10px]">✦</span>
        </div>
        <p className="text-[10px] sm:text-[11px] font-serif italic text-[#3d5238] max-w-[260px] mx-auto leading-relaxed">
          For any assistance, directions, or queries at the venue, please feel free to reach out to our hosts.
        </p>
      </div>

      {/* CENTER: 3 Host Contact Tiles */}
      <div className="relative z-10 my-auto space-y-2.5 max-w-[320px] mx-auto w-full card-content-enter card-content-enter-delay-1">
        {wedding.receptionHosts.map((host, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#f5efe4]/90 border border-[#c5a880]/60 shadow-xs backdrop-blur-xs transition-all hover:border-[#b08d55] hover:shadow-sm"
          >
            {/* Host Details */}
            <div className="text-left">
              <p className="font-serif font-bold text-sm sm:text-[15px] text-[#12200f] leading-tight">
                {host.name}
              </p>
              <p className="text-[11px] sm:text-xs font-mono text-[#2e4627] font-semibold tracking-wider mt-0.5">
                {host.phone}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Direct Phone Call Button */}
              <a
                href={`tel:${host.phone.replace(/[^0-9+]/g, '')}`}
                title={`Call ${host.name}`}
                className="px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#20331c] to-[#152312] hover:from-[#2a4425] hover:to-[#1e301a] text-gold-200 hover:text-white border border-gold-400/50 shadow-xs text-[10px] font-serif uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Phone className="w-3 h-3 text-gold-300" />
                <span className="hidden sm:inline">Call</span>
              </a>

              {/* Direct WhatsApp Button */}
              <a
                href={`https://wa.me/${host.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`WhatsApp ${host.name}`}
                className="px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#1c421e] to-[#133014] hover:from-[#255727] hover:to-[#1b3f1c] text-gold-200 hover:text-white border border-gold-400/50 shadow-xs text-[10px] font-serif uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-3 h-3 text-gold-300" />
                <span className="hidden sm:inline">Chat</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM: Swipe Hint */}
      <div className="relative z-10 pt-1 card-content-enter card-content-enter-delay-2">
        <div className="gold-ornament mb-1">
          <span className="text-[#855e1a] text-[9px]">✦ ✦ ✦</span>
        </div>
        <p className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#8a9985]">
          Swipe for prayer blessings →
        </p>
      </div>
    </div>
  );
};
