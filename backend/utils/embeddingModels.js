import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export function embeddingModel(){
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "text-embedding-004"
  });

  return embeddings;
}