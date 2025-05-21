import bcrypt from 'bcrypt'
import { UserRepository } from "../repositories/user.repository";
import { EmailService } from "./email.service";
import { OtpRepository } from "../repositories/otp.repository";
import { IAuthService } from "../interfaces/services/auth.service.interface";
import { ApiError } from "../utils/error.utils";
import { HttpStatus } from "../types/http-status.enum";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.utils';


export class AuthService implements IAuthService{
  constructor(
    private userRepository:UserRepository,
    private otpRepository:OtpRepository,
    private emailService:EmailService
  ){}

  async register(fullName: string, email: string, password: string): Promise<void> {
    const existingUser = await this.userRepository.findUserByEmail(email)
    if(existingUser){
      throw new ApiError(HttpStatus.BAD_REQUEST,"Email Already Exist")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await this.userRepository.createUser({
      fullName,
      email,
      hashedPassword,
      isVerified:false
    })
    console.log(user)
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    await this.otpRepository.createOtp({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })
    await this.emailService.sendOtpEmail(email,otp)
  }

  async verifyOtp(email: string, otp: string): Promise<void> {
    const otpRecord = await this.otpRepository.findOtpByEmail(email)
    if(!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()){
      throw new ApiError(HttpStatus.BAD_REQUEST,"Invalid or Expired Otp")
    }
    const user = await this.userRepository.findUserByEmail(email)
    if(!user){
      throw new ApiError(HttpStatus.NOT_FOUND,"No user exist")
    }
    await this.userRepository.updateUser(user.id,{isVerified:true})
    await this.otpRepository.deleteOtpByEmail(email)
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; }> {
    const user = await this.userRepository.findUserByEmail(email)
    if(!user || !user.isVerified){
      throw new ApiError(HttpStatus.UNAUTHORIZED,"Invalid credentials or Unverified account")
    }
    const isPassword = await bcrypt.compare(password,user.hashedPassword)
    if(!isPassword){
      throw new ApiError(HttpStatus.UNAUTHORIZED,"Invalid credentials")
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    await this.userRepository.updateUser(user.id,{refreshToken:refreshToken})
    return {accessToken,refreshToken}
  }

  async resfreshToken(reffreshToken: string): Promise<string> {
    try{
    const payload = verifyRefreshToken(reffreshToken) as {id:string}
    console.log('payload from refresh service',payload)
    const user = await this.userRepository.findUserByEmail(payload.id)
    if(!user || user.refreshToken !== reffreshToken){
      throw new ApiError(HttpStatus.UNAUTHORIZED,"Invalid Refresh Token")
    }
    return generateAccessToken(user)
    }catch{
      throw new ApiError(HttpStatus.UNAUTHORIZED,"Invalid refresh token")
    }
  }
}