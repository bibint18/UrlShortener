import { Document, Types } from "mongoose";

export interface Iurl extends Document{
  userId:Types.ObjectId
  originalUrl:string
  shortId:string
  clicks:number
  createdAt:Date
}