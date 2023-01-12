'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('proxies', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      ip: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },

      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },

      deleted_at: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('proxies');
  },
};
