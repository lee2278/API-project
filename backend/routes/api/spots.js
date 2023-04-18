const express = require('express');
const router = express.Router();
const { Spot, Review, spotImage } = require('../../db/models');
const { Model } = require('sequelize');



router.get('/', async (req, res) => {


    // const totalReviews = await Review.count();
    // const totalStars = await Review.sum('stars');


    // const avgRating = totalStars/totalReviews;

    // const spots = await Spot.findAll()

    // console.log(spots)

    // spots.forEach(spot => spot.dataValues.avgRating = avgRating)
    // return res.json(spots);



    
    // let where = {}
    // const allSpots = await Spot.findAll({
    //     where,
    //     include: [{ model: Review }, { model: spotImage }]
    // }
    // );





    // // const totalReviewsOfSpot = spotReviews.count();
    // // const totalStarsOfSpot = spotReviews.sum('stars');
    // // const avgRatingOfSpot = totalStarsOfSpot/totalReviewsOfSpot;

    // // spot.dataValues.avgRating = avgRatingOfSpot;








    // console.log(allSpots)
    // res.json(allSpots)
})



module.exports = router;
