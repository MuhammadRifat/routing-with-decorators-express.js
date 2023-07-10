import express, { Router } from 'express';
import * as authController from './auth.controller';
import { loginValidator } from './auth.validation';

const router: Router = express.Router();

router.post('/login', loginValidator, authController.login);

export { router as authRouter };