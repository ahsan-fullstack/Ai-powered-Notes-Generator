import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_ATLAS_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGODB_ATLAS_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); 
  }
};