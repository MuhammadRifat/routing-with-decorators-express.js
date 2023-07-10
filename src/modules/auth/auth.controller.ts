import { NextFunction, Request, Response } from "express";
import { IUser } from "../users/user.interface";
import { userService } from "../users/user.service";
import bcryptjs from "bcryptjs";
import { ApiError } from "../../errors/ApiError";
import { userTransformer } from "../users/user.transformer";

/**
 * 
 * @objective user login
 * @endpoint /login
 * @method POST
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, role } = req.body;

        const query = { email: email, role: role };
        const user = await userService.findOneByQuery({
            query: query
        });

        if (!user) {
            throw new ApiError(404, "User not found!");
        }

        const isPasswordMatched: boolean = await bcryptjs.compare(req.body.password, user.password);
        if (!isPasswordMatched) {
            return res.render("login", { message: "Password Incorrect!" });
        }

        return res.ok({
            token: "akdfjk",
            user: userTransformer(user)
        });
    } catch (error) {
        next(error);
    }
}


export { login };