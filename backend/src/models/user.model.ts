import {Schema,model} from "mongoose";
import { Iuser } from "../interfaces/models/user.interface.js";

const UserSchema = new Schema<Iuser>({
  fullName:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  hashedPassword:{type:String,required:true},
  isVerified:{type:Boolean,default:false},
  refreshToken:{type:String},
  createdAt:{type:Date,default:Date.now()}
})

export default model<Iuser>('User',UserSchema)