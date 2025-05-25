import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const uri = process.env.MONGO_URI

export const connectDB =async (): Promise<void> => {
  try {
    await mongoose.connect(uri!)
    console.log("Database connected...")
  } catch (error) {
    console.error("mongodb connection error",error)
    process.exit(1)
  }
}