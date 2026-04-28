import mongoose, { Schema,Types } from "mongoose"

const ChatSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: null
  }
}, { timestamps: true })


export const Chat = mongoose.model('Chat', ChatSchema)