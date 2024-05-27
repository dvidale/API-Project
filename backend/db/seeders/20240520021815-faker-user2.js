'use strict';

const { User } = require('../models');
// const bcrypt = require("bcryptjs");

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
          firstName: 'Stannis',
          lastName: 'Baratheon',
          username: 'StannisB',
          email: 'stannis.b@thronemail.com',
          hashedPassword: '$2a$10$MH0dxoDZFBuOYb5CXOxNKOz8lOVNxQEqaOxwUlahFKlE9ZoWqwVOK'
        },
        {
          firstName: 'Lysa',
          lastName: 'Arryn',
          username: 'LysaA',
          email: 'lysa.a@thronemail.com',
          hashedPassword: '$2a$10$YVfIrUieRG4SW69SYYB32.Jx11q5FOtE8jxFUvcL96nATlpMvC1OG'
        },
        {
          firstName: 'Margaery',
          lastName: 'Tyrell',
          username: 'MargaeryT',
          email: 'margaery.t@thronemail.com',
          hashedPassword: '$2a$10$geILL1EaCfMRkBCufegGNuFlg7Z4gqoSMGPfFTJQMn8Qp5pPQTqEG'
        },
        {
          firstName: 'Archmaester',
          lastName: 'Ebrose',
          username: 'ArchmaesterE',
          email: 'archmaester.e@thronemail.com',
          hashedPassword: '$2a$10$K/jhOddfKEvpcGk7VSCvb./SvAs0ItIE2ZFDebycdLINzetALfYPi'
        },
        {
          firstName: 'Oberyn',
          lastName: 'Martell',
          username: 'OberynM',
          email: 'oberyn.m@thronemail.com',
          hashedPassword: '$2a$10$J31Ff.fe32LZ6P9BASsgpefBKTnFBEbF31DB28YhG8K1j5bQTH6KW'
        },
        {
          firstName: 'Ellaria',
          lastName: 'Sand',
          username: 'EllariaS',
          email: 'ellaria.s@thronemail.com',
          hashedPassword: '$2a$10$buGqVu69YY9YB6Ptr2hsDeHEsPARfdsmpHGlSLSm/egKpeotTkiU2'
        },
        {
          firstName: 'Jaqen',
          lastName: "H'ghar",
          username: 'JaqenH',
          email: 'jaqen.h@thronemail.com',
          hashedPassword: '$2a$10$gVHbkGdAvK2HFWzmXtbTHej8kB7HNVu4q0M4nyBGyVem3.ogdtWqy'
        },
        {
          firstName: 'Daario',
          lastName: 'Naharis',
          username: 'DaarioN',
          email: 'daario.n@thronemail.com',
          hashedPassword: '$2a$10$WX8f44JD4DVJbD4OT5ElGObm6VLcXuG290SJjD8haSbFnEZaNA8Ue'
        },
        {
          firstName: 'Xaro',
          lastName: 'Xhoan Daxos',
          username: 'XaroX',
          email: 'xaro.x@thronemail.com',
          hashedPassword: '$2a$10$BsnLtmW0aQu15B7iowylxuGwLGVafLzKDs2hAr0KtqSmcTqH0G81W'
        },
        {
          firstName: 'Missandei',
          lastName: 'of Astapor',
          username: 'MissandeiO',
          email: 'missandei.o@thronemail.com',
          hashedPassword: '$2a$10$cmrRWa26KScTLTLRjLHLH.Y0.6gue4v4c9NV4W7lqfIwrreAKCfwq'
        },
        {
          firstName: 'Razdal',
          lastName: 'mo Eraz',
          username: 'RazdalM',
          email: 'razdal.m@thronemail.com',
          hashedPassword: '$2a$10$W5B2P8u.SSn8Wbk.cLa9EeE0A8.pgxG1iDY2go5ddzZziFAWLVd2C'
        },
        {
          firstName: 'Khal',
          lastName: 'Drogo',
          username: 'KhalD',
          email: 'khal.d@thronemail.com',
          hashedPassword: '$2a$10$eb6kdToEWz4eGlCWHM1gUukmZDU0VojnBLmNdy48usMcl.OpKpAW.'
        }
      
      ],
      {
        validate: true});

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
      firstName: { [Op.in]: ["Stannis", "Lysa", "Margaery", "Archmaester", "Oberyn", "Ellaria", "Jaqen", "Daario", "Xaro", "Missandei", "Razdal", "Khal"
    ] }
    }, {});


  }
};
