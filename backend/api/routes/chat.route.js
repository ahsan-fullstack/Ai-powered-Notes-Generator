import { Router } from "express";
import { chatController, createChatController } from "../controllers/chat.controller.js";
import upload from "../middlware/fileUpload.js";
import { requireAuth } from "../../utils/requireAuth.js";

const chatRoute = Router();

// Create a new chat explicitly (one per "New Chat")
chatRoute.post('/create', requireAuth, createChatController);

// Upload PDF + generate materials linked to an existing chat
chatRoute.post('/:chatId', requireAuth, upload.single("pdfFile"), chatController);

export default chatRoute