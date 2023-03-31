const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const files = require('../modules/files')
module.exports = new class ImageController {

  defaultTemplate = "blank_template3.png"

  /**
  * Getting image from external EOS camera
  * !NOT TESTED YET! - GETTED FROM public/inc/php/functions.php
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Returns a JSON object
  */
  captureGET( req, res) {
    //   $o = fopen("../bat/capture.bat","w");
    // 	fwrite($o,getSRCdc());
    // 	fclose($o);	
    // 	$path = getSRC()."capture.bat";
    // 	exec($path);
    // /* Robienie smallPhoto */
    // 	$width = "645px";
    // 	$heihgt = "430px";
    // 	$path = '../img/captured';
    // 	$files = scandir($path, SCANDIR_SORT_DESCENDING);
    // 	$newest_file = $files[0];
    // 	echo $newest_file;
    // 	$uploadedfile = $path."/".$newest_file; 
    // 	$src = imagecreatefromjpeg($uploadedfile);        
    // 	list($width, $height) = getimagesize($uploadedfile); 
    // 	$tmp = imagecreatetruecolor(645, 430); 
    // 	$filename = '../img/captured_small/small_'.$newest_file;
    // 	imagecopyresampled($tmp, $src, 0, 0, 0, 0, 645, 430, $width, $height); 
    // 	imagejpeg($tmp, $filename, 100);		
    res.json({ "source": "capture", "message" : "not setted yet" })
    // ! capture.bat : 
    // C:\xampp\htdocs\inc\digicam\CameraControlCmd.exe /folder C:\xampp\htdocs\inc\img\captured /captureall
  }

  /**
   * Getting image from WebCam
   */
  capturePOST( req, res) {
    const tempPath = req.file.path;
    const dir = files.createDirIfNotExists(path.join(__dirname, "../../storage/captured"));
    const targetPath = dir + "/img_"+ fs.readdirSync(dir).length +".jpg";
    fs.rename(tempPath, targetPath, err => {
      if (err) return res.json({ "message": "image uploading error", err });
      res.json({ "message": "image uploaded" })
    });
  }

  /**
   * Combine images with template
   * https://sharp.pixelplumbing.com/api-composite
   */
  template( req, res ) {
    const dir = path.join(__dirname, "../../storage/captured");
    const imgs = [ 2, 1, 0 ].map( i => dir + "\\img_" + ( files.getMaxFileNumber(dir) - i ) + ".jpg" )
    // const template_path = path.join(__dirname, "../models/Templates/blank_template3.png");
    const template_path = path.join(__dirname, "../models/Templates/" + this.defaultTemplate);
    const outdir = files.createDirIfNotExists(path.join(__dirname, "../../storage/results/"));
    const output_path = path.join(__dirname, "../../storage/results/output_" + ( files.getMaxFileNumber(outdir) + 1 ) + ".png");
    sharp(template_path)
    .composite([
      { input: imgs[0], top: 50, left: 50 },
      { input: imgs[1], top: 600, left: 50 },
      { input: imgs[2], top: 1150, left: 50 },
    ])
    .toFile(output_path, (err, info) => {
      if (err) return res.json({ "message": "template error", err });
      res.json({ "message": "template created" })
    });
  }

  listPhotos(pth){
    return fs.readdirSync(pth)
    .filter(src => ["png", "jpg"].includes(src.split(".")[1]))
    .map(src => {
      return {
        "src": src,
        "active": src === this.defaultTemplate
      }
    })
    .sort((a, b) => a.active ? -1 : b.active ? 1 : -1)
  }

  templatesGET( req, res ){
    res.json(this.listPhotos(path.join(__dirname, "../models/Templates/")))
  }

  templatesPOST( req, res ){
    this.defaultTemplate = req.body.src;
    res.json(this.listPhotos(path.join(__dirname, "../models/Templates/")))
  }

  capturesGET( req, res ){
    res.json(this.listPhotos(path.join(__dirname, "../../storage/captured")))
  }

  resultsGET( req, res ){
    res.json(this.listPhotos(path.join(__dirname, "../../storage/results")))
  }

}