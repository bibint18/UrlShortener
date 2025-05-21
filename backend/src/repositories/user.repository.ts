import { IuserRepository } from "../interfaces/repositories/user.repository.interface";
import { Iuser } from "../interfaces/models/user.interface";
import userModel from "../models/user.model";

export class UserRepository implements IuserRepository{
  async createUser(user: Partial<Iuser>): Promise<Iuser> {
    return await userModel.create(user)
  }

  async findUserByEmail(email: string): Promise<Iuser | null> {
    return await userModel.findOne({email:email})
  }

  async updateUser(id: string, update: Partial<Iuser>): Promise<Iuser | null> {
    return await userModel.findByIdAndUpdate(id,update,{new:true})
  }
}