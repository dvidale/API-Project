'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Users'
        }
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL, 
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};