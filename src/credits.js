class credits extends Phaser.Scene{

	constructor(){
		super("Credits");
	}

	create(){
		this.swooshing = this.sound.add("swooshing");
		this.mainMusic = this.sound.add("main");
		this.mainMusic.stop();

		var background = this.add.image(0,0,"background").setOrigin(0,0);
		this.add.image(background.width,0,"background").setOrigin(0,0);

		var logo = this.add.image(gameOptions.width/2, gameOptions.height/2-320, "logo").setScale(0.6);

		var versionTxt = this.add.text(gameOptions.width/2 + 250, gameOptions.height/2-240, "CURRENT VERSION 1.0", {
			fontFamily: 'font1',
			color: '#ff4c4c',
			fontSize: 38,
		});
		versionTxt.alpha = 0.8;

		var fontStyles = {
			fontFamily: 'font1',
			fontSize: 70,
			stroke: '#000',
			strokeThickness: 1,
		};

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