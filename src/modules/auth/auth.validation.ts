import Joi from "joi";
import { validationHandler } from "../../common/validation.common";

// login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().valid('author', 'editor', 'reviewer', 'admin').required(),
    password: Joi.string().min(8).required(),
});

// login validation middleware
const loginValidator = validationHandler({ body: loginSchema });

export { loginValidator };
