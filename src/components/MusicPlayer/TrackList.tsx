import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { List, Music, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Track } from '@/types/music';

interface Props {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  onSelect: (index: number) => void;
}

export const TrackList: React.FC<Props> = ({
  tracks,
  currentIndex,
  isPlaying,
  onSelect,
}) => {
  if (tracks.length === 0) return null;

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="music-button text-white border-white/15 hover:border-pink-400/60 bg-neutral-900/60 hover:bg-neutral-800/60"
          >
            <List className="w-4 h-4 mr-2" />
            Queue ({tracks.length})
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-80 max-h-64 overflow-y-auto bg-neutral-900/95 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40"
          align="center"
        >
          {tracks.map((track, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => onSelect(index)}
              className={cn(
                "flex items-center justify-between p-3 cursor-pointer text-sm rounded-md text-white transition-colors",
                index === currentIndex
                  ? "bg-gradient-to-r from-pink-500/60 via-fuchsia-500/50 to-indigo-500/60"
                  : "hover:bg-white/10"
              )}
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <Music className="w-4 h-4 flex-shrink-0 opacity-90" />
                <span className="truncate">{track.name}</span>
              </div>
              {index === currentIndex && (
                <div className="flex items-center space-x-1 flex-shrink-0 text-white/90">
                  {isPlaying ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                  <span className="text-[10px] uppercase tracking-wide">Playing</span>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
