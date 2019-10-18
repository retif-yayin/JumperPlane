import Phaser from "phaser";
import gameOptions from "./gameOptions.js";
import bootGame from "./bootGame.js";
import credits from "./credits.js";
import mainMenu from "./mainMenu.js";
import options from "./options.js";
import playGame from "./playGame.js";

const game = new Phaser.Game({
	title: "JumperPlane",
	type: Phaser.AUTO,
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

