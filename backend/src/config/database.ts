import mongoose from 'mongoose'
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