import express, { Router } from "express";
import { userRouter } from "./modules/users";
import { authRouter } from "./modules/auth";

const routes = [
    { path: "/user", routePath: userRouter },
    { path: "/auth", routePath: authRouter },
];

const router: Router = express.Router();

for (const route of routes) {
    router.use(`/api/v1${route.path}`, route.routePath);
}

export { router as AllRouters };

