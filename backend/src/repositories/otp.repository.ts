import { IOtpRepository } from "../interfaces/repositories/otp.repository.interface.js";
import { IOtp } from "../interfaces/models/otp.interface.js";
import otpModel from "../models/otp.model.js";

export class OtpRepository implements IOtpRepository{
  async createOtp(otp: Partial<IOtp>): Promise<IOtp | null> {
    return await otpModel.create(otp)
  }

  async findOtpByEmail(email: string): Promise<IOtp | null> {
    return await otpModel.findOne({email})
  }

  async deleteOtpByEmail(email: string): Promise<void> {
    await otpModel.deleteOne({email})
  }

  async updateOtp(email:string,otp:string,expiresAt:Date):Promise<void>{
    console.log("update otp",email,otp,expiresAt)
    const otpp = await otpModel.findOne({email})
    console.log("otp",otpp)
    await otpModel.findOneAndUpdate({email},{otp,expiresAt},{new:true})
  }
}