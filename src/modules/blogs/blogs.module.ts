import { Module } from "../../decorators/core";
import { BlogController } from "./blogs.controller";
import { BlogService } from "./blogs.service";

@Module({
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule { }