const express = require('express');
const router = express.Router();
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


router.delete('/:imageId', requireAuth, async (req, res) => {
    const paramsId = parseInt(req.params.imageId)
    const { user } = req;
    const imageToDelete = await ReviewImage.findByPk(paramsId)

    if (!imageToDelete) {
        return res.status(404).json({
            message: "Review Image couldn't be found"
        })
    }

    const review = await imageToDelete.getReview()

    if (user.id !== review.userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    console.log('userid', user.id)
    console.log('reviews user id', review.userId)

    await imageToDelete.destroy()

    return res.status(200).json({
        message: "Successfully deleted"
    })

})


module.exports = router;
