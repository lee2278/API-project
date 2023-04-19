const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

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


router.get('/current', requireAuth, async (req, res) => {
    
    const allSpots = await Spot.findAll();
   
    let listOfSpots = [];

    for (let i = 0; i < allSpots.length; i++) {
        let spot = allSpots[i].toJSON();
        let user = await allSpots[i].getUser();
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

        if (spot.ownerId === user.id) {
            listOfSpots.push(spot)
            
            return res.status(200).json({Spots: listOfSpots})
        }

    }

})







router.get('/:spotId', async (req, res) => {

    const idParam = req.params.spotId;

    const spot = await Spot.findByPk(idParam);
    if (!spot) {
        res.status(404).send(
            {
                message: "Spot couldn't be found"
            }
        )
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
        {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'spotId']
            }
        }
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



module.exports = router;
