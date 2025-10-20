import { useEffect, useState } from "react";
import type { ParsedDoc } from "@lazy-portfolio/types";
import Nagivation from "@/components/NavBar";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import Projects from "@/components/Project";

const Index = () => {
  const [resume, setResume] = useState<ParsedDoc | null>(null);
  
  // fetch parsed resume from backend
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    console.log(API_URL)
    fetch(`${API_URL}/api/portfolio`)
      .then((res) => res.json() as Promise<ParsedDoc>)
      .then((resume) => {
        console.log('Successfully fetch resume:', resume);
        setResume(resume);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setResume(null)
      });
  }, []);

  if (!resume) return <div> update to 500 page </div>;

  return (
    <div className="relative overflow-x-hidden">
      <Nagivation {...resume.contacts}/>
      <Hero {...resume.hero}/>
      <Experiences experiences={resume.experiences}/>
      <Projects projects={resume.projects}/>
      <pre>{JSON.stringify(resume, null, 2)}</pre>
    </div>
  );
};

export default Index;
