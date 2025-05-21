import { Types } from "mongoose";
import { Iurl } from "../models/url.interface";

export interface IurlService{
  shortenUrl(userId:Types.ObjectId,originalUrl:string):Promise<Iurl>
  getUserUrls(userId:Types.ObjectId):Promise<Iurl | null>
  redirectUrl(shortId:string):Promise<Iurl | null>
}