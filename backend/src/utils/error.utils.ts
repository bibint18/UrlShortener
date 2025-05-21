
import { HttpStatus } from "../types/http-status.enum";

export class ApiError extends Error{
  constructor(public status:HttpStatus,message:string){
    super(message)
    this.name='ApiError'
  }
}