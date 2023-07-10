import express, { Application, Request, Response } from 'express';
import { json } from "body-parser";
import cors from "cors";
import ErrorHandler from './errors/errorHandler';
import { responseHandler } from "./common/response-handler.common";
import { AllRouters } from './routes';
import { ApiError } from './errors/ApiError';

const app: Application = express();

// application middleware
app.use(json());
app.use(cors());
app.use(responseHandler);
app.use(AllRouters);


app.all('*', (req: Request, res: Response) => {
    throw new ApiError(404, "Route not found!")
});

app.use(ErrorHandler.errorHandler);

export default app;