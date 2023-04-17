const express = require('express');
const router = express.Router();
const {Spot, Review, ReviewImage} = require('../../db/models')


router.get('/', async(req, res) => {

const totalReviews = await Review.count();
const totalStars = await Review.sum('stars')


let where = {}
where.avgRating = totalStars/totalReviews;
where.previewImg = ReviewImage.url

    const spots = await Spot.findAll(
        // {where}
    );
    return res.json(spots);
})



module.exports = router;
