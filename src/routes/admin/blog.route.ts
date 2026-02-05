import { AdminBlogController } from "../../controller/admin/blog.controller";
import { Router } from "express";
import { authorizedMiddleware, adminOnlyMiddleware } from "../../middlewares/authorization.middleware";
const adminBlogRouter = Router();
const adminBlogController = new AdminBlogController();

adminBlogRouter.use(authorizedMiddleware);
adminBlogRouter.use(adminOnlyMiddleware);

adminBlogRouter.get("/", adminBlogController.getAllBlogs);
adminBlogRouter.delete("/:id", adminBlogController.deleteOneBlog);

export default adminBlogRouter;