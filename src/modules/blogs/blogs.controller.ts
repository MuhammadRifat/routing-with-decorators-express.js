import { Request, Response } from "express";
import { Controller, Get, Post } from "../../decorators/core";
import { BlogService } from "./blogs.service";

@Controller('/blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService){}
    
    @Get()
    getBlogs = (req: Request, res: Response) => {
        return this.blogService.getAll();
    }

    @Get('/:id')
    getBlogsById = (req: Request, res: Response) => {
        return this.blogService.getOne(req.params.id);
    }

    @Post()
    createBlog = (req: Request, res: Response) => {
        return this.blogService.create(req.body);
    }
}