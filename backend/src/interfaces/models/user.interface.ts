import { Document } from "mongoose";

export interface Iuser extends Document{
  fullName:string
  email:string
  hashedPassword:string
  isVerified:boolean
  refreshToken?:string
  createdAt:Date
  googleId?:string
}