import { BlogService } from "../services/blog.service";
import { Request, Response } from "express";
const blogService = new BlogService();

export class BlogController {
    async createBlog(req: Request, res: Response) {
        try{
            const userId = req.user?._id; // attached from middleware
            req.body.authorId = userId; // add userId into authorId
            // Implement DTO 
            const newBlog = await blogService.createBlog(req.body);
            return  res.status(201).json({
                success: true,
                data: newBlog,
                message: "Blog Created"
            })
        }catch(err: Error | any){
            return res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || "Error"
            })
        }
    }

    async getBlogs(req: Request, res: Response) {
        try{
            const allBlog = await blogService.getAllBlog();
            return res.status(200).json({
                success: true,
                data: allBlog,
                message: "All Blogs fetched"
            })
        }catch(err: Error | any){
            return res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || "Error"
            })
        }
    }
}