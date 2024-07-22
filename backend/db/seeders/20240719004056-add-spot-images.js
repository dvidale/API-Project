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
   let urls = [
    'https://i.pinimg.com/564x/34/0a/86/340a864c640dcb54f32ed9b051ccd97a.jpg',
  'https://assets.vogue.com/photos/598dacb5f0b0e21484d342ba/master/w_2240,c_limit/00-lede-a-game-of-thrones-guide-to-dubrovnik-croatia.jpg',
  'https://howardwilliamsblog.wordpress.com/wp-content/uploads/2020/09/5b8a1b37dd99951592ac613a927222db.jpg',
  'https://static.wikia.nocookie.net/gameofthrones/images/7/7b/Castle_Black.jpg',
  'https://www.movieworldmap.com/content/images/Game-of-Thrones-season-7-The-Stairs-to-Dragonstone-Castle-3-movieworldmap.com_.jpg',
  'https://awoiaf.westeros.org/images/7/7e/Loganfeliciano_storms_end.jpg',
  'https://cdnb.artstation.com/p/assets/images/images/002/913/933/large/kieran-belshaw-riverrun-drawbridgetower-v011a.jpg',
'https://static.wikia.nocookie.net/ironthronerp/images/7/74/Eyrie.jpg',
'https://wallpapers.com/images/high/hd-pyke-castle-of-game-of-thrones-gg54fk3rmzt2trbb.webp',
'https://cdn.mos.cms.futurecdn.net/9HaqnzjtTZP6ussuAvBGi8-1920-80.jpg.webp',
'https://c7.alamy.com/comp/WXT213/old-town-dubrovnik-croatia-in-the-summer-also-known-as-kings-landing-from-game-of-thrones-WXT213.jpg',
'https://media.cntraveler.com/photos/5718fc273658675c4f786709/16:9/w_2240,c_limit/game-of-thrones-alazar-of-seville-02-cr-alamy-EHD2RD.jpg',
'https://pm1.aminoapps.com/6053/817fc91bef3c7062246778973ba873c050066879_hq.jpg',
'https://static.wikia.nocookie.net/awoiaf-rp/images/f/fc/Braavos.jpg',
'https://static.wikia.nocookie.net/gotascent/images/f/fd/World_Meereen.jpg',
'https://untappedcities.com/wp-content/uploads/2015/06/Minceta-Fortress-House-of-the-Undying-Qarth-Game-of-Thrones-Filming-Locations-Dubrovnik-Croatia-.jpg',
'https://static.wikia.nocookie.net/gameofthrones/images/2/2c/Harpy_astapor.jpg',
'https://static.wikia.nocookie.net/ironthroneroleplaygame/images/d/d0/Yunkai.jpg',
'https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/0/0d/Dothrakhorses.jpg',
'https://imgix.ranker.com/user_node_img/50025/1000497969/original/harrenhal-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=650']

let spots = await Spot.findAll()


let i=0
while (i < spots.length) {
  await SpotImage.bulkCreate([

    {
      spotId: spots[i].id,
      url: urls[i],
      preview: true
    },
    {
      spotId: spots[i].id,
      url: urls[i],
      preview: false
    },
    {
      spotId: spots[i].id,
      url: urls[i],
      preview: false
    },
    {
      spotId: spots[i].id,
      url: urls[i],
      preview: false
    },
    {
      spotId: spots[i].id,
      url: urls[i],
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
