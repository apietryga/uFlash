const path = require("path");
const tf = require("@tensorflow/tfjs-node");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const fs = require("fs");
// const modelPathRoot = "./models";
const modelPathRoot = "../models/FaceRecognition";
const files = require("../modules/files");
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

async function detectTF(tensor) {
  const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet);
  return result;
}

async function main(file) {
  // console.log("FaceAPI single-process test");
  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set("DEBUG", false);
  await faceapi.tf.ready();

  // console.log(
  //   `Version: TensorFlow/JS ${faceapi.tf?.version_core} FaceAPI ${
  //     faceapi.version.faceapi
  //   } Backend: ${faceapi.tf?.getBackend()}`
  // );

  // console.log("Loading FaceAPI models");
  const modelPath = path.join(__dirname, modelPathRoot);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
  });

  const tensor = await image(file);
  const result = await detectTF(tensor);
  // console.log("Detected faces:", result.length);

  tensor.dispose();

  return result;
}

module.exports = new class FaceRecognitionController{
  async detect( req, res ){
    const dir = path.join(__dirname, "../../storage/captured");
    // const files = fs.readdirSync(dir);
    // const file_numbers = files.map( file => file.split("_")[1].split(".")[0] * 1)
    // file_numbers.sort()
    // const max_file_number = Math.max(...file_numbers)
    const max_file_number = files.getMaxFileNumber(dir)
    const last_file = "img_" + max_file_number + ".jpg";
    const img_path = path.join(__dirname, "../../storage/captured", last_file);
    const resized = await sharp(img_path)
      .resize(612,408)
      .jpeg({ mozjpeg: true })
      .toBuffer()

    const faces = await main(resized)

    res.json({ message: 'faces counted successfully', faces })
  }
}
