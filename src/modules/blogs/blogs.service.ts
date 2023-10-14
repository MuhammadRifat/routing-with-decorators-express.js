export class BlogService {

    getAll = () => {
        return "this is get all blogs from service";
    }

    getOne = (id: string) => {
        return `this is get one by ${id}`;
    }

    create = (body: object) => {
        return `this is create`;
    }
}