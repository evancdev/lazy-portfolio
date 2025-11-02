'use client';

import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { useMusic } from './MusicContext';

type MusicBoxProps = {
  show: boolean;
};

export default function MusicBox({ show }: MusicBoxProps) {
  const { playlist, currentTrack, isPlaying, togglePlayPause, nextTrack, prevTrack } = useMusic();

  if (!show || playlist.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 mt-4 z-20"
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm font-mono text-center text-muted-foreground">
          {playlist[currentTrack].title}
        </p>
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
