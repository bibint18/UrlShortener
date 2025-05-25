import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interfaces/controllers/auth.controller.interface.js";
import { OtpRepository } from "../repositories/otp.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "../services/auth.service.js";
import { EmailService } from "../services/email.service.js";
import { HttpStatus } from "../types/http-status.enum.js";

export class AuthController implements IAuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService(
      new UserRepository(),
      new OtpRepository(),
      new EmailService()
    );
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { fullName, email, password } = req.body;
      await this.authService.register(fullName, email, password);
      res
        .status(HttpStatus.CREATED)
        .json({ success: true, message: "Otp Sent Succesfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { data } = req.body;
      console.log("reached resend", req.body);
      const email = data;
      await this.authService.resendOtp(email);
      res
        .status(HttpStatus.CREATED)
        .json({ success: true, message: "otp sent successfully" });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, otp, fullName, password } = req.body;
      await this.authService.verifyOtp(fullName, email, password, otp);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Otp verified" });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const tokens = await this.authService.login(email, password);
      res.status(HttpStatus.OK).json({ success: true, data: tokens });
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("reached here auth refresh");
      const { refreshToken } = req.body;
      console.log("refrsg token", req.body);
      const accessToken = await this.authService.resfreshToken(refreshToken);
      res.status(HttpStatus.OK).json({ success: true, data: { accessToken } });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(HttpStatus.OK).json({ success: true, message: "Logged out" });
    } catch (error) {
      next(error);
    }
  }

  async googleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { idToken } = req.body;
      const { accessToken, refreshToken, user } =
        await this.authService.googleLogin(idToken);
      res
        .status(HttpStatus.OK)
        .json({ success: true, data: { accessToken, refreshToken, user } });
    } catch (error) {
      next(error);
    }
  }
}
