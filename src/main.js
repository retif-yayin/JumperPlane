//GAME OPTIONS
var gameOptions = {
	width:800,
	height:480,
	dataName: "JumperPlaneScore",
};

var game;

window.onload = function(){
	//DEFINE GAME START POINT
	game = new Phaser.Game({
		type: Phaser.AUTO,
		width: gameOptions.width,
		height: gameOptions.height,
		backgroundColor: 0xd5edf7,
		scene: [bootGame, mainMenu, playGame],
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		physics: {
			default: "arcade",
			arcade:{
				gravity: {x: 0, y: 708},
				debug: true,
			}
		}
	});

	window.focus();
}