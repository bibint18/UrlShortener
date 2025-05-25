import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { RateLimiter } from "../middleware/rate.middleware.js";


const router = Router();
const authController = new AuthController()
router.post('/register',RateLimiter,authController.register.bind(authController))
router.post('/verifyOtp',RateLimiter,authController.verifyOtp.bind(authController))
router.post('/login',RateLimiter,authController.login.bind(authController))
router.post('/refresh',RateLimiter,authController.refresh.bind(authController))
router.post("/logout",authController.logout.bind(authController))
router.post('/resend',RateLimiter,authController.resendOtp.bind(authController))

export default router