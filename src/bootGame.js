class bootGame extends Phaser.Scene{

	constructor(){
		super("BootGame");
	}

	preload(){
		//FONT
		this.load.bitmapFont("main", "assets/png/fonts/main.png", "assets/png/fonts/main.fnt");

		//IMAGES / TEXTURES
		this.load.image("menuBG", "assets/png/ui/UIbg.png");
		this.load.image("buttonLarge", "assets/png/ui/buttonLarge.png");
		this.load.image("tapLeft", "assets/png/ui/tapLeft.png");
		this.load.image("tapRight", "assets/png/ui/tapRight.png");
		this.load.image("tap", "assets/png/ui/tap.png");
		this.load.image("tapTick", "assets/png/ui/tapTick.png");

		this.load.image("background", "assets/png/background.png");

		this.load.image("redPlane", "assets/png/planes/planeRed1.png");
		this.load.json("planes", "assets/pe/planes.json");

		this.load.image("dirtUp", "assets/png/rock.png");
		this.load.image("dirtDown", "assets/png/rockDown.png");
		this.load.json("rocks", "assets/pe/rocks.json");

		this.load.image("grounddirt", "assets/png/groundDirt.png");

		//SOUNDS
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
		this.scene.start("PlayGame");
	}

}