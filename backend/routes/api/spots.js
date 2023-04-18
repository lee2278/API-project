const express = require('express');
const router = express.Router();
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


router.get('/:spotId', async (req, res) => {

    const idParam = req.params.spotId;

    const spot = await Spot.findByPk(idParam);
    let spotJson = spot.toJSON()

    const spotImages = await spot.getSpotImages(
        {attributes: {
            exclude: ['createdAt', 'updatedAt']
        }}
    );
  
    const owner = await spot.getUser();

    spotJson.spotImages = spotImages;
    spotJson.owner = owner;

    return res.json(spotJson)

})


module.exports = router;
