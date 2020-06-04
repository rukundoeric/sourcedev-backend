import dotenv from 'dotenv';
import { v4 as userId } from 'uuid';
import { hashPassword } from '../../helpers/password';

dotenv.config();

const {
  SUPER_ADMIN_FIRSTNAME,
  SUPER_ADMIN_LASTNAME,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
  SUPER_ADMIN_IMAGE,
} = process.env;

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        userId: userId(),
        firstName: SUPER_ADMIN_FIRSTNAME,
        lastName: SUPER_ADMIN_LASTNAME,
        email: SUPER_ADMIN_EMAIL,
        password: await hashPassword(SUPER_ADMIN_PASSWORD),
        role: 'admin',
        blocked: false,
        image: SUPER_ADMIN_IMAGE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
};
