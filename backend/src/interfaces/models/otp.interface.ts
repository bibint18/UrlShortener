import { Document } from "mongoose";

export interface IOtp extends Document{
  email:string
  otp:string
  expiresAt:Date
}