const express = require('express');
const router = express.Router();
const { Booking, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;

    const userBookings = await Booking.findAll({
        where: {
            userId: user.id
        }
    })

    let listOfBookings = [];

    for (let i = 0; i < userBookings.length; i++) {
        let booking = userBookings[i].toJSON();
        let user = await userBookings[i].getUser({
            attributes: ['id', 'firstName', 'lastName']
        });
        let spot = await userBookings[i].getSpot({ attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } })
        let spotJson = spot.toJSON()



        let spotImages = await spot.getSpotImages()

        let spotPreviewImage = ''
        if (spotImages.length) {
            spotImages.forEach(spotImage => {
                if (spotImage.preview === true) {
                    spotPreviewImage = spotImage.url
                }
            })
        }


        spotJson.previewImage = spotPreviewImage || 'No preview image yet'

        booking.Spot = spotJson;
        listOfBookings.push(booking)
    }


    if (!listOfBookings.length) listOfBookings = 'No bookings yet'
    res.status(200).json({ Bookings: listOfBookings })
})


router.put('/:bookingsId', requireAuth, async (req, res) => {

    const paramsId = parseInt(req.params.bookingsId);

    const { user } = req

    let bookingToEdit = await Booking.findByPk(paramsId);
    
    if (!bookingToEdit) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }
    
    if (user.id !== bookingToEdit.userId) {
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
    
    let currentDate = new Date().getTime();
    if (newEndDate < currentDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        })
    }
    
    const allBookings2 = await Booking.findAll();
    const allBookings = allBookings2.filter(booking => booking.id !== +paramsId) 
    // let spot = bookingToEdit.getSpot()

    
    allBookings.forEach(booking => {
        let convertedStart = new Date (booking.startDate.toDateString()).getTime();
        let convertedEnd = new Date (booking.endDate.toDateString()).getTime();

        

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

    const editedBooking = await bookingToEdit.update({
        startDate,
        endDate
    })


    // bookingToEdit.spotId = spot.id
    // bookingToEdit.userId = user.id;
    // bookingToEdit.startDate = startDate;
    // bookingToEdit.endDate = endDate;
    
    await bookingToEdit.save();
    // return res.status(200).json(bookingToEdit)
    return res.status(200).json(editedBooking)

})


router.delete('/:bookingId', requireAuth, async (req, res) => {

    const paramsId = parseInt(req.params.bookingId)
    const { user } = req;
    const bookingToDelete = await Booking.findByPk(paramsId)

    const bookingSpot = await Spot.findByPk(bookingToDelete.spotId)

    const spotOwnerId = bookingSpot.ownerId

    if (!bookingToDelete) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    if (user.id !== bookingToDelete.userId && user.id !== spotOwnerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

  


    let convertedStart = new Date(bookingToDelete.startDate.toDateString()).getTime();
    
    let currentDate = new Date().getTime();
   
    if (convertedStart <= currentDate) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await bookingToDelete.destroy()

    return res.status(200).json({
        message: "Successfully deleted"
    })
})








module.exports = router;
