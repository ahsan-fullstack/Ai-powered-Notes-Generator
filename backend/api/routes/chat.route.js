import { Router } from "express";
import { chatController, getChatsController } from "../controllers/chat.controller.js";
import upload from "../middlware/fileUpload.js";

const chatRoute = Router();

chatRoute.post("/", upload.single("pdfFile"), chatController);
chatRoute.get('/',getChatsController)

export default chatRoute