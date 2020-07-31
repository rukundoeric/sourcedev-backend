/* eslint-disable linebreak-style */
import { Router } from 'express';
import notificationController from '../controllers/notificationController';
import { verifyToken } from '../../middleware/auth';
import userMiddleware from '../../middleware/models/userMiddleware';
import notificationMiddleware from '../../middleware/models/notificationMiddleware';
import validator from '../../middleware/validation/validator';

const {
  createNotification,
  deleteNotication,
  deleteAllNotication,
  sendMailsNotification
} = notificationController;

const notificationRoute = Router();

notificationRoute.post(
  '/new',
  validator('contactUs'),
  createNotification,
  sendMailsNotification
);
notificationRoute.delete(
  '/:notificationId/delete',
  notificationMiddleware[0],
  verifyToken,
  userMiddleware[3],
  deleteNotication
);
notificationRoute.delete('/all', deleteAllNotication);
export default notificationRoute;
