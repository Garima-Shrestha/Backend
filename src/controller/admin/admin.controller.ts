import { AdminUserService } from "../../services/admin/user.service";
import { Request, Response } from "express";
import z, { success } from "zod";

let adminUserService = new AdminUserService();

export class AdminUserController {
    async createUser(req: Request, res: Response ){
        // same as register user controller
    }
    async getUserById(req: Request, res: Response ){
        try {
            const userId = req.params.id; // from url /api/admin/users/:id
            const user = await adminUserService.getUserById(userId);
            return res.status(200).json(
                { success: true, data: user, message: "User Fetched"}
            )
        }catch(error: Error | any ){
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error"}
            );
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await adminUserService.getAllUser();
            return res.status(200).json({
                success: true,
                data: users,
                message: "All Users Fetched"
            });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }

    // PUT /api/admin/users/:id
    async updateOneUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const updatedUser = await adminUserService.updateOneUser(userId, req.body);
            return res.status(200).json({
                success: true,
                data: updatedUser,
                message: "User Updated Successfully"
            });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }

    // DELETE /api/admin/users/:id
    async deleteOneUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            await adminUserService.deleteOneUser(userId);
            return res.status(200).json({
                success: true,
                message: "User Deleted Successfully"
            });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }
}