import { Router } from "express";
import { UrlController } from "../controllers/url.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { RateLimiter } from "../middleware/rate.middleware";

const router = Router()
const urlController = new UrlController()
router.post('/shorten',authMiddleware,RateLimiter,urlController.shortenUrl.bind(urlController))
router.get("/",authMiddleware,urlController.getUserUrls.bind(urlController))

export default router