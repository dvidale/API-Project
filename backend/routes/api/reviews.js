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
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const review = require("../../db/models/review");

/* ------------------------------------
* * GET all Reviews of the Current User
------------------------------------- */

router.get("/current", requireAuth, async (req, res) => {
  // get the current user's id
  const userId = req.user.id;

  // pull all reviews associated with the current user's id

  // include User record id, firstName and lastName
  //include Spot record for associated spot
  // include ReviewImages for review

  const userReviews = await Review.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },

      {
        model: Spot,
        include: {
          model: SpotImage,
          //Todo: get image url to return on Spot object as "previewImage".
          // ? Should spots only have one SpotImage each? 
          attributes: ['url'],
        },
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
      {
        model: ReviewImage,
      },
    ],
  });

  res.json(userReviews);
});





/* ---------------------------------------------------
*   Add an Image to a Review based on the Review's id
----------------------------------------------------- */

const reviewExists = async (req, res)=>{

//pull the review Id
const reviewId = +req.params.reviewId;

//make sure the review exists
const reviewCheck = await Review.findOne({
    where:{
      id: reviewId
    }
  });

if(reviewCheck === null){
    res.status(404);
    res.json({
        message: "Review couldn't be found"
      })
}


}


router.post('/:reviewId/images', [requireAuth, reviewExists], async(req,res)=>{
// //pull the review Id

// const reviewId = +req.params.reviewId;

// //make sure the review exists


// const reviewCheck = await Review.findOne({
//     where:{
//       id: reviewId
//     }
//   });

// if(reviewCheck === null){
//     res.status(404);
//     res.json({
//         message: "Review couldn't be found"
//       })
// }

// make sure the current user owns the review

const userId = +req.user.id
// if we find a review, that's the one to add the image to. if we don't, the review with that id doesn't belong to the user

let userReview = await Review.findOne({
where:{
    id: reviewId,
    userId

}

});

if(userReview === null){
    res.status(403);
    res.json({
        message: "The current user does not own this review. Only the owner of the review can add images to the review."
      })
}

//check the number of images attached to the review
const reviewImages = await Review.findOne({
    where:{
        id: reviewId,
        userId
    
    },
    include:[
        {
            model:ReviewImage
        }
    ]
    

}).then(result => result.ReviewImages);

if(reviewImages.length >= 10){

res.status(403);
res.json({
    "message": "Maximum number of images for this resource was reached"
  })



}

// create an image record and associate it with the review

let { url } = req.body;

await ReviewImage.create({
    reviewId,
    url
})

//recall the newly created ReviewImage record

const newReviewImage = await ReviewImage.findOne({
    attributes:['id', 'url'],
    order:[['id', 'DESC']],
    limit: 1
})

res.json(newReviewImage)

})

/* ---------------------------------------------------
* * Edit a Review
----------------------------------------------------- */


router.put('/:reviewId')






/* ---------------------------------------------------
* * Delete a Review
----------------------------------------------------- */

module.exports = router;
