const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review, Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth')
const { singleMulterUpload, singlePublicFileUpload, multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3')


router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    let queryObj = {}

    page = parseInt(page)
    size = parseInt(size)
    minLat = parseFloat(minLat)
    maxLat = parseFloat(maxLat)
    minLng = parseFloat(minLng)
    maxLng = parseFloat(maxLng)
    minPrice = parseFloat(minPrice)
    maxPrice = parseFloat(maxPrice)

    if (Number.isNaN(page) || page > 10) page = 1;
    if (Number.isNaN(size) || size >= 20) size = 20;


    if (minPrice < 0) minPrice = 0
    if (maxPrice < 0) maxPrice = 0

    if (page || size) {
        queryObj.limit = size
        queryObj.offset = size * (page - 1)
    }

    let where = {}

    if (minLat && minLat <= 90) where.lat = { [Op.gte]: minLat };
    if (maxLat && maxLat >= -90) where.lat = { [Op.lte]: maxLat };
    if (minLng && minLng <= 180) where.lng = { [Op.gte]: minLng };
    if (maxLng && maxLng >= -180) where.lng = { [Op.lte]: maxLng };
    if (minPrice) where.price = { [Op.gte]: minPrice };
    if (maxPrice) where.price = { [Op.lte]: maxPrice };



    let errorObj = {}

    if (page < 1) errorObj.page = "Page must be greater than or equal to 1"
    if (size < 1) errorObj.size = "Size must be greater than or equal to 1"
    if (minLat < -90 || minLat > 90) errorObj.minLat = "Minimum latitude is invalid"
    if (maxLat > 90 || maxLat < -90) errorObj.maxLat = "Maximum latitude is invalid"
    if (minLng < -180 || minLng > 180) errorObj.minLng = "Minimum longitude is invalid"
    if (maxLng > 180 || maxLng < -180) errorObj.maxLng = "Maximum longitude is invalid"
    if (minPrice < 0) errorObj.minPrice = "Minimum price must be greater than or equal to 0"
    if (maxPrice < 0) errorObj.maxPrice = "Maximum price must be greater than or equal to 0"

    if (Object.keys(errorObj).length) {

        return res.status(400).json({
            message: "Bad Request",
            errors: errorObj
        })
    }



    const allSpots = await Spot.findAll({
        where,
        ...queryObj
    });

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


    let result = {
        Spots: listOfSpots,
        page,
        size
    }
    return res.status(200).json(result)
})


router.get('/current', requireAuth, async (req, res) => {



    const allSpots = await Spot.findAll();

    let listOfSpots = [];
    const { user } = req;



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


router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    let paramsId = parseInt(req.params.spotId)
    const { user } = req
    const { review, stars } = req.body;

    let particularSpot = await Spot.findByPk(paramsId)

    if (!particularSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (user.id === particularSpot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
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



router.post('/:spotId/images', requireAuth, multipleMulterUpload("image"), async (req, res) => {
    let paramsId = parseInt(req.params.spotId)
    const { user } = req
    let particularSpot = await Spot.findByPk(paramsId)

    const { preview } = req.body;

    let imageurl;
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


    if (req.files) {
        imageurl = await multiplePublicFileUpload(req.files)
        if (imageurl.length > 1) {
                  for (let i = 0; i < req.files.length; i++) {
            await SpotImage.create({
                url: imageurl[i],
                preview: preview[i],
                spotId: paramsId
            })
        }  
        } else {
            await SpotImage.create({
                url: imageurl[0],
                preview,
                spotId: paramsId
            })
        }

    } 


    // const displaySpotImage = await SpotImage.findAll({
    //     where: {
    //         spotId: paramsId
    //     },
    //     attributes: {
    //         exclude: ['spotId', 'createdAt', 'updatedAt']
    //     }

    // })



    // return res.status(200).json(displaySpotImage)
    // just need to return something anything
    return res.status(200).json({"key": 'value'})

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

    const { user } = req;

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    let listOfBookings = [];


    const bookings = await spot.getBookings()



    for (let i = 0; i < bookings.length; i++) {

        let booking = bookings[i].toJSON();

        let bookingResponse = {}
        bookingResponse.spotId = booking.spotId;
        bookingResponse.startDate = booking.startDate;
        bookingResponse.endDate = booking.endDate;


        let bookingUser = await bookings[i].getUser({
            attributes: ['id', 'firstName', 'lastName']
        });


        if (user.id !== spot.ownerId) {
            listOfBookings.push(bookingResponse)
        } else {
            booking.User = bookingUser;
            listOfBookings.push(booking)
        }
    }
    if (!listOfBookings.length) listOfBookings = 'No bookings yet'
    res.json({ Bookings: listOfBookings })

})



router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    let paramsId = parseInt(req.params.spotId)
    const { user } = req
    let particularSpot = await Spot.findByPk(paramsId)


    if (!particularSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (user.id === particularSpot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    let { startDate, endDate } = req.body;

    let newStartDate = new Date(startDate).getTime()
    let newEndDate = new Date(endDate).getTime()


    let errorObj = {};
    if (newEndDate < newStartDate) {
        errorObj.endDate = "endDate cannot be on or before startDate"
    }

    if (Object.keys(errorObj).length) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errorObj
        })
    }

    const allBookings = await particularSpot.getBookings();

    allBookings.forEach(booking => {
        let convertedStart = new Date(booking.startDate.toDateString()).getTime();
        let convertedEnd = new Date(booking.endDate.toDateString()).getTime();

        if ((newStartDate >= convertedStart) && (newStartDate <= convertedEnd)) {
            errorObj.startDate = "Start date conflicts with an existing booking"
        }
        if ((newEndDate >= convertedStart) && (newEndDate <= convertedEnd)) {
            errorObj.endDate = "End date conflicts with an existing booking"
        }
    })

    if (Object.keys(errorObj).length) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: errorObj
        })
    }

    const newBooking = await Booking.create({

        spotId: paramsId,
        userId: user.id,
        startDate,
        endDate
    })


    return res.status(200).json(newBooking)

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
    res.json({ Reviews: listOfReviews })

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


    let spotImages = await spot.getSpotImages(
        {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'spotId']
            }
        }
    );

    if (!spotImages.length) spotImages = 'No spot images yet'

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
