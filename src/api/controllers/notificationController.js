/* eslint-disable linebreak-style */
import models from '../../sequelize/models';
import mailObject from '../../helpers/mailer/mailObject';
import queueMails from '../../workers/queueMails';
import workers from '../../workers';

const { Notifications, User } = models;

/**
 * @Author - Eric prestein
 */
class Notification {
  /**
   * creating a new notification
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @param {object} next - Response.
   * @returns {object} - returns created user
   */
  static async createNotification(req, res, next) {
    const {
      firstName, lastName, email, subject, message
    } = req.body;
    const { dataValues } = await Notifications.create({
      firstName,
      lastName,
      email,
      subject,
      message,
    });
    req.respondWith = {
      status: 201,
      data: {
        message: 'Notification created',
        notification: dataValues,
      },
    };
    next();
  }

  /**
   * creating a new notification
   * @param {object} req - Request.
   * @param {object} res - Response.
   * @returns {object} - returns created user
   */
  static async sendMailsNotification(req, res) {
    const users = await User.findAll({});
    const { email, message, lastName } = req.body;
    const { respondWith } = req;
    const mails = [];
    mails.push(mailObject('contactUsResponce', email, lastName));
    users.forEach((user) => {
      mails.push(mailObject('contactusNotification', user.email, message));
    });
    queueMails(mails).then(() => {
      workers.sendMailsWorker();
      return res.status(200).send({
        ...respondWith
      });
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
      },
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
      },
    });
  }
}

export default Notification;
