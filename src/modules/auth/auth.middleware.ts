import { NextFunction, Request, Response } from "express"
import { ApiError } from "../../errors/ApiError";
import * as authFunction from "./auth.function";

export const checkAuth = (role: string | string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authString = req.header("Authorization");
            if (!authString) {
                throw new ApiError(401, "unauthorized");
            }
            const token = authString.split(" ")[1];
            const user = authFunction.verifyJWTToken(token);

            let authorized = false;
            if (Array.isArray(role) && role.length && role.includes(user.role)) {
                authorized = true;
            } else if (role === user.role) {
                authorized = true;
            }

            if (!authorized) {
                throw new ApiError(401, "unauthorized!");
            }

            res.locals.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}