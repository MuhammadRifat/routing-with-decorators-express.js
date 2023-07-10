import { Server } from "http";
import logger from "./logger/logger";
import { connectDB } from "./db/db";
import config from "config";
import app from "./app";

const port: number = config.get<number>("server.port") || 3000;

// start server
let dbClient: any;
let server: Server;

const startServer = async () => {
    try {
        dbClient = await connectDB();
        server = app.listen(port, () => {
            logger.info(`Server run on the port ${port}`);
        });
    } catch (error: any) {
        logger.error(error.message);
        process.exit(1);
    }
}
startServer();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: string) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", (err: Error) => {
    if (err) logger.error(err.stack || err);

    setTimeout(() => {
        process.exit(err ? 1 : 0);
    }, 1000).unref();
    logger.info("SIGTERM received");

    if (dbClient) dbClient.close();
    if (server) server.close();
});