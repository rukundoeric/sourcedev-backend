/* eslint-disable linebreak-style */
import models from '../../sequelize/models';

const { Tokens } = models;
/**
 * @Author - Eric prestein
 */
class TokenController {
  /**
   *
   * @param {Object} userId - Request object
   * @param {Object} token - Request object
   * @returns {Object} - Response object
   */
  static async createOrUpdate(userId, token) {
    const tokenInfo = await Tokens.findOne({
      where: { userId },
    });
    if (tokenInfo) {
      await Tokens.update({ token }, { where: { userId } });
    } else {
      await Tokens.create({ userId, token });
    }
  }

  /**
   *
   * @param {String} userId - Request object
   * @returns {Object} - Response object
   */
  static async get(userId) {
    const { dataValues: tokenInfo } = await Tokens.findOne({
      where: { userId },
    });
    return tokenInfo;
  }
}

export default TokenController;
