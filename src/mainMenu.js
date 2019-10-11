class mainMenu extends Phaser.Scene{

	constructor(){
		super("MainMenu");
	}

	create(){
		this.swooshing = this.sound.add("swooshing");
		this.mainMusic = this.sound.add("main");
		this.mainMusic.play();
		this.mainMusic.setLoop(true);
		
		var background = this.add.image(0,0,"background").setOrigin(0,0);

		var titleTxt = this.add.text(gameOptions.width/2 - 600, gameOptions.height/2-420, "JUMPER PLANE", {
			fontFamily: 'font1',
			fontSize: 204,
			stroke: '#000',
			strokeThickness: 1,
			shadow: {
				offsetY:5,
				blur: 5,
				stroke: true
			}
		});

		var versionTxt = this.add.text(gameOptions.width/2 + 210, gameOptions.height/2-240, "CURRENT VERSION 1.0", {
			fontFamily: 'font1',
			color: '#ff4c4c',
			fontSize: 44,
		});
		versionTxt.alpha = 0.8;

		var menuBG = this.add.image(gameOptions.width/2, gameOptions.height/2+100, "menuBG");

		var fontStyles = {
			fontFamily: 'font1',
			fontSize: 70,
			stroke: '#000',
			strokeThickness: 1,
		};

		//Play Game Button
		var playBg 		= this.add.image(0, 0, "buttonLarge");
		var playTxt 	= this.add.text(-150, -40, "PLAY GAME", fontStyles);
		this.playBtn 	= this.add.container(0, 0, [playBg, playTxt]);
		this.playBtn.x  = gameOptions.width/2;
		this.playBtn.y 	= gameOptions.height/2-60;
		this.playBtn.setSize(playBg.width, playBg.height);
		this.playBtn.setInteractive();
		this.playBtn.on("pointerup", () => {
			this.swooshing.play();
			this.mainMusic.setLoop(false);
			this.mainMusic.stop();
			this.scene.start("PlayGame");
		});

		//Options Button
		var optionsBg 	= this.add.image(0, 0, "buttonLarge");
		var optionsTxt 	= this.add.text(-110, -40, "OPTIONS", fontStyles);
		this.optionsBtn = this.add.container(0, 0, [optionsBg, optionsTxt]);
		this.optionsBtn.x = gameOptions.width/2;
		this.optionsBtn.y = gameOptions.height/2+100;
		this.optionsBtn.setSize(390, 139);
		this.optionsBtn.setInteractive();
		this.optionsBtn.on("pointerup", () => {
			console.log("clicked options");
		});

		//Credits Button
		var creditsBg 	= this.add.image(0, 0, "buttonLarge");
		var creditsTxt 	= this.add.text(-110, -44, "CREDITS", fontStyles);
		this.creditsBtn = this.add.container(0, 0, [creditsBg, creditsTxt]);
		this.creditsBtn.x = gameOptions.width/2;
		this.creditsBtn.y = gameOptions.height/2+260;
		this.creditsBtn.setSize(390, 139);
		this.creditsBtn.setInteractive();
		this.creditsBtn.on("pointerup", function(){
			console.log("clicked credits");
		});
	}

}