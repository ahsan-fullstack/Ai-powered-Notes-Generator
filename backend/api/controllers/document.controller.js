import { documentService } from "../../services/document.service.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

export const documentController = asyncHandler(async (req, res) => {
    const userId = req.user.userId
    const { chatId } = req.params
    const results = await documentService.getDocument({ userId, chatId })
    res.status(200).json({results});
})