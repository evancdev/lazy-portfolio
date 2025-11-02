'use client';

import { SiTypescript, SiReact, SiTailwindcss, SiFramer } from 'react-icons/si';
import { TbBrandVercel } from 'react-icons/tb';
import { RiNextjsFill } from 'react-icons/ri';

const techStack = [
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: RiNextjsFill, label: 'Next.js', color: 'currentColor' },
  { icon: SiReact, label: 'React', color: '#61DAFB' },
  { icon: SiTailwindcss, label: 'Tailwind CSS', color: '#06B6D4' },
  { icon: SiFramer, label: 'Framer Motion', color: '#0055FF' },
  { icon: TbBrandVercel, label: 'Vercel', color: 'currentColor' },
];

type AboutSectionProps = {
  name: string;
  title: string;
};

export default function AboutSection({ name, title }: AboutSectionProps) {
  return (
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
  );
}
