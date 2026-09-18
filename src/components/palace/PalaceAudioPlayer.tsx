import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface PalaceAudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const PalaceAudioPlayer: React.FC<PalaceAudioPlayerProps> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-[#07130d]/80 border border-gold-500/40 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md text-gold-300 hover:text-gold-100 hover:border-gold-400 transition-all flex items-center gap-2 cursor-pointer select-none"
      title={isPlaying ? 'Mute Music' : 'Play Music'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-gold-400 animate-pulse" />
            <span className="w-0.5 h-2 bg-gold-400 animate-pulse delay-75" />
            <span className="w-0.5 h-3.5 bg-gold-400 animate-pulse delay-150" />
          </div>
          <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-gold-300">
            Music
          </span>
          <Volume2 className="w-3.5 h-3.5 text-gold-300" />
        </>
      ) : (
        <>
          <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-gold-400/60">
            Muted
          </span>
          <VolumeX className="w-3.5 h-3.5 text-gold-400/60" />
        </>
      )}
    </button>
  );
};
