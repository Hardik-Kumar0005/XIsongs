import React from 'react';
import { Slider } from '@/components/ui/slider';
import { formatTime } from '@/utils/formatTime';

interface Props {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  disabled?: boolean;
}

export const SeekBar: React.FC<Props> = ({ currentTime, duration, onSeek, disabled }) => {
  const [dragValue, setDragValue] = React.useState<number | null>(null);
  const displayTime = dragValue ?? currentTime;

  return (
    <div className="space-y-1">
      <Slider
        min={0}
        max={duration || 0}
        step={0.5}
        value={[Math.min(displayTime, duration || 0)]}
        onValueChange={(vals) => setDragValue(vals[0])}
        onValueCommit={(vals) => {
          setDragValue(null);
          onSeek(vals[0]);
        }}
        disabled={disabled || !duration}
        className="data-[disabled]:opacity-40"
      />
      <div className="flex justify-between text-[11px] font-mono text-pink-200/70">
        <span>{formatTime(displayTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
