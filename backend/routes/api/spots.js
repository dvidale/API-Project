const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Spot, SpotImage, Review, User } = require("../../db/models");

const { requireAuth } = require('../../utils/auth');


// Get all spots

const pageify = (req, res, next) => {
  let { page, size } = req.query;

  if (!page) page = 1;
  if (!size) size = 20;

  if (+page < 1) {
    page = 1;
  }
  if (+page > 10) {
    page = 10;
  }
  if (+size < 1) {
    size = 1;
  }
  if (+size > 20) {
    size = 20;
  }

  if (+page > 0 && +page <= 10 && +size > 0 && +size <= 20) {
    req.limit = size;
    req.offset = size * (page - 1);
  }

  //  console.log("page", page, "size", size);
  //  console.log("limit and offset before route ---", req.limit, req.offset);
  next();
};

router.get("/", pageify, async (req, res) => {
  let where = {};
 
  //you get query params from request
  if (req.query) {
    const query = req.query;

    // if request includes spot name query

    if (query.name) {
      //assign name query to search params object
      where.name = { [Op.like]: `%${query.name}%` };
    }

    // request includes page and size
    //if it has a page spec, it doesn't have to have a size, but it probably will
    // if it has a size, it doesn't have to have a page, but it probably will
  }

  // if(req.limit){
  //     pagination.limit = req.limit;
  // }
  // if(req.offset){
  //     pagination.offset = req.offset;
  // }

  let spots = await Spot.findAll({
    where,
    include: [
      {
        model: SpotImage,
        attributes: [],
      },
      {
        model: Review,
        attributes: [],
      },
    ],
    attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",

        // for some reason these lines limits the query to 1 result
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],

        // for some reason these lines make the query lose connection to the SpotImages table if any code is added after them
        [Sequelize.col("SpotImages.url"), "previewImage"]
      ]
  });

  

  res.json(spots);
});



//Get all spots owned by current user

 router.get("/current", requireAuth, async(req,res)=>{
  
  const spots = await Spot.findAll({
    where:{
      ownerId: req.user.id
    },
    include: [
      {
        model: SpotImage,
        attributes: [],
      },
      {
        model: Review,
        attributes: [],
      },
    ],
    attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",

        //Todo: figure out how to use this line and still return all results and not just one
        // for some reason these lines limits the query to 1 result
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],

        // for some reason these lines make the query lose connection to the SpotImages table if any code is added after them
        [Sequelize.col("SpotImages.url"), "previewImage"]
      ]
  })

  res.json(spots);

});

// get spot details by id
router.get("/:spotId", async (req, res)=>{

const spot = await Spot.findOne({
  where:{
    id: req.params.spotId
  },
  include: [
    {
      model: SpotImage,
      attributes: {
        exclude:['spotId','createdAt', 'updatedAt']
      },
    },
    {
      model: Review,
      attributes: [],
    },
    {
      model: User,
      as: 'owner',
      attributes: ['id','firstName','lastName'],
    },
  ],
  group: ['Spot.id', 'SpotImages.id', 'owner.id','Reviews.id'],
  attributes: [
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
      [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
      [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
    ]


});
console.log("spot", spot);
if(spot === null || spot.id === null){
res.status(404);
res.json({
  "message": "Spot couldn't be found"
});
}

  res.json(spot);





})

//Creates and returns a new spot

router.post('/', requireAuth, async (req, res)=>{



  //pull in client-provided new spot data from req body

  let { 
    address, 
    city, 
    state, 
    country, 
    lat, 
    lng, 
    name, 
    description, 
    price } = req.body;

  //target the current user
  const currentUser = await User.findByPk(req.user.id)
  
  //create a spot associated with the current user
 
    await currentUser.createSpot({
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
 
 
  //retrieve the created spot from the db
const newSpotRecord = await Spot.findOne({
  where:{
    name
  }
})
console.log("*** newSpot created -- ", newSpotRecord);
  //return the created spot to the client
  //status code 201
  res.status(201)
  res.json(newSpotRecord)


})

module.exports = router;
