import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: [
    "https://www.googleapis.com/auth/documents.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
  ],
});

export const googleDocsClient = google.docs({ version: "v1", auth });
