const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review } = require('../../db/models');
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
                if (spotImage.preview === true) {
                    spot.previewImage = spotImage.url
                } else if (!spot.previewImage) {
                    spot.previewImage = 'No preview image yet'
                }
            })
        } else {
            spot.previewImage = 'No preview image yet'
        }
        listOfSpots.push(spot)
    }
    if (!listOfSpots.length) listOfSpots = 'No spots yet'
    return res.status(200).json({ Spots: listOfSpots })
})


router.get('/current', requireAuth, async (req, res) => {
    


    const allSpots = await Spot.findAll();

    let listOfSpots = [];
    const {user} = req;



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
                if (spotImage.preview === true) {
                    spot.previewImage = spotImage.url
                } else if (!spot.previewImage)
                spot.previewImage = 'No preview image yet'
            })
        } else {
            spot.previewImage = 'No preview image yet'
        }

        if (spot.ownerId === user.id) {
            listOfSpots.push(spot)
        } 

    }
    if (!listOfSpots.length) listOfSpots = 'No spots yet'
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


router.post('/:spotId/reviews', async (req, res) => {
    let paramsId = parseInt(req.params.spotId)
    const { user } = req
    const { review, stars } = req.body;

    let particularSpot = await Spot.findByPk(paramsId)

    if (!particularSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    let errorObj = {};
    if (!review) errorObj.review = "Review text is required"
    if ((!Number.isInteger(stars)) || stars < 1 || stars > 5) {
        errorObj.stars = "Stars must be an integer from 1 to 5"
    }

    if (Object.keys(errorObj).length) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errorObj
        })
    }

    let spotReviews = await particularSpot.getReviews();
    spotReviews.forEach(spotReview => {
        if (spotReview.userId === user.id) {
            return res.status(500).json({
                message: "User already has a review for this spot"
            })
        }  
    })

    

    const newReview = await Review.create({
        userId: user.id,
        spotId: paramsId,
        review,
        stars
    })
    return res.status(201).json(newReview)
})



router.post('/:spotId/images', requireAuth, async (req, res) => {
    let paramsId = parseInt(req.params.spotId)
    const { user } = req
    let particularSpot = await Spot.findByPk(paramsId)


    if (!particularSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (user.id !== particularSpot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
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

    const { user } = req;

    let paramsId = parseInt(req.params.spotId)
    let spotToEdit = await Spot.findByPk(paramsId)

    if (!spotToEdit) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (user.id !== spotToEdit.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
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


    spotToEdit.address = address
    spotToEdit.city = city
    spotToEdit.state = state
    spotToEdit.country = country
    spotToEdit.lat = lat
    spotToEdit.lng = lng
    spotToEdit.name = name
    spotToEdit.description = description
    spotToEdit.price = price
    spotToEdit.ownerId = user.id


    await spotToEdit.save();
    return res.status(200).json(spotToEdit)

})


router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    
    const paramsId = parseInt(req.params.spotId);
    
    const spot = await Spot.findByPk(paramsId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    let listOfBookings = [];

  
    const bookings = await spot.getBookings();
    
   
    for (let i = 0; i < bookings.length; i++) {

        let booking = bookings[i].toJSON();

        let user = await bookings[i].getUser({
            attributes: ['id', 'firstName', 'lastName']
        });
       
        
        if (user.id !== spot.ownerId) {
            listOfBookings.push(booking)
        } else {
            booking.User = user;
            listOfBookings.push(booking)
        }
    }
    if (!listOfBookings.length) listOfBookings = 'No bookings yet'
    res.json({Bookings: listOfBookings})

})


















router.get('/:spotId/reviews', async (req, res) => {
    
    const paramsId = parseInt(req.params.spotId);

    const spot = await Spot.findByPk(paramsId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    
    const reviews = await spot.getReviews();
    
    let listOfReviews = [];
   
    for (let i = 0; i < reviews.length; i++) {

        let review = reviews[i].toJSON();

        let user = await reviews[i].getUser({
            attributes: ['id', 'firstName', 'lastName']
        });
        let reviewImages = await reviews[i].getReviewImages({
            attributes: ['id', 'url']
        })


        review.userId = user.id;
        review.spotId = spot.id;
        review.User = user;
        if (reviewImages.length) {
            review.ReviewImages = reviewImages 
        } else {
            review.ReviewImages = 'No review images yet'
        }
        listOfReviews.push(review)
    }
    if (!listOfReviews.length) listOfReviews = 'No reviews yet'
    res.json({Reviews: listOfReviews})

})









router.get('/:spotId', async (req, res) => {

    const paramsId = parseInt(req.params.spotId);

    const spot = await Spot.findByPk(paramsId);
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

    const paramsId = parseInt(req.params.spotId)
    const { user } = req;
    const particularSpot = await Spot.findByPk(paramsId)

    if (!particularSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (user.id !== particularSpot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await particularSpot.destroy()

    return res.status(200).json({
        message: "Successfully deleted"
    })

})























module.exports = router;
