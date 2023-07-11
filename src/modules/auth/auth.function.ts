import jwt from "jsonwebtoken";
import config from "config";
import { ApiError } from "../../errors/ApiError";
import { IUser } from "../users/user.interface";

// generate jwt token
const generateJWTToken = (payload: object) => {
    const secret = config.get<string>("jwt.secret");
    const expiresIn = config.get<string>("jwt.accessTokenExpiresIn");

    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn
    })

    return token;
}

// verify jwt token
const verifyJWTToken = (token: string) => {
    const secret = config.get<string>("jwt.secret");

    const decoded: any = jwt.verify(token, secret);

    if (!decoded) {
        throw new ApiError(401, "unauthorized!");
    }

    return {
        _id: String(decoded._id),
        role: String(decoded.role)
    }
}

export {
    generateJWTToken,
    verifyJWTToken
}