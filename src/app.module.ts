import { Module } from "./decorators/core";
import { ArticleModule } from "./modules/articles/articles.module";
import { BlogModule } from "./modules/blogs/blogs.module";
import { UserModule } from "./modules/users/users.module";

@Module({
    imports: [
        BlogModule,
        UserModule,
        ArticleModule
    ]
})
export class AppModule { }