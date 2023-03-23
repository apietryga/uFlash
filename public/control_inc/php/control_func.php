<?php
	function changeValue($what,$how){
		$fX = "../values/config";
		$o = fopen($fX,'r');
		$c = fread($o,filesize($fX));
		if($what == 'refresh'){
			echo $c;
		}else{
			$p['develop'] = 0;
			$p['template'] = 1;
			$ex0 = explode(";",$c);
			$newVal = "";
			for($x = 0; $x <= count($ex0)-1; $x++){
				if($x == $p[$what]){
					$ex1 =  explode("|",$ex0[$p[$what]]);
					$newVal .= str_replace($ex1[1],$how,$ex0[$x]);
				}else{
					$newVal .= $ex0[$x];
				}
				if($x != count($ex0)-1){
					$newVal .= ";";
				}
			}		
			fclose($o);
			$o = fopen($fX,'w');
			fwrite($o,$newVal);
			fclose($o);
			echo $newVal;
		}
	}
	if(isset($_GET['g'])){
		foreach($_GET as $s => $k){
			if($s != 'g'){
				changeValue($s,$k);
			}
		}
	}
	
	if(isset($_GET['load_photos'])){
		$srcFULL = "./inc/img/captured"; 
		$src = "./inc/img/captured_small"; 
		$dir = "../../inc/img/captured_small";
		$a = scandir($dir);
		$b = scandir($dir,1);
		foreach($b as $id => $file){			
			if($file != "." && $file != ".."){
				$ex = explode("_",$file);
				$newfile = $ex[1]."_".$ex[2];
				echo"<a href='$srcFULL/".$newfile."' download>";
				echo "<img src='$src/".$file."' class='showedIMG' />";
				echo "</a>";
			}
		}
	}
?>