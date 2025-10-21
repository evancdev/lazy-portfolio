import { Hero as HeroType } from "@lazy-portfolio/types";
import { SiTypescript, SiReact, SiTailwindcss, SiCloudflare, SiDocker, SiExpress } from "react-icons/si";
import { TbBrandVercel } from "react-icons/tb";

const Hero = ({ name, title }: HeroType) => {
  return (
    <section id="about" className="h-screen flex items-center animate-fade-in pt-20">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="max-w-md">
          <div className="mb-4 text-primary font-mono text-sm">
            <span className="opacity-70">&gt;</span> Hey, I'm
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 font-sans font-light">
            Just a {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 font-sans leading-relaxed">
            that enjoys building random stuff like this website that updates realtime because why not.
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-mono mb-4">Built with</p>
          <div className="flex gap-6 items-center flex-wrap">
            <SiTypescript className="w-8 h-8 text-[#3178C6] hover:scale-110 transition-transform" title="TypeScript" />
            <SiExpress className="w-8 h-8 text-foreground hover:scale-110 transition-transform" title="Express" />
            <SiReact className="w-8 h-8 text-[#61DAFB] hover:scale-110 transition-transform" title="React" />
            <SiTailwindcss className="w-8 h-8 text-[#06B6D4] hover:scale-110 transition-transform" title="Tailwind CSS" />
            <SiDocker className="w-8 h-8 text-[#2496ED] hover:scale-110 transition-transform" title="Docker" />
            <TbBrandVercel className="w-8 h-8 text-foreground hover:scale-110 transition-transform" title="Vercel" />
            <SiCloudflare className="w-8 h-8 text-[#F38020] hover:scale-110 transition-transform" title="Cloudflare Workers" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
