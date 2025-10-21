import { ParsedDoc } from '@lazy-portfolio/types';
import Navigation from '../components/NavBar';
import Hero from '../components/Hero';
import Experiences from '../components/Experiences';
import Projects from '../components/Project';

async function getPortfolioData(): Promise<ParsedDoc> {
  const url = `${process.env.WORKER_API_URL}/api/portfolio`;

  try {
    // Skip auth for localhost development
    const headers: HeadersInit = url.includes('localhost')
      ? {}
      : { 'LAZY-API-KEY': process.env.API_SECRET_TOKEN as string };

    const response = await fetch(url, {
      headers,
      // This tells Next.js to cache indefinitely until revalidated
      next: { revalidate: false },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('API Response:', response.status, text);
      throw new Error(`Failed to fetch portfolio data: ${response.status} - ${text}`);
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export default async function HomePage() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="relative overflow-x-hidden">
      <Navigation contacts={portfolioData.contacts} />
      <Hero {...portfolioData.hero} />
      <Experiences experiences={portfolioData.experiences} />
      <Projects projects={portfolioData.projects} />
    </div>
  );
}