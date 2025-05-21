// import { error } from "console";
// import { NextFunction, Request } from "express";
// import { validationResult } from "express-validator";
// import { ApiError } from "../utils/error.utils";
// import { HttpStatus } from "../types/http-status.enum";

// export const validate = async (req:Request,res:Response,next:NextFunction):void => {
//   const errors = validationResult(req)
//   if(!error.isEmpty()){
//     throw new ApiError(HttpStatus.BAD_REQUEST, 'Validation failed', errors.array());
//   }
//   next()
// }