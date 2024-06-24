const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Spot, SpotImage, Review, User, ReviewImage, Booking} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");


router.delete('/:imageId', requireAuth, async (req, res)=>{

    const spotImageId = +req.params.imageId

    const userId = +req.user.id;

    const spotImage = await SpotImage.findByPk(spotImageId);

    if(spotImage === null){

        res.status(404);
        return res.json({
            "message": "Spot Image couldn't be found"
          })

        }



    //make sure spot is owned by current user

        const spotOwnerCheck = await SpotImage.findOne({

            where:{
                id: spotImageId
            },
            include:{
                model: Spot,
                where:{
                    ownerId: userId
                }
            }
        })


        if(spotOwnerCheck === null){

            res.status(403);
            res.json({
                message: "The current user does not own the spot associated with this image. Spot must belong to the current user to delete an image."
            })

        }else{

            await spotImage.destroy();

            res.json({
                "message": "Successfully deleted"
              })
        }


    


    





})





module.exports = router;