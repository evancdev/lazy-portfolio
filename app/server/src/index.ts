import { config } from 'dotenv';
import { resolve } from 'path';
import express from 'express';
import cors from 'cors';
import { mockPortfolioData } from './mock-data.js';

// load .env only in development
// keep env variables just in case if mock data needs update
if (process.env.NODE_ENV !== 'production') {
  config({ path: resolve(process.cwd(), '../../.env') });
}

// dynamic import after dotenv loads
const { fetchDoc, parseDocs } = await import('@lazy-portfolio/services');

const app = express();

const PORT = 3000;
const DOC_ID = process.env.GOOGLE_DOCS_ID!;

// middleware
app.use(cors({
  origin: ['http://localhost:5173'] // vite server
}));
app.use(express.json());

// fetch portfolio endpoint
app.get('/api/portfolio', async (req, res) => {
  try {
    // use mock data for development (delete later, too broke for api calls)
    return res.status(200).json(mockPortfolioData);

    // working code for production:
    const doc = await fetchDoc(DOC_ID);
    const parsedDocs = await parseDocs(doc);

    return res.status(200).json(parsedDocs);
  } catch (error) {
    console.error('Error fetching portfolio data');
    return res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// export for serverless deployment
export default app;
