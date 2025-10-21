import { useEffect, useState } from "react";
import type { ParsedDoc } from "@lazy-portfolio/types";
import Nagivation from "@/components/NavBar";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import Projects from "@/components/Project";
import Loading from "@/pages/Loading";

const Index = () => {
  const [resume, setResume] = useState<ParsedDoc | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // fetch parsed resume from backend
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const API_TOKEN = import.meta.env.VITE_API_TOKEN;
    console.log(API_URL)
    fetch(`${API_URL}/api/portfolio`, {
      headers: {
        'LAZY-API-KEY': API_TOKEN,
      },
    })
      .then((res) => res.json() as Promise<ParsedDoc>)
      .then((resume) => {
        console.log('Successfully fetch resume:', resume);
        setResume(resume);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setIsLoading(false);
        throw new Error('Failed to load resume data');
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!resume) {
    throw new Error('Failed to load resume data');
  }

  return (
    <div className="relative overflow-x-hidden">
      <Nagivation contacts={resume.contacts}/>
      <Hero {...resume.hero}/>
      <Experiences experiences={resume.experiences}/>
      <Projects projects={resume.projects}/>
    </div>
  );
};

export default Index;
