import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { AUDIO_TRACKS } from '../../config/weddingConfig';
import type { AudioTrack } from '../../types/invitation';

interface AudioPlayerProps {
  isPlaying: boolean;
  selectedTrackId: string;
  onTogglePlay: () => void;
  onSelectTrack: (track: AudioTrack) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  selectedTrackId,
  onTogglePlay,
  onSelectTrack,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = AUDIO_TRACKS.find((t) => t.id === selectedTrackId) || AUDIO_TRACKS[0];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src);
      audioRef.current.loop = true;
    } else {
      audioRef.current.src = currentTrack.src;
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Handled by browser autoplay policy
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack, isPlaying]);

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      {/* Track Selector Popover */}
      {isMenuOpen && (
        <div className="absolute top-12 right-0 w-64 p-3 rounded-xl bg-emerald-950/95 border border-gold-500/40 shadow-2xl backdrop-blur-md text-left">
          <p className="text-[10px] font-serif uppercase tracking-widest text-gold-400/80 mb-2">
            Switch Background Melody
          </p>
          <div className="space-y-1.5">
            {AUDIO_TRACKS.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  onSelectTrack(track);
                  setIsMenuOpen(false);
                }}
                className={`w-full p-2 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${
                  track.id === currentTrack.id
                    ? 'bg-gold-500/20 text-gold-200 border border-gold-400/40 font-semibold'
                    : 'text-parchment-100/70 hover:bg-white/5'
                }`}
              >
                <div>
                  <p className="font-serif">{track.title}</p>
                  <p className="text-[10px] text-gold-400/60 font-sans">{track.genre}</p>
                </div>
                {track.id === currentTrack.id && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Track Switcher Button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="px-2.5 py-1.5 rounded-full bg-emerald-900/80 border border-gold-500/40 text-gold-300 text-xs font-serif flex items-center gap-1.5 hover:bg-gold-500/20 transition-all backdrop-blur-sm shadow-md"
        title="Switch Music"
      >
        <Music className="w-3.5 h-3.5 text-gold-400" />
        <span className="hidden sm:inline tracking-wider">Music</span>
      </button>

      {/* Main Play / Mute Toggle Button */}
      <button
        type="button"
        onClick={onTogglePlay}
        className="w-9 h-9 rounded-full bg-emerald-900/90 border border-gold-500/50 text-gold-300 flex items-center justify-center hover:bg-gold-500/20 hover:scale-105 transition-all shadow-md backdrop-blur-sm"
        aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-gold-300 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-gold-400/60" />
        )}
      </button>
    </div>
  );
};
