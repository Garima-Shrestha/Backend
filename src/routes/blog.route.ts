import { BlogController } from "../controller/blog.controller";
import { Router } from "express";
import { authorizedMiddleware } from "../middlewares/authorization.middleware";

const router = Router();
const blogController = new BlogController();

router.post(
    "/",
    authorizedMiddleware,
    blogController.createBlog
)

router.get(
    "/",
    blogController.getBlogs
)

export default router;