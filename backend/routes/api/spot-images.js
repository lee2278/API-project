const express = require('express');
const router = express.Router();
const { SpotImage} = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


router.delete('/:imageId', requireAuth, async (req, res) => {
    const paramsId = parseInt(req.params.imageId)
    const { user } = req;
    const imageToDelete = await SpotImage.findByPk(paramsId)

    if (!imageToDelete) {
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }

    const spot = await imageToDelete.getSpot()

    if (user.id !== spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await imageToDelete.destroy()

    return res.status(200).json({
        message: "Successfully deleted"
    })

})



module.exports = router;
