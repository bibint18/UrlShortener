import { Types } from "mongoose";
import { Iurl } from "../models/url.interface.js";

export interface IUrlRepository{
  createUrl(url:Partial<Iurl>):Promise<Iurl>
  findUrlByShortId(shortId:string):Promise<Iurl | null>
  findUrlsByUserId(userId: Types.ObjectId,page:number,limit:number): Promise<Iurl[] | null>
  incrementClicks(shortId:string):Promise<Iurl| null>
  countUrlsByUserId(userId: Types.ObjectId): Promise<number>
}