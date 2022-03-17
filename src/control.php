﻿<?php
	require("control_inc/php/control_func.php");
?>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="control_inc/css/style.css" />
	</head>
	<body>
		<table border="1" id="mainTbl">
			<tr>
				<td class="kranceTD">
					SHINYFRAME CONTROL PANEL
				</td>
			</tr>
			<tr>
				<td>
					<table class="cntrlTbl" >
						<tr>
							<td class="leftTD">
								Tryb deweloperski:
							</td>
							<td>
								<div onclick="suwak(0)" class="suwContainer">
									<div id="suwak0" class="suwAK" style="float:<?=$s0?>;">
								</div>
							</td>
						</tr>
						<tr>
							<td class="leftTD">
								Template:
							</td>
							<td class="templateTD">
								<img id="choosedtemplate" class="showTemplate" src="inc/img/templates/testowe.png" />
							</td>
						</tr>
							<td colspan='2' style='text-align:center;'>
								<button onclick="displayTemplates()">ZMIEŃ</>
							</td>
						<tr>
							<td class="leftTD">
								Znajdź zdjęcie:
							</td>
							<td class="pickPhotoTD">
								<button onclick="searchIMG()">
									SZUKAJ
								</button>
							</td>
						</tr>
						<tr>
							<!--
							<td class="leftTD">
								Stwórz template:
							</td>
							<td>
								<button>STWÓRZ</button>
							</td>
							-->
							
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td class="kranceTD">
					ShinyFrame Control v.1.0
				</td>
			</tr>
		</table>
		<div class="main_popUp" id="popup">
			<div class="top_popUp">
				<p class="p_popUp" onclick="closePOP()">X</p>
			</div><br />
			<div id="PPcontent">
				<?php
					$dir = 'inc/img/templates/';
					$files = scandir($dir);
					foreach($files as $file){
						if($file != "." && $file != ".." && substr($file, -4) == ".png" ){
							echo "<img onclick='changeValue(\"template\",\"$file\")' class='PPtemplates' src='$dir".$file."'>";
						}
					}
				?>
			</div>
		</div>
		<div id="search_popup" class="main_popUP">
			<div class="top_popUp">
				<p class="p_popUp" onclick="closePOP()">X</p>
			</div><br />
			<div id="search_content">
			</div>
		</div>
	</body>
	<script>
		function suwak(id){
			var suwak = document.getElementById("suwak"+id);
			if(suwak.style.cssFloat == "right"){
				suwak.style.cssFloat = "left";
				changeValue('develop','1');
			}else{
				suwak.style.cssFloat = "right";
				changeValue('develop','0');
			}
		}
		function changeValue(what,how = 0){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					refreshInfo(this.responseText);
					closePOP();
				}
			};
			xhttp.open("GET", "control_inc/php/control_func.php?g=ajax&"+what+"="+how, true);
			xhttp.send();	
		}
		function displayTemplates(){
			document.getElementById("popup").style.display = "block";
			
		}
		function closePOP(){
			document.getElementById("popup").style.display = "none";
			document.getElementById("search_popup").style.display = "none";
		}
		function refreshInfo(val){
			line = val.split(";");
			develop = line[0].split("|")[1];
			var suwak = document.getElementById("suwak0");
			if(develop == 1){
				suwak.style.cssFloat = "left";
			}else{
				suwak.style.cssFloat = "right";
			}
			template = line[1].split("|")[1];			
			document.getElementById("choosedtemplate").src = "inc/img/templates/"+template;
			console.log("d:"+develop+"; t:"+template);
		}
		changeValue('refresh');
	
		/* SZUKANIE ZDJĘĆ */
		function searchIMG(){
			var xmlhttp;
			if(window.XMLHttpRequest){
				xmlhttp = new XMLHttpRequest;
			}else{
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange = function(){
			   if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
					document.getElementById("search_popup").style.display = "block";
					document.getElementById("search_content").innerHTML = this.responseText;
			   }
			}
			xmlhttp.open("POST", "control_inc/php/control_func.php?load_photos=true");
			xmlhttp.send();					
		}
		

		/* END OF SZUKANIE ZDJĘĆ */
	</script>
</html>