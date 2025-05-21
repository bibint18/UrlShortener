import rateLimit from "express-rate-limit";

export const RateLimiter = rateLimit({
  windowMs:15 * 60 * 1000,
  max:100,
  message:"Too many request from this Ip, Please try again later"
})