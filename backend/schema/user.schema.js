import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'UserName is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
}, { timestamps: true })


export const User = mongoose.model('User', UserSchema)