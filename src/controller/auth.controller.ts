// import { CreateUserDto } from "../dtos/user.dto";
// import { UserService } from "../services/user.services";
// import { Request, Response } from "express";
// import z from 'zod';

// let userService = new UserService();
// export class AuthController {
//     async register(req: Request, res: Response) {
//         try{
//             const parsedData = CreateUserDto.safeParse(req.body);
//             if (!parsedData.success){
//                 return res.status(400).json (
//                     { success: false, message: z.prettifyError(parsedData.error) }
//                 ); // z.prettifyError - better error messages (zod)
//             }
//             const newUser = await userService.registerUser(parsedData.data);
//             return res.status(201).json(
//                 { success: true, data: newUser, message: "Register success" }
//             );
//         } catch(error: Error | any) {
//             return res.status(error.statusCode || 500).json(
//                 { success: false, message: error.message || "Internal Server Error"}
//             );
//         }
//     }
// }

import { CreateUserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.services";
import { Request, Response } from "express";
import { HttpError } from "../errors/http-error";
import z, { success } from "zod";

let userService = new UserService();

export class AuthController {
    async register ( req : Request, res : Response){
        try{
            console.log("Yeta ahye hai")
            const parsedData = CreateUserDto.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json(
                    {success: false, message : z.prettifyError(parsedData.error) }
                );
            }
            const newUser = await userService.registerUser(parsedData.data);
            return res.status(204).json(
                {success: true, data: newUser, message : "Register success"}
            );
        }
        catch (error : Error | any){
            console.log(error)
            return res.status(error.statusCode || 500).json(
                {success: false, message: error.message || "Internal server ERROR"}
            );
        }
    }
}