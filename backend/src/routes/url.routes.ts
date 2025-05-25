import { Router } from "express";
import { UrlController } from "../controllers/url.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { RateLimiter } from "../middleware/rate.middleware.js";

const router = Router()
const urlController = new UrlController()
router.post('/shorten',authMiddleware,RateLimiter,urlController.shortenUrl.bind(urlController))
router.get("/",authMiddleware,urlController.getUserUrls.bind(urlController))

export default router