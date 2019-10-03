class playGame extends Phaser.Scene{

	constructor(){
		super("PlayGame");
	}

	create(){
		var background = this.add.image(0,0,"background").setOrigin(0,0);

		this.plane = this.physics.add.image(200, gameOptions.height/2,"redPlane");
		this.plane.setCollideWorldBounds();

		this.input.on("pointerdown", this.jumpPlane, this);
	}

	jumpPlane(){
		this.plane.setVelocityY(-350);
	}

	update(time, delta){

	}

}