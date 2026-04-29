import { Chat } from "../schema/chat.schema.js";
import { flashCardsPrompt, notesPrompt, summaryPrompt } from "../systemPrompts.js";
import { embeddingModel } from "../utils/embeddingModels.js";
import { MongoDBClient } from "../utils/MongoDBClient.js";
import { processPDF } from "../utils/processPDF.js"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export class chatService {

  static async GetOrCreateChat({ userId, chatId, fileName }) {
    let chat;
    if (!chatId) {
      chat = await Chat.create({ userId, isActive: true, title: fileName });
      console.log(chat, 'created chat')
      return chat._id;

    } else {
      chat = await Chat.findByIdAndUpdate({ _id: chatId, userId },
        { isActive: true },
        { new: true });
      console.log(chat, 'updated chat')
    }
    return chat._id;
  }

  static async GenerateContent(filePath) {
    console.log("Chat service called with file path:", filePath);
    if (!filePath) {
      throw new Error("File path is required");
    }
    const chunks = await processPDF(filePath);
    const text = chunks.map((c) => c.pageContent).join("\n\n");
    console.log(text, 'text from chunks');

    const genAi = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-3.1-flash-lite-preview",
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
  static async GetChats(userId) {
    return Chat.find({ userId }, { title: 1 ,_id:0})
  }
}