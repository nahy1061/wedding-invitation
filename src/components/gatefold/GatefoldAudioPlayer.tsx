import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface GatefoldAudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const GatefoldAudioPlayer: React.FC<GatefoldAudioPlayerProps> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-white/30 border border-white/40 shadow-sm backdrop-blur-md text-[#2e3827] hover:bg-white/50 transition-all flex items-center gap-1.5 cursor-pointer select-none"
      title={isPlaying ? 'Mute Music' : 'Play Music'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-[#4d5c41] animate-pulse" />
            <span className="w-0.5 h-2 bg-[#4d5c41] animate-pulse delay-75" />
            <span className="w-0.5 h-3.5 bg-[#4d5c41] animate-pulse delay-150" />
          </div>
          <Volume2 className="w-3.5 h-3.5 text-[#3a4731]" />
        </>
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-[#5e6f51]" />
      )}
    </button>
  );
};
