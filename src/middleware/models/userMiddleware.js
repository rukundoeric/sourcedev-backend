/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import models from '../../sequelize/models/index';

const { User } = models;

export default [
  // Check if User alread exist [0]
  async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      return res.status(400).json({
        status: 400,
        error: {
          message: 'User already exist',
        },
      });
    }
    next();
  },
  // Check If User is not exist [1]
  async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        error: {
          message: 'User not exist',
        },
      });
    }
    req.user = user;
    next();
  },
  // Check if User is blocked [2]
  async (req, res, next) => {
    const { email } = req.body;
    const { blocked } = await User.findOne({
      where: { email },
    });
    if (blocked) {
      return res.status(403).json({
        status: 403,
        error: {
          message:
            'Your account seems to be blocked, please contact administrator for more information',
        },
      });
    }
    next();
  },
  // Check if User is admin [3]
  async (req, res, next) => {
    const { userId } = req.user;
    const { role } = await User.findOne({
      where: { userId },
    });
    if (role !== 'admin') {
      return res.status(403).json({
        status: 403,
        error: {
          message: 'You seem not to be authorized to access this content',
        },
      });
    }
    next();
  },
  // Check if User is admin or owner [4]
  async (req, res, next) => {
    const { userId } = req.params;
    const {
      dataValues: { userId: myId, role },
    } = req.user;
    if (role === 'admin' || myId === userId) {
      next();
    } else {
      return res.status(403).json({
        status: 403,
        error: {
          message: 'You seem not to be authorized to access this content!!!',
        },
      });
    }
  },
  // Check if User exist {By UserId} [5]
  async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findOne({
      where: { userId },
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        error: {
          message: 'User not exist',
        },
      });
    }
    req.user = user;
    next();
  },
  // Check if User exist {By UserId} [6]
  async (req, res, next) => {
    const { key } = req.params;
    const {
      SUPER_ADMIN_PASSWORD,
    } = process.env;
    if (key !== SUPER_ADMIN_PASSWORD) {
      return res.redirect('/pagenotfound');
    }
    next();
  },
];
