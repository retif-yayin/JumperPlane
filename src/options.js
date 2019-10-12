class options extends Phaser.Scene{

	constructor(){
		super("Options");
	}

	create(){
		this.swooshing = this.sound.add("swooshing");
		this.mainMusic = this.sound.add("main");
		this.mainMusic.stop();

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

		var versionTxt = this.add.text(gameOptions.width/2 + 210, gameOptions.height/2-240, "CURRENT VERSION 0.9", {
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

		this.musicOption = localStorage.getItem(gameOptions.music) || "true";
		if(this.musicOption === "true"){
			this.mainMusic.play();
			this.mainMusic.setLoop(true);
		}

		//Play Game Button
		var musicBg 	= this.add.image(0, 0, "buttonLarge");
		var musicTxt 	= this.add.text(-130, -40, this.musicOption === "true" ? "MUSIC ON" : "MUSIC OFF", fontStyles);
		this.musicBtn 	= this.add.container(0, 0, [musicBg, musicTxt]);
		this.musicBtn.x = gameOptions.width/2;
		this.musicBtn.y = gameOptions.height/2-60;
		this.musicBtn.setSize(musicBg.width, musicBg.height);
		this.musicBtn.setInteractive();
		this.musicBtn.on("pointerup", () => {
			if(this.musicOption === "true"){
				this.musicOption = "false";
				this.mainMusic.stop();
				musicTxt.text = "MUSIC OFF";
			} else {
				this.musicOption = "true";
				this.mainMusic.play();
				musicTxt.text = "MUSIC ON";
			}

			localStorage.setItem(gameOptions.music, this.musicOption);
		});

		//Credits Button
		var backBg	 	= this.add.image(0, 0, "buttonLarge");
		var backTxt 	= this.add.text(-75, -44, "BACK", fontStyles);
		this.backBtn = this.add.container(0, 0, [backBg, backTxt]);
		this.backBtn.x = gameOptions.width/2;
		this.backBtn.y = gameOptions.height/2+260;
		this.backBtn.setSize(390, 139);
		this.backBtn.setInteractive();
		this.backBtn.on("pointerup", () => {
			this.swooshing.play();
			if(this.musicOption === "true"){
				this.mainMusic.setLoop(false);
				this.mainMusic.stop();
			}
			this.scene.start("MainMenu");
		});
	}
}