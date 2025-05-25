import { Iuser } from "../models/user.interface.js";
export interface IuserRepository{
  createUser(user:Partial<Iuser>):Promise<Iuser>
  findUserByEmail(email:string):Promise<Iuser | null>
  updateUser(id:string,update:Partial<Iuser>):Promise<Iuser | null>
  findUserById(userId:string):Promise<Iuser |null>
}