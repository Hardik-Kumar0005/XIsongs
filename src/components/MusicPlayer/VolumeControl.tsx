import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Volume2 } from 'lucide-react';

interface Props {
  volume: number;
  onChange: (value: number[]) => void;
}

export const VolumeControl: React.FC<Props> = ({ volume, onChange }) => {
  return (
    <div className="flex items-center space-x-3">
  <Volume2 className="w-4 h-4 text-pink-300" />
      <Slider
        value={[volume]}
        max={1}
        step={0.01}
        onValueChange={onChange}
        className="flex-1"
      />
    </div>
  );
};
