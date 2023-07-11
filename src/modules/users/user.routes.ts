import express, { Router } from 'express';
import * as userController from './user.controller';
import { userValidator } from './user.validation';
import { checkAuth } from '../auth/auth.middleware';

const router: Router = express.Router();

router.get('/', checkAuth("author"), userController.getAllUsers);
router.post('/', userValidator, userController.createUser);

export { router as userRouter };