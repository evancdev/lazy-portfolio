import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './providers'
import { PortfolioProvider } from './layout-client'
import { ParsedDoc } from '@lazy-portfolio/types'
import Navigation from './components/NavBar'

export const metadata: Metadata = {
  title: 'Evan Chen – Portfolio',
  description: 'I build stuff. Come check out my work.',
}

async function getPortfolioData(): Promise<ParsedDoc> {
  const url = `${process.env.WORKER_API_URL}/api/portfolio`;

  try {
    const headers: HeadersInit = url.includes('localhost')
      ? {}
      : { 'LAZY-API-KEY': process.env.API_SECRET_TOKEN as string };

    const response = await fetch(url, {
      headers,
      next: { revalidate: false },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('API Response:', response.status, text);
      throw new Error(`Failed to fetch portfolio data: ${response.status} - ${text}`);
    }

    return (await response.json()) as ParsedDoc;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const portfolioData = await getPortfolioData();

  return (
    <html lang="en" suppressHydrationWarning>
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
  )
}
