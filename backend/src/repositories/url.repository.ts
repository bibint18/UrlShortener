import { IUrlRepository } from "../interfaces/repositories/url.repository.interface.js";
import { Iurl } from "../interfaces/models/url.interface.js";
import urlModel from "../models/url.model.js";
import { Types } from "mongoose";

export class UrlRepository implements IUrlRepository{
  async createUrl(url: Partial<Iurl>): Promise<Iurl> {
    return await urlModel.create(url)
  }

  async findUrlByShortId(shortId: string): Promise<Iurl | null> {
    return await urlModel.findOne({shortId:shortId})
  }

  async findUrlsByUserId(userId: Types.ObjectId,page:number,limit:number,search:string=''): Promise<Iurl[] | null> {
    const query: any = { userId };
    if (search) {
      query.$or = [
        { originalUrl: { $regex: search, $options: 'i' } },
        { shortId: { $regex: search, $options: 'i' } },
      ];
    }
    return await urlModel.find(query).skip((page-1) * limit).limit(limit).exec()
  }

  async countUrlsByUserId(userId: Types.ObjectId,search:string=''): Promise<number> {
    const query:any ={userId}
    if(search){
      query.$or = [
        { originalUrl: { $regex: search, $options: 'i' } },
        { shortId: { $regex: search, $options: 'i' } },
      ];
    }
    return await urlModel.countDocuments(query).exec();
  }

  async findUrlByOriginal(originalUrl:string):Promise<Iurl | null>{
    return await urlModel.findOne({originalUrl})
  }

  async incrementClicks(shortId: string): Promise<Iurl | null> {
    return urlModel.findOneAndUpdate({shortId},{$inc:{clicks:1}},{new:true})
  }
}