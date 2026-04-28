const DocumentScheam = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  chatId: {
    type: Types.ObjectId,
    ref: 'Chat'
  },
  fileName: {
    type: String,
    required: [true, 'FileName is required'],
  },
  fileSize: {
    type: Number,
  },
  extractedText: {
    type: String,
    required: [true, 'ExtractedText is required'],
  }
}, { timestamps: true })