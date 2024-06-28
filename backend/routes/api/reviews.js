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
// const review = require("../../db/models/review");



const reviewExists = async (req, res, next)=>{

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
  
  return next()
  
  }
  

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
        attributes: {
          include:[
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
        },
        include: {
          model: SpotImage,
          
          //Todo: get image url to return on Spot object as "previewImage".
          // attributes: []
          attributes: ['url'],
          // raw:true
        },
       
      },
      {
        model: ReviewImage,
      },
    ],
  });


const Reviews = userReviews.map((review) =>{
  if(review.Spot.SpotImages.length === 0){
    review.Spot.SpotImages[0] = {url:null}
  }
return ({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User:{
        id: review.User.id,
        firstName: review.User.firstName,
        lastName: review.User.lastName
      },
      Spot:{
        id: review.Spot.id,
        ownerId:review.Spot.ownerId,
        address: review.Spot.address,
        city: review.Spot.city,
        state: review.Spot.state,
        country: review.Spot.country,
        lat: review.Spot.lat,
        lng: review.Spot.lng,
        name: review.Spot.name,
        price: review.Spot.price,
        previewImage: review.Spot.SpotImages[0].url
      },
      ReviewImages:review.ReviewImages
      

})




})


  res.json({Reviews});
});





/* ---------------------------------------------------
*   Add an Image to a Review based on the Review's id
----------------------------------------------------- */


router.post('/:reviewId/images', [requireAuth, reviewExists], async(req,res)=>{
  

// make sure the current user owns the review

const userId = +req.user.id
// if we find a review, that's the one to add the image to. if we don't, the review with that id doesn't belong to the user

const reviewId = +req.params.reviewId;

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



router.put('/:reviewId', [requireAuth, reviewExists, validateReview], async (req, res)=>{

  // make sure the current user owns the review

const userId = +req.user.id

// if we find a review owned by this user, we can edit it. if we don't, the review with that id doesn't belong to the user

const reviewId = +req.params.reviewId;

let userReview = await Review.findOne({
where:{
    id: reviewId,
    userId

}

});

if(userReview === null){
    res.status(403);
    res.json({
        message: "The current user does not own this review. Only the owner can edit the review."
      })
}

let {review, stars} = req.body;

await userReview.set({
review,
stars
})

await userReview.save();

let updatedReview = await Review.findByPk(reviewId)

res.json(updatedReview)

})






/* ---------------------------------------------------
* * Delete a Review
----------------------------------------------------- */

router.delete('/:reviewId',[requireAuth, reviewExists], async(req,res)=>{

//Todo: I'm getting a foreign key constraint error when trying to delete
  // make sure the current user owns the review

  const userId = +req.user.id

  // if we find a review owned by this user, we can edit it. if we don't, the review with that id doesn't belong to the user
  
  const reviewId = +req.params.reviewId;
  
  let userReview = await Review.findOne({
  where:{
      id: reviewId,
      userId
  
  }
  
  });
  
  if(userReview === null){
      res.status(403);
      res.json({
          message: "The current user does not own this review. Only the owner can edit the review."
        })
  }


await userReview.destroy()

res.json( {
  "message": "Successfully deleted"
})

})




module.exports = router;
