import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Folder } from 'lucide-react';

interface Props {
  onFilesSelected: (files: File[]) => void;
}

export const UploadButtons: React.FC<Props> = ({ onFilesSelected }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFilesSelected(files);
  };

  return (
    <>
      <div className="space-y-3">
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full music-button text-pink-300 border-white/10 hover:border-pink-400/60"
        >
          <Upload className="w-4 h-4 mr-2" />
          Select Music Files
        </Button>

        <Button
          onClick={() => folderInputRef.current?.click()}
          variant="outline"
          className="w-full music-button text-pink-300 border-white/10 hover:border-pink-400/60"
        >
          <Folder className="w-4 h-4 mr-2" />
          Select Music Folder
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={folderInputRef}
        type="file"
        {...({ webkitdirectory: '' } as any)}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
