'use client';

import { usePortfolioData } from '../portfolio-context';
import { parseLinkedText } from '../utils/parseLinkedText';
import { Experience } from '../types';

export default function ExperiencesPage() {
  const portfolioData = usePortfolioData();
  const experiences = portfolioData.experiences;

  return (
    <section id="experience" className="min-h-screen bg-background pt-24">
      <div className="max-w-6xl mx-auto w-full px-4 py-12 md:py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          <span className="text-primary font-mono">&gt;</span> Experiences
        </h2>
        <div className="space-y-8">
          {experiences.map((exp: Experience) => (
            <div key={`${exp.title}-${exp.company}`} className="border-l-2 border-primary pl-6 py-2">
              {exp.link ? (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold mb-3 font-mono hover:text-primary transition-colors"
                >
                  {exp.title}
                </a>
              ) : (
                <h3 className="text-xl font-semibold mb-3 font-mono">{exp.title}</h3>
              )}
              <div className="text-primary text-sm mb-2 font-mono">
                {exp.company} | {exp.date}
              </div>
              <ul className="list-disc list-inside space-y-1">
                {exp.bulletPoints.map((point) => (
                  <li key={point} className="text-muted-foreground font-sans leading-relaxed">
                    {parseLinkedText(point)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
