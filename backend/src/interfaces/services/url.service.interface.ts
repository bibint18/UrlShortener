import { Types } from "mongoose";
import { Iurl } from "../models/url.interface.js";

export interface IurlService{
  shortenUrl(userId:Types.ObjectId,originalUrl:string):Promise<Iurl>
  getUserUrls(userId: Types.ObjectId,page:number,limit:number): Promise<{ urls: Iurl[]; totalItems: number }>
  redirectUrl(shortId:string):Promise<Iurl | null>
}