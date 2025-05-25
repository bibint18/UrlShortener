import { Request, Response, NextFunction } from "express";
import { IUrlController } from "../interfaces/controllers/url.controller.interface.js";
import { UrlRepository } from "../repositories/url.repository.js";
import { UrlService } from "../services/url.service.js";
import { ApiError } from "../utils/error.utils.js";
import { HttpStatus } from "../types/http-status.enum.js";
import mongoose from "mongoose";

export class UrlController implements IUrlController{
  private urlService: UrlService
  constructor(){
    this.urlService = new UrlService(new UrlRepository())
  }

  async shortenUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {originalUrl} = req.body
      const userId = req.user?.id 
      if(!userId){
        throw new ApiError(HttpStatus.NOT_FOUND,"No user Found")
      }
      const url= await this.urlService.shortenUrl(new mongoose.Types.ObjectId(userId),originalUrl)
      res.status(HttpStatus.CREATED).json({success:true,data:url})
    } catch (error) {
      next(error)
    }
  }

  async getUserUrls(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id 
      if(!userId){
        throw new ApiError(HttpStatus.NOT_FOUND,"No user Found")
      }
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const {urls,totalItems} = await this.urlService.getUserUrls(new mongoose.Types.ObjectId(userId),page,limit)
      const totalPages = Math.ceil(totalItems/limit)
      res.status(HttpStatus.OK).json({success:true,data:{urls,totalPages,currentPage:page,totalItems},})
    } catch (error) {
      next(error)
    }
  }

  async redirectUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log('reach here',req.params)
      const {shortId} = req.params
      console.log('shortId',shortId)
      const url = await this.urlService.redirectUrl(shortId)
      if(!url){
        throw new ApiError(HttpStatus.NOT_FOUND,"No url")
      }
      console.log("url from redirect",url)
      // res.redirect(url.originalUrl)
      res.status(HttpStatus.OK).json({success:true,data:url})
    } catch (error) {
      next(error)
    }
  }
}