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

  async findUrlsByUserId(userId: Types.ObjectId): Promise<Iurl[] | null> {
    return await urlModel.find({userId})
  }

  async incrementClicks(shortId: string): Promise<Iurl | null> {
    return urlModel.findOneAndUpdate({shortId},{$inc:{clicks:1}},{new:true})
  }
}