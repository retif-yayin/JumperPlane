//GAME OPTIONS
var gameOptions = {
	width:960*(window.innerWidth/window.innerHeight),
	height:960,
	dataName: "JumperPlaneScore",
	music: "JumperPlaneMusic",
	musicOption: localStorage.getItem("JumperPlaneMusic") || "true",
};

var game;

window.onload = function(){
	//DEFINE GAME START POINT
	game = new Phaser.Game({
		title: "JumperPlane",
		type: Phaser.CANVAS,
		width: gameOptions.width,
		height: gameOptions.height,
		backgroundColor: 0xd5edf7,
		scene: [bootGame, mainMenu, options, credits, playGame],
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.NO_CENTER,
		},
		physics: {
			default: "matter",
			matter:{
				gravity: {x: 0, y: 2},
				autoUpdate: false
				//debug: true,
			}
		}
	});

	// setInterval(function(){
	// 	document.getElementById("fps").innerHTML = "FPS: "+Math.floor(game.loop.actualFps.toString());
	// }, 100);
	

	window.focus();
}