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
   * creating a new user
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async createUser(req, res) {
    const {
      firstName, lastName, email, role
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
    return res.status(201).json({
      status: 201,
      data: {
        message: 'User created successfully',
        user: dataValues,
      },
    });
  }

  /**
   * creating a new user
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async createAdmin(req, res) {
    const {
      SUPER_ADMIN_FIRSTNAME,
      SUPER_ADMIN_LASTNAME,
      SUPER_ADMIN_EMAIL,
      SUPER_ADMIN_PASSWORD,
      SUPER_ADMIN_IMAGE,
    } = process.env;
    const password = await hashPassword(SUPER_ADMIN_PASSWORD);
    const user = await User.findOne({
      where: { email: SUPER_ADMIN_EMAIL },
    });
    if (user) {
      return res.status(400).json({
        status: 400,
        error: {
          message: 'User already exist',
        },
      });
    }
    const { dataValues } = await User.create({
      userId: userId(),
      firstName: SUPER_ADMIN_FIRSTNAME,
      lastName: SUPER_ADMIN_LASTNAME,
      email: SUPER_ADMIN_EMAIL,
      password,
      role: 'admin',
      blocked: false,
      image: SUPER_ADMIN_IMAGE,
    });
    return res.status(201).json({
      status: 201,
      data: {
        message: 'Admin created successfully',
        user: dataValues,
      },
    });
  }


  /**
   * Get all users
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async getUsers(req, res) {
    const users = await User.findAll({});
    return res.status(200).json({
      status: 200,
      users,
    });
  }

  /**
   * Get specific user
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async getUser(req, res) {
    const { userId: id } = req.params;
    const user = await User.findOne({ where: { userId: id } });
    return res.status(200).json({
      status: 200,
      data: user,
    });
  }

  /**
   * Block user
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async blockUser(req, res) {
    const { userId: id } = req.params;
    const result = await User.update(
      { blocked: true },
      { where: { userId: id } }
    );
    return res.status(200).json({
      status: 200,
      data: {
        message: 'User blocked successfully!!',
        result,
      },
    });
  }

  /**
   * Unblock user
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async unblockUser(req, res) {
    const { userId: id } = req.params;
    const result = await User.update(
      { blocked: false },
      { where: { userId: id } }
    );
    return res.status(200).json({
      status: 200,
      data: {
        message: 'User unblocked successfully!!',
        result,
      },
    });
  }

  /**
   * Delete user
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async deleteUser(req, res) {
    // const { userId: id } = req.params;
    const result = await User.destroy({ where: { firstName: 'eric' } });
    return res.status(200).json({
      status: 200,
      data: {
        message: 'User delete successfully!!',
        result,
      },
    });
  }
}

export default userController;
