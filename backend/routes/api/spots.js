const express = require('express');
const router = express.Router();
const { Spot, Review, spotImage } = require('../../db/models');


router.get('/', async (req, res) => {

    // const allSpots = await Spot.findAll({
    //     include: [{ model: Review }]
    // });

    // let listOfSpots = [];

    // allSpots.forEach(spot => listOfSpots.push(spot.toJSON()))

    

    // listOfSpots.forEach(spot => {
    //     let totalReviews;
    //     let totalStars;
    //     console.log(Object.values(spot.Reviews).length >= 0)
    //     if (Object.values(spot.Reviews).length >= 0) {
    //         spot.Reviews.forEach(spot => )
    //     }

    //     // if (Object.values(spot.Reviews)) 
    //     // spot.Reviews.forEach(review => {
    //     //     // if (totalReviews === 0 || totalReviews === null) {
    //     //     //     totalReviews = 1;
    //     //     // } else {
    //     //     //     totalReviews += 1;
    //     //     // }
          
    //     //     // if (review.stars && totalStars !== null) {
    //     //     //     totalStars += review.stars
    //     //     // }


    //     // })
    //     // spot.avgRating = totalStars/totalReviews
    // })

    // console.log(listOfSpots)
    // return res.json(listOfSpots)


})



module.exports = router;
