/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Users', 'blocked', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }),
  ]),
  down: () => {},
};
