import { IOtp } from "../models/otp.interface";

export interface IOtpRepository{
  createOtp(otp:Partial<IOtp>):Promise<IOtp | null>
  findOtpByEmail(email:string):Promise<IOtp | null>
  deleteOtpByEmail(email:string):Promise<void>
}