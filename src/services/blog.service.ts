import { BlogRepository } from "../repositories/blog.repository";

const blogRepo = new BlogRepository();
export class BlogService{
    async createBlog(blog: any){
        const newBlog = await blogRepo.create(blog);
        return newBlog;
    }

    async getAllBlog(){
        const allBlog = await blogRepo.findAll();
        return allBlog;
    }
}