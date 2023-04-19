const express = require('express');
const router = express.Router();
const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

router.get('/', async (req, res) => {

    const allSpots = await Spot.findAll();

    let listOfSpots = [];

    for (let i = 0; i < allSpots.length; i++) {
        let spot = allSpots[i].toJSON();
        let reviews = await allSpots[i].getReviews();
        let spotImages = await allSpots[i].getSpotImages();


        if (Object.keys(reviews).length) {
            let totalReviews = reviews.length;
            let totalStars = 0;

            reviews.forEach(review => {
                if (review.stars) {
                    totalStars += review.stars
                }
            })
            spot.avgRating = (totalStars / totalReviews).toFixed(1);
        } else {
            spot.avgRating = 'Not Available. No reviews yet';
        }


        if (spotImages.length) {
            spotImages.forEach(spotImage => {
                spot.previewImage = spotImage.url
            })
        } else {
            spot.previewImage = 'No image yet'
        }
        listOfSpots.push(spot)
    }

    return res.status(200).json({ Spots: listOfSpots })
})


router.get('/current', requireAuth, async (req, res) => {

    const allSpots = await Spot.findAll();

    let listOfSpots = [];
    let user = req.user;

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
            spot.avgRating = (totalStars / totalReviews).toFixed(1);
        } else {
            spot.avgRating = 'Not Available. No reviews yet';
        }

        if (spotImages.length) {
            spotImages.forEach(spotImage => {
                spot.previewImage = spotImage.url
            })
        } else {
            spot.previewImage = 'No image yet'
        }

        if (spot.ownerId === user.id) {
            listOfSpots.push(spot)
        }

    }
    return res.status(200).json({ Spots: listOfSpots })

})




router.post('/', requireAuth, async (req, res) => {

    let currentUserId = req.user.toJSON().id;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    let errorObj = {};
    if (!address) errorObj.address = "Street address is required"
    if (!city) errorObj.city = "City is required"
    if (!state) errorObj.state = "State is required"
    if (!country) errorObj.country = "Country is required"
    if (+lat < -90 || +lat > 90) errorObj.lat = "Latitude is not valid"
    if (+lng < -180 || +lng > 180) errorObj.lng = "Longitude is not valid"
    if (name.length >= 50) errorObj.name = "Name must be less than 50 characters"
    if (!description) errorObj.description = "Description is required"
    if (!price) errorObj.price = "Price per day is required"


    if (Object.keys(errorObj).length) {

        return res.status(400).json({
            message: "Bad Request",
            errors: errorObj
        })
    }

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: currentUserId
    })


    const displayedResult = await Spot.findByPk(newSpot.id, {
        attributes: {
            exclude: ['ownerId']
        }
    })
    return res.status(201).json(displayedResult)
})



router.post('/:spotId/images', requireAuth, async (req, res) => {
    let paramsId = parseInt(req.params.spotId)
    let currentUserId = req.user.toJSON().id;
    const userSpots = await Spot.findAll({
        where: {
            ownerId: currentUserId
        }
    })

    let foundSpot;
    
    userSpots.forEach(userSpot => {
        if (userSpot.toJSON().id === paramsId) {
            foundSpot = userSpot
        }
    })

    if (!foundSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    const { url, preview } = req.body;
    const newSpotImg = await SpotImage.create({
        url,
        preview,
        spotId: paramsId
    })


    const displaySpotImage = await SpotImage.findByPk(newSpotImg.id, {
        attributes: {
            exclude: ['spotId', 'createdAt', 'updatedAt']
        }
    })
    return res.status(200).json(displaySpotImage)

})



router.put('/:spotId', requireAuth, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    let paramsId = parseInt(req.params.spotId)
    let currentUserId = req.user.toJSON().id;
    const userSpots = await Spot.findAll({
        where: {
            ownerId: currentUserId
        }
    })

    let foundSpot;
    
    userSpots.forEach(userSpot => {
        if (userSpot.toJSON().id === paramsId) {
            foundSpot = userSpot
        }
    })

    if (!foundSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    let errorObj = {};
    if (!address) errorObj.address = "Street address is required"
    if (!city) errorObj.city = "City is required"
    if (!state) errorObj.state = "State is required"
    if (!country) errorObj.country = "Country is required"
    if (+lat < -90 || +lat > 90) errorObj.lat = "Latitude is not valid"
    if (+lng < -180 || +lng > 180) errorObj.lng = "Longitude is not valid"
    if (name.length >= 50) errorObj.name = "Name must be less than 50 characters"
    if (!description) errorObj.description = "Description is required"
    if (!price) errorObj.price = "Price per day is required"



    if (Object.keys(errorObj).length) {

        return res.status(400).json({
            message: "Bad Request",
            errors: errorObj
        })
    }

  

    const spotToEdit = await Spot.findByPk(paramsId)

    spotToEdit.address = address
    spotToEdit.city = city
    spotToEdit.state = state
    spotToEdit.country = country
    spotToEdit.lat = lat
    spotToEdit.lng = lng
    spotToEdit.name = name
    spotToEdit.description = description
    spotToEdit.price = price
    spotToEdit.ownerId = currentUserId

    return res.status(200).json(spotToEdit)

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
        spotJson.avgStarRating = (totalStars / totalReviews).toFixed(1);
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
    return res.status(200).json(spotJson)

})

router.delete('/:spotId', requireAuth, async (req, res) => {
    
    let paramsId = parseInt(req.params.spotId)
    let currentUserId = req.user.toJSON().id;
    const userSpots = await Spot.findAll({
        where: {
            ownerId: currentUserId
        }
    })

    let foundSpot;
    
    userSpots.forEach(userSpot => {
        if (userSpot.toJSON().id === paramsId) {
            foundSpot = userSpot
        }
    })

    if (!foundSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    delete foundSpot;

    return res.status(200).json({
        message: "Successfully deleted"
    })

})






module.exports = router;
