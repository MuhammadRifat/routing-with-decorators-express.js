import { Request, Response } from "express";
import { Controller, Get, Post } from "../../decorators/core";
import { ArticleService } from "./articles.service";

@Controller('/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}
    
    @Get()
    getArticles = (req: Request, res: Response) => {
        return this.articleService.getAll();
    }

    @Get('/:id')
    getArticlesById = (req: Request, res: Response) => {
        return this.articleService.getOne(req.params.id);
    }

    @Post()
    createArticle = (req: Request, res: Response) => {
        return this.articleService.create(req.body);
    }
}