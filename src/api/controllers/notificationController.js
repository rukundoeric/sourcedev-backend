/* eslint-disable linebreak-style */
import models from '../../sequelize/models';

const { Notifications } = models;

/**
 * @Author - Eric prestein
 */
class Notification {
  /**
   * creating a new notification
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async createNotification(req, res) {
    const {
      firstName, lastName, email, subject, message
    } = req.body;
    const { dataValues } = await Notifications.create({
      firstName,
      lastName,
      email,
      subject,
      message
    });
    return res.status(201).json({
      status: 201,
      data: {
        message: 'Notification created',
        notification: dataValues
      }
    });
  }

  /**
   * delete notification
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async deleteNotication(req, res) {
    const { notificationId: id } = req.params;
    await Notifications.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      status: 200,
      data: {
        message: 'Notification Delete Successfully',
      }
    });
  }

  /**
   * delete notification
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async deleteAllNotication(req, res) {
    await Notifications.destroy({
      truncate: true,
    });
    return res.status(200).json({
      status: 200,
      data: {
        message: 'All Notification Delete successfully',
      }
    });
  }
}

export default Notification;
