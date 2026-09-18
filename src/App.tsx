import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from './config/weddingData';
import { getGuestNameFromUrl } from './utils/urlHelper';
import { PalaceGateCover } from './components/palace/PalaceGateCover';
import { PalaceInvitationCard } from './components/palace/PalaceInvitationCard';
import { PalaceAudioPlayer } from './components/palace/PalaceAudioPlayer';
import { ParticleCanvas } from './components/ui/ParticleCanvas';

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
    // Unmute & play atmospheric audio smoothly upon gate open
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        // Silently handled by browser policies
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
        // Silently handled
      });
    }
  };

  const handleReset = () => {
    setIsOpened(false);
  };

  return (
    <div className="relative min-h-screen bg-[#060907] text-[#faeed1] selection:bg-gold-500/40 selection:text-gold-100 overflow-x-hidden flex flex-col justify-between">
      
      {/* Ambient Floating Gold Dust Particles */}
      <ParticleCanvas />

      {/* Discreet Royal Audio Controls */}
      <PalaceAudioPlayer
        isPlaying={isPlayingAudio}
        onToggle={handleToggleAudio}
      />

      {/* Main Palace Stage */}
      <main className="relative z-20 flex-1 flex items-center justify-center py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <PalaceGateCover
                wedding={WEDDING_DATA}
                guestName={guestName}
                onOpenComplete={handleOpenComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <PalaceInvitationCard
                wedding={WEDDING_DATA}
                guestName={guestName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Discreet Replay Button (When card is open) */}
      {isOpened && (
        <aside aria-label="Replay Controls" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-1.5 rounded-full bg-[#081f15]/90 border border-gold-500/40 shadow-lg backdrop-blur-md text-gold-300 hover:text-gold-100 text-[10px] font-serif uppercase tracking-[0.2em] flex items-center gap-1.5 transition-all cursor-pointer hover:border-gold-400"
          >
            <RotateCcw className="w-3 h-3 text-gold-400" />
            <span>Replay Gate Opening</span>
          </button>
        </aside>
      )}
    </div>
  );
}

export default App;
