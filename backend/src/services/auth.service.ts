import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";
import { EmailService } from "./email.service.js";
import { OtpRepository } from "../repositories/otp.repository.js";
import { IAuthService } from "../interfaces/services/auth.service.interface.js";
import { ApiError } from "../utils/error.utils.js";
import { HttpStatus } from "../types/http-status.enum.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.utils.js";
import { Iuser } from "../interfaces/models/user.interface.js";
import { OAuth2Client } from "google-auth-library";

export class AuthService implements IAuthService {
  private googleClient: OAuth2Client;
  constructor(
    private userRepository: UserRepository,
    private otpRepository: OtpRepository,
    private emailService: EmailService
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async register(
    fullName: string,
    email: string,
    password: string
  ): Promise<void> {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Email Already Exist");
    }
    console.log(password);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const EmailExist = await this.otpRepository.findOtpByEmail(email);
    if (EmailExist) {
      const updatedOtp = await this.otpRepository.updateOtp(
        email,
        otp,
        expiresAt
      );
      console.log("updatedOtp", updatedOtp);
    } else {
      await this.otpRepository.createOtp({
        email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
    }
    console.log("otp", otp);
    const otpsend = await this.emailService.sendOtpEmail(email, otp);
    console.log("otpsend", otpsend);
  }

  async resendOtp(email: string): Promise<void> {
    try {
      console.log("reached resend", email);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await this.otpRepository.updateOtp(email, otp, expiresAt);
    } catch (error) {
      console.log(error);
    }
  }

  async verifyOtp(
    fullName: string,
    email: string,
    password: string,
    otp: string
  ): Promise<void> {
    console.log("verifyotp backend", fullName, email, password, otp);
    const otpRecord = await this.otpRepository.findOtpByEmail(email);
    console.log("otprecord", otpRecord);
    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      otpRecord.expiresAt < new Date()
    ) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid or Expired Otp");
    }
    // const user = await this.userRepository.findUserByEmail(email)
    // if(!user){
    //   throw new ApiError(HttpStatus.NOT_FOUND,"No user exist")
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({
      fullName,
      email,
      hashedPassword,
      isVerified: false,
    });
    await this.userRepository.updateUser(user.id, { isVerified: true });
    await this.otpRepository.deleteOtpByEmail(email);
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Iuser | null;
  }> {
    const user = await this.userRepository.findUserByEmail(email);
    if(!user){
      throw new ApiError(HttpStatus.NOT_FOUND,"User Not Found")
    }
    if (!user.isVerified) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        "Invalid credentials or Unverified account"
      );
    }
    const isPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!isPassword) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const userData = await this.userRepository.findUserByEmail(email);
    console.log("acc refr tokens from service", accessToken, refreshToken);
    await this.userRepository.updateUser(user.id, {
      refreshToken: refreshToken,
    });
    return { accessToken, refreshToken, user: userData };
  }

  async resfreshToken(reffreshToken: string): Promise<string> {
    try {
      const payload = verifyRefreshToken(reffreshToken) as { id: string };
      console.log("payload from refresh service", payload);
      // const user = await this.userRepository.findUserByEmail(payload.id)
      const user = await this.userRepository.findUserById(payload.id);
      console.log("user from refresh", user);
      if (!user || user.refreshToken !== reffreshToken) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid Refresh Token");
      }
      return generateAccessToken(user);
    } catch {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid refresh token");
    }
  }

  async googleLogin(idToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Iuser | null;
  }> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid Google token");
      }

      const { email, name, sub: googleId } = payload;
      console.log("email from google auth",email)
      if (!email) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Email not provided by Google");
      }

      let user = await this.userRepository.findUserByEmail(email);
      console.log('user auth google',user)
      if (user) {
        if (!user.isVerified) {
          throw new ApiError(HttpStatus.UNAUTHORIZED, "User account not verified");
        }
      } else {
        console.log('auth no user google',email,googleId)
        user = await this.userRepository.createUser({
          fullName: name || "Google User",
          email,
          hashedPassword: "",
          isVerified: true,
          googleId,
          refreshToken:'',
        });
        console.log("user created",user)
      }

      if (!user) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "User creation failed");
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await this.userRepository.updateUser(user.id, { refreshToken });
      return { accessToken, refreshToken, user };
    } catch(error){
      console.log("from google servuce",error)
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Google login failed");
    }
  }
}
