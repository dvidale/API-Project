
const express = require('express')
// const { environment } = require('./config');
const faker = require('@faker-js/faker')
// const {
//     Model
//   } = require('sequelize');
  require('dotenv').config();
const {Spot, User, Booking} = require('../db/models')
const Models = require('../db/models')

// const User = require('../db/models')
// const Booking = require('../db/models')

console.log("Spot", Spot);
console.log("User", User);
console.log("Models", Models.sequelize.ModelManager.models);

/*
booking object:

{
    id,
    spotId,
    userId,
    startDate,
    endDate,
    createdAt,
    updatedAt
}
*/

/*
booking for Winterfell by Eddard Stark
{
    spotId: 22,
    userId: 47,
    startDate,
    endDate,
}

to make two bookings for each spot:


1. run a query to dynamically create an array of all the spots


2. iterate through the spots twice and set their id on the booking object
3. run a query to create an array of all the users
4. randomly select a user by index number
5. if the selected user is not the spot owner, set the user as the booking user's id
6. if the selected user IS the spot owner, run the randomization again and set the selected user's id as the booking user
7. Use faker to randomly pick a start date
8. Set that start date on the booking object
9. Use faker to randomly pick an end date no more than two weeks after the start date


*/

let bookingGenerator = async ()=>{

    let allTheSpots = await Spot.findAll({
        attributes: ['id', 'ownerId']
})

let bookingBatch = allTheSpots.length * 2;

let allUsers = await User.findAll({
    attributes: ['id']
})



let newBookings = []

for(let i = 0; i < bookingBatch; i++){

    let spotId = allTheSpots[i].id;

    let bookingUserId = allUsers[(Math.floor(Math.random(allUsers.length)))];
    
    let userId;
    
    if(bookingUserId !== allTheSpots[i].ownerId){
        userId = bookingUserId
    }else{
        userId = allUsers[(Math.floor(Math.random(allUsers.length)))];
    }
    
    let startDate = faker.date.between({from: '2024-05-20', to: '2025-05-20'})

    let endDate = faker.date.soon({
        refDate: startDate,
        days: 14
    })




    let newBooking = {
    spotId,
    userId,
    startDate,
    endDate,
    }


    newBookings.push(newBooking)
}

console.log("newBookings", newBookings);


}

// bookingGenerator();