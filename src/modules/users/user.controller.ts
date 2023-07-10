import { NextFunction, Request, Response } from "express";
import { IUser } from "./user.interface";
import { userService } from "./user.service";
import bcryptjs from "bcryptjs";
import { userTransformer } from "./user.transformer";


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.findAllByQuery({
            select: { password: 0, is_deleted: 0, __v: 0 }
        });

        return res.ok(users);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const saltRounds: number = 10;
        const salt = await bcryptjs.genSalt(saltRounds);
        const hash = await bcryptjs.hash(req.body.password, salt);
        req.body.password = hash;

        const user = await userService.createOne<IUser>(req.body);

        return res.ok(userTransformer(user));
    } catch (error) {
        next(error);
    }
}

export { getAllUsers, createUser };