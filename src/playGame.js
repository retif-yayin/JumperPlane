class playGame extends Phaser.Scene{

	constructor(){
		super("PlayGame");
	}

	create(){
		this.highScore = localStorage.getItem(gameOptions.dataName);
		this.isRunning = false;
		this.firstStart = true;
		this.matter.world.pause();
		this.pointedRocks = [];
		this.gameSpeed = 2;

		this.planesJson = this.cache.json.get('planes');
		this.rocksJson = this.cache.json.get('rocks');

		this.die = this.sound.add("die");
		this.hit = this.sound.add("hit");
		this.point = this.sound.add("point");
		this.swooshing = this.sound.add("swooshing");
		this.wing = this.sound.add("wing");

		this.pointText = this.add.text(gameOptions.width/2-15, 50, "0", {
			fontFamily: 'font1',
			fontSize: 72,
			stroke: '#000',
			strokeThickness:2,
			shadow: {
				offsetY:3,
				blur: 3,
				fill: true
			}
		});
		this.pointText.depth = 999;
		this.points = 0;

		this.generateBackground();
		this.generateClouds();
		this.generateGround();
		this.generatePlane();
		this.generateRocks();

		this.tapUI = this.add.container();
		var tapRight = this.add.image(450, gameOptions.height/2+80, "tapRight");
		var tapLeft = this.add.image(650, gameOptions.height/2+80, "tapLeft");
		var tapIcon = this.add.sprite(550, gameOptions.height/2+80, "tapTick");
		this.tapUI.add([tapRight, tapLeft, tapIcon]);

		this.tweens.add({
			duration:500,
			targets: tapRight,
			x: '-=25',
			repeat:-1,
			yoyo: true,
		});
		this.tweens.add({
			duration:500,
			targets: tapLeft,
			x: '+=25',
			repeat:-1,
			yoyo: true,
		});
		this.tweens.add({
			duration:300,
			targets: tapIcon,
			scale: 1.2,
			repeat:-1,
			yoyo: true,
		});
		
		this.matter.world.setBounds(0,0,gameOptions.width, gameOptions.height);

		this.input.on("pointerdown", this.jumpPlane, this);
		this.matter.world.on('collisionstart', this.checkCollision, this);

		this.increaseSpeedTimer = this.time.addEvent({
			delay: 5000,
			callback: this.increaseGameSpeed,
			callbackScope: this,
			loop:true
		});
		this.increaseSpeedTimer.paused = true;

		this.checkFinished = true;
		this.checkPointsTimer = this.time.addEvent({
			delay: 100,
			callback: this.checkPoints,
			callbackScope: this,
			loop: true
		});
	}

	jumpPlane(){
		if(this.isRunning){
			this.plane.setVelocityY(-8);
			this.wing.play();
		}

		if(this.firstStart){
			this.matter.world.resume();
			this.isRunning = true;
			this.firstStart = false;
			this.jumpPlane();
			this.increaseSpeedTimer.paused = false;

			this.tweens.add({
				duration:200,
				targets: this.tapUI,
				alpha: 0,
				repeat:0,
				yoyo: false,
				onCompleteScope: this,
				onComplete: function(){
					this.tapUI.destroy();
				},
			});
		}
	}

	checkCollision(event, bodyA, bodyB){
		if(
			(bodyA.label == "red" && bodyB.label == "up") ||
			(bodyA.label == "red" && bodyB.label == "down") ||
			(bodyA.label == "up" && bodyB.label == "red") ||
			(bodyA.label == "down" && bodyB.label == "red") ||
			(bodyA.label == "red" && bodyB.label == "Rectangle Body") ||
			(bodyA.label == "Rectangle Body" && bodyB.label == "red")
		){
			this.gameOver();
		}
	}

	increaseGameSpeed(){
		this.gameSpeed += 0.2;
	}

	generateBackground(){
		this.backgroundPool = [];

		for(var i=0; i<3; i++){
			var background = this.add.image(i*gameOptions.width,0,"background").setOrigin(0,0);
			this.backgroundPool.push(background);
		}
	}

	generateClouds(){
		this.cloudPool = [];
		
		//Smallest: 25,25
		//Largest: 775, 150
		for(var i=0; i<8; i++){
			var isLarge = Math.round(Math.random());
			var xLocation = (Math.random()*750)+25;
			var yLocation = (Math.random()*125)+25;
			if(isLarge){
				var cloud = this.add.image(xLocation,yLocation,"puffLarge");
			} else {
				var cloud = this.add.image(xLocation,yLocation,"puffSmall");
			}

			this.cloudPool.push(cloud);
		}
	}

	generateGround(){
		this.groundPool = [];

		for(var i=0; i<3; i++){
			var ground = this.add.image(gameOptions.width/2+(i*808),444,"grounddirt");
			ground.alpha = 0.5;
			this.groundPool.push(ground);
		}
	}

	generatePlane(){
		this.plane = this.matter.add.sprite(200, gameOptions.height/2,"redPlane", null, {
			shape: this.planesJson.red,
			angle: 0,
		});

		this.plane.setFixedRotation();
	}

	generateRocks(){
		this.rocksPool = [];

		var lastLoc = 0;

		for(var i=0; i<10; i++){
			if(lastLoc == 0){
				//308
				var rock = this.matter.add.image((i*180)+(gameOptions.width-250), Math.random()*80,"dirtDown", null, {
					shape: this.rocksJson.dirtDown,
				});

				lastLoc = 1;
			} else {
				var rock = this.matter.add.image((i*180)+(gameOptions.width-250), (Math.random()*80)+420,"dirtUp", null, {
					shape: this.rocksJson.dirtUp,
				});

				lastLoc = 0;
			}
			this.rocksPool.push(rock);
		}
	}

	backgroundLoop(){
		this.backgroundPool.forEach(function(background){
			background.x -= this.gameSpeed/5;
			if(background.x < -gameOptions.width){
				this.backgroundPool = this.backgroundPool.slice(1, this.backgroundPool.length);

				var lastBackgroundLocation = this.backgroundPool[this.backgroundPool.length-1].x;
				background.x = lastBackgroundLocation+800;

				this.backgroundPool.push(background);
			}
		}.bind(this));
	}

	cloudLoop(){
		this.cloudPool.forEach(function(cloud){
			cloud.x -= this.gameSpeed/4;
			if(cloud.x < -30){
				var isLarge = Math.round(Math.random());
				var xLocation = (Math.random()*750)+25;
				var yLocation = (Math.random()*125)+25;

				cloud.texture = isLarge ? "puffLarge" : "puffSmall";
				cloud.x = xLocation + gameOptions.width;
				cloud.y = yLocation;
			}
		}.bind(this));
	}

	groundLoop(){
		this.groundPool.forEach(function(ground){
			//There is a bug, it should be based on gamespeed
			ground.x -= 1; //this.gameSpeed/2;
			if(ground.x < -gameOptions.width/2){
				this.groundPool = this.groundPool.slice(1, this.groundPool.length);

				var lastGroundLocation = this.groundPool[this.groundPool.length-1].x;
				ground.x = lastGroundLocation+807;
				this.groundPool.push(ground);
			}
		}.bind(this));
	}

	rocksLoop(){
		this.rocksPool.forEach(function(rock){
			rock.x -= this.gameSpeed;

			if(rock.x < -108){
				this.rocksPool = this.rocksPool.slice(1, this.rocksPool.length);

				var space = (Math.random()*130)+130;
				var lastRockLocation = this.rocksPool[this.rocksPool.length-1].x;
				rock.x = lastRockLocation+space;

				var index = this.pointedRocks.indexOf(rock.id);
				this.pointedRocks.splice(index, 1);
				this.rocksPool.push(rock);
			}
		}.bind(this));
	}

	handlePlaneRotation(){
		var velocity = this.plane.body.velocity.y;
		if(velocity > 0){
			if(this.plane.angle < 25){
				this.plane.setAngularVelocity(velocity*0.006);
			} else {
				this.plane.setAngularVelocity(0);
			}
		} else {
			if(this.plane.angle > -30){
				this.plane.setAngularVelocity(velocity*0.006);
			} else {
				this.plane.setAngularVelocity(0);
			}
		}
	}

	checkPoints(){
		if(this.isRunning && this.checkFinished){
			this.checkFinished = false;
			this.rocksPool.forEach(function(rock){
				if(rock.x < 200 && !this.pointedRocks.includes(rock.body.id)){
					this.points++;
					this.pointText.text = this.points.toString();
					this.pointedRocks.push(rock.body.id);
					this.point.play();
					console.log(rock.x);
					console.log(rock.body.id);
					console.log(this.pointedRocks);
				}
				if(rock.body.id == 138){
					this.checkFinished = true;
				}
			}.bind(this));
		}
	}

	gameOver(){
		this.isRunning = false;
		this.matter.world.pause();
		this.hit.play();
		//this.die.play();

		var overlay = this.add.rectangle(0,0,gameOptions.width, gameOptions.height, 0x000000, 0.5).setOrigin(0,0);
		var menuBG = this.add.image(gameOptions.width/2, gameOptions.height/2+50, "menuBG");

		if(this.highScore){
			if(this.points > this.highScore){
				this.highScore = this.points;
				localStorage.setItem(gameOptions.dataName, this.highScore);
			}
		} else {
			this.highScore = this.points;
			localStorage.setItem(gameOptions.dataName, this.highScore);
		}
		var highScoreText = this.add.text(gameOptions.width/2-110, gameOptions.height/2-50, "HIGH SCORE  "+this.highScore.toString(), {
			fontFamily: 'font1',
			fontSize: 38,
			shadow: {
				offsetY:1,
				blur: 1,
				fill: true
			}
		});

		var fontStyles = {
			fontFamily: 'font1',
			fontSize: 35,
			stroke: '#000',
			strokeThickness: 1,
		};
		//Restart Button
		var restartBg 	= this.add.image(0, 0, "buttonLarge");
		var restartTxt 	= this.add.text(-60, -22, "RESTART", fontStyles);
		this.restartBtn = this.add.container(0, 0, [restartBg, restartTxt]);
		this.restartBtn.x = gameOptions.width/2;
		this.restartBtn.y = gameOptions.height/2+50;
		this.restartBtn.setSize(196, 70);
		this.restartBtn.setInteractive();
		this.restartBtn.on("pointerup", function(){
			this.swooshing.play();
			this.scene.restart();
		}.bind(this));

		//Main menu Button
		var mainmenuBg 	= this.add.image(0, 0, "buttonLarge");
		var mainmenuTxt = this.add.text(-76, -22, "MAIN MENU", fontStyles);
		this.mainmenuBtn = this.add.container(0, 0, [mainmenuBg, mainmenuTxt]);
		this.mainmenuBtn.x = gameOptions.width/2;
		this.mainmenuBtn.y = gameOptions.height/2+130;
		this.mainmenuBtn.setSize(196, 70);
		this.mainmenuBtn.setInteractive();
		this.mainmenuBtn.on("pointerup", () => {
			this.swooshing.play();
			this.scene.start("MainMenu");
		});
	}

	update(time, delta){
		if(this.isRunning){
			this.handlePlaneRotation();
			this.backgroundLoop();
			this.cloudLoop();
			this.groundLoop();
			this.rocksLoop();
		}
	}

}