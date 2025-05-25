import { Iuser } from "../models/user.interface.js";

export interface IAuthService{
  register(fullName:string,email:string,password:string):Promise<void>
  verifyOtp(eullName:string,email:string,password:string,otp:string):Promise<void>
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user:Iuser | null  }>;
  resfreshToken(reffreshToken:string):Promise<string>
}