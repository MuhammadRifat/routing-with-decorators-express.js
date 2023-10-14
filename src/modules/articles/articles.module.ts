import { Module } from "../../decorators/core";
import { ArticleController } from "./articles.controller";
import { ArticleService } from "./articles.service";

@Module({
    controllers: [ArticleController],
    providers: [ArticleService]
})
export class ArticleModule { }