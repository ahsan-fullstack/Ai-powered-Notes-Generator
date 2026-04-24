import { flashCardsPrompt, notesPrompt, summaryPrompt } from "../systemPrompts.js";
import { embeddingModel } from "../utils/embeddingModels.js";
import { MongoDBClient } from "../utils/MongoDBClient.js";
import { processPDF } from "../utils/processPDF.js"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const chatService = async (filePath) => {
  console.log("Chat service called with file path:", filePath);
  if (!filePath) {
    throw new Error("File path is required");
  }
  const chunks = await processPDF(filePath);
  const text = chunks.map((c) => c.pageContent).join("\n\n");
  console.log(text, 'text from chunks');

  const genAi = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "	gemini-3-flash-preview",
  })

  const [summary, flashcards, notes] = await Promise.all([
    genAi.invoke(`${summaryPrompt(text)}`),
    genAi.invoke(`${flashCardsPrompt(text)}`),
    genAi.invoke(`${notesPrompt(text)}`),
  ])

  console.log("Summary:", summary);
  console.log("Flashcards:", flashcards);
  console.log("Notes:", notes);

  return { summary, flashcards, notes };

}