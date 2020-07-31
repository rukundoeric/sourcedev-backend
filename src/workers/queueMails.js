/* eslint-disable linebreak-style */
import 'regenerator-runtime';
import model from '../sequelize/models';

const { email } = model;

module.exports = async (emailsObjs) => {
  emailsObjs.forEach(async (m) => {
    await email.create({
      mail: m.mail,
      html: m.html,
      subject: m.subject,
      sent: false,
    });
  });
  return true;
};
