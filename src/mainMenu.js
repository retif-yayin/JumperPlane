class mainMenu extends Phaser.Scene{

	constructor(){
		super("MainMenu");
	}

	create(){
		var titleTxt = this.add.bitmapText(gameOptions.width/2 - 240, gameOptions.height/2-200, "main", "JUMPER PLANE");

		var menuBG = this.add.image(gameOptions.width/2, gameOptions.height/2+50, "menuBG");

		//Play Game Button
		var playBg 		= this.add.image(0, 0, "buttonLarge");
		var playTxt 	= this.add.bitmapText(-85, -15, "main", "PLAY GAME", 36);
		this.playBtn 	= this.add.container(0, 0, [playBg, playTxt]);
		this.playBtn.x  = gameOptions.width/2;
		this.playBtn.y 	= gameOptions.height/2-30;
		this.playBtn.setSize(playBg.width, playBg.height);
		this.playBtn.setInteractive();
		this.playBtn.on("pointerup", () => {
			this.scene.start("PlayGame");
		});

		//Options Button
		var optionsBg 	= this.add.image(0, 0, "buttonLarge");
		var optionsTxt 	= this.add.bitmapText(-65, -15, "main", "OPTIONS", 36);
		this.optionsBtn = this.add.container(0, 0, [optionsBg, optionsTxt]);
		this.optionsBtn.x = gameOptions.width/2;
		this.optionsBtn.y = gameOptions.height/2+50;
		this.optionsBtn.setSize(196, 70);
		this.optionsBtn.setInteractive();
		this.optionsBtn.on("pointerup", () => {
			console.log("clicked options");
		});

		//Credits Button
		var creditsBg 	= this.add.image(0, 0, "buttonLarge");
		var creditsTxt 	= this.add.bitmapText(-65, -15, "main", "CREDITS", 36);
		this.creditsBtn = this.add.container(0, 0, [creditsBg, creditsTxt]);
		this.creditsBtn.x = gameOptions.width/2;
		this.creditsBtn.y = gameOptions.height/2+130;
		this.creditsBtn.setSize(196, 70);
		this.creditsBtn.setInteractive();
		this.creditsBtn.on("pointerup", function(){
			console.log("clicked credits");
		});
	}

}