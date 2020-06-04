/* eslint-disable linebreak-style */
import { Router } from 'express';
import validator from '../../middleware/validation/validator';
import userMiddleware from '../../middleware/models/userMiddleware';
import userController from '../controllers/userController';
import { verifyToken } from '../../middleware/auth';

const { createUser } = userController;

const userRouter = Router();

userRouter.post('/new', verifyToken, validator('createUser'), userMiddleware[0], createUser);

export default userRouter;
