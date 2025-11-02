'use client';

import { motion } from 'framer-motion';
import { usePortfolioData } from './portfolio-context';
import { useReducer, useEffect, useRef } from 'react';
import { SiTypescript, SiReact, SiTailwindcss, SiFramer } from 'react-icons/si';
import { TbBrandVercel } from 'react-icons/tb';
import { RiNextjsFill } from 'react-icons/ri';

const BREAKPOINT_LG = 1024;
const MAX_VIEWPORT_WIDTH = 2000;
const MAX_OFFSET = 350;

// Disc animation timing (in milliseconds)
const DISC_SLIDE_DURATION = 4000;  // Time for disc to slide into box
const DISC_FADE_DURATION = 1000;   // Time for disc to fade out
const DISC_TOTAL_ANIMATION = DISC_SLIDE_DURATION + DISC_FADE_DURATION;

const techStack = [
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: RiNextjsFill, label: 'Next.js', color: 'currentColor' },
  { icon: SiReact, label: 'React', color: '#61DAFB' },
  { icon: SiTailwindcss, label: 'Tailwind CSS', color: '#06B6D4' },
  { icon: SiFramer, label: 'Framer Motion', color: '#0055FF' },
  { icon: TbBrandVercel, label: 'Vercel', color: 'currentColor' },
];

// Disc state machine
type DiscState = {
  status: 'idle' | 'sliding' | 'fading' | 'removed';
  offset: number;
  isDesktop: boolean;
  mounted: boolean;
};

type DiscAction =
  | { type: 'MOUNT'; isDesktop: boolean }
  | { type: 'START_ANIMATION' }
  | { type: 'START_FADE' }
  | { type: 'REMOVE' }
  | { type: 'UPDATE_OFFSET'; offset: number }
  | { type: 'RESIZE_TO_MOBILE' }
  | { type: 'RESIZE_TO_DESKTOP' };

function discReducer(state: DiscState, action: DiscAction): DiscState {
  switch (action.type) {
    case 'MOUNT':
      return { ...state, mounted: true, isDesktop: action.isDesktop, status: action.isDesktop ? 'idle' : 'removed' };
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

    dispatch({ type: 'START_ANIMATION' });

    timeoutRefs.current.push(
      setTimeout(() => dispatch({ type: 'START_FADE' }), DISC_SLIDE_DURATION)
    );
    timeoutRefs.current.push(
      setTimeout(() => dispatch({ type: 'REMOVE' }), DISC_TOTAL_ANIMATION)
    );
  };

  // Initialize on mount
  useEffect(() => {
    const isDesktop = window.innerWidth >= BREAKPOINT_LG;
    dispatch({ type: 'MOUNT', isDesktop });
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
          {/* Left Text Column */}
          <div className="w-full max-w-96 text-balance lg:text-left z-10">
            <p className="mb-3 text-primary font-mono text-sm opacity-80">
              <span className="opacity-70">&gt;</span> Hey, I'm
            </p>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">{name}</h2>

            <p className="text-2xl md:text-3xl text-muted-foreground mb-6 font-light">
              Just a {title}
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-sans">
              that likes to mess around and build cool stuff. Enjoy the music :)
            </p>

            <p className="text-sm text-muted-foreground font-mono mb-4">Built with</p>

            <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start">
              {techStack.map(({ icon: Icon, label, color }) => (
                <Icon
                  key={label}
                  title={label}
                  style={{ color }}
                  className="tech-icon w-8 h-8 hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>

          {/* Disc + Image Wrapper */}
          <div className="relative w-full max-w-96 h-96 flex-shrink-0">
            {/* Disc - desktop only, removed after animation completes */}
            {disc.status !== 'removed' && disc.isDesktop && disc.mounted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 0 }}
                animate={{
                  x: disc.offset,
                  rotate: 360,
                  scale: 1,
                  opacity: disc.status === 'fading' ? 0 : 1,
                }}
                transition={{
                  opacity: { duration: disc.status === 'fading' ? 1 : 1.2, delay: 0 },
                  scale: { duration: 1.2, delay: 0 },
                  x: { duration: disc.status === 'sliding' ? 4 : 0.6, ease: disc.status === 'sliding' ? "easeInOut" : "easeOut" },
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                }}
                onClick={handleDiscClick}
                className="absolute top-[0.5rem] left-0 w-[23rem] h-[23rem] rounded-full border-4 border-primary border-t-transparent bg-black cursor-pointer hover:scale-105 transition-transform"
                style={{ zIndex: 5 }}
              >
              {/* Inner circles for record effect */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-primary/40 m-7"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-primary/30 m-[3.65rem]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary/20 m-[5.5rem]"
              />
              </motion.div>
            )}

            {/* Image box (always visible) */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full border border-border rounded-xl lg:rounded-lg flex items-center justify-center bg-background overflow-hidden relative z-10"
            >
              <span className="text-muted-foreground font-mono text-sm">Image Coming Soon</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
