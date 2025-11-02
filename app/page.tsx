'use client';

import { motion } from 'framer-motion';
import { usePortfolioData } from './portfolio-context';
import { useMusic } from './components/music/MusicContext';
import MusicBox from './components/music/MusicBox';
import VinylDisc from './components/VinylDisc';
import ImageBox from './components/ImageBox';
import AboutSection from './components/AboutSection';
import { useReducer, useEffect, useRef } from 'react';

const BREAKPOINT_LG = 1024;
const MAX_VIEWPORT_WIDTH = 2000;
const MAX_OFFSET = 350;

// Disc animation timing (in milliseconds)
const DISC_SLIDE_DURATION = 4000;  // Time for disc to slide into box
const DISC_FADE_DURATION = 1000;   // Time for disc to fade out
const DISC_TOTAL_ANIMATION = DISC_SLIDE_DURATION + DISC_FADE_DURATION;

// Disc state machine
type DiscState = {
  status: 'idle' | 'sliding' | 'fading' | 'removed';
  offset: number;
  isDesktop: boolean;
  mounted: boolean;
};

type DiscAction =
  | { type: 'MOUNT'; isDesktop: boolean; wasClicked: boolean }
  | { type: 'START_ANIMATION' }
  | { type: 'START_FADE' }
  | { type: 'REMOVE' }
  | { type: 'UPDATE_OFFSET'; offset: number }
  | { type: 'RESIZE_TO_MOBILE' }
  | { type: 'RESIZE_TO_DESKTOP' };

function discReducer(state: DiscState, action: DiscAction): DiscState {
  switch (action.type) {
    case 'MOUNT':
      return {
        ...state,
        mounted: true,
        isDesktop: action.isDesktop,
        status: action.wasClicked ? 'removed' : (action.isDesktop ? 'idle' : 'removed')
      };
    case 'START_ANIMATION':
      return state.status === 'idle' ? { ...state, status: 'sliding', offset: 0 } : state;
    case 'START_FADE':
      return { ...state, status: 'fading' };
    case 'REMOVE':
      return { ...state, status: 'removed' };
    case 'UPDATE_OFFSET':
      return state.status === 'idle' ? { ...state, offset: action.offset } : state;
    case 'RESIZE_TO_MOBILE':
      return { ...state, isDesktop: false, status: 'removed', offset: 0 };
    case 'RESIZE_TO_DESKTOP':
      return { ...state, isDesktop: true };
    default:
      return state;
  }
}

export default function HomePage() {
  const portfolioData = usePortfolioData();
  const { name, title } = portfolioData.hero;
  const { startMusic } = useMusic();

  const [disc, dispatch] = useReducer(discReducer, {
    status: 'idle',
    offset: 0,
    isDesktop: false,
    mounted: false,
  });

  // Refs to store timeout IDs for cleanup
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, []);

  // Handle disc click animation
  const handleDiscClick = () => {
    if (disc.status !== 'idle') return;

    // Clear any existing timeouts before starting new animation
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    // Mark disc as clicked in sessionStorage so it persists during navigation
    sessionStorage.setItem('discClicked', 'true');
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('discClickedChange'));

    // Start music after delay - this timer persists even if user navigates away
    setTimeout(() => startMusic(), DISC_SLIDE_DURATION);

    dispatch({ type: 'START_ANIMATION' });

    timeoutRefs.current.push(
      setTimeout(() => dispatch({ type: 'START_FADE' }), DISC_SLIDE_DURATION)
    );

    timeoutRefs.current.push(
      setTimeout(() => dispatch({ type: 'REMOVE' }), DISC_TOTAL_ANIMATION)
    );
  };

  // Initialize on mount and handle page refresh clearing
  useEffect(() => {
    const isDesktop = window.innerWidth >= BREAKPOINT_LG;
    const wasClicked = sessionStorage.getItem('discClicked') === 'true';
    dispatch({ type: 'MOUNT', isDesktop, wasClicked });

    const clearSession = () => {
      sessionStorage.removeItem('discClicked');
    };
    window.addEventListener('beforeunload', clearSession);
    return () => window.removeEventListener('beforeunload', clearSession);
  }, []);

  // Handle resize and disc positioning
  useEffect(() => {
    if (!disc.mounted || disc.status !== 'idle') {
      return;
    }

    const updateDiscPosition = () => {
      const width = window.innerWidth;

      if (width >= BREAKPOINT_LG) {
        dispatch({ type: 'RESIZE_TO_DESKTOP' });
        // Map viewport width (1024-2000px) to disc offset (0-350px)
        const clampedWidth = Math.min(MAX_VIEWPORT_WIDTH, Math.max(BREAKPOINT_LG, width));
        const progress = (clampedWidth - BREAKPOINT_LG) / (MAX_VIEWPORT_WIDTH - BREAKPOINT_LG);
        dispatch({ type: 'UPDATE_OFFSET', offset: MAX_OFFSET * progress });
      } else {
        dispatch({ type: 'RESIZE_TO_MOBILE' });
      }
    };

    updateDiscPosition();
    window.addEventListener('resize', updateDiscPosition);
    return () => window.removeEventListener('resize', updateDiscPosition);
  }, [disc.mounted, disc.status]);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="min-h-screen flex items-center bg-background"
    >
      <h1 id="about-title" className="sr-only">
        About Me
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto w-full px-4 py-24 md:py-32"
      >
        <div className="flex flex-col lg:flex-row items-center lg:justify-start justify-center relative gap-24 lg:gap-48">
          <AboutSection name={name} title={title} />

          {/* Disc + Image Wrapper */}
          <div className="relative w-full max-w-96 h-96 flex-shrink-0">
            <VinylDisc
              status={disc.status}
              offset={disc.offset}
              isDesktop={disc.isDesktop}
              mounted={disc.mounted}
              onClick={handleDiscClick}
            />

            <ImageBox />

            <MusicBox show={disc.status === 'fading' || disc.status === 'removed'} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
