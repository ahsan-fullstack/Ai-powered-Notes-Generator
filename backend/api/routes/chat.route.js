import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";
import upload from "../middlware/fileUpload.js";

const chatRoute = Router();

chatRoute.post('/',upload.single("pdfFile"),chatController)

export default chatRoute