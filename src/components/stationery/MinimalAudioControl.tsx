import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MinimalAudioControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MinimalAudioControl: React.FC<MinimalAudioControlProps> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-[#fdfbf7]/90 border border-[#c5a880]/50 shadow-[0_4px_12px_rgba(56,50,44,0.08)] backdrop-blur-sm text-[#6e645a] hover:text-[#2c2724] hover:border-[#c5a880] transition-all flex items-center gap-2 cursor-pointer select-none"
      title={isPlaying ? 'Mute Music' : 'Play Music'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-[#c5a880] animate-pulse" />
            <span className="w-0.5 h-2 bg-[#c5a880] animate-pulse delay-75" />
            <span className="w-0.5 h-3.5 bg-[#c5a880] animate-pulse delay-150" />
          </div>
          <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#8e8271]">
            Music
          </span>
          <Volume2 className="w-3.5 h-3.5 text-[#c5a880]" />
        </>
      ) : (
        <>
          <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#8e8271]">
            Muted
          </span>
          <VolumeX className="w-3.5 h-3.5 text-[#9e9387]" />
        </>
      )}
    </button>
  );
};
