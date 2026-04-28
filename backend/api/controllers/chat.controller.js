import { chatService } from "../../services/chatservice.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

export const createChatController = asyncHandler(async (req, res) => {
    const {userId,chatId} = req;
    const chatId = await chatService.createChat({userId,chatId});
    res.status(201).json({ chatId });
});

export const chatController = asyncHandler(async (req, res) => {
    const filePath = req.file?.path;
    const chatId = req.params?.chatId || req.body?.chatId;
    if (!chatId) {
        return res.status(400).json({ message: "chatId is required" });
    }
    const results = await chatService.GenerateContent(filePath);
    res.status(200).json({ chatId, results });
});