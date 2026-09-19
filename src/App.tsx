import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from './config/weddingData';
import { getGuestNameFromUrl } from './utils/urlHelper';
import { GatefoldCover } from './components/gatefold/GatefoldCover';
import { InnerCardSuite } from './components/gatefold/InnerCardSuite';
import { GatefoldAudioPlayer } from './components/gatefold/GatefoldAudioPlayer';
import { SplashOverlay } from './components/gatefold/SplashOverlay';
import bgPic from './assets/images/pic10.jpg';

const MAIN_TARGET_VOLUME = 0.7;

export function App() {
  const [hasEntered, setHasEntered] = useState(false);
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

  const handleEnter = () => {
    // Try fullscreen
    try {
      document.documentElement.requestFullscreen().catch(() => {});
    } catch {}

    // Play intro music
    const intro = introAudioRef.current;
    if (intro) {
      intro.currentTime = 0;
      intro.volume = 1.0;
      intro.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {});
    }

    setHasEntered(true);
  };

  const handleOpenStart = () => {
    const intro = introAudioRef.current;
    const main = mainAudioRef.current;

    // Start main track immediately at full volume on tap
    if (main) {
      main.currentTime = 0;
      main.volume = MAIN_TARGET_VOLUME;
      main.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {});
    }

    // Play intro briefly, then fade it out quickly
    if (intro) {
      intro.currentTime = 0;
      intro.volume = 1.0;
      intro.play().catch(() => {});

      // Fade intro out over 2 seconds while main is already playing
      let step = 0;
      const fadeSteps = 40;
      const fadeInterval = 2000 / fadeSteps;
      const timer = setInterval(() => {
        step++;
        const progress = step / fadeSteps;
        intro.volume = Math.max(0, 1 - progress);
        if (step >= fadeSteps) {
          clearInterval(timer);
          intro.pause();
          intro.volume = 1.0;
        }
      }, fadeInterval);
    }
  };

  const handleOpenComplete = () => {
    setIsOpened(true);
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
    <div className="relative min-h-[100dvh] w-full bg-cover bg-center bg-no-repeat text-[#2c2724] selection:bg-gold-500/30 selection:text-[#2c2724] overflow-x-hidden flex flex-col justify-between" style={{ backgroundImage: `url(${bgPic})` }}>
      
      {/* Splash Overlay — blocks everything until user taps */}
      <AnimatePresence>
        {!hasEntered && (
          <SplashOverlay onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Audio Controls (Top-Right) — hidden after gatefold opens */}
      {!isOpened && hasEntered && (
        <GatefoldAudioPlayer
          isPlaying={isPlayingAudio}
          onToggle={handleToggleAudio}
        />
      )}

      {/* Main Full-Screen Experience */}
      <main className="relative z-20 flex-1 flex items-center justify-center min-h-[100dvh] w-full">
        <AnimatePresence mode="wait">
          {hasEntered && !isOpened ? (
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
                onOpenStart={handleOpenStart}
                onOpenComplete={handleOpenComplete}
              />
            </motion.div>
          ) : hasEntered && isOpened ? (
            <motion.div
              key="inner-card-suite"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full py-2 sm:py-6 flex items-center justify-center"
            >
              <InnerCardSuite
                wedding={WEDDING_DATA}
                guestName={guestName}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Replay Gatefold Button (When inner card is open) */}
      {isOpened && (
        <aside aria-label="Replay Controls" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-1.5 rounded-full bg-[#182615]/85 hover:bg-[#182615] border border-gold-400/50 shadow-lg backdrop-blur-md text-gold-200 hover:text-gold-100 text-[10px] font-serif uppercase tracking-[0.2em] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3 h-3 text-gold-400" />
            <span>Close & Replay</span>
          </button>
        </aside>
      )}
    </div>
  );
}

export default App;
