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
	}

	create(){
		this.scene.start("MainMenu");
	}

}