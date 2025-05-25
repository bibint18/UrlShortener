import { IEmailService } from "../interfaces/services/email.service.interface.js";
import nodemailer from 'nodemailer'

export class EmailService implements IEmailService{
  private transporter = nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  })

  async sendOtpEmail(email: string, otp: string): Promise<void> {
    await this.transporter.sendMail({
      from:process.env.EMAIL_USER,
      to:email,
      subject:"URL Shortener verification",
      text:`Your OTP is ${otp}. It expires in 10 minutes.`
  })
  console.log("email sent")
  }
}