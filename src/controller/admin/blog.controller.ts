import { AdminBlogService } from "../../services/admin/blog.service";
import { Request, Response } from "express";

const adminBlogService = new AdminBlogService();
interface QueryParams {
    page?: string;
    size?: string;
    searchTerm?: string;
}
export class AdminBlogController {
    async getAllBlogs(req: Request, res: Response) {
        try {
            const { page, size, searchTerm } : QueryParams = req.query;
            const {blogs, pagination} = await adminBlogService.getAllBlogs(
                page, size, searchTerm
            );

            return res.status(200).json({
                success: true,
                data: blogs,
                pagination,
                message: "Blogs fetched successfully" 
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
    async deleteOneBlog(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await adminBlogService.deleteOneBlog(id);
            return res.status(200).json({
                success: true,
                message: "Blog deleted successfully"
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}