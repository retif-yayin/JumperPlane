import gameOptions from "./gameOptions.js";

export default class bootGame extends Phaser.Scene{

	constructor(){
		super("BootGame");
	}

	preload(){
		//LOAD IMAGES / TEXTURES
		this.load.image("logo", "src/assets/png/ui/logo.png");
		this.load.image("menuBG", "src/assets/png/ui/UIbg.png");
		this.load.image("buttonLarge", "src/assets/png/ui/buttonLarge.png");
		this.load.image("tapLeft", "src/assets/png/ui/tapLeft.png");
		this.load.image("tapRight", "src/assets/png/ui/tapRight.png");
		this.load.image("tap", "src/assets/png/ui/tap.png");
		this.load.image("tapTick", "src/assets/png/ui/tapTick.png");
		this.load.image("textGameOver", "src/assets/png/ui/textGameOver.png");

		this.load.image("background", "src/assets/png/background.png");
		this.load.image("puffLarge", "src/assets/png/puffLarge.png");
		this.load.image("puffSmall", "src/assets/png/puffSmall.png");

		this.load.atlas("redPlane", "src/assets/spritesheet/redplane.png", "src/assets/spritesheet/redplane.json");
		this.load.atlas("bluePlane", "src/assets/spritesheet/blueplane.png", "src/assets/spritesheet/blueplane.json");
		this.load.atlas("greenPlane", "src/assets/spritesheet/greenplane.png", "src/assets/spritesheet/greenplane.json");
		this.load.atlas("yellowPlane", "src/assets/spritesheet/yellowplane.png", "src/assets/spritesheet/yellowplane.json");
		this.load.json("planes", "src/assets/pe/planes.json");

		this.load.image("dirtUp", "src/assets/png/rock.png");
		this.load.image("dirtDown", "src/assets/png/rockDown.png");
		this.load.image("grassUp", "src/assets/png/rockGrass.png");
		this.load.image("grassDown", "src/assets/png/rockGrassDown.png");
		this.load.image("iceUp", "src/assets/png/rockIce.png");
		this.load.image("iceDown", "src/assets/png/rockIceDown.png");
		this.load.image("snowUp", "src/assets/png/rockSnow.png");
		this.load.image("snowDown", "src/assets/png/rockSnowDown.png");
		this.load.json("rocks", "src/assets/pe/rocks.json");

		this.load.image("grounddirt", "src/assets/png/groundDirt.png");
		this.load.image("groundgrass", "src/assets/png/groundGrass.png");
		this.load.image("groundice", "src/assets/png/groundIce.png");
		this.load.image("groundsnow", "src/assets/png/groundSnow.png");
		this.load.image("groundrock", "src/assets/png/groundRock.png");

		//LOAD SOUNDS
		this.load.audio("main", [
			"src/assets/sounds/mp3/anachronist.mp3",
			"src/assets/sounds/ogg/anachronist.ogg",
		]);
		this.load.audio("die", [
			"src/assets/sounds/mp3/die.mp3",
			"src/assets/sounds/ogg/die.ogg",
		]);
		this.load.audio("hit", [
			"src/assets/sounds/mp3/hit.mp3",
			"src/assets/sounds/ogg/hit.ogg",
		]);
		this.load.audio("point", [
			"src/assets/sounds/mp3/point.mp3",
			"src/assets/sounds/ogg/point.ogg",
		]);
		this.load.audio("swooshing", [
			"src/assets/sounds/mp3/swooshing.mp3",
			"src/assets/sounds/ogg/swooshing.ogg",
		]);
		this.load.audio("wing", [
			"src/assets/sounds/mp3/wing.mp3",
			"src/assets/sounds/ogg/wing.ogg",
		]);
	}

	create(){
		//After everything loaded, switch to menu scene
		gameOptions.mainMusic = this.sound.add("main");
		if(gameOptions.musicOption === "true"){
			gameOptions.mainMusic.play();
			gameOptions.mainMusic.setLoop(true);
		}

		this.scene.start("MainMenu");
	}

}