/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import models from '../sequelize/models';
import { decodeToken } from '../helpers/auth';

const { User } = models;

export const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).json({
      status: 401,
      error: {
        message: 'Token is missing'
      }
    });
  }
  try {
    const { userId } = await decodeToken(token);
    try {
      const user = await User.findOne({ where: { userId } });
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  } catch (error) {
    if (error.name && error.name === 'TokenExpiredError') {
      res.status(401).json({
        status: 401,
        message: error.message
      });
    }
    res.status(500).json({
      status: 500,
      error,
    });
  }
};
