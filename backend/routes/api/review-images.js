const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Spot, SpotImage, Review, User, ReviewImage, Booking} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

/*--------------------------------------------
* Delete a Review Image
--------------------------------------------*/

router.delete('/:imageId', requireAuth, async(req, res) => {

const userId = +req.user.id;

const reviewImageId = +req.params.imageId;

const reviewImage = await ReviewImage.findByPk(reviewImageId)


if(reviewImage === null){

    res.status(404);
 return res.json({
        message: "Review Image couldn't be found"
      })
}

const reviewOwnerCheck = await ReviewImage.findOne({
    where: {
        id: reviewImageId
    },
    include:{
        model: Review,
        where: {
            userId
        }
    }
})

if(reviewOwnerCheck === null){
    res.status(403);
    res.json({
        message: "The current user does not own this review. Review must belong to the current user"
    })
}else{

await reviewOwnerCheck.destroy();

res.json(
    {
        message: "Successfully deleted"
      }
)

}



})




module.exports = router;