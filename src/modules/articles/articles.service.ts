export class ArticleService {

    getAll = () => {
        return "this is get all articles from service";
    }

    getOne = (id: string) => {
        return `this is get one article by ${id}`;
    }

    create = (body: object) => {
        return `this is create article`;
    }
}