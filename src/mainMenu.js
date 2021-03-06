import gameOptions from "./gameOptions.js";

export default class mainMenu extends Phaser.Scene{

	constructor(){
		super("MainMenu");
	}

	create(){
		this.swooshing = this.sound.add("swooshing");
		var background = this.add.image(0,0,"background").setOrigin(0,0);
		this.add.image(background.width,0,"background").setOrigin(0,0);

		this.generatePlaneAnims();

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
			this.swooshing.play();
			this.scene.start("Options");
		});

		//Credits Button
		var creditsBg 	= this.add.image(0, 0, "buttonLarge");
		var creditsTxt 	= this.add.text(-110, -44, "CREDITS", fontStyles);
		this.creditsBtn = this.add.container(0, 0, [creditsBg, creditsTxt]);
		this.creditsBtn.x = gameOptions.width/2;
		this.creditsBtn.y = gameOptions.height/2+260;
		this.creditsBtn.setSize(390, 139);
		this.creditsBtn.setInteractive();
		this.creditsBtn.on("pointerup", () => {
			this.swooshing.play();
			this.scene.start("Credits");
		});

		//Small credits text
		var versionTxt = this.add.text(100, gameOptions.height-70, "Wpati Games", {
			fontFamily: 'font1',
			color: '#8a7967',
			fontSize: 28,
		});

		var versionTxt = this.add.text(gameOptions.width-300, gameOptions.height-70, "made while streaming", {
			fontFamily: 'font1',
			color: '#8a7967',
			fontSize: 28,
		});
	}

	generatePlaneAnims(){
		for(var i=0; i<4; i++){
			var planeColor = Math.floor(Math.random()*4);
			var sprite;
			var Fprefix;
			var startX = 0;
			var startY = 0;
			var startR = 0;
			var targetY = 0;

			switch(planeColor){
				case 0:
					sprite = 'redPlane';
					Fprefix = 'planeRed';
					break;
				case 1:
					sprite = 'bluePlane';
					Fprefix = 'planeBlue';
					break;
				case 2:
					sprite = 'greenPlane';
					Fprefix = 'planeGreen';
					break;
				case 3:
					sprite = 'yellowPlane';
					Fprefix = 'planeYellow';
					break;
			}

			var animationDirection = Math.floor(Math.random()*4);

			if(animationDirection == 0){
				startX = 300;
				startY = -200;
				startR = 90;
				targetY = 1060;
			} else if(animationDirection == 1){
				startX = 300;
				startY = 1060;
				startR = 270;
				targetY = -200;
			} else if(animationDirection == 2){
				startX = 1300;
				startY = -200;
				startR = 90;
				targetY = 1060;
			} else if(animationDirection == 3){
				startX = 1300;
				startY = 1060;
				startR = 270;
				targetY = -200;
			}

			var planeAnim = planeColor+"Anim";
			var plane = this.add.sprite(startX, startY, sprite, Fprefix+"1.png");
			var frameNames = this.anims.generateFrameNames(sprite, {
				start:1, end:3, prefix: Fprefix, suffix: '.png'
			});

			this.anims.create({key:planeAnim, frames: frameNames, frameRate: 15, repeat:-1});
			plane.anims.play(planeAnim);
			plane.setAngle(startR);
			plane.alpha = 0.6;
			this.applyTween(plane, targetY);
		}
	}

	applyTween(plane, targetY){
		this.tweens.add({
			targets: plane,
			y: targetY,
			duration:2000,
			repeat:0,
			yoyo:false,
			callbackScope: this,
			onComplete: function(){
				var startX = 0;
				var startY = 0;
				var startR = 0;
				var animationDirection = Math.floor(Math.random()*4);
				if(animationDirection == 0){
					startX = 300;
					startY = -200;
					startR = 90;
					targetY = 1060;
				} else if(animationDirection == 1){
					startX = 300;
					startY = 1060;
					startR = 270;
					targetY = -200;
				} else if(animationDirection == 2){
					startX = 1300;
					startY = -200;
					startR = 90;
					targetY = 1060;
				} else if(animationDirection == 3){
					startX = 1300;
					startY = 1060;
					startR = 270;
					targetY = -200;
				}
				plane.x = startX;
				plane.y = startY;
				plane.setAngle(startR);

				this.applyTween(plane, targetY);
			}
		});
	}

}