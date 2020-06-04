/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export const generateToken = async (payload) => {
  const token = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
};

export const decodeToken = async (token) => {
  const user = await jwt.verify(token, JWT_SECRET_KEY);
  return user;
};
