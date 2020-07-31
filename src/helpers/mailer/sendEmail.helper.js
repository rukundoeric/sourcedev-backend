/* eslint-disable linebreak-style */
import 'regenerator-runtime';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

dotenv.config();

export default async ({ email }, htmlToSend, subject, updateSentEmail) => {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );

  const mailOptions = {
    from: `SourceDev <${process.env.SUPER_ADMIN_EMAIL}>`,
    to: email,
    html: htmlToSend,
    subject,
    text: '',
  };

  return transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    await updateSentEmail();
    return console.log('success');
  });
};
