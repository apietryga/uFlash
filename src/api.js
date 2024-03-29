const { Router } = require('express')
const router = Router()
const multer = require("multer");
const files = require('./modules/files')

files.createDirIfNotExists("./storage/temp")
const upload = multer({ dest: "./storage/temp"});

const ImageController = require('./controllers/ImageController')
const LedsController = require('./controllers/LedsController')
const FaceRecognitionController = require('./controllers/FaceRecognitionController')
const PrintController = require('./controllers/PrintController')

  router.route('/template').get( ImageController.template.bind(ImageController) )
  router.route('/capture').get( ImageController.captureGET )
                          .post( upload.single("file"), ImageController.capturePOST.bind(ImageController) )

  router.route('/leds/:state').get( LedsController.toggle )
  router.route('/faceRecognition').get( FaceRecognitionController.detect )
  router.route('/print').get( PrintController.print )

  router.route('/templates/:page').get( ImageController.templatesGET.bind(ImageController) )
                                  .post( ImageController.templatesPOST.bind(ImageController) )
  router.route('/captured/:page').get( ImageController.capturesGET.bind(ImageController) )
  router.route('/results/:page').get( ImageController.resultsGET.bind(ImageController) )
  

module.exports = router