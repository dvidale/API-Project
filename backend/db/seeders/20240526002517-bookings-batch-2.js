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

//iterate through every spot to create a booking for it

const allSpots = await Spot.findAll();

const allUsers = await User.findAll();

let alreadyBookedUsers = new Set()

for(let spot of allSpots){
//pick a random user to book the spot, who is NOT the owner
let spotId = spot.id;

let randomUserId = allUsers[Math.floor(Math.random()*(allUsers.length-1))].id;

let userId = randomUserId 

while(alreadyBookedUsers.has(userId) === true || userId === spot.ownerId){

  userId = allUsers[Math.floor(Math.random()*(allUsers.length-1))].id;
  
  // if(userId === spot.ownerId){
  //   userId = allUsers[Math.floor(Math.random()*(allUsers.length-1))].id
  // }

}
alreadyBookedUsers.add(userId);


// console.log("users booked", alreadyBookedUsers)

//create the booking with selected spot and user

await Booking.create({
  spotId,
  userId,
  startDate: 'May 25, 2024',
  endDate: 'May 26, 2024'
})

// set the start date to today, and end date to tomorrow

}

return;

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     // run a query to find the first 20 bookings
    // delete the bookings found

    const bookingBatchTwo = await Booking.findAll({
      offset:21,
      limit: 20
    })

    for(let booking of bookingBatchTwo){
      await booking.destroy();

    }

    return;





  }
};
