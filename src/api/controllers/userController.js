/* eslint-disable linebreak-style */
import { v4 as userId } from 'uuid';
import models from '../../sequelize/models';
import { hashPassword, generatePassword as psw } from '../../helpers/password';

const { User } = models;

/**
 * @Author - Eric prestein
 */
class userController {
  /**
   * creating a new USER
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async createUser(req, res) {
    const {
      firstName, lastName, email, role,
    } = req.body;
    const password = await hashPassword(psw);
    const { dataValues } = await User.create({
      userId: userId(),
      firstName,
      lastName,
      email,
      password,
      role,
      blocked: false,
      image: 'default',
    });
    res.status(201).json({
      status: 201,
      data: {
        message: 'User created successfully',
        user: dataValues
      }
    });
  }
}

export default userController;
