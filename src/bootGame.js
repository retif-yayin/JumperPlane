import gameOptions from "./gameOptions.js";

import logo from "./assets/png/ui/logo.png";
import menuBG from "./assets/png/ui/UIbg.png";
import buttonLarge from "./assets/png/ui/buttonLarge.png";
import tapLeft from "./assets/png/ui/tapLeft.png";
import tapRight from "./assets/png/ui/tapRight.png";
import tap from "./assets/png/ui/tap.png";
import tapTick from "./assets/png/ui/tapTick.png";
import textGameOver from "./assets/png/ui/textGameOver.png";

import background from "./assets/png/background.png";
import puffLarge from "./assets/png/puffLarge.png";
import puffSmall from "./assets/png/puffSmall.png";

import redPlane from "./assets/spritesheet/redplane.png"; 
import redPlaneJSON from "./assets/spritesheet/redplane.json";
import bluePlane from "./assets/spritesheet/blueplane.png"; 
import bluePlaneJSON from "./assets/spritesheet/blueplane.json";
import greenPlane from "./assets/spritesheet/greenplane.png"; 
import greenPlaneJSON from "./assets/spritesheet/greenplane.json";
import yellowPlane from "./assets/spritesheet/yellowplane.png"; 
import yellowPlaneJSON from "./assets/spritesheet/yellowplane.json";
import planes from "./assets/pe/planes.json";

import dirtUp from "./assets/png/rock.png";
import dirtDown from "./assets/png/rockDown.png";
import grassUp from "./assets/png/rockGrass.png";
import grassDown from "./assets/png/rockGrassDown.png";
import iceUp from "./assets/png/rockIce.png";
import iceDown from "./assets/png/rockIceDown.png";
import snowUp from "./assets/png/rockSnow.png";
import snowDown from "./assets/png/rockSnowDown.png";
import rocks from "./assets/pe/rocks.json";

import grounddirt from "./assets/png/groundDirt.png";
import groundgrass from "./assets/png/groundGrass.png";
import groundice from "./assets/png/groundIce.png";
import groundsnow from "./assets/png/groundSnow.png";
import groundrock from "./assets/png/groundRock.png";

import main from "./assets/sounds/mp3/anachronist.mp3";
import mainogg from "./assets/sounds/ogg/anachronist.ogg";
import die from "./assets/sounds/mp3/die.mp3";
import dieogg from "./assets/sounds/ogg/die.ogg";
import hit from "./assets/sounds/mp3/hit.mp3";
import hitogg from "./assets/sounds/ogg/hit.ogg";
import point from "./assets/sounds/mp3/point.mp3";
import pointogg from "./assets/sounds/ogg/point.ogg";
import swooshing from "./assets/sounds/mp3/swooshing.mp3";
import swooshingogg from "./assets/sounds/ogg/swooshing.ogg";
import wing from "./assets/sounds/mp3/wing.mp3";
import wingogg from "./assets/sounds/ogg/wing.ogg";

export default class bootGame extends Phaser.Scene{

	constructor(){
		super("BootGame");
	}

	preload(){
		//LOAD IMAGES / TEXTURES
		this.load.image("logo", logo);
		this.load.image("menuBG", menuBG);
		this.load.image("buttonLarge", buttonLarge);
		this.load.image("tapLeft", tapLeft);
		this.load.image("tapRight", tapRight);
		this.load.image("tap", tap);
		this.load.image("tapTick", tapTick);
		this.load.image("textGameOver", textGameOver);

		this.load.image("background", background);
		this.load.image("puffLarge", puffLarge);
		this.load.image("puffSmall", puffSmall);

		this.load.atlas("redPlane", redPlane, redPlaneJSON);
		this.load.atlas("bluePlane", bluePlane, bluePlaneJSON);
		this.load.atlas("greenPlane", greenPlane, greenPlaneJSON);
		this.load.atlas("yellowPlane", yellowPlane, yellowPlaneJSON);
		this.load.json("planes", planes);

		this.load.image("dirtUp", dirtUp);
		this.load.image("dirtDown", dirtDown);
		this.load.image("grassUp", grassUp);
		this.load.image("grassDown", grassDown);
		this.load.image("iceUp", iceUp);
		this.load.image("iceDown", iceDown);
		this.load.image("snowUp", snowUp);
		this.load.image("snowDown", snowDown);
		this.load.json("rocks", rocks);

		this.load.image("grounddirt", grounddirt);
		this.load.image("groundgrass", groundgrass);
		this.load.image("groundice", groundice);
		this.load.image("groundsnow", groundsnow);
		this.load.image("groundrock", groundrock);

		//LOAD SOUNDS
		this.load.audio("main", [main,mainogg]);
		this.load.audio("die", [die,dieogg]);
		this.load.audio("hit", [hit,hitogg]);
		this.load.audio("point", [point,pointogg]);
		this.load.audio("swooshing", [swooshing,swooshingogg]);
		this.load.audio("wing", [wing,wingogg]);
	}

	create(){
		//After everything loaded, switch to menu scene
		gameOptions.mainMusic = this.sound.add("main");
		if(gameOptions.musicOption === "true"){
			gameOptions.mainMusic.play();
			gameOptions.mainMusic.setLoop(true);
		}

		this.scene.start("MainMenu");
	}

}