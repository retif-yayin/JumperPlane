class bootGame extends Phaser.Scene{

	constructor(){
		super("BootGame");
	}

	preload(){
		this.load.bitmapFont("main", "assets/png/fonts/main.png", "assets/png/fonts/main.fnt");

		this.load.image("menuBG", "assets/png/ui/UIbg.png");
		this.load.image("buttonLarge", "assets/png/ui/buttonLarge.png");

		this.load.image("background", "assets/png/background.png");

		this.load.image("redPlane", "assets/png/planes/planeRed1.png");
		this.load.json("planes", "assets/pe/planes.json");

		this.load.image("dirtUp", "assets/png/rock.png");
		this.load.image("dirtDown", "assets/png/rockDown.png");
		this.load.json("rocks", "assets/pe/rocks.json");

		this.load.image("grounddirt", "assets/png/groundDirt.png");
	}

	create(){
		this.scene.start("MainMenu");
	}

}