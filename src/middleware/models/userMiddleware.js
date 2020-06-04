/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import models from '../../sequelize/models/index';

const { User } = models;

export default [
  // Check if User alread exist
  async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      res.status(400).json({
        status: 400,
        error: {
          message: 'User already exist',
        },
      });
    }
    next();
  },
  // Check If User is not exist
  async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      res.status(400).json({
        status: 400,
        error: {
          message: 'User not exist',
        },
      });
    }
    req.user = user;
    next();
  },
  // Check if User is blocked
  async (req, res, next) => {
    const { email } = req.body;
    const { blocked } = await User.findOne({
      where: { email },
    });
    if (blocked) {
      res.status(403).json({
        status: 403,
        error: {
          message:
            'Your account seems to be blocked, please contact administrator for more information',
        },
      });
    }
    next();
  },
];
