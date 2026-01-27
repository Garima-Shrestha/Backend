import { IBlogModel, BlogModel } from "../models/blog.model";

export interface IBlogModelRepository {
    create(blog: IBlogModel): Promise<IBlogModel>;
    findById(id: string): Promise<IBlogModel | null>;
    findAll(): Promise<IBlogModel[]>;
    update(id: string, blog: Partial<IBlogModel>): Promise<IBlogModel | null>;
    delete(id: string): Promise<boolean>;
}

export class BlogRepository implements IBlogModelRepository {
    async create(blog: IBlogModel): Promise<IBlogModel> {
        const newBlog = new BlogModel(blog);
        const saved = await newBlog.save();
        return saved
    }
    
    async findById(id: string): Promise<IBlogModel | null> {
        const blog = await BlogModel.findById(id).populate("authorId", "firstName lastName email username")
        return blog;
    }
     
    async findAll(): Promise<IBlogModel[]> {
        const blogs =  await BlogModel.find().populate("authorId", "firstName lastName email username")
        // . populate("comments");
        return blogs;
    }
    
    async update(id: string, blog: Partial<IBlogModel>): Promise<IBlogModel | null> {
        const update = await BlogModel.findByIdAndUpdate(id, blog, { new: true });
        return update
    }
    
    async delete(id: string): Promise<boolean> {
        const result = await BlogModel.findByIdAndDelete(id);
        return result !== null;
    }
}