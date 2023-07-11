import { NextFunction, Request, Response } from "express";

const OK = 200;
const CREATED = 201;
const ACCEPTED = 202;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const NOT_ACCEPTED = 406;
const UNPROCESSABLE = 422;
const INTERNAL_SERVER_ERROR = 500;

const notFound = () => {
  return NOT_FOUND;
};

const notAccepted = () => {
  return NOT_ACCEPTED;
};
const noContent = () => {
  return NO_CONTENT;
};

const unProcessable = () => {
  return UNPROCESSABLE;
};
const internalServerError = () => {
  return INTERNAL_SERVER_ERROR;
};

const unAuthorized = () => {
  return UNAUTHORIZED;
};

const forbidden = () => {
  return FORBIDDEN;
};

// modified express Response types
declare module "express-serve-static-core" {
  interface Response {
    ok(data: unknown, message?: string): Response;
    okFalse(data: any, message?: string): Response;
    created(data: any, message?: string): Response;
    updated(data: any, message?: string): Response;
    deleted(data?: any, message?: string): Response;
    noContent(): Response;
    unauthorized(message?: string): Response;
    notFound(message?: string): Response;
    unprocessable(message?: string): Response;
    internalServerError(message?: string): Response;
  }
}

// response handler middleware
const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  // return success response
  const success = (statusCode: number, data: any, message?: string) => {
    const code: number = statusCode < 400 ? statusCode : OK;

    return res.status(statusCode).send({
      success: true,
      code: code,
      data: data,
      message: message || "Successfully Done",
    });
  };

  const falsy = (statusCode: number, data: any, message?: string) => {
    const code: number = statusCode < 400 ? statusCode : OK;

    return res.status(statusCode).send({
      success: false,
      code: code,
      data: data,
      message: message || "False",
    });
  };

  // return fail response
  const error = (statusCode: number, message?: string) => {
    const code: number =
      statusCode >= 400 && statusCode < 500 ? statusCode : BAD_REQUEST;

    return res.status(statusCode).send({
      success: false,
      code: code,
      message: message || "Failed",
    });
  };
  // return no content response
  const noContent = (statusCode: number) => {
    return res.status(statusCode).send({
      success: true,
      code: statusCode,
    });
  };
  // for sending ok operation
  res.ok = (data: any, message?: string) => {
    return success(OK, data, message || "OK");
  };

  res.okFalse = (data: any, message?: string) => {
    return falsy(OK, data, message || "OK but False");
  };

  // for sending created operation
  res.created = (data: any, message?: string) => {
    return success(CREATED, data, message || "Successfully Created.");
  };

  // for sending updated operation
  res.updated = (data: any, message?: string) => {
    return success(CREATED, data, message || "Successfully Updated.");
  };

  // for sending deleted operation
  res.noContent = () => {
    return noContent(ACCEPTED);
  };

  // for sending failed operation
  res.unauthorized = (message?: string) => {
    return error(UNAUTHORIZED, message);
  };

  res.unprocessable = (message?: string) => {
    return error(NOT_FOUND, message || "Unprocessable!");
  };

  res.notFound = (message?: string) => {
    return error(NOT_FOUND, message || "Not Found!");
  };

  res.internalServerError = (message?: string) => {
    return error(INTERNAL_SERVER_ERROR, message || "Internal Server Error");
  };

  next();
};

export {
  responseHandler,
  notFound,
  unProcessable,
  unAuthorized,
  forbidden,
  noContent,
  internalServerError,
  notAccepted,
};
