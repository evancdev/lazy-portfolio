import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './providers';
import { PortfolioProvider } from './portfolio-context';
import Navigation from './components/NavBar';
import { getPortfolioData } from './lib/data';

export const metadata: Metadata = {
  title: 'Evan Chen – Portfolio',
  description: 'I build stuff. Come check out my work.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const portfolioData = getPortfolioData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{const t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider>
          <PortfolioProvider data={portfolioData}>
            <div className="relative min-h-screen flex flex-col">
              <Navigation contacts={portfolioData.contacts} />
              <main className="flex-1">{children}</main>
            </div>
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
