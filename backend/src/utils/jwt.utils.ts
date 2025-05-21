import jwt from "jsonwebtoken";
import { Iuser } from "../interfaces/models/user.interface";

export const generateAccessToken = (user:Iuser):string => {
  return jwt.sign({id:user.id},process.env.JWT_ACCESS_SECRET!,{expiresIn:"15m"})
}

export const generateRefreshToken = (user:Iuser):string => {
  return jwt.sign({id:user.id},process.env.JWT_REFRESH_SCERET!,{expiresIn:"7d"})
}

export const verifyAccessToken = (token:string):string | jwt.JwtPayload=> {
  return jwt.verify(token,process.env.JWT_ACCESS_SECRET!)
}

export const verifyRefreshToken = (token:string): string | jwt.JwtPayload => {
  return jwt.verify(token,process.env.JWT_REFRESH_SECRET!)
}