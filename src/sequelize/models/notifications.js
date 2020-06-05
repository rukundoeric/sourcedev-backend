
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    subject: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING
  }, {});
  Notifications.associate = function (models) {
    // associations can be defined here
  };
  return Notifications;
};
