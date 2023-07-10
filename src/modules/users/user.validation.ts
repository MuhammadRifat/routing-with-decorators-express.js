import Joi from "joi";
import { validationHandler } from "../../common/validation.common";
// user validation schema
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('author', 'editor', 'reviewer', 'admin').required(),
    password: Joi.string().min(8).required(),
});

const userValidator = validationHandler({
    body: userSchema
});

export { userValidator };
