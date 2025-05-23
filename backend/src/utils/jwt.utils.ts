import jwt from "jsonwebtoken";
import { Iuser } from "../interfaces/models/user.interface";
import dotenv from 'dotenv'
dotenv.config()
export const generateAccessToken = (user:Iuser):string => {
  return jwt.sign({id:user.id},process.env.JWT_ACCESS_SECRET!,{expiresIn:"2m"})
}

export const generateRefreshToken = (user:Iuser):string => {
  return jwt.sign({id:user.id},process.env.JWT_REFRESH_SECRET!,{expiresIn:"7d"})
}

export const verifyAccessToken = (token:string):string | jwt.JwtPayload=> {
  return jwt.verify(token,process.env.JWT_ACCESS_SECRET!)
}

export const verifyRefreshToken = (token:string): string | jwt.JwtPayload => {
  return jwt.verify(token,process.env.JWT_REFRESH_SECRET!)
}