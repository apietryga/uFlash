const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
module.exports = new class ImageController {

  createDirIfNotExists(dir) {
    if (!fs.existsSync(dir)){ 
      if( !fs.existsSync(path.dirname(dir)) ){
        this.createDirIfNotExists(path.dirname(dir))
      }
      fs.mkdirSync(dir) 
    }
    return dir
  }
  
  /**
  * Getting image from external EOS camera
  * !NOT TESTED YET! - GETTED FROM public/inc/php/functions.php
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Returns a JSON object
  */
  captureGET (req, res) {
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
  }

  /**
   * Getting image from WebCam
   */
  capturePOST ( req, res) {
    const tempPath = req.file.path;
    // const dir = path.join(__dirname, "../../storage");
    // if (!fs.existsSync(dir)){ fs.mkdirSync(dir) }
    console.log({ this : this})
    const dir = this.createDirIfNotExists(path.join(__dirname, "../../storage/captured"));
    // const targetPath = dir + "/img_"+ fs.readdirSync(dir).length +".png";
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
  template ( req, res ) {
    const dir = path.join(__dirname, "../../storage");
    const files = fs.readdirSync(dir);
    const file_numbers = files.map( file => file.split("_")[1].split(".")[0] * 1)
    file_numbers.sort()
    const max_file_number = Math.max(...file_numbers)
    const last_file = "img_" + max_file_number + ".jpg";
    const last_file_path = dir + "/" + last_file;
    const template_path = path.join(__dirname, "../../public/inc/img/templates/blank_template.png");
    const output_path = path.join(__dirname, "../../public/inc/img/output.jpg");
    sharp(template_path)
      .composite([{ input: last_file_path, gravity: "southeast" }])
      .toFile(output_path, (err, info) => {
        if (err) return res.json({ "message": "template error", err });
        res.json({ "message": "template created" })
      });
    //


    res.json({ "message": "template module is in progress" })
  }
}