'use client';

import { usePortfolioData } from '../portfolio-context';
import { parseLinkedText } from '../utils/parseLinkedText';
import { Project } from '../types';

export default function ProjectsPage() {
  const portfolioData = usePortfolioData();
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="min-h-screen bg-background pt-24">
      <div className="max-w-6xl mx-auto w-full px-4 py-12 md:py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          <span className="text-primary font-mono">&gt;</span> Projects
        </h2>
        <div className="space-y-8">
          {projects.map((project: Project) => (
            <div
              key={project.title}
              className="block border border-border rounded p-6 hover:border-primary transition-all group"
            >
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold mb-3 font-mono group-hover:text-primary transition-colors inline-block"
                >
                  {project.title}
                </a>
              ) : (
                <h3 className="text-xl font-semibold mb-3 font-mono group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              )}
              <ul className="list-disc list-inside space-y-1 mb-4">
                {project.bulletPoints.map((point) => (
                  <li key={point} className="text-muted-foreground font-sans leading-relaxed">
                    {parseLinkedText(point)}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-secondary rounded font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
