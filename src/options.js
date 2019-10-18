class options extends Phaser.Scene{

	constructor(){
		super("Options");
	}

	create(){
		this.swooshing = this.sound.add("swooshing");

		var background = this.add.image(0,0,"background").setOrigin(0,0);

		var logo = this.add.image(gameOptions.width/2, gameOptions.height/2-320, "logo").setScale(0.6);

		var versionTxt = this.add.text(gameOptions.width/2 + 250, gameOptions.height/2-240, "CURRENT VERSION 1.0", {
			fontFamily: 'font1',
			color: '#ff4c4c',
			fontSize: 38,
		});
		versionTxt.alpha = 0.8;

		var menuBG = this.add.image(gameOptions.width/2, gameOptions.height/2+100, "menuBG");

		var fontStyles = {
			fontFamily: 'font1',
			fontSize: 70,
			stroke: '#000',
			strokeThickness: 1,
		};

		//Music Button
		var musicBg 	= this.add.image(0, 0, "buttonLarge");
		var musicTxt 	= this.add.text(-130, -40, gameOptions.musicOption === "true" ? "MUSIC ON" : "MUSIC OFF", fontStyles);
		this.musicBtn 	= this.add.container(0, 0, [musicBg, musicTxt]);
		this.musicBtn.x = gameOptions.width/2;
		this.musicBtn.y = gameOptions.height/2-60;
		this.musicBtn.setSize(musicBg.width, musicBg.height);
		this.musicBtn.setInteractive();
		this.musicBtn.on("pointerup", () => {
			if(gameOptions.musicOption === "true"){
				gameOptions.musicOption = "false";
				gameOptions.mainMusic.stop();
				musicTxt.text = "MUSIC OFF";
			} else {
				gameOptions.musicOption = "true";
				gameOptions.mainMusic.play();
				musicTxt.text = "MUSIC ON";
			}

			localStorage.setItem(gameOptions.music, gameOptions.musicOption);
		});

		//Back Button
		var backBg	 	= this.add.image(0, 0, "buttonLarge");
		var backTxt 	= this.add.text(-75, -44, "BACK", fontStyles);
		this.backBtn = this.add.container(0, 0, [backBg, backTxt]);
		this.backBtn.x = gameOptions.width/2;
		this.backBtn.y = gameOptions.height/2+260;
		this.backBtn.setSize(390, 139);
		this.backBtn.setInteractive();
		this.backBtn.on("pointerup", () => {
			this.swooshing.play();
			this.scene.start("MainMenu");
		});
	}
}