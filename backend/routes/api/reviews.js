const express = require('express');
const router = express.Router();
const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;

    const userReviews = await Review.findAll({
        where: {
            userId: user.id
        }
    })

    let listOfReviews = [];

    for (let i = 0; i < userReviews.length; i++) {
        let review = userReviews[i].toJSON();
        let user = await userReviews[i].getUser({
            attributes: ['id', 'firstName', 'lastName']
        });
        let spot = await userReviews[i].getSpot({attributes: {exclude: ['createdAt', 'updatedAt', 'description']}})
        let spotJson = spot.toJSON()
        let reviewImages = await userReviews[i].getReviewImages({
            attributes: {exclude: ['createdAt', 'updatedAt', 'reviewId']}
        });

        
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

        review.User = user;
        review.Spot = spotJson;
        review.ReviewImages = reviewImages;
        
        if (!review.ReviewImages.length) review.ReviewImages = 'No review images yet'

        listOfReviews.push(review)
    }

    
    if (!listOfReviews.length) listOfReviews = 'No reviews written yet'
    res.status(200).json({ Reviews: listOfReviews })
})



router.post('/:reviewId/images', requireAuth, async (req, res) => {

    let paramsId = parseInt(req.params.reviewId)
    const { user } = req
    let particularReview = await Review.findByPk(paramsId)
    
    if (!particularReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }
    if (user.id !== particularReview.userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
    
    let reviewImgs = await particularReview.getReviewImages()
    
    if (reviewImgs.length >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    } else {
        const { url } = req.body;

        const newReviewImg = await ReviewImage.create({
            url,
            reviewId: paramsId
        })
        const displayReviewImage = await ReviewImage.findByPk(newReviewImg.id, {attributes: ['id', 'url']})
        return res.status(200).json(displayReviewImage)
    }

})

















module.exports = router;
