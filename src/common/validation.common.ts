import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export interface IValidationSchema {
  body?: Joi.AnySchema<any>;
  params?: Joi.AnySchema<any>;
  query?: Joi.AnySchema<any>;
  headers?: Joi.AnySchema<any>;
}

const validationHandler = (validationSchema: IValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let errorMessages: { [key: string]: { [key: string]: string } } = {};
      let errorExist: boolean = false;

      Object.keys(validationSchema)?.map((key) => {
        let schema: Joi.AnySchema<any> | undefined, reqData: any;

        if (key === "body" && validationSchema.body) {
          schema = validationSchema.body;
          reqData = req.body;
        } else if (key === "query" && validationSchema.query) {
          schema = validationSchema.query;
          reqData = req.query;
        } else if (key === "params" && validationSchema.params) {
          schema = validationSchema.params;
          reqData = req.params;
        } else if (key === "headers" && validationSchema.headers) {
          schema = validationSchema.headers;
          reqData = req.headers;
        }

        if (schema && reqData) {
          const { error } = schema.validate(reqData, {
            abortEarly: false,
            errors: {
              wrap: {
                label: "",
              },
            },
          });

          if (error) {
            errorExist = true;
            let messages: { [key: string]: string } = {};

            error.details?.map((err) => {
              messages[err.path[0]] = err.message;
            });

            errorMessages[key] = messages;
          }
        }
      });

      // check the messages object is empty or not
      if (errorExist) {
        return res
          .status(422)
          .send({
            success: false,
            errors: errorMessages,
            message: "Validation Error!",
          });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export { validationHandler };
