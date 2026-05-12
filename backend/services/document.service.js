import { Document } from "../schema/document.schema.js"

export const documentService = {
  async createDocument({ fileName, fileSize, extractedText, summary, flashcards, notes, chatId,
    userId
  }) {
    const doc = await Document.create({
      fileName,
      fileSize,
      summary,
      flashcards,
      notes,
      chatId,
      userId
    })
    return doc;
  },

  async getDocument({ userId, chatId }) {
    return await Document.findOne({ userId: userId, chatId: chatId }, {chatId:1, flashcards:1, summary:1, notes:1 })
  }
}