import { NextFunction, Request, Response } from "express";
import logger from "../logger/logger";
import { ApiError } from "./ApiError";

export default class ErrorHandler {
  static errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    logger.error(err.message);

    let statusCode = 500;
    if (err.statusCode) {
      statusCode = err.statusCode;
    }

    return res.status(500).json({
      code: err.statusCode,
      message: err.message,
      stack: err.stack,
    });
  };
}
