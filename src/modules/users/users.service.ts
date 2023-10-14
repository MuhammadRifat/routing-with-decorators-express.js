export class UserService {

    getAll = () => {
        return "this is get all users from service";
    }

    getOne = (id: string) => {
        return `this is get one user by ${id}`;
    }

    create = (body: object) => {
        return `this is create user`;
    }
}