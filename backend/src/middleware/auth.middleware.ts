import { Request,Response,NextFunction } from "express";
import { ApiError } from "../utils/error.utils";
import { HttpStatus } from "../types/http-status.enum";
import { verifyAccessToken } from "../utils/jwt.utils";
import { JwtPayload } from "jsonwebtoken";
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload & { id: string };
  }
}
export const authMiddleware = async (req:Request,res:Response,next:NextFunction):Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]
  console.log("tpken from middleware",token)
  if(!token){
    throw new ApiError(HttpStatus.UNAUTHORIZED,"No Token Provided")
  }try {
    const payload = verifyAccessToken(token) as {id:string}
    req.user = {id:payload.id}
    next()
  } catch (error) {
    console.log(error)
    throw new ApiError(HttpStatus.UNAUTHORIZED,"Invalid Token") 
  }
}