'use strict';

const { Spot, User } = require('../models');

const { faker } = require('@faker-js/faker');

const {
  ownerNames,
  addresses,
  cities,
  states,
  countries,
  spotNames,
  descriptions
} = require('/Users/admin/Developer/aa-backend-portfolio-proj/backend/data/airbnb-clone-spots-generator.js')

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

    for(let i=0; i<20; i++){

      let user = await User.findOne({
        where: {firstName: `${ownerNames[i]}`}
    })

    const ownerId = user.id;

    const address = addresses[i];

    const city = cities[i];

    const state = states[i];

    const country = countries[i]

    let lat = faker.location.latitude();

let lng = faker.location.longitude();

const name = spotNames[i];

const description = descriptions[i]

    let price = `${faker.finance.amount({min: 20, max:50, dec:0})}0`

const newSpot = await Spot.build({
  ownerId,
  address,
  city,
  state,
  country,
  lat,
  lng,
  name,
  description,
  price
})

await newSpot.validate()

await newSpot.save()

    }



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      name: { [Op.in]: spotNames }
    }, {});


  }
};
