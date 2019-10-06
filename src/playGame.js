class playGame extends Phaser.Scene{

	constructor(){
		super("PlayGame");
	}

	create(){
		this.highScore = localStorage.getItem(gameOptions.dataName);
		this.isRunning = true;
		this.pointedRocks = [];
		this.gameSpeed = 1;

		this.planesJson = this.cache.json.get('planes');
		this.rocksJson = this.cache.json.get('rocks');

		this.pointText = this.add.bitmapText(gameOptions.width/2-5, 50, "main", "0", 72);
		this.pointText.depth = 999;
		this.points = 0;

		this.generateBackground();
		this.generateGround();
		this.generatePlane();
		this.generateRocks();
		
		this.matter.world.setBounds(0,0,gameOptions.width, gameOptions.height);

		this.input.on("pointerdown", this.jumpPlane, this);
		this.matter.world.on('collisionstart', this.checkCollision, this);
		this.time.addEvent({
			delay: 5000,
			callback: this.increaseGameSpeed,
			callbackScope: this,
			loop:true
		});
	}

	jumpPlane(){
		this.plane.setVelocityY(-8);
	}

	checkCollision(event, bodyA, bodyB){
		if(
			(bodyA.label == "red" && bodyB.label == "up") ||
			(bodyA.label == "red" && bodyB.label == "down") ||
			(bodyA.label == "up" && bodyB.label == "red") ||
			(bodyA.label == "down" && bodyB.label == "red")
		){
			this.gameOver();
		}
	}

	increaseGameSpeed(){
		this.gameSpeed += 0.2;
	}

	generateBackground(){
		this.backgroundPool = [];

		for(var i=0; i<2; i++){
			var background = this.add.image(i*gameOptions.width,0,"background").setOrigin(0,0);
			this.backgroundPool.push(background);
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
				var rock = this.matter.add.image((i*200)+(gameOptions.width-250), Math.random()*80,"dirtDown", null, {
					shape: this.rocksJson.dirtDown,
				});

				lastLoc = 1;
			} else {
				var rock = this.matter.add.image((i*200)+(gameOptions.width-250), (Math.random()*80)+420,"dirtUp", null, {
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
			if(background.x == -gameOptions.width){
				this.backgroundPool = this.backgroundPool.slice(1, this.backgroundPool.length);

				var lastBackgroundLocation = this.backgroundPool[this.backgroundPool.length-1].x;
				background.x = lastBackgroundLocation+807;

				this.backgroundPool.push(background);
			}
		}.bind(this));
	}

	groundLoop(){
		this.groundPool.forEach(function(ground){
			ground.x -= this.gameSpeed/2;
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

			if(rock.x < this.plane.x && !this.pointedRocks.includes(rock.id)){
				this.points++;
				this.pointText.text = this.points.toString();
				this.pointedRocks.push(rock.id);
			}

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

	gameOver(){
		this.isRunning = false;
		this.matter.world.pause();

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
		var highScoreText = this.add.bitmapText(gameOptions.width/2-110, gameOptions.height/2-50, "main", "HIGH SCORE  "+this.highScore.toString(), 36);

		//Restart Button
		var restartBg 	= this.add.image(0, 0, "buttonLarge");
		var restartTxt 	= this.add.bitmapText(-65, -15, "main", "RESTART", 36);
		this.restartBtn = this.add.container(0, 0, [restartBg, restartTxt]);
		this.restartBtn.x = gameOptions.width/2;
		this.restartBtn.y = gameOptions.height/2+50;
		this.restartBtn.setSize(196, 70);
		this.restartBtn.setInteractive();
		this.restartBtn.on("pointerup", function(){
			this.scene.restart();
		}.bind(this));

		//Main menu Button
		var mainmenuBg 	= this.add.image(0, 0, "buttonLarge");
		var mainmenuTxt = this.add.bitmapText(-80, -15, "main", "MAIN MENU", 36);
		this.mainmenuBtn = this.add.container(0, 0, [mainmenuBg, mainmenuTxt]);
		this.mainmenuBtn.x = gameOptions.width/2;
		this.mainmenuBtn.y = gameOptions.height/2+130;
		this.mainmenuBtn.setSize(196, 70);
		this.mainmenuBtn.setInteractive();
		this.mainmenuBtn.on("pointerup", () => {
			this.scene.start("MainMenu");
		});
	}

	update(time, delta){
		if(this.isRunning){
			this.handlePlaneRotation();
			this.backgroundLoop();
			this.groundLoop();
			this.rocksLoop();
		}
	}

}