"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { UploadButtons } from "./UploadButtons";
import { TrackInfo } from "./TrackInfo";
import { TrackControls } from "./TrackControls";
import { TrackList } from "./TrackList";
import { VolumeControl } from "./VolumeControl";
import { SeekBar } from "./SeekBar";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export const MusicPlayer: React.FC = () => {
  const {
    tracks,
    currentIndex,
    isPlaying,
    volume,
    selectFiles,
    playPause,
    nextTrack,
    prevTrack,
    setTrackIndex,
    setVolume,
    currentTrackName,
    currentTime,
    duration,
    seek,
  } = useAudioPlayer();

  const handleFilesSelected = React.useCallback((files: File[]) => {
    const dt = new DataTransfer();
    for (const f of files) {
      dt.items.add(f);
    }
    selectFiles(dt.files);
  }, [selectFiles]);

  return (
  <Card className="glass-panel glass-frame px-6 pt-6 pb-9 w-full max-w-md mx-auto space-y-6 rounded-2xl text-white border-0">
      <div className="relative z-10 space-y-6">
  {/* Upload Section */}
  <UploadButtons onFilesSelected={handleFilesSelected} />

      {/* Track Info */}
      <TrackInfo
        trackName={currentTrackName}
        trackNumber={currentIndex + 1}
        totalTracks={tracks.length}
      />

      {/* Controls */}
      <TrackControls
        isPlaying={isPlaying}
        hasTracks={tracks.length > 0}
        onPlayPause={playPause}
        onNext={nextTrack}
        onPrev={prevTrack}
      />

      {/* Track List */}
      <TrackList
        tracks={tracks}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        onSelect={setTrackIndex}
      />

      {/* Seek Bar */}
      <SeekBar
        key={tracks[currentIndex]?.id || currentIndex}
        currentTime={currentTime}
        duration={duration}
        onSeek={seek}
        disabled={tracks.length === 0}
      />

      {/* Volume */}
      <div className="pt-2">
        <VolumeControl
          volume={volume}
          onChange={(val) => setVolume(val[0])}
        />
      </div>
      </div>
    </Card>
  );
};
