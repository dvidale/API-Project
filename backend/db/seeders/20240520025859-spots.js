'use strict';

const { Spot, User } = require('../models');

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

    // find the id of the owner from the array of owners
    // match the owner name to a user in the db
    // target that user's  id
    // assign it to the owner id for the spot

    const ownerNames = [
      "Jon", "Cersei", "Eddard", "Samwell", "Daenerys", "Stannis", "Catelyn", "Lysa", "Theon", "Margaery", "Archmaester", "Oberyn", "Ellaria", "Jaqen", "Daario", "Xaro", "Missandei", "Razdal", "Khal", "Arya"
    ];

 

  
    
  // let userId = await User.findOne({where:{firstName: "Jon"}}).then(value => value.id);

    
    
await Spot.bulkCreate([
  {

    ownerId: await User.findOne({where:{firstName: `${ownerNames[0]}`}}).then(value => value.id),
    address: 'The North, Westeros',
    city: 'Winterfell',
    state: 'The North',
    country: 'Westeros',
    lat: -34.6037,
    lng: -58.3816,
    name: 'Winterfell',
    description: 'Experience the historic grandeur of Winterfell, the ancient seat of House Stark. Nestled in the heart of the North, this sprawling castle offers a blend of rustic charm and medieval elegance. Enjoy cozy fireplaces, stunning winter landscapes, and a rich history at every turn. Perfect for those seeking a secluded retreat with a touch of noble heritage.',
    price: 250
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[1]}`}}).then(value => value.id),
    address: 'Crownlands, Westeros',
    city: "King's Landing",
    state: 'Crownlands',
    country: 'Westeros',
    lat: 40.7128,
    lng: -74.006,
    name: "King's Landing",
    description: "Stay in the bustling capital of Westeros at King's Landing. This vibrant city offers luxurious accommodations with stunning views of the Blackwater Bay and the Red Keep. Explore the lively markets, grandiose architecture, and political intrigue. Ideal for those who love the hustle and bustle of city life combined with historical splendor.",
    price: 300
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[2]}`}}).then(value => value.id),
    address: 'Northern border of The North, Westeros',
    city: 'The Wall',
    state: 'The North',
    country: 'Westeros',
    lat: 51.5074,
    lng: -0.1276,
    name: 'The Wall',
    description: 'For the adventurous traveler, The Wall offers a unique stay at the edge of the known world. Towering above the northern wilderness, this ancient fortification provides breathtaking views and a sense of awe. Experience the rugged beauty of the North and the thrill of being on the frontier. Perfect for thrill-seekers and history buffs.',
    price: 450
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[3]}`}}).then(value => value.id),
    address: 'The Wall, The North, Westeros',
    city: 'Castle Black',
    state: 'The North',
    country: 'Westeros',
    lat: 35.6895,
    lng: 139.6917,
    name: 'Castle Black',
    description: "Discover the rugged charm of Castle Black, the stronghold of the Night's Watch. Located at the foot of The Wall, this fortress offers a spartan yet historic stay. Enjoy the camaraderie of the Night's Watch brothers, the simplicity of the accommodations, and the majestic northern scenery. Ideal for those looking for a no-frills, authentic experience.",
    price: 400
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[4]}`}}).then(value => value.id),
    address: 'Blackwater Bay, Crownlands, Westeros',
    city: 'Dragonstone',
    state: 'Crownlands',
    country: 'Westeros',
    lat: 48.8566,
    lng: 2.3522,
    name: 'Dragonstone',
    description: 'Experience the mystical allure of Dragonstone, an ancient castle perched on a volcanic island. Known for its dragon-forged architecture and dramatic views of the sea, this location offers a blend of mystery and majesty. Perfect for those seeking solitude, inspiration, and a connection to the rich history of House Targaryen.',
    price: 350
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[5]}`}}).then(value => value.id),
    address: 'Stormlands, Westeros',
    city: "Storm's End",
    state: 'Stormlands',
    country: 'Westeros',
    lat: 37.7749,
    lng: -122.4194,
    name: "Storm's End",
    description: "Enjoy the rugged beauty of Storm's End, a castle famed for its impenetrable walls and stunning coastal views. Located in the Stormlands, this fortress offers a blend of comfort and history. Perfect for those who appreciate the power of nature and the strength of ancient architecture. Ideal for history enthusiasts and nature lovers.",
    price: 500
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[6]}`}}).then(value => value.id),
    address: 'The Riverlands, Westeros',
    city: 'Riverrun',
    state: 'The Riverlands',
    country: 'Westeros',
    lat: -33.8688,
    lng: 151.2093,
    name: 'Riverrun',
    description: 'Stay at Riverrun, a picturesque castle nestled at the confluence of the Red Fork and the Tumblestone River. Known for its strategic beauty and lush surroundings, this castle offers a peaceful retreat with a rich history. Perfect for those who enjoy scenic views, water activities, and a serene atmosphere. Ideal for families and couples.',
    price: 250
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[7]}`}}).then(value => value.id),
    address: 'The Vale, Westeros',
    city: 'The Eyrie',
    state: 'The Vale',
    country: 'Westeros',
    lat: 55.7558,
    lng: 37.6173,
    name: 'The Eyrie',
    description: 'Perched high in the mountains, The Eyrie offers breathtaking views and a sense of tranquility. This sky-high castle is known for its dramatic location and pristine beauty. Enjoy the peace and solitude of the Vale, with luxurious accommodations and unparalleled scenery. Perfect for those seeking an escape from the world below.',
    price: 200
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[8]}`}}).then(value => value.id),
    address: 'Iron Islands, Westeros',
    city: 'Pyke',
    state: 'Iron Islands',
    country: 'Westeros',
    lat: 52.52,
    lng: 13.405,
    name: 'Pyke',
    description: 'Experience the rugged, sea-faring life at Pyke, the stronghold of House Greyjoy. Located on the Iron Islands, this castle offers dramatic coastal views and a taste of the ironborn culture. Enjoy the crashing waves, salty air, and austere beauty of this island fortress. Perfect for adventurers and those seeking a unique, maritime experience.',
    price: 450
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[9]}`}}).then(value => value.id),
    address: 'The Reach, Westeros',
    city: 'Highgarden',
    state: 'The Reach',
    country: 'Westeros',
    lat: 34.0522,
    lng: -118.2437,
    name: 'Highgarden',
    description: 'Stay at Highgarden, the lush and elegant seat of House Tyrell. Located in the fertile lands of The Reach, this castle is known for its beautiful gardens, opulent interiors, and warm climate. Enjoy the finest in hospitality, stunning landscapes, and a touch of aristocratic luxury. Perfect for those seeking a tranquil and luxurious retreat.',
    price: 300
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[10]}`}}).then(value => value.id),
    address: 'The Reach, Westeros',
    city: 'Oldtown',
    state: 'The Reach',
    country: 'Westeros',
    lat: 19.4326,
    lng: -99.1332,
    name: 'Oldtown',
    description: 'Discover the ancient and scholarly charm of Oldtown, home to the Citadel. This historic city offers beautiful architecture, rich history, and a vibrant cultural scene. Perfect for those who love exploring old cities, visiting libraries, and immersing themselves in knowledge. Ideal for history buffs and academic explorers.',
    price: 200
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[11]}`}}).then(value => value.id),
    address: 'Southern Westeros',
    city: 'Dorne',
    state: 'Dorne',
    country: 'Westeros',
    lat: -22.9068,
    lng: -43.1729,
    name: 'Dorne',
    description: 'Enjoy the sun-soaked paradise of Dorne, known for its warm climate, beautiful landscapes, and vibrant culture. This southern region offers luxurious accommodations, stunning views, and a rich blend of traditions. Perfect for those seeking a warm, exotic escape with plenty of history and beauty. Ideal for sun-seekers and cultural enthusiasts.',
    price: 400
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[12]}`}}).then(value => value.id),
    address: 'Dorne, Westeros',
    city: 'Sunspear',
    state: 'Dorne',
    country: 'Westeros',
    lat: 1.3521,
    lng: 103.8198,
    name: 'Sunspear',
    description: 'Experience the exotic allure of Sunspear, the capital of Dorne. This coastal fortress offers stunning sea views, vibrant culture, and luxurious accommodations. Enjoy the warmth of the southern sun, the rich history, and the unique blend of Dornish traditions. Perfect for those seeking a tropical getaway with a touch of nobility.',
    price: 350
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[13]}`}}).then(value => value.id),
    address: 'Essos',
    city: 'Braavos',
    state: 'Essos',
    country: 'Essos',
    lat: -1.2864,
    lng: 36.8219,
    name: 'Braavos',
    description: 'Stay in the Free City of Braavos, known for its canals, vibrant markets, and the majestic Titan statue. This cosmopolitan city offers a blend of cultures, rich history, and beautiful architecture. Enjoy the bustling life of the city, the scenic waterways, and the diverse culinary delights. Perfect for those seeking adventure and cultural immersion.',
    price: 250
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[14]}`}}).then(value => value.id),
    address: "Slaver's Bay, Essos",
    city: 'Meereen',
    state: 'Essos',
    country: 'Essos',
    lat: -34.9285,
    lng: 138.6007,
    name: 'Meereen',
    description: "Discover the ancient city of Meereen, a place of history and transformation. This city offers a unique blend of old and new, with grand pyramids, bustling markets, and a rich cultural heritage. Enjoy the warmth of Slaver's Bay, the fascinating history, and the vibrant city life. Perfect for those seeking a mix of adventure and history.",
    price: 450
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[15]}`}}).then(value => value.id),
    address: 'Southeast coast of Essos',
    city: 'Qarth',
    state: 'Essos',
    country: 'Essos',
    lat: 59.3293,
    lng: 18.0686,
    name: 'Qarth',
    description: 'Experience the exotic splendor of Qarth, known as the greatest city that ever was or will be. This coastal city offers luxurious accommodations, vibrant markets, and a rich cultural tapestry. Enjoy the warm climate, stunning sea views, and the diverse traditions. Perfect for those seeking a luxurious and culturally rich getaway.',
    price: 500
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[16]}`}}).then(value => value.id),
    address: "Slaver's Bay, Essos",
    city: 'Astapor',
    state: 'Essos',
    country: 'Essos',
    lat: 41.9028,
    lng: 12.4964,
    name: 'Astapor',
    description: "Stay in Astapor, a city known for its ancient architecture and rich history. Located on the coast of Slaver's Bay, this city offers beautiful views, warm weather, and a fascinating cultural heritage. Enjoy the blend of old-world charm and coastal beauty. Perfect for those seeking an adventurous and historical experience.",
    price: 300
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[17]}`}}).then(value => value.id),
    address: "Slaver's Bay, Essos",
    city: 'Yunkai',
    state: 'Essos',
    country: 'Essos',
    lat: 31.2304,
    lng: 121.4737,
    name: 'Yunkai',
    description: "Discover Yunkai, the Yellow City, known for its golden pyramids and rich history. This coastal city offers a unique blend of luxury and tradition, with stunning views of Slaver's Bay and a warm climate. Enjoy the vibrant markets, historical sites, and luxurious accommodations. Perfect for those seeking a blend of history and comfort.",
    price: 350
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[18]}`}}).then(value => value.id),
    address: 'Central Essos',
    city: 'Vaes Dothrak',
    state: 'Essos',
    country: 'Essos',
    lat: -26.2041,
    lng: 28.0473,
    name: 'Vaes Dothrak',
    description: 'Experience the nomadic culture of the Dothraki at Vaes Dothrak. This unique city offers a blend of tradition and simplicity, with sprawling open spaces and a strong cultural heritage. Enjoy the vast plains, traditional feasts, and the sense of community. Perfect for those seeking an authentic and adventurous stay.',
    price: 200
  },
  {
    ownerId: await User.findOne({where:{firstName: `${ownerNames[19]}`}}).then(value => value.id),
    address: 'The Riverlands, Westeros',
    city: 'Harrenhal',
    state: 'The Riverlands',
    country: 'Westeros',
    lat: 60.1695,
    lng: 24.941,
    name: 'Harrenhal',
    description: 'Stay at the hauntingly beautiful Harrenhal, the largest castle in Westeros. Known for its massive size and eerie history, this fortress offers a unique and atmospheric stay. Explore the ruined towers, expansive grounds, and the rich lore of the Riverlands. Perfect for those seeking a dramatic and historical retreat.',
    price: 400
  }


])

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

    const spotNames = [
      "Winterfell", "King's Landing", "The Wall", "Castle Black", "Dragonstone", "Storm's End", "Riverrun", "The Eyrie", "Pyke", "Highgarden", "Oldtown", "Dorne", "Sunspear", "Braavos", "Meereen", "Qarth", "Astapor", "Yunkai", "Vaes Dothrak", "Harrenhal"
  ]
  
    return await queryInterface.bulkDelete(options, {
      name: { [Op.in]: spotNames }
    }, {});


  }
};
