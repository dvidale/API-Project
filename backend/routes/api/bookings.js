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

const bookingConflict = async (req, res, next) => {
  let { startDate, endDate } = req.body;

  //*check for booking conflict

  const spotId = await Booking.findByPk(+req.params.bookingId).then(
    (result) => +result.spotId
  );

  //create an array of bookings listed beyond today for this specific spot

  const futureBookings = await Booking.findAll({
    where: {
      spotId,
      startDate: {
        [Op.gt]: new Date(),
      },
    },
  });

  let errorObj = {};
  let startDateWithTime = new Date(`${startDate}T09:00:00`);
  let endDateWithTime = new Date(`${endDate}T04:00:00`);

  for (let i = 0; i < futureBookings.length; i++) {
    if (
      startDateWithTime >= futureBookings[i].startDate &&
      startDateWithTime <= futureBookings[i].endDate
    ) {
      errorObj.startDate = "Start date conflicts with an existing booking";
      break;
    }
  }

  for (let i = 0; i < futureBookings.length; i++) {
    if (
      endDateWithTime >= futureBookings[i].startDate &&
      endDateWithTime <= futureBookings[i].endDate
    ) {
      errorObj.endDate = "End date conflicts with an existing booking";
      break;
    }
  }

  if (Object.keys(errorObj).length > 0) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: errorObj,
    });
  } else {
    next();
  }
};
//Todo: experiment with moving these validation scripts to the validations utility module

const validateBooking = [
  check("startDate")
    .custom((value) => {
      let start = new Date(`${value}T09:00:00`);
      let today = new Date();
      const todayWithCheckoutTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        4,
        0,
        0,
        0
      );

      return start - todayWithCheckoutTime > 0;
    })
    .withMessage("startDate cannot be in the past"),
  check("endDate")
    .custom((value, { req }) => {
      let startDate = req.body.startDate;
      let end = new Date(value).setHours(4);
      let bookingStart = new Date(startDate).setHours(9);
      return end - bookingStart > 0;
    })
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

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
          attributes: [['url', 'previewImage']]
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


  


   const Bookings = results.map((booking)=>{
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
        previewImage: booking.Spot.SpotImages[0]
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
    
    
    
  res.json({ results });

  // res.json({ Bookings });
});

/* ----------------------------------------------
*   Edit a Booking
------------------------------------------------- */

router.put(
  "/:bookingId",
  [requireAuth, bookingExists, bookingConflict, validateBooking],
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

      const startDateWithTime = new Date(startDate).setHours(9);
      const endDateWithTime = new Date(endDate).setHours(4);

      booking.set({
        startDate: startDateWithTime,
        endDate: endDateWithTime,
      });

      await booking.save();
    }

    const updateBooking = await Booking.findByPk(bookingId);

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
