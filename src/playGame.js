class playGame extends Phaser.Scene{

	constructor(){
		super("PlayGame");
	}

	create(){
		this.isRunning = true;
		this.pointedRocks = [];

		this.planesJson = this.cache.json.get('planes');
		this.rocksJson = this.cache.json.get('rocks');

		this.pointText = this.add.bitmapText(gameOptions.width/2, 50, "main", "0", 72);
		this.pointText.depth = 999;
		this.points = 0;

		this.generateBackground();
		this.generateGround();
		this.generatePlane();
		this.generateRocks();
		
		this.matter.world.setBounds(0,0,gameOptions.width, gameOptions.height);

		this.input.on("pointerdown", this.jumpPlane, this);
		this.matter.world.on('collisionstart', this.checkCollision, this);
	}

	jumpPlane(){
		this.plane.applyForce({x:0, y:-0.2});
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

	generateBackground(){
		this.backgroundPool = [];

		for(var i=0; i<2; i++){
			var background = this.add.image(i*gameOptions.width,0,"background").setOrigin(0,0);
			this.backgroundPool.push(background);
		}
	}

	generateGround(){
		this.groundPool = [];

		for(var i=0; i<2; i++){
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

		for(var i=0; i<6; i++){
			if(lastLoc == 0){
				var rock = this.matter.add.image((i*308)+gameOptions.width, Math.random()*80,"dirtDown", null, {
					shape: this.rocksJson.dirtDown,
					label: "up",
				});

				lastLoc = 1;
			} else {
				var rock = this.matter.add.image((i*308)+gameOptions.width, (Math.random()*80)+420,"dirtUp", null, {
					shape: this.rocksJson.dirtUp,
					label: "down",
				});

				lastLoc = 0;
			}

			this.rocksPool.push(rock);
		}
	}

	backgroundLoop(){
		this.backgroundPool.forEach(function(background){
			background.x -= 0.2;
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
			ground.x -= 0.5;
			if(ground.x == -gameOptions.width/2){
				this.groundPool = this.groundPool.slice(1, this.groundPool.length);

				var lastGroundLocation = this.groundPool[this.groundPool.length-1].x;
				ground.x = lastGroundLocation+807;

				this.groundPool.push(ground);
			}
		}.bind(this));
	}

	rocksLoop(){
		this.rocksPool.forEach(function(rock){
			rock.x -= 1;

			if(rock.x < this.plane.x && !this.pointedRocks.includes(rock.id)){
				this.points++;
				this.pointText.text = this.points.toString();
				this.pointedRocks.push(rock.id);
			}

			if(rock.x < -108){
				this.rocksPool = this.rocksPool.slice(1, this.rocksPool.length);

				var lastRockLocation = this.rocksPool[this.rocksPool.length-1].x;
				rock.x = lastRockLocation+308;

				var index = this.pointedRocks.indexOf(rock.id);
				this.pointedRocks.splice(index, 1);
				this.rocksPool.push(rock);
			}
		}.bind(this));
	}

	gameOver(){
		console.log("gameover");
		this.isRunning = false;
		this.matter.world.pause();

		//var menuBG = this.add.image(gameOptions.width/2, gameOptions.height/2+50, "menuBG");
	}

	update(time, delta){
		if(this.isRunning){
			this.backgroundLoop();
			this.groundLoop();
			this.rocksLoop();
		}
	}

}