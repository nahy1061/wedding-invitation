import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Copy, Check, Share2 } from 'lucide-react';
import { AUDIO_TRACKS } from '../../config/weddingConfig';
import { buildPersonalizedUrl, generateWhatsAppShareLink } from '../../utils/urlHelper';
import { GoldButton } from '../ui/GoldButton';
import type { WeddingConfig } from '../../types/invitation';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onUpdateConfig: (updated: WeddingConfig) => void;
  onResetInvitation: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetInvitation,
}) => {
  const [formData, setFormData] = useState<WeddingConfig>(config);
  const [guestNameInput, setGuestNameInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    localStorage.setItem('nikkah_wedding_config', JSON.stringify(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyLink = () => {
    const url = buildPersonalizedUrl(guestNameInput);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-lg bg-emerald-950 border-l border-gold-500/40 shadow-2xl z-50 overflow-y-auto flex flex-col text-parchment-50 font-sans"
          >
            {/* Header */}
            <div className="p-5 border-b border-gold-500/30 flex items-center justify-between sticky top-0 bg-emerald-950/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-2 text-gold-300 font-serif">
                <Settings className="w-5 h-5 text-gold-400" />
                <h3 className="text-base sm:text-lg font-bold tracking-wider uppercase">
                  Invitation Customizer
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-emerald-900/60 border border-gold-500/30 flex items-center justify-center text-gold-300 hover:bg-gold-500/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-6 flex-1">
              {/* SECTION: WhatsApp Link Generator */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900/50 to-emerald-950 border border-gold-500/40 shadow-md">
                <div className="flex items-center gap-2 text-gold-300 font-serif mb-2">
                  <Share2 className="w-4 h-4 text-gold-400" />
                  <h4 className="text-sm font-semibold tracking-wide uppercase">
                    Generate Guest Link (WhatsApp)
                  </h4>
                </div>
                <p className="text-xs text-parchment-200/70 mb-3">
                  Type a guest name to generate a custom URL where their name appears on the sealed envelope and card.
                </p>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={guestNameInput}
                    onChange={(e) => setGuestNameInput(e.target.value)}
                    placeholder="e.g. Uncle Tariq & Family"
                    className="w-full p-2.5 rounded-lg bg-emerald-900/50 border border-gold-500/30 text-sm text-parchment-50 placeholder-gold-300/30 focus:outline-none focus:border-gold-400 font-sans"
                  />

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-900/80 border border-gold-500/40 text-gold-300 text-xs font-serif font-semibold flex items-center justify-center gap-1.5 hover:bg-gold-500/20 transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied URL!' : 'Copy Guest Link'}
                    </button>

                    <a
                      href={generateWhatsAppShareLink(
                        guestNameInput || 'Honored Guest',
                        formData.brideName,
                        formData.groomName
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-serif font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all text-center"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Send on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Form to Edit Wedding Details */}
              <form onSubmit={handleSave} className="space-y-4">
                <div className="text-gold-300 font-serif text-sm font-semibold uppercase tracking-wider border-b border-gold-500/20 pb-1">
                  Wedding Information
                </div>

                {/* Bride & Groom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                      Bride Name
                    </label>
                    <input
                      type="text"
                      value={formData.brideName}
                      onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                      className="w-full p-2 rounded-lg bg-emerald-900/30 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                      Groom Name
                    </label>
                    <input
                      type="text"
                      value={formData.groomName}
                      onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                      className="w-full p-2 rounded-lg bg-emerald-900/30 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                {/* Parents */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                      Bride's Parents
                    </label>
                    <input
                      type="text"
                      value={formData.brideParents}
                      onChange={(e) => setFormData({ ...formData, brideParents: e.target.value })}
                      className="w-full p-2 rounded-lg bg-emerald-900/30 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                      Groom's Parents
                    </label>
                    <input
                      type="text"
                      value={formData.groomParents}
                      onChange={(e) => setFormData({ ...formData, groomParents: e.target.value })}
                      className="w-full p-2 rounded-lg bg-emerald-900/30 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                {/* Date & Islamic Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                      Event Date Text
                    </label>
                    <input
                      type="text"
                      value={formData.eventDateFormatted}
                      onChange={(e) => setFormData({ ...formData, eventDateFormatted: e.target.value })}
                      className="w-full p-2 rounded-lg bg-emerald-900/30 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                      Islamic Date
                    </label>
                    <input
                      type="text"
                      value={formData.islamicDateFormatted}
                      onChange={(e) => setFormData({ ...formData, islamicDateFormatted: e.target.value })}
                      className="w-full p-2 rounded-lg bg-emerald-900/30 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                {/* Venue Name & Address */}
                <div>
                  <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={formData.venueName}
                    onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                    className="w-full p-2 rounded-lg bg-emerald-900/30 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                    Venue Address
                  </label>
                  <input
                    type="text"
                    value={formData.venueAddress}
                    onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                    className="w-full p-2 rounded-lg bg-emerald-900/30 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                  />
                </div>

                {/* Default Audio Track Selection */}
                <div>
                  <label className="block text-xs text-gold-400/80 mb-1 font-serif">
                    Default Background Melody
                  </label>
                  <select
                    value={formData.selectedAudioId}
                    onChange={(e) => setFormData({ ...formData, selectedAudioId: e.target.value })}
                    className="w-full p-2 rounded-lg bg-emerald-900/40 border border-gold-500/30 text-xs text-parchment-50 focus:outline-none focus:border-gold-400"
                  >
                    {AUDIO_TRACKS.map((t) => (
                      <option key={t.id} value={t.id} className="bg-emerald-950 text-parchment-50">
                        {t.title} ({t.genre})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <GoldButton type="submit" size="md" className="w-full">
                    {saved ? 'Changes Saved!' : 'Save Wedding Details'}
                  </GoldButton>
                </div>
              </form>

              {/* Reset Preview Button */}
              <div className="pt-4 border-t border-gold-500/20 text-center">
                <button
                  type="button"
                  onClick={() => {
                    onResetInvitation();
                    onClose();
                  }}
                  className="text-xs text-gold-400/70 hover:text-gold-300 font-serif underline cursor-pointer"
                >
                  ✦ Replay Envelope Unsealing Animation ✦
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
