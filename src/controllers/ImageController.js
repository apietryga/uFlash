const path = require('path');
const fs = require('fs');

module.exports = new class ImageController {
  
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
    const dir = path.join(__dirname, "../../storage");
    if (!fs.existsSync(dir)){ fs.mkdirSync(dir) }
    // const targetPath = dir + "/img_"+ fs.readdirSync(dir).length +".png";
    const targetPath = dir + "/img_"+ fs.readdirSync(dir).length +".jpg";
    fs.rename(tempPath, targetPath, err => {
      if (err) return res.json({ "message": "image uploading error", err });
      res.json({ "message": "image uploaded" })
    });
  }
}