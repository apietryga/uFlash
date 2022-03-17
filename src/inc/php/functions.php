<?php
	// develop mode 
	function png2jpg($originalFile, $outputFile, $quality) {
		$image = imagecreatefrompng($originalFile);
		imagejpeg($image, $outputFile, $quality);
		imagedestroy($image);
	}
	function getSRC(){
		$f = "../../control_inc/values/config";
		$o = fopen($f,"r");
		$r = fread($o,filesize($f));
		$e0 = explode(";",$r);
		$e1 = explode("|",$e0[0]);
		fclose($o);
		if($e1[1] == 0){
			$path = "C:\\xampp\\htdocs\\inc\\bat\\";
		}else{
			$path = "C:\\xampp\\htdocs\\fotolustro\\Program\\inc\\bat\\";
		}
		return $path;
	}
	function getSRCiv(){
		$f = "../../control_inc/values/config";
		$o = fopen($f,"r");
		$r = fread($o,filesize($f));
		$e0 = explode(";",$r);
		$e1 = explode("|",$e0[0]);
		fclose($o);
		if($e1[1] == 0){
			$path = "C:\\xampp\\htdocs\\inc\\irfan\\i_view64.exe C:\\xampp\\htdocs\\inc\\img\\results";
		}else{
			$path = "C:\\xampp\\htdocs\\fotolustro\\Program\\inc\\irfan\\i_view64.exe C:\\xampp\\htdocs\\fotolustro\\Program\\inc\\img\\results";
		}
		return $path;
	}
	function getSRCdc(){
		$f = "../../control_inc/values/config";
		$o = fopen($f,"r");
		$r = fread($o,filesize($f));
		$e0 = explode(";",$r);
		$e1 = explode("|",$e0[0]);
		fclose($o);
		if($e1[1] == 0){
			$path = "C:\\xampp\\htdocs\\inc\\digicam\\CameraControlCmd.exe /folder C:\\xampp\\htdocs\\inc\\img\\captured /captureall";
		}else{
			$path = "C:\\xampp\\htdocs\\fotolustro\\Program\\inc\\digicam\\CameraControlCmd.exe /folder C:\\xampp\\htdocs\\fotolustro\\Program\\inc\\img\\captured /captureall";
		}
		return $path;
	}
	function getTemplate(){
		$f = "../../control_inc/values/config";
		$o = fopen($f,"r");
		$r = fread($o,filesize($f));
		$e0 = explode(";",$r);
		$e1 = explode("|",$e0[1]);
		fclose($o);
		return $e1[1];		
	}
	if(isset($_GET['photos'])){
		$urls = "[";
		$dir = "../img/captured/";
		$f = scandir($dir);
		$y = 0;
		for($x = count($f)-3; $x <= count($f)-1; $x++){
			if($f[$x] != "." && $f[$x] != ".." && $f[$x] != "old" ){
				$urls .= "'inc/img/captured/".$f[$x]."'";
				$y++;
				if($y < 3){
					$urls .= ",";
				}
			}
		}
		$urls .= ",'".getTemplate()."']";
		echo $urls;
	}
	if(isset($_GET['capture'])){
		$o = fopen("../bat/capture.bat","w");
		fwrite($o,getSRCdc());
		fclose($o);	
		$path = getSRC()."capture.bat";
		exec($path);
	/* Robienie smallPhoto */
		$width = "645px";
		$heihgt = "430px";
		$path = '../img/captured';
		$files = scandir($path, SCANDIR_SORT_DESCENDING);
		$newest_file = $files[0];
		echo $newest_file;
		$uploadedfile = $path."/".$newest_file; 
		$src = imagecreatefromjpeg($uploadedfile);        
		list($width, $height) = getimagesize($uploadedfile); 
		$tmp = imagecreatetruecolor(645, 430); 
		$filename = '../img/captured_small/small_'.$newest_file;
		imagecopyresampled($tmp, $src, 0, 0, 0, 0, 645, 430, $width, $height); 
		imagejpeg($tmp, $filename, 100);		
	}
	if(isset($_GET['print'])){
		$src = "\\forprinter.jpg";
		$paste = getSRCiv().''.$src.' /print';
		$o = fopen("../bat/print.bat","w");
		fwrite($o,$paste);
		fclose($o);
		$path = getSRC()."print.bat";
		exec($path);
	}
	if(isset($_GET['checkstatus'])){
		sleep(1);
		$path = getSRC()."checkstatus.bat";
		exec($path,$ex);
		$y = 0;
		for($x = 0 ; $x <= count($ex)-2; $x++){
			if($x > 2){
			//	echo $x.":".$ex[$x]."<br /><br /><br />";
				$y++;
			}
		}
		echo $y;
	}
	if(isset($_GET['upload'])){
		$data = $_POST['file'];
		$data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data));
		file_put_contents("../img/results/rendered.png",$data);
		png2jpg("../img/results/rendered.png","../img/results/converted.jpg",100);
		$filename="../img/results/converted.jpg";
		$degrees = 180;
		$source = imagecreatefromjpeg($filename);
		$rotate = imagerotate($source, $degrees, 0);
		imagejpeg($rotate, "../img/results/forprinter.jpg",100);
	}
	if(isset($_GET['led'])){
		$ac = $_GET['led'];
		if($ac == "on"){
			exec('c:\WINDOWS\system32\cmd.exe /c C:\xampp\htdocs\inc\bat\led_on.bat');
		}elseif($ac == "off"){
			exec('c:\WINDOWS\system32\cmd.exe /c C:\xampp\htdocs\inc\bat\led_off.bat');
		}
	}
?>