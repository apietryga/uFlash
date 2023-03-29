// const { exec } = require('node:child_process');
const { exec } = require('child_process');

module.exports = new class LedsController{

  print( req, res ){
    // TODO: PRINT ON LED BELOW CODE
    setTimeout( () => {
      exec('echo "print" > /dev/ttyUSB0', (error, stdout, stderr) => {
        if (error) {
          return res.json({ message: 'print: module not tested yet' , error })
        }
        if (stderr) {
          return res.json({ message: 'print: module not tested yet' , stderr })
        }
        return res.json({ message: 'print: module not tested yet' , stdout })
      });
    }, 3000)
    // return res.json({ message: 'print: module not tested yet' })
  }
}

// ! OLD PHP CODE from public/ic/php/funtions.php
// if(isset($_GET['print'])){
//   $src = "\\forprinter.jpg";
//   $paste = getSRCiv().''.$src.' /print';
//   $o = fopen("../bat/print.bat","w");
//   fwrite($o,$paste);
//   fclose($o);
//   $path = getSRC()."print.bat";
//   exec($path);
// }

// !print.bat
// C:\xampp\htdocs\inc\irfan\i_view64.exe C:\xampp\htdocs\inc\img\results\forprinter.jpg /print


// if(isset($_GET['checkstatus'])){
// 		sleep(1);
// 		$path = getSRC()."checkstatus.bat";
// 		exec($path,$ex);
// 		$y = 0;
// 		for($x = 0 ; $x <= count($ex)-2; $x++){
// 			if($x > 2){
// 			//	echo $x.":".$ex[$x]."<br /><br /><br />";
// 				$y++;
// 			}
// 		}
// 		echo $y;
// 	}

// !checkstatus.bat
// wmic printjob get