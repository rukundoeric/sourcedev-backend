
module.exports = (sequelize, DataTypes) => {
  const email = sequelize.define('email', {
    mail: DataTypes.JSON,
    html: DataTypes.TEXT,
    subject: DataTypes.STRING,
    sent: DataTypes.BOOLEAN
  }, {});
  email.associate = function (models) {
    // associations can be defined here
  };
  return email;
};
