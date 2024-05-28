const {
    ownerNames,
    addresses,
    cities,
    states,
    countries,
    lats,
    lngs,
    spotNames,
    prices,
    descriptions
  } = require('/Users/admin/Developer/aa-backend-portfolio-proj/backend/data/airbnb-clone-spots-generator.js')


  const { User } = require('../db/models');


/** @type {import('sequelize-cli').Migration} */

  let createSpots = async()=>{
    const spotsArr = [];

    for(let i=0; i<20; i++){

        let user = await User.findOne({
          where: {firstName: `${ownerNames[i]}`}
      })
    
      const ownerId = user.id;
    
      const address = addresses[i];
    
      const city = cities[i];
    
      const state = states[i];
    
      const country = countries[i]
    
      const lat = lats[i];
    
    const lng = lngs[i];
    
    const name = spotNames[i];
    
    const description = descriptions[i]
    
      const price = prices[i];
    
    const newSpot = {
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
    }
    

    spotsArr.push(newSpot)

  
      }

      console.log("spotsArr", spotsArr);
      return;
}
  
createSpots();