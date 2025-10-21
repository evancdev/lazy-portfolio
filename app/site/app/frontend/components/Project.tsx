import { Project } from "@lazy-portfolio/types";
import { parseLinkedText } from "../utils/parseLinkedText";

const Projects = ({ projects }: { projects: Project[] }) => {

  return (
    <section id="projects" className="py-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          <span className="text-primary font-mono">&gt;</span> Projects
        </h2>
        <div className="space-y-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
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
                {project.bulletPoints.map((point, i) => (
                  <li key={i} className="text-muted-foreground font-sans leading-relaxed">
                    {parseLinkedText(point)}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="text-xs px-2 py-1 bg-secondary rounded font-mono"
                  >
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
};

export default Projects;
