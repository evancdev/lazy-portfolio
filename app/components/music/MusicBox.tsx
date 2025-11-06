'use client';

import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { useMusic } from './MusicContext';
import { useRef } from 'react';

type MusicBoxProps = {
  show: boolean;
};

const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function MusicBox({ show }: MusicBoxProps) {
  const { playlist, currentTrack, isPlaying, currentTime, duration, togglePlayPause, nextTrack, prevTrack, seekTo } = useMusic();
  const progressBarRef = useRef<HTMLDivElement>(null);

  if (!show || playlist.length === 0) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return; // Only drag with left mouse button
    handleProgressClick(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm rounded-lg p-6 mt-4 z-20"
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm font-mono text-center text-muted-foreground">
          {playlist[currentTrack].title}
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>{formatTime(currentTime)}</span>
          <div
            ref={progressBarRef}
            className="flex-1 h-2 bg-border rounded-full cursor-pointer relative group"
            onClick={handleProgressClick}
            onMouseMove={handleProgressDrag}
          >
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prevTrack}
            className="p-2 hover:text-primary transition-colors"
            aria-label="Previous track"
          >
            <FaStepBackward className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={nextTrack}
            className="p-2 hover:text-primary transition-colors"
            aria-label="Next track"
          >
            <FaStepForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
