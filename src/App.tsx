import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from './config/weddingData';
import { getGuestNameFromUrl } from './utils/urlHelper';
import { GatefoldCover } from './components/gatefold/GatefoldCover';
import { CreamInnerCard } from './components/gatefold/CreamInnerCard';
import { GatefoldAudioPlayer } from './components/gatefold/GatefoldAudioPlayer';

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
    // Unmute & play ambient melody upon opening the gatefold
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        // Silently handled
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
    <div className="relative min-h-[100dvh] w-full bg-[#5e6f51] text-[#2c2724] selection:bg-gold-500/30 selection:text-[#2c2724] overflow-x-hidden flex flex-col justify-between">
      
      {/* Audio Controls (Top-Right) */}
      <GatefoldAudioPlayer
        isPlaying={isPlayingAudio}
        onToggle={handleToggleAudio}
      />

      {/* Main Full-Screen Experience */}
      <main className="relative z-20 flex-1 flex items-center justify-center min-h-[100dvh] w-full">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="gatefold-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full min-h-[100dvh]"
            >
              <GatefoldCover
                guestName={guestName}
                onOpenComplete={handleOpenComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="cream-inner-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full py-4 sm:py-8 flex items-center justify-center"
            >
              <CreamInnerCard
                wedding={WEDDING_DATA}
                guestName={guestName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Replay Gatefold Button (When inner card is open) */}
      {isOpened && (
        <aside aria-label="Replay Controls" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-1.5 rounded-full bg-white/40 border border-white/60 shadow-md backdrop-blur-md text-[#2e3827] hover:bg-white/60 text-[10px] font-serif uppercase tracking-[0.2em] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-[#4d5c41]" />
            <span>Close & Replay</span>
          </button>
        </aside>
      )}
    </div>
  );
}

export default App;
