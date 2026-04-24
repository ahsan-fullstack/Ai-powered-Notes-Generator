
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function processPDF(filePath) {
  // 1. Load
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();

  // 2. Split
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.splitDocuments(docs);

  console.log("Chunks:", chunks.length);
  return chunks;
}