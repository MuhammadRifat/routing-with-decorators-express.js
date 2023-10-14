import { Request, Response } from "express";
import { Controller, Get, Post } from "../../decorators/core";
import { UserService } from "./users.service";

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService){}
    
    @Get()
    getUsers = (req: Request, res: Response) => {
        return this.userService.getAll();
    }

    @Get('/:id')
    getUsersById = (req: Request, res: Response) => {
        return this.userService.getOne(req.params.id);
    }

    @Post()
    createUser = (req: Request, res: Response) => {
        return this.userService.create(req.body);
    }
}