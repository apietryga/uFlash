const { Router } = require('express')
const ImageController = require('./controllers/ImageController')
const router = Router()

router.route('/capture').get(ImageController.capture);

module.exports = router