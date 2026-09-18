import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Settings, RotateCcw } from 'lucide-react';
import { DEFAULT_WEDDING_CONFIG } from './config/weddingConfig';
import { getGuestNameFromUrl } from './utils/urlHelper';
import { EnvelopeCover } from './components/cover/EnvelopeCover';
import { InvitationCard } from './components/card/InvitationCard';
import { AudioPlayer } from './components/audio/AudioPlayer';
import { AdminDrawer } from './components/customizer/AdminDrawer';
import { ParticleCanvas } from './components/ui/ParticleCanvas';
import type { AudioTrack, WeddingConfig } from './types/invitation';

export function App() {
  const [config, setConfig] = useState<WeddingConfig>(() => {
    const saved = localStorage.getItem('nikkah_wedding_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_WEDDING_CONFIG;
      }
    }
    return DEFAULT_WEDDING_CONFIG;
  });

  const [guestName, setGuestName] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState(config.selectedAudioId);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const extractedGuest = getGuestNameFromUrl();
    setGuestName(extractedGuest);
  }, []);

  const handleOpenComplete = () => {
    setIsOpened(true);
    setIsPlayingAudio(true); // Automatically begin audio on unseal interaction
  };

  const handleTogglePlay = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleSelectTrack = (track: AudioTrack) => {
    setSelectedTrackId(track.id);
    setIsPlayingAudio(true);
  };

  const handleUpdateConfig = (updated: WeddingConfig) => {
    setConfig(updated);
    setSelectedTrackId(updated.selectedAudioId);
  };

  const handleResetInvitation = () => {
    setIsOpened(false);
  };

  return (
    <div className="relative min-h-screen bg-emerald-950 text-parchment-50 selection:bg-gold-500/30 selection:text-gold-200 overflow-x-hidden flex flex-col justify-between">
      {/* Ambient Gold Particle Dust */}
      <ParticleCanvas />

      {/* Persistent Audio Controls (Top-Right) */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        selectedTrackId={selectedTrackId}
        onTogglePlay={handleTogglePlay}
        onSelectTrack={handleSelectTrack}
      />

      {/* Main Content Area */}
      <main className="relative z-20 flex-1 flex items-center justify-center py-6">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <EnvelopeCover
                config={config}
                guestName={guestName}
                onOpenComplete={handleOpenComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full"
            >
              <InvitationCard config={config} guestName={guestName} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Bar: Customize & Replay Controls */}
      <aside aria-label="Invitation Controls" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full bg-emerald-950/80 border border-gold-500/40 shadow-2xl backdrop-blur-md">
        {isOpened && (
          <button
            type="button"
            onClick={handleResetInvitation}
            className="p-2 rounded-full text-gold-400/80 hover:text-gold-200 hover:bg-gold-500/10 transition-colors"
            title="Replay Envelope Unsealing"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-emerald-950 font-serif text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Customize & Share</span>
        </button>
      </aside>

      {/* Admin / Customizer Slide-Over */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetInvitation={handleResetInvitation}
      />
    </div>
  );
}

export default App;
