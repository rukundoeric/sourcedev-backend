/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define(
    'Tokens',
    {
      userId: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {}
  );
  Tokens.associate = function (models) {
    // associations can be defined here
  };
  return Tokens;
};
