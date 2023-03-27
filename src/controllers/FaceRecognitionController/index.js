


const path = require("path");
const tf = require("@tensorflow/tfjs-node");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const fs = require("fs");
const modelPathRoot = "./models";
// const im = require('imagemagick');
// const resizeImage = require('resize-image');
//  import {convert} from "easyimage";
// const { resize } = require("easyimage");
const sharp = require('sharp');

let optionsSSDMobileNet;

async function image(file) {
  const decoded = tf.node.decodeImage(file);
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
}

async function detect(tensor) {
  const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet);
  return result;
}

async function main(file) {
  console.log("FaceAPI single-process test");

  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set("DEBUG", false);
  await faceapi.tf.ready();

  console.log(
    `Version: TensorFlow/JS ${faceapi.tf?.version_core} FaceAPI ${
      faceapi.version.faceapi
    } Backend: ${faceapi.tf?.getBackend()}`
  );

  console.log("Loading FaceAPI models");
  const modelPath = path.join(__dirname, modelPathRoot);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
  });

  const tensor = await image(file);
  const result = await detect(tensor);
  console.log("Detected faces:", result.length);

  tensor.dispose();

  return result;
}

module.exports = new class FaceRecognitionController{
  async detect( req, res ){

    // const img_path = path.join(__dirname, "../../../storage/img.jpg");

    // get last image from dir 
    const dir = path.join(__dirname, "../../../storage");
    const files = fs.readdirSync(dir);
    const last_file = files[files.length - 1];
    const img_path = path.join(__dirname, "../../../storage", last_file);

    // resize to valid buffer
      const resized = await sharp(img_path)
        .resize(612,408)
        .jpeg({ mozjpeg: true })
        .toBuffer()

      // const file = fs.readFileSync(img_path);
      // const file = fs.readFileSync(img_resized_path);
      // console.log({ file , resized})

      // const response = await main(file)
      const response = await main(resized)
      console.log( { response })
      // res.json({ message: 'faceRecognition: module not tested yet', params })
      res.json({ message: 'faceRecognition: module testing now', response })

    // });

  }
}
