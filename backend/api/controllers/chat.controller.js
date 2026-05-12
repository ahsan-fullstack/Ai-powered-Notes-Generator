import { chatService } from "../../services/chatservice.js"
import { asyncHandler } from "../../utils/asyncHandler.js"


export const chatController = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const filePath = req.file?.path;
  let chatId = req.body?.chatId;
  console.log(req.file, 'req files');
  const fileName = req.file.originalname;
  const fileSize = req.file.size;

  chatId = await chatService.GetOrCreateChat({ userId, chatId, fileName });

  if (!chatId) {
    return res.status(400).json({ message: "chatId is required" });
  }

  const results = await chatService.GenerateContent(filePath,
    fileName,
    fileSize,
    chatId,
    userId
  );
  res.status(200).json({ chatId, results });
});

export const getChatsController = asyncHandler(async (req, res) => {
  const userId = req.user.userId
  const chats = await chatService.GetAllChats(userId);
  res.status(200).json(chats)
})