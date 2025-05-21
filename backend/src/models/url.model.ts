import { Schema,model } from "mongoose";
import { Iurl } from "../interfaces/models/url.interface";

const urlSchema = new Schema<Iurl>({
  userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
  originalUrl:{type:String,required:true},
  shortId:{type:String,required:true,unique:true},
  clicks:{type:Number,default:0},
  createdAt:{type:Date,default:Date.now()}
}) 

export default model<Iurl>('Url',urlSchema)