const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

const { Spot } = require('../../db/models');


router.get('/', async (req, res) => {

    const allSpots = await Spot.findAll();

    let listOfSpots = [];

    for (let i = 0; i < allSpots.length; i++) {
        let spot = allSpots[i].toJSON();
        let reviews = await allSpots[i].getReviews();
        let spotImages = await allSpots[i].getSpotImages();


        if (reviews.length) {
            let totalReviews = reviews.length;
            let totalStars = 0;

            reviews.forEach(review => {
                if (review.stars) {
                    totalStars += review.stars
                }
            })
            spot.avgRating = totalStars / totalReviews;
        } else {
            spot.avgRating = 'Not Available. No reviews yet';
        }

        
        if (spotImages.length) {
            spotImages.forEach(spotImage => {
                spot.previewImage = spotImage.url
            })
        }
        listOfSpots.push(spot)
    }

    return res.json(listOfSpots)
})


router.get('/:spotId', async (req, res, next) => {

    const idParam = req.params.spotId;

    const spot = await Spot.findByPk(idParam);
    if (!spot) {
        next(err)
    }
    let spotJson = spot.toJSON()

    let reviews = await spot.getReviews();
    if (reviews.length) {
        let totalReviews = reviews.length;
        let totalStars = 0;

        reviews.forEach(review => {
            if (review.stars) {
                totalStars += review.stars
            }
        })
        spotJson.numReviews = totalReviews;
        spotJson.avgStarRating = totalStars / totalReviews;
    } else {
        spotJson.numReviews = 0;
        spotJson.avgStarRating = 'Not Available. No reviews yet';
    }


    const spotImages = await spot.getSpotImages(
        {attributes: {
            exclude: ['createdAt', 'updatedAt', 'spotId']
        }}
    );
  
    const owner = await spot.getUser({
        attributes: {
            exclude: ['username']
        }
    });

    spotJson.SpotImages = spotImages;
    spotJson.Owner = owner;

    return res.json(spotJson)

})


router.use((err, req, res, next) => {
    res.status(404).send(
        {
            message: "Spot couldn't be found"
        }
    )
    
})

module.exports = router;
