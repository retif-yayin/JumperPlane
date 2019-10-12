//GAME OPTIONS
var gameOptions = {
	width:1600,
	height:960,
	dataName: "JumperPlaneScore",
	music: "JumperPlaneMusic"
};

var game;

window.onload = function(){
	//DEFINE GAME START POINT
	game = new Phaser.Game({
		type: Phaser.AUTO,
		width: gameOptions.width,
		height: gameOptions.height,
		backgroundColor: 0xd5edf7,
		scene: [bootGame, mainMenu, options, credits, playGame],
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		physics: {
			default: "matter",
			matter:{
				gravity: {x: 0, y: 2},
				//debug: true,
			}
		}
	});

	//setInterval(function(){ console.log(game.loop.actualFps); }, 100);
	

	window.focus();
}