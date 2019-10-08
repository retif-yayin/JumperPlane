class mainMenu extends Phaser.Scene{

	constructor(){
		super("MainMenu");
	}

	create(){
		this.swooshing = this.sound.add("swooshing");
		this.mainMusic = this.sound.add("main");
		// this.mainMusic.setLoop(false);
		// this.mainMusic.stop();
		// this.mainMusic.play();
		// this.mainMusic.setLoop(true);
		
		var background = this.add.image(0,0,"background").setOrigin(0,0);

		var titleTxt = this.add.text(gameOptions.width/2 - 300, gameOptions.height/2-210, "JUMPER PLANE", {
			fontFamily: 'font1',
			fontSize: 102,
			stroke: '#000',
			strokeThickness: 1,
			shadow: {
				offsetY:5,
				blur: 5,
				stroke: true
			}
		});

		var versionTxt = this.add.text(gameOptions.width/2 + 105, gameOptions.height/2-120, "CURRENT VERSION 1.0", {
			fontFamily: 'font1',
			color: '#ff4c4c',
			fontSize: 22,
		});
		versionTxt.alpha = 0.8;

		var menuBG = this.add.image(gameOptions.width/2, gameOptions.height/2+50, "menuBG");

		var fontStyles = {
			fontFamily: 'font1',
			fontSize: 35,
			stroke: '#000',
			strokeThickness: 1,
		};

		//Play Game Button
		var playBg 		= this.add.image(0, 0, "buttonLarge");
		var playTxt 	= this.add.text(-75, -20, "PLAY GAME", fontStyles);
		this.playBtn 	= this.add.container(0, 0, [playBg, playTxt]);
		this.playBtn.x  = gameOptions.width/2;
		this.playBtn.y 	= gameOptions.height/2-30;
		this.playBtn.setSize(playBg.width, playBg.height);
		this.playBtn.setInteractive();
		this.playBtn.on("pointerup", () => {
			this.swooshing.play();
			this.scene.start("PlayGame");
		});

		//Options Button
		var optionsBg 	= this.add.image(0, 0, "buttonLarge");
		var optionsTxt 	= this.add.text(-55, -20, "OPTIONS", fontStyles);
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
		var creditsTxt 	= this.add.text(-55, -22, "CREDITS", fontStyles);
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