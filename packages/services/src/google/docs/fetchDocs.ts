import { googleDocsClient } from '../client';
import { GoogleDoc } from '../types';

export async function fetchDoc(docId: string): Promise<GoogleDoc> {
  try {
    const res = await googleDocsClient.documents.get({ documentId: docId });
    return res.data;
  } catch (err) {
    console.error('Failed to read Google Docs: ', err);
    throw new Error('Failed to read docs.');
  }
}
