
export interface IAuthService{
  register(fullName:string,email:string,password:string):Promise<void>
  verifyOtp(email:string,otp:string):Promise<void>
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
  resfreshToken(reffreshToken:string):Promise<string>
}