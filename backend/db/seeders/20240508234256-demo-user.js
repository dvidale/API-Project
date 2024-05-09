'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await User.bulkCreate(
      [
    
      {
        
        username: 'DemoUser',
        email: 'demo@user.com',
        hashedPassword: bcrypt.hashSync('password')
      }
      ,
      {
        
        username: 'FakeUser1',
        email: 'user1@user.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        
        username: 'FakeUser2',
        email: 'user2@user.com',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ]
    , { validate: true });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser'
      , 'FakeUser1', 'FakeUser2'
    ] }
    }, {});
  
  }
};
