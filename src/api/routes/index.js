/* eslint-disable linebreak-style */
import express from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';

const api = express();

// Routers
api.use('/auth', authRouter);
api.use('/users', userRouter);

export default api;
