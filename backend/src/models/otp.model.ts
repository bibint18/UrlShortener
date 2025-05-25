import { Schema, model } from 'mongoose';
import { IOtp } from '../interfaces/models/otp.interface.js';

const otpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

export default model<IOtp>('Otp', otpSchema);