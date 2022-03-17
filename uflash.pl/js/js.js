let nr = 1;
let changeIMGx = 1;
stopnie = 0;
nrIMG = 1;
my_img = [];
for(x=0;x<=15;x++){
	let pht_nr = x;
	if(pht_nr < 10){
		pht_nr = "0"+pht_nr;
	}
	my_img[x] = new Image();
	my_img[x].src = 'img/ufob1_rotate/ufo00'+pht_nr+'.jpg';
}
function startChecking(){
    guide = document.getElementById("field");
	guide.addEventListener("mousemove", aim, false);
	guide.addEventListener("touchmove", aim, false);
}
function stopChecking(){
	guide = null;
}
function aim(event) {
	var fieldWidth = document.getElementById("field").offsetWidth;
	if(window.event)
		event = window.event;
		if(guide != null){
			let mousex = event.clientX - guide.offsetLeft;
			if(typeof event.clientX == "undefined"){
				mousex = event.touches[0].clientX - guide.offsetLeft;
			}
			window.stopnie = (360*mousex)/fieldWidth;		
			nrIMG = Math.round(window.stopnie/24);
			takeImage();
		}
}
function scrollingY() {
	window.stopnie = (360*window.scrollY)/window.innerHeight;		
	nrIMG = Math.round(window.stopnie/24);
	takeImage();
};
function takeImage(){
	if(nrIMG < nr){	// w prawo
		if(changeIMGx < 15){
			changeIMGx = changeIMGx + 1;
		}else{
			changeIMGx = 0;
		}
	}else if(nrIMG > nr){	// w lewo
		if(changeIMGx > 0){
			changeIMGx = changeIMGx - 1;
		}else{
			changeIMGx = 15;
		}
	}
	changeIMG(changeIMGx);
	nr = nrIMG;
}
function changeIMG(nrIMG){
	document.getElementById("field").style.background = "url('"+my_img[nrIMG].src+"')";
	document.getElementById("field").style.backgroundSize = "100% 100%";	
}
function plusSlides(n) {
	showSlides(slideIndex += n);
}
function currentSlide(n) {
	showSlides(slideIndex = n);
}
function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {slideIndex = 1}    
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " active";
}
	
function guide(e){
	
	let gs = document.getElementById("guide");
	if(	gs.offsetTop < window.scrollY ){
		checkGS(1);
	}

}
isloop = false;
function btnClick(){
	if(isloop == false){
		checkGS(1);
	}

}

function checkGS(x = 0){
	gsC = document.getElementById("guide").getElementsByTagName("li");
	for(y = 0; y < gsC.length; y++){
		gsC[y].style.fontWeight = "normal";
		gsC[y].style.fontSize = "1em";
		gsC[y].style.padding = "0";
	}
	gsC[x].style.fontWeight = "bold";
	gsC[x].style.fontSize = "1.2em";
	gsC[x].style.padding = "2%";
	lint = document.getElementsByClassName("lustro_interface")[0];
	lint.style.backgroundImage = "url('img/guide/"+x+".gif?id=2')";
	if(x > 0 && isloop == false){
		isloop = true;
		setTimeout(function(){
			checkGS(2);
			setTimeout(function(){
				checkGS(3);
				uFlash();
				setTimeout(function(){
					checkGS(4);
					uFlash();
					setTimeout(function(){
						checkGS(5);
						uFlash();
						setTimeout(function(){
							checkGS(6);
							setTimeout(function(){
							checkGS(7);
							setTimeout(function(){
								isloop = false;
								checkGS(0);
								},3000) // 3000
							},3000) // 3000
						},3000) // 3000
					},10000) // 10000
				},10000) // 10000
			},10000) // 10000
		},5000) // 5000
	}
}
function uFlash(){
	let guide = document.getElementById("guide");
	guide.style.backgroundColor = "#fff";
	setTimeout(function(){
		guide.style.backgroundColor = "#000";
	},200)
}

function resizeWin(){
	let ekran = document.getElementsByClassName("lustro_interface")[0];
	let lustro = document.getElementsByClassName("guide_scene")[0];
	ekran.style.width = lustro.offsetWidth+"px";
}
resizeWin();

function startup() {
	let el = document.getElementById("fieldParent");
	el.addEventListener("touchstart", startChecking, false);
	el.addEventListener("touchend", stopChecking, false);
	el.addEventListener("mousedown", startChecking, false);
	el.addEventListener("mouseup", stopChecking, false);
	el.addEventListener("focusout", stopChecking, false);

	let field = document.getElementById("field");
	field.setAttribute('draggable', false);

	window.addEventListener("scroll", scrollingY, false);
	window.addEventListener("scroll", scrollingY, false);

	let btn = document.getElementsByClassName("guideButton")[0];
	btn.addEventListener("click", btnClick, false);



	changeIMG(0);
	checkGS();
//	window.addEventListener("scroll", guide, false);
	slideIndex = 1;
	showSlides(slideIndex);

	window.addEventListener("resize",resizeWin,false );

}
document.addEventListener("DOMContentLoaded", startup);

