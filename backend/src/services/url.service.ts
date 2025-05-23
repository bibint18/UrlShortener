import { Types } from "mongoose";
import { Iurl } from "../interfaces/models/url.interface";
import { IurlService } from "../interfaces/services/url.service.interface";
import { UrlRepository } from "../repositories/url.repository";
import { generateShortId } from "../utils/shortId.utils";
import { ApiError } from "../utils/error.utils";
import { HttpStatus } from "../types/http-status.enum";

export class UrlService implements IurlService{
  constructor(private urlRepository:UrlRepository){}

  async shortenUrl(userId: Types.ObjectId, originalUrl: string): Promise<Iurl> {
    console.log("shorteb service",userId,originalUrl)
    const shortId =generateShortId()
    console.log("shortId",shortId)
    return await this.urlRepository.createUrl({
      userId,
      originalUrl,
      shortId,
      clicks:0
    })
  }

  async getUserUrls(userId: Types.ObjectId): Promise<Iurl[] | null> {
    const urls = await this.urlRepository.findUrlsByUserId(userId)
    if(!urls){
      throw new ApiError(HttpStatus.NOT_FOUND,"No URL found")
    }
    return urls
  }

  async redirectUrl(shortId: string): Promise<Iurl | null> {
    const url = await this.urlRepository.findUrlByShortId(shortId)
    console.log("redirect servuce",url)
    if(!url){
      throw new ApiError(HttpStatus.NOT_FOUND,"URL Not Found")
    }
    await this.urlRepository.incrementClicks(shortId)
    return url
  }
}