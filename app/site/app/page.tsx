'use client';

import { motion } from 'framer-motion';
import { usePortfolioData } from './layout-client';

import {
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiCloudflare,
  SiExpress
} from "react-icons/si";
import { TbBrandVercel } from "react-icons/tb";
import { RiNextjsFill } from "react-icons/ri";

const techStack = [
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiExpress, label: "Express", color: "currentColor" },
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
  { icon: RiNextjsFill, label: "Next.js", color: "currentColor" },
  { icon: TbBrandVercel, label: "Vercel", color: "currentColor" },
  { icon: SiCloudflare, label: "Cloudflare Workers", color: "#F38020" },
];

export default function HomePage() {
  const portfolioData = usePortfolioData();
  if (!portfolioData) throw new Error("PortfolioData missing in context");

  const { name, title } = portfolioData.hero;

  return (
    <section id="about" aria-labelledby="about-title" className="min-h-screen flex items-center bg-background">
      <h1 id="about-title" className="sr-only">About Me</h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto w-full px-4 py-24 md:py-32"
      >
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-48">

          {/* Left Text Column */}
          <div className="max-w-md text-balance">
            <p className="mb-3 text-primary font-mono text-sm opacity-80">
              <span className="opacity-70">&gt;</span> Hey, I'm
            </p>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              {name}
            </h2>

            <p className="text-2xl md:text-3xl text-muted-foreground mb-6 font-light">
              Just a {title}
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-sans">
              that enjoys building random cool stuff like this realtime-updating portfolio because why not.
            </p>

            <p className="text-sm text-muted-foreground font-mono mb-4">
              Built with
            </p>

            <div className="flex flex-wrap gap-5 items-center">
              {techStack.map(({ icon: Icon, label, color }) => (
                <Icon
                  key={label}
                  title={label}
                  style={{ color }}
                  className="w-8 h-8 hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>

          {/* Right Image / Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-96 h-96 flex-shrink-0 border border-border rounded-xl flex items-center justify-center bg-muted/30 backdrop-blur-sm"
          >
            <span className="text-muted-foreground font-mono text-sm">
              Image Coming Soon
            </span>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}