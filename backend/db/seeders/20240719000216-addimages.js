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

let url = './kings-landing.jpg'

    let spots = await Spot.findAll()

    spots.forEach(spot =>    
      SpotImage.create({
        spotId: spot.id,
        url,
        preview: true
      })
    )

for(let i = 1; i <= 4; i++ ){

  spots.forEach(spot =>    
    SpotImage.create({
      spotId: spot.id,
      url,
      preview: false
    })
  )

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
