import { mockPortfolioData } from './mock-data.js';
import { ParsedDoc } from '@lazy-portfolio/types';

interface Env {
  GOOGLE_DOCS_ID: string;
  GEMINI_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Route: GET /api/portfolio
    if (url.pathname === '/api/portfolio' && request.method === 'GET') {
      try {
        // For now, return mock data
        // TODO: Uncomment below to use real Google Docs data
        return new Response(JSON.stringify(mockPortfolioData), {
          headers: corsHeaders,
        });

        // Uncomment this to use real data:
        /*
        const { fetchDoc, parseDocs } = await import('@lazy-portfolio/services');
        const doc = await fetchDoc(env.GOOGLE_DOCS_ID);
        const parsedDocs = await parseDocs(doc);

        return new Response(JSON.stringify(parsedDocs), {
          headers: corsHeaders,
        });
        */
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        return new Response(JSON.stringify(null), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // 404 for other routes
    return new Response('Not Found', { status: 404 });
  },
};
