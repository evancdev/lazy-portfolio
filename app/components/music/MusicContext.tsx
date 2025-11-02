'use client';

import { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';

type MusicContextType = {
  playlist: { title: string; src: string }[];
  currentTrack: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  startMusic: () => void;
  seekTo: (time: number) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist, setPlaylist] = useState<{ title: string; src: string }[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Discover music files on mount
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const response = await fetch('/api/music');
        if (response.ok) {
          const files = await response.json();
          setPlaylist(files);
        }
      } catch (error) {
        console.error('Error loading playlist:', error);
      }
    };

    loadPlaylist();
  }, []);

  // Track audio time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playlist.length]);

  // Update audio source when track changes
  useEffect(() => {
    if (!audioRef.current || playlist.length === 0) return;

    const wasPlaying = isPlaying;
    audioRef.current.src = playlist[currentTrack].src;

    if (wasPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }, [currentTrack, playlist]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const startMusic = () => {
    if (!audioRef.current || playlist.length === 0) return;

    audioRef.current.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
    setIsPlaying(true);
  };

  const seekTo = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        audioRef,
        togglePlayPause,
        nextTrack,
        prevTrack,
        startMusic,
        seekTo,
      }}
    >
      {children}
      {playlist.length > 0 && <audio ref={audioRef} src={playlist[currentTrack]?.src} />}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
}
