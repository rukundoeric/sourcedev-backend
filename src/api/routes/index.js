/* eslint-disable linebreak-style */
import express from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import notificationRoute from './notificationRoute';


const api = express();

// Routers
api.use('/auth', authRouter);
api.use('/users', userRouter);
api.use('/notification', notificationRoute);

export default api;
