import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from './config/weddingData';
import { getGuestNameFromUrl } from './utils/urlHelper';
import { GatefoldCover } from './components/gatefold/GatefoldCover';
import { CreamInnerCard } from './components/gatefold/CreamInnerCard';
import { GatefoldAudioPlayer } from './components/gatefold/GatefoldAudioPlayer';

const CROSSFADE_DURATION = 3500;
const CROSSFADE_STEPS = 70;
const CROSSFADE_INTERVAL = CROSSFADE_DURATION / CROSSFADE_STEPS;
const MAIN_TARGET_VOLUME = 0.7;

export function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const activeTrackRef = useRef<'intro' | 'main'>('intro');

  useEffect(() => {
    const extractedGuest = getGuestNameFromUrl();
    setGuestName(extractedGuest);

    // Intro track — preloaded, ready to play on first tap
    const intro = new Audio(WEDDING_DATA.introAudioUrl);
    intro.loop = true;
    intro.volume = 1.0;
    introAudioRef.current = intro;

    // Main track — preloaded, starts muted
    const main = new Audio(WEDDING_DATA.audioUrl);
    main.loop = true;
    main.volume = 0;
    mainAudioRef.current = main;

    return () => {
      intro.pause();
      main.pause();
    };
  }, []);

  const crossfade = useCallback(() => {
    const intro = introAudioRef.current;
    const main = mainAudioRef.current;
    if (!intro || !main) return;

    // Main track already playing (silent) — just start the crossfade

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / CROSSFADE_STEPS;

      // Intro stays at full volume for first 40%, then fades out quickly
      // Main fades in smoothly over the full duration
      intro.volume = progress < 0.4 ? 1.0 : Math.cos(((progress - 0.4) / 0.6) * Math.PI / 2);
      main.volume = MAIN_TARGET_VOLUME * Math.sin(progress * Math.PI / 2);

      if (step >= CROSSFADE_STEPS) {
        clearInterval(timer);
        intro.pause();
        intro.volume = 1.0;
        main.volume = MAIN_TARGET_VOLUME;
        activeTrackRef.current = 'main';
      }
    }, CROSSFADE_INTERVAL);
  }, []);

  const handleOpenComplete = () => {
    setIsOpened(true);

    const intro = introAudioRef.current;
    const main = mainAudioRef.current;

    // Play intro immediately on first user gesture
    if (intro) {
      intro.currentTime = 0;
      intro.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {});
    }

    // Start main track immediately (silent) so it's ready when crossfade hits
    if (main) {
      main.currentTime = 0;
      main.volume = 0;
      main.play().catch(() => {});
    }

    // Crossfade to main track after 4 seconds
    setTimeout(() => {
      crossfade();
    }, 4000);
  };

  const handleToggleAudio = () => {
    const active = activeTrackRef.current === 'intro'
      ? introAudioRef.current
      : mainAudioRef.current;

    if (!active) return;

    if (isPlayingAudio) {
      active.pause();
      setIsPlayingAudio(false);
    } else {
      active.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {});
    }
  };

  const handleReset = () => {
    const intro = introAudioRef.current;
    const main = mainAudioRef.current;
    if (!intro || !main) return;

    // Stop both
    main.pause();
    main.volume = 0;
    main.currentTime = 0;

    // Restart intro
    intro.volume = 1.0;
    intro.currentTime = 0;
    intro.play().catch(() => {});

    activeTrackRef.current = 'intro';
    setIsOpened(false);
    setIsPlayingAudio(true);
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
