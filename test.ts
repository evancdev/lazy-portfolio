import 'dotenv/config';
import { fetchDoc } from './packages/services/src/google/docs/fetchDocs.js';
import { extractTextFromDoc, parseDocs } from './packages/services/src/google/docs/parseDocs.js';

const DOC_ID = process.env.GOOGLE_DOCS_ID!;

if (!DOC_ID) {
  throw new Error('GOOGLE_DOCS_ID environment variable is not set');
}

async function test() {
  console.log('Fetching document...');
  const doc = await fetchDoc(DOC_ID);

  console.log('Extracting text...');
  const text = extractTextFromDoc(doc);

  console.log('\n=== Extracted Text ===\n');
  console.log(text);
  console.log('\n=== Text Length ===');
  console.log(`${text.length} characters`);

  console.log('\n=== Parsing document ===\n');
  const parsed = await parseDocs(doc);

  console.log(JSON.stringify(parsed, null, 2));
}

test().catch(console.error);
