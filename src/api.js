const { Router } = require('express')
const ImageController = require('./controllers/ImageController')
const router = Router()
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({
  dest: "./temp"
  // dest: "/path/to/temporary/directory/to/store/uploaded/files"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.route('/capture').get( ImageController.captureGET)
                        .post( upload.single("file" /* name attribute of <file> element in your form */),
                          ImageController.capturePOST)



// const handleError = (err, res) => {
//   res
//     .status(500)
//     .contentType("text/plain")
//     .end("Oops! Something went wrong!");
// };

// const upload = multer({
//   dest: "/path/to/temporary/directory/to/store/uploaded/files"
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });


// router.post(
//   "/capture",
//   upload.single("file" /* name attribute of <file> element in your form */),
//   (req, res) => {
//     const tempPath = req.file.path;
//     const targetPath = path.join(__dirname, "./uploads/image.png");

//     if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(200)
//           .contentType("text/plain")
//           .end("File uploaded!");
//       });
//     } else {
//       fs.unlink(tempPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(403)
//           .contentType("text/plain")
//           .end("Only .png files are allowed!");
//       });
//     }
//   }
// );









module.exports = router