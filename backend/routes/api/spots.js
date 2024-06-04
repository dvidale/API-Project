const express = require('express')
const router = express.Router();
const { Op } = require('sequelize');
const {Spot} = require('/Users/admin/Developer/aa-backend-portfolio-proj/backend/db/models')

// Get all spots

router.get('/', async (req, res)=>{

    const params = {
        where:{}
    }

    //you get query params from request
    if(req.query){
        const query = req.query;

//if request includes spot name query

        if(query.name){
//assign name query to search params object
            params.where.name = { [Op.like]: `%${query.name}%` }
        }

    }

    let spots = await Spot.findAll(params);

    return res.json(spots)

})

module.exports = router;