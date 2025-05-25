import express from "express";
import helmet from "helmet";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from "./config/database.js";
import authRoute from './routes/auth.routes.js'
import urlRoute from './routes/url.routes.js'
import { UrlController } from "./controllers/url.controller.js";
import { ApiError } from "./utils/error.utils.js";
import { HttpStatus } from "./types/http-status.enum.js";
dotenv.config()
const app = express()
app.use(helmet())
app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use(express.json())
app.use(cookieParser())

//routes 3 ennam add aakan ind
const urlController = new UrlController()
app.use('/api/auth',authRoute)
app.use('/api/urls',urlRoute)
app.get('/:shortId',urlController.redirectUrl.bind(urlController))

//error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ success: false, message: err.message, error: err });
    console.log(next)
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
  }
});
const startServer =async () => {
  await connectDB()
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  })
}

startServer();

export default app