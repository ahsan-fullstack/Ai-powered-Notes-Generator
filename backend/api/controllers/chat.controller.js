import { chatService } from "../../services/chatservice.js"

export const chatController = async (req, res) => {
    console.log("Chat controller called", req);
    const filePath = req.file?.path
    const chat = await chatService(filePath);

    res.send(chat)
}