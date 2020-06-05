/* eslint-disable linebreak-style */
import models from '../../sequelize/models/index';

const { Notifications } = models;


export default [
  // Check if Notification Exist [0]
  async (req, res, next) => {
    const { notificationId } = req.params;
    const notification = await Notifications.findOne({
      where: { id: notificationId }
    });
    if (!notification) {
      return res.status(404).json({
        status: 404,
        error: {
          message: 'Notiication not exist'
        }
      });
    }
    next();
  }
];
