import { IuserRepository } from "../interfaces/repositories/user.repository.interface.js";
import { Iuser } from "../interfaces/models/user.interface.js";
import userModel from "../models/user.model.js";

export class UserRepository implements IuserRepository{
  async createUser(user: Partial<Iuser>): Promise<Iuser> {
    return await userModel.create(user)
  }

  async findUserByEmail(email: string): Promise<Iuser | null> {
    console.log("reached find by email")
    return await userModel.findOne({email:email})
  }

  async updateUser(id: string, update: Partial<Iuser>): Promise<Iuser | null> {
    return await userModel.findByIdAndUpdate(id,update,{new:true})
  }

  async findUserById(userId:string):Promise<Iuser |null>{
    return await userModel.findById(userId)
  }
}