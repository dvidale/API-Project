const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Spot, SpotImage, Review, User , ReviewImage, Booking} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");


/* ----------------------------------------------
*   Get all of the Current User's Bookings
------------------------------------------------- */

router.get('/current', requireAuth, async(req, res) =>{

//get current user id
let userId = +req.user.id

const Bookings = await Booking.findAll({
    where:{
        userId
    }
})


res.json({Bookings});



})








module.exports = router;