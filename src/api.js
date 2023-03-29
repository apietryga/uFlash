const { Router } = require('express')
const router = Router()
const multer = require("multer");
// const upload = multer({ dest: "./temp"});
const upload = multer({ dest: "./storage/temp"});

const ImageController = require('./controllers/ImageController')
const LedsController = require('./controllers/LedsController')
const FaceRecognitionController = require('./controllers/FaceRecognitionController')

  router.route('/template').get( ImageController.template )
  router.route('/capture').get( ImageController.captureGET )
                          .post( upload.single("file"), ImageController.capturePOST.bind(ImageController) )

  router.route('/leds/:state').get( LedsController.toggle )
  router.route('/faceRecognition').get( FaceRecognitionController.detect )

module.exports = router