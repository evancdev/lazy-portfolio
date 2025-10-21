import { mockPortfolioData } from './mock-data.js';
import { ParsedDoc } from '@lazy-portfolio/types';

interface Env {
  GOOGLE_DOCS_ID: string;
  GEMINI_API_KEY: string;
  PORTFOLIO_CACHE: KVNamespace;
  API_SECRET_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, LAZY-API-KEY',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Route: GET /api/portfolio
    if (url.pathname === '/api/portfolio' && request.method === 'GET') {
      // Verify auth token
      const authToken = request.headers.get('LAZY-API-KEY');
      if (!authToken || authToken !== env.API_SECRET_TOKEN) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: corsHeaders,
        });
      }

      try {
        // Check cache first
        const cached = await env.PORTFOLIO_CACHE.get('portfolio', 'json');
        if (cached) {
          console.log('Returning cached portfolio data');
          return new Response(JSON.stringify(cached), {
            headers: corsHeaders,
          });
        }

        // Cache miss - fetch fresh data
        console.log('Cache miss - fetching fresh data');

        // For now, use mock data
        const portfolioData = mockPortfolioData;

        // TODO: Uncomment to use real Google Docs data:
        /*
        const { fetchDoc, parseDocs } = await import('@lazy-portfolio/services');
        const doc = await fetchDoc(env.GOOGLE_DOCS_ID);
        const portfolioData = await parseDocs(doc);
        */

        // Store in cache indefinitely
        await env.PORTFOLIO_CACHE.put('portfolio', JSON.stringify(portfolioData));

        return new Response(JSON.stringify(portfolioData), {
          headers: corsHeaders,
        });
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        return new Response(JSON.stringify(null), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // Route: POST /api/webhook (invalidate cache)
    if (url.pathname === '/api/webhook' && request.method === 'POST') {
      // Verify auth token for webhook too
      const authToken = request.headers.get('LAZY-API-KEY');
      if (!authToken || authToken !== env.API_SECRET_TOKEN) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: corsHeaders,
        });
      }

      try {
        // Webhook verified
        await env.PORTFOLIO_CACHE.delete('portfolio');
        console.log('Cache invalidated via webhook');

        return new Response(JSON.stringify({ success: true, message: 'Cache invalidated' }), {
          headers: corsHeaders,
        });
      } catch (error) {
        console.error('Error invalidating cache:', error);
        return new Response(JSON.stringify({ success: false }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // 404 for other routes
    return new Response('Not Found', { status: 404 });
  },
};
