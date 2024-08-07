const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Spot, SpotImage, Review, User, ReviewImage, Booking} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");



const spotExists = async(req, res, next)=>{

  const spotId = +req.params.spotId

  //pull up the spot by the provided id
const spotCheck = await Spot.findByPk(spotId);

//check if the spot exists
if(spotCheck === null){
  res.status(404);
  return res.json({
    message: "Spot couldn't be found"
  })
}else{
  next()
}


}



const pageify = (req, _res, next) => {
  let { page, size } = req.query;

  if (!page || Number.isNaN(+page)) page = 1;
  if (!size || Number.isNaN(+size)) size = 20;

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
    req.page = page;
    req.limit = size;
    req.offset = size * (page - 1);
  }

 
  next();
};

const validateSpotSearch = [
  check("page")
  .optional({values: 'undefined' | 'null' | 'falsy'
  })
    .custom((value)=> value >= 1)
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
  .optional({values: 'undefined' | 'null' | 'falsy'
  })
    .custom((value)=> value >= 1)
    .withMessage("Size must be greater than or equal to 1"),
    check("minLat")
    .isDecimal()
     .optional({values: 'undefined' | 'null' | 'falsy'
    })
    .custom(value => value > -90)
    .withMessage("Minimum latitude is invalid"),
    check("maxLat")
    .isDecimal()
     .optional({values: 'undefined' | 'null' | 'falsy'
    })
    .custom(value => value < 90)
    .withMessage("Maximum latitude is invalid"),
    check("minLng")
    .isDecimal()
     .optional({values: 'undefined' | 'null' | 'falsy'
    })
    .custom(value => value > -180)
    .withMessage("Minimum longitude is invalid"),
    check("maxLng")
    .isDecimal()
     .optional({values: 'undefined' | 'null' | 'falsy'
    })
    .custom(value => value < 180)
    .withMessage("Maximum longitude is invalid"),
    check("minPrice")
    .isDecimal()
     .optional({values: 'undefined' | 'null' | 'falsy'
    })
    .custom(value => value >= 0)
    .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
    .isDecimal()
     .optional({values: 'undefined' | 'null' | 'falsy'
    })
    .custom(value => value >= 0)
    .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors];




/* ----------------------------------------------
   * Get all spots
----------------------------------------------- */


router.get("/", [validateSpotSearch, pageify], async (req, res) => {
  let where = {};

  //you get query params from request
  if (req.query) {
    const query = req.query;

    // if request includes spot name query

    if (query.name) {
      //assign name query to search params object
      where.name = { [Op.like]: `%${query.name}%` };
    }

    /*----------------- 
    Latitude
    ----------------- */
    //minimum latitude but no maximum
    if(query.minLat && !query.maxLat){
      where.lat = { [Op.gte]: `${query.minLat}`}
    }

    //maximum latitude but no minimum
    if(query.maxLat && !query.minLat){
      where.lat = {[Op.lte]: `${query.maxLat}`}
    }

   
    //minimum and maximim latitude, inclusive
    if(query.minLat && query.maxLat){
      where.lat = {[Op.between]: [query.minLat, query.maxLat]}
    }

    /*----------------- 
    Longitude
    ----------------- */
    //minimum longitude but no maximum
    if(query.minLng && !query.maxLng){
      where.lng = { [Op.gte]: `${query.minLng}`}
    }

    //maximum longitude but no minimum
    if(query.maxLng && !query.minLng){
      where.lng = {[Op.lte]: `${query.maxLng}`}
    }

    
    //minimum and maximim longitude, inclusive
    if(query.minLng && query.maxLng){
      where.lng = {[Op.between]: [query.minLng, query.maxLng]}
    }

    /*----------------- 
    Price
    ----------------- */

//minimum price but no maximum
if(query.minPrice && !query.maxPrice){
  where.price = { [Op.gte]: `${query.minPrice}`}
}

//maximum price but no minimum
if(query.maxPrice && !query.minPrice){
  where.price = {[Op.lte]: `${query.maxPrice}`}
}


//minimum and maximum price, inclusive
if(query.minPrice && query.maxPrice){
  where.price = {[Op.between]: [query.minPrice, query.maxPrice]}
}
    
  }

// page and size from pageify
  const pagination = {};
  if(req.limit){
      pagination.limit = req.limit;
  }
  if(req.offset){
      pagination.offset = req.offset;
  }
  
  const spots = await Spot.findAll({
    where,
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
      [Sequelize.fn('avg', Sequelize.col('Reviews.stars')), 'avgRating'],
      [Sequelize.col("SpotImages.url"), "previewImage"],
    ],
    include: [
      {
        model: SpotImage,
        attributes: [],
      },
      {
        model: Review,
        attributes: [],
      }
    ],
    group:['Reviews.spotId', 'Spot.id','SpotImages.url']
    // group:['Reviews.spotId', 'Spot.id']

,...pagination
,subQuery:false
  });

  return res.json({
    Spots:spots,
    page: +req.page,
    size: +req.limit
  });
});


