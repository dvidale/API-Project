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
    firstName: 'Jon',
    lastName: 'Snow',
    username: 'JonS',
    email: 'jon.s@thronemail.com',
    hashedPassword: '$2a$10$LTj1FJcreQK6StvWxQj6JO.RRwf2KY5Ml4AQHQK.l1jlqcT60BHqG'
  },
  {
    firstName: 'Daenerys',
    lastName: 'Targaryen',
    username: 'DaenerysT',
    email: 'daenerys.t@thronemail.com',
    hashedPassword: '$2a$10$vrf/Ynb3LkDQ82/tRndCve2Y83mtmuksciw2/oc.nwQwWXDWAy6wu'
  },
  {
    firstName: 'Tyrion',
    lastName: 'Lannister',
    username: 'TyrionL',
    email: 'tyrion.l@thronemail.com',
    hashedPassword: '$2a$10$ckFz1sl3.mB6odi7k4vjxeRy8rpoma4hgzaiZXjHV3f24ga1Qlw4S'
  },
  {
    firstName: 'Cersei',
    lastName: 'Lannister',
    username: 'CerseiL',
    email: 'cersei.l@thronemail.com',
    hashedPassword: '$2a$10$OWXYDc/vXRPEu2ne6.Nc5O3V/uMVgY5ieHDM5MoK0SbCi.ZptqFTO'
  },
  {
    firstName: 'Jaime',
    lastName: 'Lannister',
    username: 'JaimeL',
    email: 'jaime.l@thronemail.com',
    hashedPassword: '$2a$10$foPQXPDum/SxUo0Dp/.sJO.kJ1xUZF6oYwFiWbVCewe23p9LO42IG'
  },
  {
    firstName: 'Sansa',
    lastName: 'Stark',
    username: 'SansaS',
    email: 'sansa.s@thronemail.com',
    hashedPassword: '$2a$10$CIUQlcGvkYwHKMWqg4qo6e/aERrWdojwj2gNPOPw1.4OeWYi2YCNG'
  },
  {
    firstName: 'Arya',
    lastName: 'Stark',
    username: 'AryaS',
    email: 'arya.s@thronemail.com',
    hashedPassword: '$2a$10$QUKfTZczq8nyv5Ee/kcM8etAHrMOKsIJrXy9fziELyG7ifvdFpsum'
  },
  {
    firstName: 'Bran',
    lastName: 'Stark',
    username: 'BranS',
    email: 'bran.s@thronemail.com',
    hashedPassword: '$2a$10$Xe8ylRBpNv7SLBqmFciSWuEtYHcMQd3/9/yMOXw5riNLjfa.3Afi6'
  },
  {
    firstName: 'Eddard',
    lastName: 'Stark',
    username: 'EddardS',
    email: 'eddard.s@thronemail.com',
    hashedPassword: '$2a$10$vKlWXcKEJMCroZRtOeq51OoAwRiyB8g.DTj3IFEoyowzpAkThm9za'
  },
  {
    firstName: 'Catelyn',
    lastName: 'Stark',
    username: 'CatelynS',
    email: 'catelyn.s@thronemail.com',
    hashedPassword: '$2a$10$v.myJJB12k8qOJjogcgFeuDzfF8UHxRUVf7NvX1TPG4ipya3y5XUS'
  },
  {
    firstName: 'Robb',
    lastName: 'Stark',
    username: 'RobbS',
    email: 'robb.s@thronemail.com',
    hashedPassword: '$2a$10$ARBePQeFbPgVkKTw/mUZ9uEP2aMsQhZx4ZPPR.jYlPGKFYRULdZfS'
  },
  {
    firstName: 'Joffrey',
    lastName: 'Baratheon',
    username: 'JoffreyB',
    email: 'joffrey.b@thronemail.com',
    hashedPassword: '$2a$10$T8nQGJ5H1g1JZW0C9Dx7qem39.xpD8.7/SMpON4hIANiop9if3v6S'
  },
  {
    firstName: 'Sandor',
    lastName: 'Clegane',
    username: 'SandorC',
    email: 'sandor.c@thronemail.com',
    hashedPassword: '$2a$10$zFW3zW.pCiSrwqV/9mBDuOORTUHSp7eVBgOJlVVD0yW6k3HrFgHAi'
  },
  {
    firstName: 'Petyr',
    lastName: 'Baelish',
    username: 'PetyrB',
    email: 'petyr.b@thronemail.com',
    hashedPassword: '$2a$10$vY4nd.BhF7uhzZJNnvkaMerxFqLC.2ohxm6B8n8cvQzcZEG7kEFK.'
  },
  {
    firstName: 'Varys',
    lastName: 'the Eunuch',
    username: 'VarysT',
    email: 'varys.t@thronemail.com',
    hashedPassword: '$2a$10$5ev.319AK5itDZnjslewe.zrOwoYBl2SiEfUJ476pK8IWYfNx5M/S'
  },
  {
    firstName: 'Brienne',
    lastName: 'of Tarth',
    username: 'BrienneO',
    email: 'brienne.o@thronemail.com',
    hashedPassword: '$2a$10$ol1oajFLNLzgHE7GPy9CbOgQ/d5yKpfV9C.p7461wMNipaeZlXgLS'
  },
  {
    firstName: 'Davos',
    lastName: 'Seaworth',
    username: 'DavosS',
    email: 'davos.s@thronemail.com',
    hashedPassword: '$2a$10$ebbV1.CfY6BylAT6e3g5kuKGfbKIVODiGqbu6mfP3ofkhYnBWt7MC'
  },
  {
    firstName: 'Samwell',
    lastName: 'Tarly',
    username: 'SamwellT',
    email: 'samwell.t@thronemail.com',
    hashedPassword: '$2a$10$lGSeurVQW6ETGoDjDdeLrOM284RbTH2XFIhz7UoSo2zu4Key21JHK'
  },
  {
    firstName: 'Theon',
    lastName: 'Greyjoy',
    username: 'TheonG',
    email: 'theon.g@thronemail.com',
    hashedPassword: '$2a$10$wgqirFp32GrAX1JtfspXfOH5ZNCzLIfH8m8q/rzBsswwkhTe01W1i'
  },
  {
    firstName: 'Melisandre',
    lastName: 'the Red Priestess',
    username: 'MelisandreT',
    email: 'melisandre.t@thronemail.com',
    hashedPassword: '$2a$10$alHtXQTEOqtorB7Ov9pGA.AjhBhBS5l27FI07P9xcUhFuFZ7m3WX6'
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
      firstName: { [Op.in]: ["Jon", "Daenerys", "Tyrion", "Cersei", "Jaime", "Sansa", "Arya", "Bran", "Eddard", "Catelyn", "Robb", "Joffrey", "Sandor", "Petyr", "Varys", "Brienne", "Davos", "Samwell", "Theon", "Melisandre"
    ] }
    }, {});
  
  }
};
