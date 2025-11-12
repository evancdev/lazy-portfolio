'use client';

import { motion } from 'framer-motion';
import { usePortfolioData } from './portfolio-context';
import ImageBox from './components/ImageBox';
import AboutSection from './components/AboutSection';

export default function HomePage() {
  const portfolioData = usePortfolioData();
  const { name, title, description } = portfolioData.hero;

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
        <div className="flex flex-col lg:flex-row items-center lg:justify-start justify-center relative gap-24 lg:gap-24">
          <AboutSection name={name} title={title} description={description} />

          <div className="relative w-full max-w-96 h-96 flex-shrink-0">
            <ImageBox />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
