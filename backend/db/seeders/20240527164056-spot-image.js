'use strict';

const { SpotImage } = require('../models')

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

await SpotImage.create({
  spotId: 1,
  url: "https://i0.wp.com/static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2016/06/27/03/jon-stark-targaryen.jpg",
  preview: true
})

return;

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    let imageToDelete = await SpotImage.findByPk({
      where:{
        spotId: 1
      }
    });

    await imageToDelete.destroy();

  }
};
