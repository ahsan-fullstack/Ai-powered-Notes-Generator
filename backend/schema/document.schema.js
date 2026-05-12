import mongoose, { Schema, Types } from "mongoose"

const DocumentSchema = new Schema({
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
  summary: {
    type: String,
  },

  flashcards: {
    type: [{
      question: {
        type: String,
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }],
  },

  notes: {
    type: String,
  },
}, { timestamps: true })

export const Document = mongoose.model('Document', DocumentSchema)