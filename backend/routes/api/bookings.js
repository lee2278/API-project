const express = require('express');
const router = express.Router();
const { Booking } = require('../../db/models');
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
        let spot = await userBookings[i].getSpot({attributes: {exclude: ['createdAt', 'updatedAt', 'description']}})
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







module.exports = router;
