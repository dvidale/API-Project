'use strict';

const { SpotImage, Spot } = require('../models')

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

let spots = await Spot.findAll()
let url ='https://www.pexels.com/photo/photo-of-castle-1130256/'

let i=0
while (i < spots.length) {
  await SpotImage.bulkCreate([

    {
      spotId: spots[i].id,
      url,
      preview: true
    },
    {
      spotId: spots[i].id,
      url,
      preview: false
    },
    {
      spotId: spots[i].id,
      url,
      preview: false
    },
    {
      spotId: spots[i].id,
      url,
      preview: false
    },
    {
      spotId: spots[i].id,
      url,
      preview: false
    }
  
  
  ]
   
  )

  i++
}


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
