const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const { Sequelize } = require("sequelize");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");




const bookingExists = async (req, res, next) => {
  const bookingCheck = await Booking.findByPk(+req.params.bookingId);

  if (bookingCheck === null) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
    });
  } else {
    next();
  }
};

const editBookingConflictCheck = async (req, res, next)=>{
  /* -----------------------------
  check for booking conflict
  ------------------------------ */
  // iterate through the objects as greater than and less than conditionals against the new booking start date and then the end date
  
    let { startDate, endDate } = req.body;

    const bookingId = +req.params.bookingId;

    const booking = await Booking.findByPk(bookingId);

    const spotId = booking.spotId

  
  const futureBookings = await Booking.findAll({
    where:{
      spotId,
      startDate: {
        [Op.gt]: new Date()
      }  
    }
  })
  
  
  let errorObj = {}
  // Removed these variables from the logic to remove the ability for same day time specific bookings
  // let startDateWithTime = new Date(`${startDate}T09:00:00`)
  // let endDateWithTime = new Date(`${endDate}T04:00:00`)
  
  let startDateNoTime = new Date(startDate)
  let endDateNoTime = new Date(endDate)
  
  for(let i = 0; i < futureBookings.length; i++){
  
    //check if requested start date is within a previously booked stay
  if((startDateNoTime >= futureBookings[i].startDate && startDateNoTime <= futureBookings[i].endDate) ){
    errorObj.startDate = "Start date conflicts with an existing booking"
    break;
  }
  
  }
  // check if the requested end date is within a previously booked stay
  for(let i=0; i <futureBookings.length; i++){
  
    if((endDateNoTime >= futureBookings[i].startDate && endDateNoTime <= futureBookings[i].endDate))
      {
      errorObj.endDate = "End date conflicts with an existing booking";
      break;
      }
  
  }
  
  //check if the start and end dates are within the time span of a previously booked stay
  
  for(let i=0; i <futureBookings.length; i++){
  
  
    // startDate >= futureStartDate && endDate <= futureEndDate
  
    if((startDateNoTime >= futureBookings[i].startDate && endDateNoTime <= futureBookings[i].endDate))
      {
        errorObj.startDate = "Start date conflicts with an existing booking"
      errorObj.endDate = "End date conflicts with an existing booking";
      break;
      }
  
  }
  
  
  //check if the start and end dates surround the time span of a previously booked stay
  
  for(let i=0; i <futureBookings.length; i++){
  
  
    // startDate <= futureStartDate && endDate >= futureEndDate
  
    if((startDateNoTime <= futureBookings[i].startDate && endDateNoTime >= futureBookings[i].endDate))
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

//Todo-last: experiment with moving these validation scripts to the validations utility module
//Note: Shane said the Postman backend test will fail a same day booking, but save the same day functionality for frontend
const validateBooking = [
  check("startDate")
//     .custom((value) => {
//       let start = new Date(`${value}T09:00:00`);
//       let today = new Date();
//       const todayWithCheckoutTime = new Date(
//         today.getFullYear(),
//         today.getMonth(),
//         today.getDate(),
//         4,
//         0,
//         0,
//         0
//       );

//       return start - todayWithCheckoutTime > 0;
//     })
//     .withMessage("startDate cannot be in the past"),
//   check("endDate")
//     .custom((value, { req }) => {
//       let startDate = req.body.startDate;
//       let end = new Date(value).setHours(4);
//       let bookingStart = new Date(startDate).setHours(9);
//       return end - bookingStart > 0;
//     })
//     .withMessage("endDate cannot be on or before startDate"),
//   handleValidationErrors,
// ];
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

/* ----------------------------------------------
*   Get all of the Current User's Bookings
------------------------------------------------- */

router.get("/current", requireAuth, async (req, res) => {
  //get current user id
  let userId = +req.user.id;

  const spotImageRes = await Booking.findAll({
where:{
  userId,
},
include:{
  model: Spot,
  include:{
    model: SpotImage,
    where:{
      preview: true
    },
    require: false,
  }
}
  })

  const results = await Booking.findAll({
    where: {
      userId,
    },
    include: {
      model: Spot,
      // include: SpotImage,
      include:
        {
          model: SpotImage,
          attributes: ['url']
          // attributes: []
        },
      attributes: {
        include: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
          // [Sequelize.col("SpotImages.url"), "previewImage"]
        ],
        exclude: ["description", "createdAt", "updatedAt"],
      }
    }
  });


//   const spotImagess = results.map((imgs)=>{
// if(imgs.Spot.SpotImages.length === 0){
//   imgs.Spot.SpotImages[0] = {url:null}
// }
// return imgs.Spot.SpotImages[0].url

//   })


   const Bookings = results.map((booking)=>{
    if(booking.Spot.SpotImages.length === 0){
      booking.Spot.SpotImages[0] = {url:null}
    }
   return(
    {
      id: booking.id,
      spotId: booking.spotId,
      Spot:{
        id:booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: booking.Spot.SpotImages[0].url
      },
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
     }

   ) 
  
   
   
  }
  )
    
    
    
  // res.json({ results });
// res.json({spotImagess})
  res.json({ Bookings });
});

/* ----------------------------------------------
*   Edit a Booking
------------------------------------------------- */

router.put(
  "/:bookingId",
  [requireAuth, bookingExists, editBookingConflictCheck, validateBooking],
  async (req, res) => {
    // error: can't edit a booking that's past the end date

    const bookingId = +req.params.bookingId;

    const booking = await Booking.findByPk(bookingId);

    if (booking.endDate < new Date()) {
      res.status(403);
      return res.json({
        message: "Past bookings can't be modified",
      });
    } else {
      let { startDate, endDate } = req.body;

      // const startDateWithTime = new Date(startDate).setHours(9);
      // const endDateWithTime = new Date(endDate).setHours(4);

      booking.set({
        startDate,
        endDate,
      });

      await booking.save();
    }

    const updateBooking = await Booking.findByPk(bookingId);
console.log(">>>>>> edit a booking -  response body:", updateBooking)
    res.json(updateBooking);
  }
);

/* ----------------------------------------------
*   Delete a Booking
------------------------------------------------- */

router.delete("/:bookingId", [requireAuth, bookingExists], async (req, res) => {
  const bookingId = +req.params.bookingId;
  const userId = +req.user.id;

  //bookings that have been started can't be deleted

  const bookingStartDate = await Booking.findByPk(bookingId).then(
    (result) => result.startDate
  );

  const bookingEndDate = await Booking.findByPk(bookingId).then(
    (result) => result.endDate
  );

  const today = new Date();

  if (bookingStartDate < today && today < bookingEndDate) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
    });
  }

  //Authorization: booking must belong to current user or spot must belong to current user

  //find booking that belongs to user
  const bookingUser = await Booking.findOne({
    where: {
      id: bookingId,
      userId,
    },
  });

  //see if spot booked belongs to user

  const bookingSpotOwner = await Booking.findOne({
    where: {
      id: bookingId,
    },
    include: {
      model: Spot,
      where: {
        ownerId: userId,
      },
    },
  });

  //Error: Bookings that have been started can't be deleted

  if (bookingUser !== null || bookingSpotOwner !== null) {
    const booking = await Booking.findByPk(bookingId);
    //successful deletion
    await booking.destroy();

    res.json({
      message: "Successfully deleted",
    });
  }
});

module.exports = router;
