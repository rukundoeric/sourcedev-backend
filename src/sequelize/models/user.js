/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    blocked: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
