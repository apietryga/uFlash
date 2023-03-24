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
    res.json({ "test": true })
  }

  /**
   * Getting image from WebCam
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Returns a JSON object
   */
  capturePOST (req, res) {
    // console.log({ req })
    const tempPath = req.file.path;

    // fs create folder if not exist
    // const dir = './uploads/';
    const dir = path.join(__dirname, "../../storage");
    if (!fs.existsSync(dir)){ fs.mkdirSync(dir) }


    // const targetPath = path.join(__dirname, "./uploads/image.png");
    const targetPath = dir + "/img_"+ fs.readdirSync(dir).length +".png";

    // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        // if (err) return handleError(err, res);
        if (err) return res.json({ err });
        res.json({ "success": true })
          // .status(200)
          // .contentType("text/plain")
          // .end("File uploaded!");
      });
    // } else {
    //   fs.unlink(tempPath, err => {
    //     if (err) return handleError(err, res);

    //     res
    //       .status(403)
    //       .contentType("text/plain")
    //       .end("Only .png files are allowed!");
    //   });
    // }
//   }
// );
    

   
    // res.json({ "test": true })
  }
}