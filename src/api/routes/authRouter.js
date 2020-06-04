/* eslint-disable linebreak-style */
import { Router } from 'express';
import authController from '../controllers/authController';
import userMiddleware from '../../middleware/models/userMiddleware';

const { login } = authController;
const authRouter = Router();

authRouter.post('/login', userMiddleware[2], userMiddleware[1], login);

export default authRouter;
