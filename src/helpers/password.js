/* eslint-disable linebreak-style */
import bcrpt from 'bcrypt';
import pswGenerator from 'generate-password';

export const hashPassword = async password => bcrpt.hash(password, bcrpt.genSaltSync(6));
export const comparePassword = async (password, hashedPassword) => bcrpt
  .compare(password, hashedPassword);
export const generatePassword = pswGenerator.generate({
  length: 10,
  numbers: true,
  uppercase: true,
});
