'use strict';

const { ReviewImage, Review } = require('../models')

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

   

  await ReviewImage.create(
      {
        reviewId: await Review.findAll().then(value => value[0].id),
        url: "https://www.deandrevidale.com/wp-content/uploads/Woman-at-Jouvert-in-VR-exhibit-headset-scaled-e1697833475153.jpg"
      }
    )


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    let imageToDelete = await ReviewImage.findAll().then(value => value[0])

    await imageToDelete.destroy();
    return;

  }
};
