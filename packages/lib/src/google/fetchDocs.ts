import { googleDocsClient } from "./client.js";
import { docs_v1 } from "googleapis";

export async function fetchDoc(docId: string): Promise<docs_v1.Schema$Document> {
  try{
    const res = await googleDocsClient.documents.get({ documentId: docId});
    return res.data;
  } catch (err){
    console.error("Failed to read Google Docs: ", err);
    throw new Error("Failed to read docs.");
  }
}