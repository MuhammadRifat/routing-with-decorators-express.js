import express, { Application, Request, Response } from "express";
import { json } from "body-parser";
import "reflect-metadata";
import cors from "cors";
import ErrorHandler from "./errors/errorHandler";
import { ApiError } from "./errors/ApiError";
import { RouteDefinition } from "./common/interface.common";
import logger from "./logger/logger";

class AppFactory {
  create(ModuleClass: any) {
    const app: Application = express();

    app.use(json());
    app.use(cors());

    const AppPayload = Reflect.getMetadata('module', ModuleClass);

    AppPayload?.imports?.forEach((subModule: any) => {
      const payload = Reflect.getMetadata('module', subModule);

      payload.controllers?.forEach((controller: any) => {

        const providersInstances = payload.providers?.map((provider: any) => {
          return new provider();
        })

        const controllerInstance = new controller(...providersInstances);
        const prefix = Reflect.getMetadata('prefix', controller);
        const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);

        routes?.forEach(route => {
          // logger.info(`Mapped ${route.requestMethod}: ${prefix + route.path}`);

          app[route.requestMethod](prefix + route.path, async (req: Request, res: Response) => {
            const response = await controllerInstance[route.methodName](req, res);
            return res.status(200).send(response);
          })
        })
      })
    });

    app.all("*", (req: Request, res: Response) => {
      throw new ApiError(404, "Route not found!");
    });

    app.use(ErrorHandler.errorHandler);
    return app;
  }
}

export const appFactory = new AppFactory();
