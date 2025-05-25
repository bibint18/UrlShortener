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

  async findUrlsByUserId(userId: Types.ObjectId,page:number,limit:number): Promise<Iurl[] | null> {
    return await urlModel.find({userId}).skip((page-1) * limit).limit(limit).exec()
  }

  async countUrlsByUserId(userId: Types.ObjectId): Promise<number> {
    return await urlModel.countDocuments({ userId }).exec();
  }

  async incrementClicks(shortId: string): Promise<Iurl | null> {
    return urlModel.findOneAndUpdate({shortId},{$inc:{clicks:1}},{new:true})
  }
}