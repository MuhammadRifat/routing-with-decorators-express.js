import { NextFunction, Request, Response } from "express";
import { userService } from "../users/user.service";
import bcryptjs from "bcryptjs";
import { ApiError } from "../../errors/ApiError";
import { userTransformer } from "../users/user.transformer";
import { unAuthorized } from "../../common/response-handler.common";
import * as authFunction from "./auth.function";

/**
 * 
 * @objective user login
 * @endpoint /api/v1/login
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

        // password comparing
        const isPasswordMatched: boolean = await bcryptjs.compare(req.body.password, user.password);
        if (!isPasswordMatched) {
            throw new ApiError(unAuthorized(), "unauthorized");
        }

        //generate toke 
        const token = authFunction.generateJWTToken({ _id: user._id, role: user.role });

        return res.ok({
            token: token,
            user: userTransformer(user)
        });
    } catch (error) {
        next(error);
    }
}


export { login };