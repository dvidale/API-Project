const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

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
      [Sequelize.col("SpotImages.url"), "previewImage"],
    ],
  });

  res.json(spots);
});

//Get all spots owned by current user

router.get("/current", requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
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
      [Sequelize.col("SpotImages.url"), "previewImage"],
    ],
  });

  res.json(spots);
});

// get spot details by id
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
    include: [
      {
        model: SpotImage,
        attributes: {
          exclude: ["spotId", "createdAt", "updatedAt"],
        },
      },
      {
        model: Review,
        attributes: [],
      },
      {
        model: User,
        as: "owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
    group: ["Spot.id", "SpotImages.id", "owner.id", "Reviews.id"],
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
      [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
      [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"],
    ],
  });

  if (spot === null || spot.id === null) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
    });
  }

  res.json(spot);
});

//Creates and returns a new spot only after submitted data is validated

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),
    check("lat")
    .exists({ checkFalsy: true })
    .notEmpty()
    .custom(value => value > -90 && value < 90)
    .withMessage("Latitude must be within -90 and 90"),
    check("lng")
    .exists({ checkFalsy: true })
    .notEmpty()
    .custom(value => value > -180 && value < 180)
    .withMessage("Longitude must be within -180 and 180"),
    check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({max: 50})
    .withMessage("Name must be less than 50 characters"),
    check("description")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Description is required"),
    check("price")
    .exists({ checkFalsy: true })
    .notEmpty()
    .custom(value => value > 0)
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

router.post("/", [requireAuth, validateSpot], async (req, res) => {
  //pull in client-provided new spot data from req body

  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  //create a spot associated with the current user

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  //retrieve the created spot from the db
  const newSpotCheck = await Spot.findOne({
    where: {
      name,
    },
  });

  //return the created spot to the client
  //status code 201
  res.status(201);
  res.json(newSpotCheck);
});

module.exports = router;
