'use strict';

const {Review, Booking} = require('../models');

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
    //create reviews associated with each booked spot's spotId and userId

  let allBookings = await Booking.findAll()

  await Review.bulkCreate([
    {
      spotId: allBookings[1].spotId,
      userId: allBookings[1].userId,
      review: "Staying at Winterfell was a magical experience. The ancient stone walls and cozy fireplaces provided a warm and welcoming atmosphere, perfect for a winter retreat. The staff was attentive, and the historical charm of the castle made for a memorable stay. The surrounding snow-covered landscape added to the enchantment. Highly recommend for anyone seeking a serene, historical getaway.",
      stars: 5,
  
    },
    {
      spotId: allBookings[2].spotId,
      userId: allBookings[2].userId,
      review: "My stay in King's Landing was both thrilling and luxurious. The view of the Red Keep and the bustling city was fantastic. The accommodations were opulent, and the rich history of the capital was palpable. The vibrant city life and political intrigue made for an exciting experience. Perfect for those who love the hustle and bustle of a historical city.",
      stars: 4,
  
    },
    {
      spotId: allBookings[3].spotId,
      userId: allBookings[3].userId,
      review: "Staying at The Wall was a unique adventure. The towering structure and breathtaking views of the northern wilderness were awe-inspiring. The accommodations were basic but comfortable, offering a true sense of rugged frontier life. This stay is ideal for those seeking an extraordinary and historic experience.",
      stars: 4,
  
    },
    {
      spotId: allBookings[4].spotId,
      userId: allBookings[4].userId,
      review: "My stay at Castle Black was stark and authentic. The camaraderie among the Night's Watch was a highlight, and the simple yet historic accommodations provided a true taste of life at the Wall. The harsh northern environment added to the authenticity. Perfect for those seeking a no-frills, immersive experience.",
      stars: 3,
  
    },
    {
      spotId: allBookings[5].spotId,
      userId: allBookings[5].userId,
      review: "Dragonstone was a mystical and majestic stay. The dragon-forged architecture and dramatic sea views were stunning. The solitude and historical significance of the castle made for a peaceful and inspiring retreat. Perfect for those seeking tranquility and a deep connection to Westeros' rich history.",
      stars: 5,
  
    },
    {
      spotId: allBookings[6].spotId,
      userId: allBookings[6].userId,
      review: "Storm's End offered a rugged and impressive stay. The impenetrable walls and coastal views were awe-inspiring. The blend of comfort and historical ambiance was well-balanced. This fortress is perfect for those who appreciate powerful architecture and the beauty of nature's forces.",
      stars: 4,
  
    },
    {
      spotId: allBookings[7].spotId,
      userId: allBookings[7].userId,
      review: "Riverrun was a picturesque and peaceful retreat. The lush surroundings and strategic beauty of the castle provided a serene atmosphere. The accommodations were comfortable, and the river views were delightful. Ideal for those seeking a scenic and tranquil getaway.",
      stars: 4,
  
    },
    {
      spotId: allBookings[8].spotId,
      userId: allBookings[8].userId,
      review: "The Eyrie offered breathtaking views and tranquility. Perched high in the mountains, the sense of peace and isolation was unparalleled. The luxurious accommodations and pristine beauty made for a perfect escape. Highly recommend for those seeking serenity and stunning scenery.",
      stars: 5,
  
    },
    {
      spotId: allBookings[9].spotId,
      userId: allBookings[9].userId,
      review: "My stay at Pyke was rugged and maritime. The dramatic coastal views and austere beauty of the Iron Islands were captivating. The accommodations reflected the ironborn culture, providing a unique experience. Ideal for adventurers and those seeking a distinctive, sea-faring stay.",
      stars: 3,
  
    },
    {
      spotId: allBookings[10].spotId,
      userId: allBookings[10].userId,
      review: "Highgarden was a lush and elegant experience. The beautiful gardens and opulent interiors provided a luxurious stay. The warm climate and stunning landscapes were perfect for relaxation. Highly recommend for those seeking a tranquil and aristocratic retreat.",
      stars: 5,
  
    },
    {
      spotId: allBookings[11].spotId,
      userId: allBookings[11].userId,
      review: "Oldtown offered a historic and scholarly stay. The ancient architecture and rich cultural scene were fascinating. The accommodations were comfortable, and the vibrant city life was enjoyable. Perfect for history buffs and those who love exploring old cities.",
      stars: 4,
  
    },
    {
      spotId: allBookings[12].spotId,
      userId: allBookings[12].userId,
      review: "Dorne was a sun-soaked paradise. The warm climate and beautiful landscapes provided a luxurious escape. The vibrant culture and rich traditions added to the charm. Ideal for sun-seekers and cultural enthusiasts.",
      stars: 5,
  
    },
    {
      spotId: allBookings[13].spotId,
      userId: allBookings[13].userId,
      review: "Sunspear was an exotic and luxurious stay. The stunning sea views and vibrant Dornish culture were captivating. The accommodations were top-notch, offering a perfect blend of comfort and tradition. Highly recommend for those seeking a tropical, noble retreat.",
      stars: 3,
  
    },
    {
      spotId: allBookings[14].spotId,
      userId: allBookings[14].userId,
      review: "Braavos was a cosmopolitan and vibrant experience. The canals, markets, and majestic Titan statue provided a rich cultural tapestry. The accommodations were comfortable, and the city's diversity was refreshing. Perfect for adventurers and cultural explorers.",
      stars: 4,
  
    },
    {
      spotId: allBookings[15].spotId,
      userId: allBookings[15].userId,
      review: "Meereen offered a unique blend of history and transformation. The grand pyramids and bustling markets were fascinating. The accommodations were comfortable, and the city's warmth was inviting. Ideal for those seeking a mix of adventure and historical richness.",
      stars: 4,
  
    },
    {
      spotId: allBookings[16].spotId,
      userId: allBookings[16].userId,
      review: "Qarth was an exotic and luxurious escape. The vibrant markets, diverse traditions, and stunning sea views made for a splendid stay. The accommodations were opulent, providing a perfect blend of comfort and cultural richness. Highly recommend for a luxurious and culturally rich getaway.",
      stars: 5,
  
    },
    {
      spotId: allBookings[17].spotId,
      userId: allBookings[17].userId,
      review: "Astapor was a historic and coastal stay. The ancient architecture and warm weather provided a unique experience. The accommodations were comfortable, and the city's rich history was intriguing. Perfect for those seeking adventure and historical charm.",
      stars: 4,
  
    },
    {
      spotId: allBookings[18].spotId,
      userId: allBookings[18].userId,
      review: "Yunkai offered a blend of luxury and tradition. The golden pyramids and coastal views were stunning. The accommodations were luxurious, and the vibrant markets added to the charm. Ideal for those seeking a blend of history and comfort.",
      stars: 4,
  
    },
    {
      spotId: allBookings[19].spotId,
      userId: allBookings[19].userId,
      review: "Vaes Dothrak was an authentic and adventurous stay. The vast plains and strong cultural heritage of the Dothraki provided a unique experience. The accommodations were simple but true to tradition. Perfect for those seeking an immersive, nomadic experience.",
      stars: 3,
  
    },
    {
      spotId: allBookings[20].spotId,
      userId: allBookings[20].userId,
      review: "Harrenhal was a dramatic and historical stay. The massive ruins and eerie history provided a unique atmosphere. The accommodations were comfortable, offering a touch of the past. Ideal for those seeking a dramatic and historical retreat.",
      stars: 4,
  
    },
    {
      spotId: allBookings[21].spotId,
      userId: allBookings[21].userId,
      review: "Winterfell was historically rich but lacked some modern comforts. The ancient stone walls were charming, but the drafty rooms and basic amenities were a downside. The staff was helpful, but the remote location made it feel a bit isolated. Great for history enthusiasts, but not for those seeking luxury.",
      stars: 3,
  
    },
    {
      spotId: allBookings[22].spotId,
      userId: allBookings[22].userId,
      review: "King's Landing was vibrant but overcrowded. The historical sites were fascinating, but the noise and constant activity made it hard to relax. The accommodations were luxurious but expensive. Ideal for city lovers, but not for those seeking peace and quiet.",
      stars: 3,
  
    },
    {
      spotId: allBookings[23].spotId,
      userId: allBookings[23].userId,
      review: "Staying at The Wall was an adventure but very austere. The views were breathtaking, but the accommodations were extremely basic. The cold and harsh environment was challenging. Best for those seeking a rugged experience, but not for anyone looking for comfort.",
      stars: 3,
  
    },
    {
      spotId: allBookings[24].spotId,
      userId: allBookings[24].userId,
      review: "Castle Black offered an authentic experience but was very spartan. The camaraderie was nice, but the facilities were minimal and not very comfortable. The cold weather added to the starkness. Good for those wanting an immersive experience, but not for comfort seekers.",
      stars: 2,
  
    },
    {
      spotId: allBookings[25].spotId,
      userId: allBookings[25].userId,
      review: "Dragonstone was mystical but remote. The architecture was stunning, but the castle felt isolated and the weather was often harsh. The accommodations were basic compared to other locations. Suitable for solitude seekers, but not for those wanting luxury and convenience.",
      stars: 3,
  
    },
    {
      spotId: allBookings[26].spotId,
      userId: allBookings[26].userId,
      review: "Storm's End was impressive but austere. The coastal views were great, but the castle itself was cold and somewhat uncomfortable. The amenities were minimal. Best for those who appreciate rugged beauty, but not for those looking for a comfortable stay.",
      stars: 3,
  
    },
    {
      spotId: allBookings[27].spotId,
      userId: allBookings[27].userId,
      review: "Riverrun was picturesque but quite remote. The surroundings were beautiful, but the castle lacked modern amenities and felt a bit isolated. The accommodations were basic. Good for a quiet retreat, but not ideal for those looking for more luxury and convenience.",
      stars: 3,
  
    },
    {
      spotId: allBookings[28].spotId,
      userId: allBookings[28].userId,
      review: "The Eyrie had stunning views but was very difficult to access. The tranquility was nice, but the castle was quite cold and the amenities were limited. The isolation might be too much for some. Ideal for those seeking peace and isolation, but not for those who value convenience.",
      stars: 3,
  
    },
    {
      spotId: allBookings[29].spotId,
      userId: allBookings[29].userId,
      review: "Pyke was rugged and atmospheric but quite uncomfortable. The coastal views were dramatic, but the accommodations were very basic and the weather was often harsh. Best for adventurers, but not for those looking for comfort and luxury.",
      stars: 2,
  
    },
    {
      spotId: allBookings[30].spotId,
      userId: allBookings[30].userId,
      review: "Highgarden was beautiful but not very exciting. The gardens were lovely, but the castle itself felt a bit too perfect and lacking in character. The accommodations were comfortable but not particularly luxurious. Great for a relaxing stay, but not for those seeking adventure.",
      stars: 3,
  
    },
    {
      spotId: allBookings[31].spotId,
      userId: allBookings[31].userId,
      review: "Oldtown was historic but felt a bit dull. The architecture was impressive, but the city lacked the vibrancy of other locations. The accommodations were comfortable but unremarkable. Ideal for history buffs, but not for those seeking lively entertainment.",
      stars: 3,
  
    },
    {
      spotId: allBookings[32].spotId,
      userId: allBookings[32].userId,
      review: "Dorne was warm and beautiful but felt somewhat isolated. The climate was great, but the region lacked the amenities and activities of other locations. The accommodations were decent but not luxurious. Suitable for sun-seekers, but not for those wanting a more vibrant experience.",
      stars: 3,
  
    },
    {
      spotId: allBookings[33].spotId,
      userId: allBookings[33].userId,
      review: "Sunspear was exotic but not as luxurious as expected. The sea views were nice, but the accommodations were only moderately comfortable. The city felt a bit too quiet. Good for a peaceful stay, but not for those seeking high-end luxury.",
      stars: 3,
  
    },
    {
      spotId: allBookings[34].spotId,
      userId: allBookings[34].userId,
      review: "Braavos was culturally rich but very busy. The canals and markets were interesting, but the city was crowded and noisy. The accommodations were adequate but not luxurious. Best for those who love bustling cities, but not for those seeking tranquility.",
      stars: 3,
  
    },
    {
      spotId: allBookings[35].spotId,
      userId: allBookings[35].userId,
      review: "Meereen was historically fascinating but felt somewhat chaotic. The grand pyramids were impressive, but the city itself was noisy and crowded. The accommodations were basic. Suitable for history enthusiasts, but not for those wanting peace and quiet.",
      stars: 3,
  
    },
    {
      spotId: allBookings[36].spotId,
      userId: allBookings[36].userId,
      review: "Qarth was exotic but fell short of expectations. The markets were vibrant, but the accommodations were only moderately comfortable. The city felt somewhat overrated. Good for those seeking a cultural experience, but not for those looking for true luxury.",
      stars: 3,
  
    },
    {
      spotId: allBookings[37].spotId,
      userId: allBookings[37].userId,
      review: "Astapor was historic but felt a bit run-down. The ancient architecture was interesting, but the city lacked the vibrancy and amenities of other locations. The accommodations were basic. Suitable for history buffs, but not for those seeking comfort.",
      stars: 2,
  
    },
    {
      spotId: allBookings[38].spotId,
      userId: allBookings[38].userId,
      review: "Yunkai had interesting history but felt quite basic. The golden pyramids were nice, but the city lacked excitement and the accommodations were minimal. Good for a short stay, but not for those wanting luxury and entertainment.",
      stars: 2,
  
    },
    {
      spotId: allBookings[39].spotId,
      userId: allBookings[39].userId,
      review: "Vaes Dothrak was culturally rich but very basic. The vast plains were impressive, but the accommodations were extremely simple. The nomadic culture was interesting, but the stay was uncomfortable. Best for cultural enthusiasts, but not for those seeking comfort.",
      stars: 2,
  
    },
    {
      spotId: allBookings[40].spotId,
      userId: allBookings[40].userId,
      review: "Harrenhal was historically intriguing but quite eerie. The ruins were fascinating, but the accommodations were uncomfortable and the atmosphere was dark. Suitable for those interested in history and lore, but not for those looking for comfort and light.",
      stars: 3,
  
    }
    
  ]
    
  );




  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */


    await queryInterface.bulkDelete('Reviews',
      null, {}
    )
  }
};
