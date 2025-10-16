import { google } from 'googleapis';
import { OpenAI } from 'openai';

const auth = new google.auth.GoogleAuth({
  scopes: [
    'https://www.googleapis.com/auth/documents.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
  ],
});

export const googleDocsClient = google.docs({ version: 'v1', auth });
export const googleDriveClient = google.drive({ version: 'v3', auth });

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  throw new Error('u forgot ur gemini key :(');
}

export const geminiClient = new OpenAI({
  apiKey: geminiApiKey,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});
