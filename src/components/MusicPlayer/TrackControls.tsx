import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface Props {
  isPlaying: boolean;
  hasTracks: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const TrackControls: React.FC<Props> = ({
  isPlaying,
  hasTracks,
  onPlayPause,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrev}
        disabled={!hasTracks}
        className="music-button text-pink-300 hover:text-pink-200"
      >
        <SkipBack className="w-5 h-5" />
      </Button>

      <Button
        onClick={onPlayPause}
        disabled={!hasTracks}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-indigo-500 shadow-lg hover:scale-105 transition-transform"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white ml-0.5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={!hasTracks}
        className="music-button text-pink-300 hover:text-pink-200"
      >
        <SkipForward className="w-5 h-5" />
      </Button>
    </div>
  );
};