/* -------------------------------------
 * Get all spots owned by current user
---------------------------------------- */

router.get("/current", requireAuth, async (req, res) => {
  const Spots = await Spot.findAll({
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

      // Done: figure out how to use this line and still return all results and not just one
     
      [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],

      // for some reason these lines make the query lose connection to the SpotImages table if any code is added after them
      [Sequelize.col("SpotImages.url"), "previewImage"],
    ],
    group:['Reviews.spotId', 'Spot.id',"SpotImages.url"]
  });

  res.json({Spots});
});

/*-----------------------------------
// Get details from a spot from an id
------------------------------------*/

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
    group: ["Spot.id", "SpotImages.id", "owner.id", "Reviews.spotId"],
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
    ]
  });

  if (spot === null || spot.id === null) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  res.json(spot);
});

//Creates and returns a new spot only after submitted data is validated
//Todo: In production, the unique constraint on the names is not catching the duplicates

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
/*-------------------
* Create a spot
----------------------*/

router.post("/", [requireAuth, validateSpot], async (req, res) => {
  //pull in client-provided new spot data from req body

  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;


    //make sure the name is unique

    const nameCheck = await Spot.findOne({
      where:{
        name
      }
    })

    if(nameCheck){
      res.status(400);
      res.json({
        message: "Name must be unique"
      })
      throw new ValidationError

    }

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

/*------------------------------------------------
Create an image for a spot specified by id.
------------------------------------------------*/

router.post('/:spotId/images', requireAuth, async (req, res) => {

//check if the spot specified exists

const spotCheck = await Spot.findByPk(req.params.spotId)

if(spotCheck === null){
  res.status(404);
  return res.json({
    message: "Spot couldn't be found"

  })
}

//get the current userId
const userId = req.user.id
//Todo - last: refactor the creation of the spotId array to at least a .then chain

//get the current user's spots
const userSpots = await Spot.findAll({
   where:{
    ownerId: userId
  }
});

let spotIdArray = []

for(let ids of userSpots){
  spotIdArray.push(ids.id)
}

//check if the spot specified is one of the current user's spots

if(spotIdArray.includes(+req.params.spotId) === false){
  //return an error
res.status(403);
return res.json({
  message: "The spot with the given id does not belong to the current user. Only the spot owner can add images to the spot."})

}
else{
// take in post req data for a new image url

let { url, preview } = req.body;
      
//create a SpotImage with req data, spotId, and userId

const newSpotImage = await SpotImage.create({

spotId: req.params.spotId,
url,
preview,
})

const resImageRecord = {
  id:newSpotImage.id,
url:newSpotImage.url,
preview:newSpotImage.preview
}

res.json(resImageRecord)

}

} )

//edit a spot

router.put('/:spotId', [requireAuth, validateSpot], async (req, res)=>{

//pull up the spot by the provided id
const spotCheck = await Spot.findByPk(req.params.spotId);

//check if the spot exists
if(spotCheck === null){
  res.status(404);
  return res.json({
    message: "Spot couldn't be found"
  })
}


//pull in the current user's id
const user = await User.findByPk(req.user.id);

// make an array of the ids of the spots owned by the current user

const userId = req.user.id;

const userSpots = await Spot.findAll({
  where:{
   ownerId: userId
 }
});

let spotIdArray = []

for(let ids of userSpots){
 spotIdArray.push(ids.id)
}

//check if the spot specified is one of the current user's spots

if(spotIdArray.includes(+req.params.spotId) === false){
 //return an error
res.status(403);
return res.json({
 message: "The spot with the given id does not belong to the current user. Only the spot owner can update the spot."})

}
else{
//pull up the spot to be updated by the id provided

let spot = await Spot.findByPk(+req.params.spotId)


//deconstruct the data from the put submission

let {
  address,
  city,
  state,
  country,
  lat,
  lng,
  name,
  description,
  price
} = req.body; 


spot.set({
  address,
  city,
  state,
  country,
  lat,
  lng,
  name,
  description,
  price
});

await spot.save();

let updatedSpot = await Spot.findByPk(+req.params.spotId)

res.json(updatedSpot)
}




})


//DELETE A SPOT

router.delete('/:spotId', requireAuth, async (req, res)=>{

  // pull up the spot record by the id

  const spotCheck = await Spot.findByPk(+req.params.spotId)

  //make sure the spot exists

  if(spotCheck === null){
    res.status(404);
    return res.json({
      message: "Spot couldn't be found"
    })
  }
  

//pull in the current user's id

const user = await User.findByPk(+req.user.id);

// make an array of the ids of the spots owned by the current user

const userId = +req.user.id;

const userSpots = await Spot.findAll({
  where:{
   ownerId: userId
 }
});

let spotIdArray = []

for(let spot of userSpots){
 spotIdArray.push(spot.id)
}

//check if the spot specified is one of the current user's spots

if(spotIdArray.includes(+req.params.spotId) === false){
 //return an error
res.status(403);
return res.json({
 message: "The spot with the given id does not belong to the current user. Only the spot owner can delete the spot."})

}
else{
//pull up the spot to be deleted by the id provided

let spot = await Spot.findByPk(+req.params.spotId)

await spot.destroy()
return res.json( {
  message: "Successfully deleted"
})

}


})


/* -------------------------------
* * Get all Reviews by a Spot's id
---------------------------------- */

router.get('/:spotId/reviews', async(req,res)=>{

  //pull the spotId
  //Todo - last: Consider making spot check a separate middleware
  const spotId = +req.params.spotId;
  
  const spotCheck = await Spot.findByPk(spotId)
  
  if(spotCheck === null){
      res.status(404)
      return res.json( {
          message: "Spot couldn't be found"
        })
  }
  
  //get all the reviews around that id
  
  const Reviews = await Review.findAll({
          where:{
          spotId
      },
      include:[
        {
          model: User,
          attributes:['id','firstName','lastName']
        },
      {
          model: ReviewImage
      }    
      ]
  })
  
  const spotReviews = {Reviews}
  
  res.json(spotReviews)
  
  
  })
  



const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
    check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isNumeric()
    .custom(value => value > 0 && value < 6)
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors];


/* ---------------------------------------------------
* * Create a Review for a Spot based on the Spot's id
----------------------------------------------------- */


router.post('/:spotId/reviews', [requireAuth, validateReview], async(req, res)=>{
//pull the spotId
  //Todo - last: Consider making spot check a separate middleware
  const spotId = +req.params.spotId;
 
  const spotCheck = await Spot.findByPk(spotId)
  
  if(spotCheck === null){
      res.status(404)
      return res.json( {
          message: "Spot couldn't be found"
        })
  }

// pull review data from post req body

let { review, stars } = req.body;

//check if a review for the specified spot already exists from the current user 

const userId = +req.user.id;

const reviewCheck = await Review.findOne({
  where:{
    userId,
    spotId
  }
})

if(reviewCheck !== null){
  res.status(500)
  return res.json({
    "message": "User already has a review for this spot"
  })
}else{


const createdReview = await Review.create({
    userId,
    spotId,
    review,
    stars
  })
  

  res.status(201)
  res.json(createdReview)


}

})




/* ---------------------------------------------------
* * Get all Bookings for a Spot based on the Spot's id
----------------------------------------------------- */

router.get('/:spotId/bookings', requireAuth, async (req, res) => {

  const userId = +req.user.id;

const spotId = +req.params.spotId

  //pull up the spot by the provided id
const spotCheck = await Spot.findByPk(spotId);

//check if the spot exists
if(spotCheck === null){
  res.status(404);
  return res.json({
    message: "Spot couldn't be found"
  })
}



//condition results on if the current user is or is NOT the owner of the spot

const ownerCheck = await Spot.findOne({
  where:{
    id: +req.params.spotId,
    ownerId: +req.user.id

  } 
})

//if null, current user is not owner. do this:
if(ownerCheck === null){

  const Bookings = await Booking.findAll({
    where:{
      spotId 
    },
    attributes: [
      'spotId', 'startDate','endDate'
    ]
  })


  res.json({
    Bookings
  })


}else{
//if not null, current user is owner, do this:
// return the details for the user that booked with the booking

const bookings = await Booking.findAll({
  include:{
    model:User,
    attributes:[
      'id','firstName','lastName'
    ]
  },
  where:{
    spotId 
  }
})

let Bookings = [];



bookings.map( booking =>{

let User = booking.User;
let id = booking.id;
let spotId = booking.spotId;
let userId = booking.userId;
let startDate = booking.startDate;
let endDate = booking.endDate;
let createdAt = booking.createdAt;
let updatedAt = booking.updatedAt;




Bookings.push({ 
  User,
  id,
  spotId,
  userId,
  startDate,
  endDate,
  createdAt,
  updatedAt
})

})

res.json(
  {Bookings}
)

}



})




    const bookingConflictCheck = async (req, res, next)=>{
      /* -----------------------------
      check for booking conflict
      ------------------------------ */
      // iterate through the objects as greater than and less than conditionals against the new booking start date and then the end date
      
        let { startDate, endDate } = req.body;
        const spotId = +req.params.spotId

      
      const currentBookings = await Booking.findAll({
        where:{
          spotId,
          startDate: {
            [Op.gt]: new Date()
          }  
        }
      })
      
      
      let errorObj = {}
      //* Removed these variables from the logic to remove the ability for same day time specific bookings
      // let startDateWithTime = new Date(`${startDate}T09:00:00`)
      // let endDateWithTime = new Date(`${endDate}T04:00:00`)
      
      let startDateNoTime = new Date(startDate)
      let endDateNoTime = new Date(endDate)
      
       //check if requested start date is within a previously booked stay
      for(let i = 0; i < currentBookings.length; i++){
      if((startDateNoTime >= currentBookings[i].startDate && startDateNoTime <= currentBookings[i].endDate) ){
        errorObj.startDate = "Start date conflicts with an existing booking"
        break;
      }
      
      }
      // check if the requested end date is within a previously booked stay
      for(let i=0; i <currentBookings.length; i++){
      
        if((endDateNoTime >= currentBookings[i].startDate && endDateNoTime <= currentBookings[i].endDate))
          {
          errorObj.endDate = "End date conflicts with an existing booking";
          break;
          }
      
      }


      if(Object.keys(errorObj).length > 0){
        res.status(403);
        return res.json({
          message:"Sorry, this spot is already booked for the specified dates",
          errors: errorObj  })
      }

      
      //check if the start and end dates are within the time span of a previously booked stay
      
      for(let i=0; i <currentBookings.length; i++){
      
      
        // startDate >= futureStartDate && endDate <= futureEndDate
      
        if((startDateNoTime >= currentBookings[i].startDate && endDateNoTime <= currentBookings[i].endDate))
          {
            errorObj.bookingConflict = "Start and end dates are within an existing booking";
          break;
          }
      
      }
      
      
      //check if the start and end dates surround the time span of a previously booked stay
      
      for(let i=0; i <currentBookings.length; i++){
      
      
        // startDate <= futureStartDate && endDate >= futureEndDate
      
        if((startDateNoTime <= currentBookings[i].startDate && endDateNoTime >= currentBookings[i].endDate))
          {
            errorObj.startDate = "Start date conflicts with an existing booking"
            errorObj.endDate = "End date conflicts with an existing booking";
          break;
          }
      
      }
      
        
        if(Object.keys(errorObj).length > 0){
          res.status(403);
          return res.json({
            message:"Sorry, this spot is already booked for the specified dates",
            errors: errorObj  })
        }else{
          next()
        }
          
      }


      //Note: Shane said the Postman backend test will fail a same day booking, but save the same day functionality for frontend
const validateBooking = [
  check("startDate")
  // .custom((value) => {
  //   let start = new Date(`${value}T09:00:00`);
  //   let today = new Date();
  //   const todayWithCheckoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 4, 0, 0, 0);

  //   return start - todayWithCheckoutTime > 0;
  // })
  //   .withMessage("startDate cannot be in the past"),
  //   check("endDate")
  //   .custom((value, {req}) =>{
  //     let startDate = req.body.startDate
  //     let end = new Date(`${value}T04:00:00`);
  //     let bookingStart = new Date(`${startDate}T09:00:00`);
  //   return (end - bookingStart) > 0
  //   })
  //   .withMessage("endDate cannot be on or before startDate"),
  //   handleValidationErrors];
  .custom((value) => {
    let start = new Date(value);
    let today = new Date();
    
    return start - today > 0;
  })
    .withMessage("startDate cannot be in the past"),
    check("endDate")
    .custom((value, {req}) =>{
      let startDate = req.body.startDate
      let end = new Date(value);
      let bookingStart = new Date(startDate);
    return (end - bookingStart) > 0
    })
    .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors];


/* ---------------------------------------------------
* * Create a Booking from a Spot based on the Spot's id
----------------------------------------------------- */


router.post('/:spotId/bookings', [requireAuth, spotExists, bookingConflictCheck, validateBooking], async (req, res)=>{

  const spotId = +req.params.spotId
const userId = +req.user.id;
//check if the spot belongs to current user


const ownerCheck = await Spot.findOne({
  where:{
    id: spotId,
    ownerId: userId
  }
})

if (ownerCheck){
  res.status(403);
  return res.json({
    message: "The current user is the owner of this spot. The owner cannot create a booking for a spot they own."
  })
}else{

  let { startDate, endDate } = req.body;


  


const newBooking = await Booking.create({
  spotId,
  userId,
  startDate,
  endDate
})


// return newly created booking




res.status(200);
res.json(newBooking);

}


})



module.exports = router;
