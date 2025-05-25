import {Schema,model} from "mongoose";
import { Iuser } from "../interfaces/models/user.interface.js";

const UserSchema = new Schema<Iuser>({
  fullName:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  hashedPassword:{type:String},
  isVerified:{type:Boolean,default:false},
  refreshToken:{type:String},
  createdAt:{type:Date,default:Date.now()},
  googleId: { type: String, unique: true, sparse: true },
})

export default model<Iuser>('User',UserSchema)