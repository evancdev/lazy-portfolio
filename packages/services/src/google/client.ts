import { google } from 'googleapis';
import { readFileSync } from 'fs';

const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credentialsPath) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
}

const credentials = JSON.parse(readFileSync(credentialsPath, 'utf-8'));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    'https://www.googleapis.com/auth/documents.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
  ],
});

export const googleDocsClient = google.docs({ version: 'v1', auth });
