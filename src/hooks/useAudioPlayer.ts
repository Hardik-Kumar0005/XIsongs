import { useState, useRef, useEffect } from "react";
import type { Track } from "@/types/music";

export const useAudioPlayer = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentIndex];
  const currentTrackName = currentTrack?.name || "No track selected";

  // Create audio element & attach static listeners once (StrictMode safe)
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }
    const audio = audioRef.current;
    const handleTime = () => setCurrentTime(audio.currentTime);
    const handleMeta = () => setDuration(isFinite(audio.duration) ? audio.duration : 0);
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('loadedmetadata', handleMeta);
    return () => {
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('loadedmetadata', handleMeta);
    };
  }, []);

  // Attach ended listener that always has fresh track length
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      if (tracks.length === 0) return;
  // Reset UI time instantly before switching
  setCurrentTime(0);
      // Advance & ensure autoplay of next
      setCurrentIndex(prev => (prev + 1) % tracks.length);
      setIsPlaying(true);
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [tracks.length]);

  // Smooth UI time progression while playing (higher fidelity than timeupdate)
  useEffect(() => {
    if (!isPlaying || !audioRef.current) return;
    let frame: number;
    const loop = () => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);

  // When track changes: load new src & optionally play (do NOT depend on isPlaying to avoid reset on pause/resume)
  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;
    const audio = audioRef.current;
    // Only reset if the source actually changes
    if (audio.src !== currentTrack.url) {
      audio.src = currentTrack.url;
      setCurrentTime(0);
      setDuration(0);
    }
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playPause = () => {
    if (!currentTrack || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure src is set (in case effect hasn't fired yet)
      if (!audioRef.current.src) {
        audioRef.current.src = currentTrack.url;
      }
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Playback failed (likely autoplay policy); keep state paused
          setIsPlaying(false);
        });
    }
  };

  const nextTrack = () => {
    if (tracks.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    if (tracks.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const setTrackIndex = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true); // Will trigger effect that loads & plays new track
  };

  const selectFiles = (files: FileList) => {
    const newTracks: Track[] = Array.from(files).map((file, idx) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
      id: `${file.name}-${file.lastModified}-${idx}`,
    }));
    setTracks((prev) => {
      const hadNoTracks = prev.length === 0;
      const combined = [...prev, ...newTracks];
      if (hadNoTracks) {
        // Ensure first track is prepared
        setCurrentIndex(0);
      }
      return combined;
    });
  };

  const selectFolder = (files: FileList) => {
    selectFiles(files);
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
  const clamped = Math.min(Math.max(time, 0), duration || time);
  audioRef.current.currentTime = clamped;
  setCurrentTime(clamped);
  };

  return {
    tracks,
    currentIndex,
    isPlaying,
    volume,
    currentTrackName,
    currentTime,
    duration,
    seek,
    selectFiles,
    selectFolder,
    playPause,
    nextTrack,
    prevTrack,
    setTrackIndex,
    setVolume,
  };
};
