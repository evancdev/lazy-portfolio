import { Experience } from "@lazy-portfolio/types";

const Experiences = ({ experiences }: { experiences: Experience[] }) => {

  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          <span className="text-primary font-mono">&gt;</span> Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="border-l-2 border-primary pl-6 py-2"
            >
              <h3 className="text-xl font-semibold mb-1 font-mono">
                {exp.title}
              </h3>
              <div className="text-primary text-sm mb-2 font-mono">
                {exp.company} | {exp.date}
              </div>
              <ul className="list-disc list-inside space-y-1">
                {exp.bulletPoints.map((point, i) => (
                  <li key={i} className="text-muted-foreground font-sans leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
