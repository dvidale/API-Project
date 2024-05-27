'use strict';

const {Spot, User, Booking} = require('../models');

let options = {

};

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

const spot = await Spot.findOne({
  where:{
    name: 'Winterfell'
  }
})

const spotId = spot.id;

const user = await User.findOne({
  where:{
    firstName: 'Daenerys'
  }
})

const userId = user.id;

await Booking.create({
  spotId,
  userId,
  startDate: 'May 23, 2024',
  endDate: 'May 24, 2024'
})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    const spot = await Spot.findOne({
      where:{
        name: 'Winterfell'
      }
    });

    const spotId = spot.id;
    
    const user = await User.findOne({
      where:{
        firstName: 'Daenerys'
      }
    })

    const userId = user.id;
    const booking = await Booking.findOne({
      where:{
        spotId,
        userId,
        startDate: '2024-05-23',
        endDate: '2024-05-24'
      }
    })

    return await booking.destroy();


  }
};
