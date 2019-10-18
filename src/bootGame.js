class bootGame extends Phaser.Scene{

	constructor(){
		super("BootGame");
	}

	preload(){
		//LOAD IMAGES / TEXTURES
		this.load.image("logo", "assets/png/ui/logo.png");
		this.load.image("menuBG", "assets/png/ui/UIbg.png");
		this.load.image("buttonLarge", "assets/png/ui/buttonLarge.png");
		this.load.image("tapLeft", "assets/png/ui/tapLeft.png");
		this.load.image("tapRight", "assets/png/ui/tapRight.png");
		this.load.image("tap", "assets/png/ui/tap.png");
		this.load.image("tapTick", "assets/png/ui/tapTick.png");
		this.load.image("textGameOver", "assets/png/ui/textGameOver.png");

		this.load.image("background", "assets/png/background.png");
		this.load.image("puffLarge", "assets/png/puffLarge.png");
		this.load.image("puffSmall", "assets/png/puffSmall.png");

		this.load.atlas("redPlane", "assets/spritesheet/redplane.png", "assets/spritesheet/redplane.json");
		this.load.atlas("bluePlane", "assets/spritesheet/blueplane.png", "assets/spritesheet/blueplane.json");
		this.load.atlas("greenPlane", "assets/spritesheet/greenplane.png", "assets/spritesheet/greenplane.json");
		this.load.atlas("yellowPlane", "assets/spritesheet/yellowplane.png", "assets/spritesheet/yellowplane.json");
		this.load.json("planes", "assets/pe/planes.json");

		this.load.image("dirtUp", "assets/png/rock.png");
		this.load.image("dirtDown", "assets/png/rockDown.png");
		this.load.image("grassUp", "assets/png/rockGrass.png");
		this.load.image("grassDown", "assets/png/rockGrassDown.png");
		this.load.image("iceUp", "assets/png/rockIce.png");
		this.load.image("iceDown", "assets/png/rockIceDown.png");
		this.load.image("snowUp", "assets/png/rockSnow.png");
		this.load.image("snowDown", "assets/png/rockSnowDown.png");
		this.load.json("rocks", "assets/pe/rocks.json");

		this.load.image("grounddirt", "assets/png/groundDirt.png");
		this.load.image("groundgrass", "assets/png/groundGrass.png");
		this.load.image("groundice", "assets/png/groundIce.png");
		this.load.image("groundsnow", "assets/png/groundSnow.png");
		this.load.image("groundrock", "assets/png/groundRock.png");

		//LOAD SOUNDS
		this.load.audio("main", [
			"assets/sounds/mp3/anachronist.mp3",
			"assets/sounds/ogg/anachronist.ogg",
		]);
		this.load.audio("die", [
			"assets/sounds/mp3/die.mp3",
			"assets/sounds/ogg/die.ogg",
		]);
		this.load.audio("hit", [
			"assets/sounds/mp3/hit.mp3",
			"assets/sounds/ogg/hit.ogg",
		]);
		this.load.audio("point", [
			"assets/sounds/mp3/point.mp3",
			"assets/sounds/ogg/point.ogg",
		]);
		this.load.audio("swooshing", [
			"assets/sounds/mp3/swooshing.mp3",
			"assets/sounds/ogg/swooshing.ogg",
		]);
		this.load.audio("wing", [
			"assets/sounds/mp3/wing.mp3",
			"assets/sounds/ogg/wing.ogg",
		]);
	}

	create(){
		//After everything loaded, switch to menu scene
		this.scene.start("MainMenu");
	}

}