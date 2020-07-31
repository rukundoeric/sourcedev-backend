/* eslint-disable linebreak-style */
import 'regenerator-runtime';
import { forEach } from 'lodash';
import models from '../sequelize/models';
import mailer from '../helpers/mailer/index';

const { sendEmail } = mailer;
const { email } = models;

module.exports = async () => {
  const mailsToSend = await email.findAll({ where: { sent: false } });
  forEach(mailsToSend, async (mailItem) => {
    await sendEmail(
      mailItem.mail,
      mailItem.html,
      mailItem.subject,
      async () => {
        await email.update({ sent: true }, { where: { id: mailItem.id } });
      }
    );
  });
};
