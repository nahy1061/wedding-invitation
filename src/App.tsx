import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from './config/weddingData';
import { getGuestNameFromUrl } from './utils/urlHelper';
import { StationeryEnvelope } from './components/stationery/StationeryEnvelope';
import { StationeryCard } from './components/stationery/StationeryCard';
import { MinimalAudioControl } from './components/stationery/MinimalAudioControl';

export function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const extractedGuest = getGuestNameFromUrl();
    setGuestName(extractedGuest);

    // Prepare audio instance
    audioRef.current = new Audio(WEDDING_DATA.audioUrl);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleOpenComplete = () => {
    setIsOpened(true);
    // Unmute & play audio upon user interaction (breaking seal)
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        // Handled silently
      });
    }
  };

  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        // Handled silently
      });
    }
  };

  const handleReset = () => {
    setIsOpened(false);
  };

  return (
    <div className="relative min-h-screen bg-[#f5f0e8] text-[#2c2724] selection:bg-[#dfcaa8]/40 selection:text-[#2c2724] overflow-x-hidden flex flex-col justify-between">
      
      {/* Soft Ambient Radial Studio Glow */}
      <div
        className="fixed inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 25%, #ffffff 0%, #f5f0e8 70%, #ebe3d5 100%)',
        }}
      />

      {/* Discreet Luxury Audio Toggle */}
      <MinimalAudioControl
        isPlaying={isPlayingAudio}
        onToggle={handleToggleAudio}
      />

      {/* Main Luxury Stationery Stage */}
      <main className="relative z-20 flex-1 flex items-center justify-center py-6">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <StationeryEnvelope
                wedding={WEDDING_DATA}
                guestName={guestName}
                onOpenComplete={handleOpenComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <StationeryCard wedding={WEDDING_DATA} guestName={guestName} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Discreet Replay Button if in Card View */}
      {isOpened && (
        <aside aria-label="Replay Controls" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-full bg-[#fdfbf7]/80 border border-[#c5a880]/40 shadow-sm backdrop-blur-sm text-[#8e8271] hover:text-[#2c2724] text-[10px] font-serif uppercase tracking-[0.2em] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Replay Unboxing</span>
          </button>
        </aside>
      )}
    </div>
  );
}

export default App;
