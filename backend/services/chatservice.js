import { Chat } from "../schema/chat.schema.js";
import { flashCardsPrompt, notesPrompt, summaryPrompt } from "../systemPrompts.js";
import { embeddingModel } from "../utils/embeddingModels.js";
import { MongoDBClient } from "../utils/MongoDBClient.js";
import { processPDF } from "../utils/processPDF.js"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { documentService } from "./document.service.js";
import ollama, { Ollama } from "ollama";

const ollamaClient = new Ollama({
  host: "http://127.0.0.1:11434",
  timeout: 300000,
});

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

  // static async GenerateContent(filePath, fileName, fileSize,chatId,userId ) {
  //   console.log("Chat service called with file path:", filePath);
  //   if (!filePath) {
  //     throw new Error("File path is required");
  //   }
  //   const chunks = await processPDF(filePath);
  //   const text = chunks.map((c) => c.pageContent).join("\n\n");
  //   console.log(text, 'text from chunks');

  //   const genAi = new ChatGoogleGenerativeAI({
  //     apiKey: process.env.GOOGLE_API_KEY,
  //     model: "gemini-3.1-flash-lite-preview",
  //   })

  //   const [summaryRes, flashcardRes, notesRes] = await Promise.all([
  //     genAi.invoke(`${summaryPrompt(text)}`),
  //     genAi.invoke(`${flashCardsPrompt(text)}`),
  //     genAi.invoke(`${notesPrompt(text)}`),
  //   ])

  //   const flashcards = JSON.parse(flashcardRes.content);
  //   const summary = summaryRes.content;
  //   const notes = notesRes.content

  //   console.log("Summary:", summary);
  //   console.log("Flashcards:", flashcards);
  //   console.log("Notes:", notes);

  //   const saveDocument = await documentService.createDocument({
  //     fileName,
  //     fileSize,
  //     summary,
  //     flashcards,
  //     notes,
  //     chatId,
  //     userId
  //   })

  //   return { summary, flashcards, notes };
  // }


  static async askOllama(prompt, model = "llama3.2") {
    const response = await ollamaClient.chat({
      model,
      messages: [{ role: "user", content: prompt }],
      keep_alive: "60m",  // ✅ FIX 3 — keep model loaded in memory
      options: {
        num_ctx: 512,        // ✅ small context window
        num_predict: 600,    // ✅ max 200 tokens response
        temperature: 0.1,    // ✅ focused output
        top_k: 10,           // ✅ fewer word choices
        top_p: 0.5,          // ✅ less randomness.env
        num_thread: 8,       // ✅ use all CPU cores
      },
    });
    return response.message.content
  }

  static parseJSON(raw) {
    try {
      let clean = raw.replace(/```json|```/gi, "").trim();

      const match = clean.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("No JSON array found in response");

      const sanitized = match[0]
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        .replace(/,\s*\]/g, "]")
        .trim();

      return JSON.parse(sanitized); // if this fails → goes to catch

    } catch (err) {
      // ✅ Instead of crashing — return fallback data
      console.error("JSON parse failed:", err.message);
      console.error("Raw response was:", raw);
      return [{ question: "Failed to parse", answer: "Please retry" }];
    }
  }

  static async GenerateContent(filePath, fileName, fileSize, chatId, userId) {
    console.log("ChatService called with file path:", filePath);

    if (!filePath) {
      throw new Error("File path is required");
    }

    // 1. Extract text from PDF
    const chunks = await processPDF(filePath);

    // reduce the Text, helping in the total tokens
    const text = chunks
      .map((c) => c.pageContent)
      .join(" ")
      .replace(/\s+/g, " ")
      .slice(0, 2000);

    console.log("Text extracted from PDF ✅");

    // 2. Run all 3 prompts in parallel via Ollama
    console.log("Sending prompts to Ollama... ⏳");
    const [summary, flashcardRaw, notes] = await Promise.all([
      this.askOllama(summaryPrompt(text)),
      this.askOllama(flashCardsPrompt(text)),
      this.askOllama(notesPrompt(text)),
    ]);

    // // 3. Parse results
    // const summary = summaryRaw.trim();
    const flashcards = this.parseJSON(flashcardRaw);  // JSON
    // const notes = notesRaw.trim();

    console.log("Summary   :", summary);
    console.log("Flashcards:", flashcards);
    console.log("Notes     :", notes);

    // 4. Save to DB
    console.log('Saving in DB')
    documentService.createDocument({
      fileName,
      fileSize,
      summary,
      flashcards,
      notes,
      chatId,
      userId,
    }).catch((error) => console.log(error.message));

    console.log('after db saved')
    return { summary, flashcards, notes };
  }


  static async GetAllChats(userId) {
    return Chat.find({ userId }, { title: 1 })
  }
}