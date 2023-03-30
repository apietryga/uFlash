var video;
function hasGetUserMedia(){
	return !!(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)
}
function start_media(){
	var A = function(C){alert("Webcam error!",C)};
	video = document.getElementById("webcam");
	if(navigator.webkitGetUserMedia){
		try{
			navigator.webkitGetUserMedia({audio:false,video:true
		},
		function(C){
			try{
				video.srcObject = C;
			}catch(error){
				video.src=window.webkitURL.createObjectURL(C);
			}
			initialize()
		},
		A)}catch(B){
			navigator.webkitGetUserMedia("video",
			function(C){
				video.src=window.webkitURL.createObjectURL(C);
			},A)
		}
	}
}
var AudioContext=(window.AudioContext||window.webkitAudioContext||null);
var notesPosX=[170,140,430,400];
var notesPosY=[100,360,360,130];
window.notes = notesPosY.length;
var timeOut,lastImageData;

// var canvasSource=$("#canvas-source")[0];
// var canvasBlended=$("#canvas-blended")[0];

var canvasSource=document.querySelector("#canvas-source");
var canvasBlended=document.querySelector("#canvas-blended");

var contextSource=canvasSource.getContext("2d");
var contextBlended=canvasBlended.getContext("2d");
var soundContext;
var bufferLoader;
var notes=[];
contextSource.translate(canvasSource.width,0);
contextSource.scale(-1,1);
var c=5;
function initialize(){
	if(!AudioContext){
		alert("AudioContext not supported!")
	}else{
		loadSounds();
	}
}
function loadSounds(){
	soundContext = new AudioContext();
	bufferLoader = new BufferLoader(soundContext,["inc/js/80snare2.mp3"],finishedLoading);
	bufferLoader.load()
}
function finishedLoading(A){
	for(var B=0;B<4;B++){
		var D=soundContext.createBufferSource();
		D.buffer=A[B];D.connect(soundContext.destination);
		// var C={note:D,ready:true,visual:$("#button"+B)[0]};
		var C={note:D,ready:true,visual:document.querySelector("#button"+B)};
		C.area={
			x:notesPosX[B],
			y:notesPosY[B],
			width:C.visual.width,
			height:100
		};
		notes.push(C)
	}
	start();
}
function setNoteReady(A){
	A.ready=true
}
function start(){
	// $(canvasSource).show();
	// $(canvasBlended).hide();
	// $("#buttons").show();
	
	canvasSource.display="block";
	canvasBlended.style.display = "none";
	document.querySelector("#buttons").display="block";

	setTimeout(function(){
		update()
	},2000)
}
function update(){
	drawVideo();
	blend();
	checkAreas();
	timeOut=setTimeout(update,1000/60)
}
function drawVideo(){
	contextSource.drawImage(video,0,0,video.width,video.height)
}
function blend(){
	var C=canvasSource.width;
	var A=canvasSource.height;
	var D=contextSource.getImageData(0,0,C,A);
	if(!lastImageData){
		lastImageData=contextSource.getImageData(0,0,C,A)
	}
	var B=contextSource.createImageData(C,A);
	differenceAccuracy(B.data,D.data,lastImageData.data);
	contextBlended.putImageData(B,0,0);
	lastImageData=D
}
function fastAbs(A){
	return(A^(A>>31))-(A>>31)
}
function threshold(A){
	return(A>21)?255:0
}
function difference(C,A,D){
	if(A.length!=D.length){
		return null
}
var B=0;
while(B<(A.length*0.25)){
	C[4*B]=A[4*B]==0?0:fastAbs(A[4*B]-D[4*B]);
	C[4*B+1]=A[4*B+1]==0?0:fastAbs(A[4*B+1]-D[4*B+1]);
	C[4*B+2]=A[4*B+2]==0?0:fastAbs(A[4*B+2]-D[4*B+2]);
	C[4*B+3]=255;++B}
}
function differenceAccuracy(E,B,G){
	if(B.length!=G.length){
		return null
	}
	var C=0;
	while(C<(B.length*0.25)){
		var A=(B[4*C]+B[4*C+1]+B[4*C+2])/3;
		var F=(G[4*C]+G[4*C+1]+G[4*C+2])/3;
		var D=threshold(fastAbs(A-F));
		E[4*C]=D;E[4*C+1]=D;E[4*C+2]=D;
		E[4*C+3]=255;++C
	}
}
function checkAreas(){
	for(var D=0;D<4;++D){
		var A=contextBlended.getImageData
			(
				notes[D].area.x,
				notes[D].area.y,
				notes[D].area.width,
				notes[D].area.height
			);
		var B=0;
		var C=0;
		while(B<(A.data.length*0.25)){
			C+=(A.data[B*4]+A.data[B*4+1]+A.data[B*4+2])/3;
			++B
		}
		C=Math.round(C/(A.data.length*0.25));
		if(C>10){
			// notes[D].visual.style.display="block";
			// $(notes[D].visual).fadeOut()
			notes[D].visual.style.display = "none";
			((visual)=>{
				setTimeout(()=>{
					// notes[D].visual.style.display = "block";
					visual.style.display = "block";
				},500)
			})(notes[D].visual)

			checkGest(D);
		}
	}
	
};


window.addEventListener('load', ()=>{
	start_media();
})

/**
 * Create imgs to show 
 * gesture places
 */
for(const i of [0, 1, 2, 3]){
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	canvas.width = 70;
	canvas.height = 70;
	context.beginPath();
	context.arc(35, 35, 35, 0, 2 * Math.PI, false);
	context.fillStyle = '#fff';
	context.fill();
	context.lineWidth = 17;
	context.strokeStyle = '#2674E1';
	context.stroke();
	context.fillStyle = '#000';
	context.font = "25px Arial";
	context.fillText( i , 28, 45);
	const butt = document.createElement('img');
	butt.src = canvas.toDataURL();
	butt.id = "button" + i;
	butt.style.border = "2px solid #fff"
	butt.style.borderRadius = "50%"
	document.querySelector("#front").append(butt);
}
