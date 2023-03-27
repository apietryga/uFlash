const { Router } = require('express')
const ImageController = require('./controllers/ImageController')
const LedsController = require('./controllers/LedsController')
const router = Router()
const multer = require("multer");
const upload = multer({ dest: "./temp"});

  router.route('/capture').get( ImageController.captureGET )
                          .post( upload.single("file"), ImageController.capturePOST )
  router.route('/leds/:state').get( LedsController.toggle )

module.exports = router