/* eslint-disable linebreak-style */
import { Router } from 'express';
import validator from '../../middleware/validation/validator';
import userMiddleware from '../../middleware/models/userMiddleware';
import userController from '../controllers/userController';
import { verifyToken } from '../../middleware/auth';

const {
  createUser,
  getUsers,
  getUser,
  blockUser,
  unblockUser,
  deleteUser,
} = userController;

const userRouter = Router();

userRouter.post(
  '/new',
  verifyToken,
  validator('createUser'),
  userMiddleware[0],
  createUser
);

// Get all Users
userRouter.get('/', verifyToken, userMiddleware[3], getUsers);

// Get Specific User
userRouter.get(
  '/:userId',
  verifyToken,
  userMiddleware[4],
  userMiddleware[5],
  getUser
);

// Block User
userRouter.patch(
  '/:userId/block',
  verifyToken,
  userMiddleware[3],
  userMiddleware[5],
  blockUser
);

// Unblock User
userRouter.patch(
  '/:userId/unblock',
  verifyToken,
  userMiddleware[3],
  userMiddleware[5],
  unblockUser
);

// Delete User
userRouter.delete(
  '/:userId/delete',
  verifyToken,
  userMiddleware[3],
  userMiddleware[5],
  deleteUser
);

export default userRouter;
