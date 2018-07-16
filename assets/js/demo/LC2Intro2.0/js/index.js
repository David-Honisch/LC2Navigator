'use strict'

function LC2OpenLinkIntro() {
	this._frameData = null; 
	this.query = this.getQuery("q");
	var str = window.location;
	var urls = str.toString().split("?");
	if (urls.length >0)
	{
		this.query = urls[1];
		if (urls.length >0)
		{
			this.query += "?"+ urls[2];	
		}
	}
	else
	{
		this.query = "No url found.";	
	}
	
	this.emptyLine = "          ";
	this.rasterFont = ["LETZTECHANCE.ORG", "PROUD TO PRESENT"];
	this.rasterSinusFont = ["LETZTECHANCE.ORG", "BY DAVID HONISCH"];
	this.content = [" ", "LETZTECHANCE.ORG", "PROUD TO PRESENT",
		"WEBSITE", "LAUNCHER", "LAUNCHING", " ",this.query
	];
	this.line = '';
	this.introCanvas = 'lc2introCanvas'
	this.appTitle = "LETZTECHANCE.ORG\nlaunching\n";
	this.prodTitle = "David"
	this.isScrollerEnded = false;
	this.bgColor = 0xffffff;
	this.counter = 0;
	this.backgroundv;
	this.starfield;
	this.sinSprite
	// resolution
	this.browserVersion = navigator.appVersion;
	this.browserVersionNum = parseFloat(this.browserVersion);
	
	// if (browserVersionNum >= 4) {
	// height = screen.availHeight;
	// width = screen.availWidth;
//	this.height = window.availHeight;
//	this.width = window.availWidth;	
//	this.size = this.getSize();
//	this.height = this.size[1];
//	this.width = this.size[0];
//	this.width = (this.width <= 640)?this.width:this.width-200;
	
	this.height = 480;
	this.width = 640;

	this.area;
	this.bmd;
	// text
	this.text, this.text2 = null;
	this.index = 0;
	this.line = '';

	this.textReflect = null;
	this.textReflect2 = null;
	this.font, this.bfont, this.rfont;
	this.letters = [];
	this.pos = [];
	this.pos2 = [];
	this.rasters, this.braster;

	this.data;
	this.scale = 2;
	this.page = -1;
	
	this.font;
	this.bfont;
	this.alpha;
	this.mask = new Phaser.Rectangle();
	// textreflect
	// var textReflect;
	// var grd;
	// music
	// var music;
	this.mods = [];
	this.current = 0;

	this.vumeter = [];
	this.channels = [];

	this.module;


	var conf = {
		width: this.width,
		height: this.height,
		renderer: Phaser.CANVAS,
		parent: this.introCanvas,
		transparent: false,
		antialias: false,
		state: this,
		scaleMode: Phaser.ScaleManager.EXACT_FIT
	};
	this.game = new Phaser.Game(conf);
	this.img;
	var text = msg("Click link to open:");
	window.status = text+this.query;
	document.title = text+this.query;

}
LC2OpenLinkIntro.prototype.preload = function () {
	this.game.load.script('protracker', 'assets/js/demo/LC2Intro2.0/_plugins/ProTracker.js');
	this.game.load.image("vu", "assets/js/demo/LC2Intro2.0/img/vu.png");
	this.game.load.binary('shampoo', 'assets/js/demo/LC2Intro2.0/audio/turrican.mod', this.modLoaded, this);
	this.game.load.image('knightHawks', 'assets/js/demo/LC2Intro2.0/img/knighthawks.png');
	this.game.load.image('fw', 'assets/js/demo/LC2Intro2.0/img/titles.png');
	this.game.load.image('raster', 'assets/js/demo/LC2Intro2.0/img/title.png');
	this.game.load.image('rasterbar', 'assets/js/demo/LC2Intro2.0/img/sunset-raster.png');
	this.game.load.image('btn', 'assets/js/demo/LC2Intro2.0/img/btn.jpg');
	this.game.load.image('woman2', 'assets/js/demo/LC2Intro2.0/img/btn2.jpg');
	this.game.load.image('pic', 'assets/js/demo/LC2Intro2.0/img/bg.jpg');
	this.game.load.image('scrollpic', 'assets/js/demo/LC2Intro2.0/img/scroller.png');
}
LC2OpenLinkIntro.prototype.create = function () {
	
	this.game.stage.setBackgroundColor(this.bgColor);
	this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	// game.input.onDown.add(gofull, this);	
	this.createImage();	
	this.createBackgroundImage();	
	this.createAudio();
	this.createRaster();
	this.addButtonFullScreen();
	this.addLeftSprite();
//	this.addSprite();
//	this.addSpriteTitle();
//
//	this.createText();
	this.createTextScroller();
//	
	this.createRasterSinusFont();
//	this.createRasterFont();
	
//	this.createRasterFontDemo();	
	
	// Stretch to fill
	this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;



}
LC2OpenLinkIntro.prototype.createRaster = function () {
	// Generate our motion data
	this.data = this.game.make.tween({
		y : 0
	}).to({
		y : 500
	}, 640, Phaser.Easing.Sinusoidal.In).yoyo(true).generateData(100);
	// A group of rasters
	this.braster = this.game.add.group();
	// The total number + spacing between each one
	var total = 8;
	var offset = 4;
	// /*
	for (var i = 0; i < total; i++) {
		var raster = this.braster.create(0, 0, 'rasterbar');
		raster.width = this.width;
		raster.alpha = (i + 1) * (1 / total);
		this.pos2.push(i * offset);
	}
	// */

}
LC2OpenLinkIntro.prototype.addButtonFullScreen = function () {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.button = this.game.add.sprite(this.width - 100, 400, 'woman2');
	this.game.physics.enable(this.button, Phaser.Physics.ARCADE);
	// img3.body.velocity.x = 100;
	this.button.body.velocity.y = 200;
	this.button.body.collideWorldBounds = true;
	// img3.body.bounce.set(1);
	this.button.anchor.setTo(0.5, 0.0);
	this.button.inputEnabled = true;
	// button.input.enableDrag();
	this.button.events.onInputDown.add(this.Rightlistener, this);
}

LC2OpenLinkIntro.prototype.addSpriteTitle = function () {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.img = this.game.add.sprite(200, 20, 'fw');
	this.game.physics.enable(this.img, Phaser.Physics.ARCADE);
	this.img.body.velocity.x = 100;
	this.img.body.velocity.y = 0;
	this.img.body.collideWorldBounds = true;
	this.img.body.bounce.set(1);
	this.img.anchor.setTo(0.5, 0.0);
}
LC2OpenLinkIntro.prototype.addSprite = function () {
	if (this.width > 640) {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.img2 = this.game.add.sprite(this.width, 20, 'raster');
		this.game.physics.enable(this.img2, Phaser.Physics.ARCADE);
		this.img2.body.velocity.x = 100;
		this.img2.body.velocity.y = 200;
		this.img2.body.collideWorldBounds = true;
		this.img2.body.bounce.set(1);
		this.img2.anchor.setTo(0.5, 0.0);
		this.img2.inputEnabled = true;
		this.img2.input.enableDrag();
	}
}
LC2OpenLinkIntro.prototype.addLeftSprite = function () {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.img3 = this.game.add.sprite(20, 20, 'btn');
//	this.game.physics.enable(this.img3, Phaser.Physics.ARCADE);
	// this.img3.body.velocity.y = 100;
	// this.img3.body.collideWorldBounds = true;
	// img3.body.bounce.set(1);
	this.img3.anchor.setTo(0.5, 0.0);
	this.img3.inputEnabled = true;
	// img3.input.enableDrag();
	this.img3.events.onInputDown.add(this.Leftlistener, this);
	
	this.img3.x = ((+this.height / 2)-100);
	this.img3.y = ((+this.width / 2)-100);
	if (this.width <= 400)
	{
		this.img3.y = 300;
		this.img3.x = 150;
	}
	this.game.physics.enable(this.img3, Phaser.Physics.ARCADE);

}
LC2OpenLinkIntro.prototype.update = function () {
	if (this.starfield != undefined) {
		this.starfield.tilePosition.x += this.backgroundv;
	}
	if (this.braster != null) {
		this.braster.resetCursor();
		for (var i = 0; i < this.braster.total; i++) {
			this.pos2[i]++;

			if (this.pos2[i] === this.data.length) {
				this.pos2[i] = 0;
			}

			this.braster.cursor.y = 300 + this.data[this.pos2[i]].y;
			this.braster.next();
		}
		if (this.index >= this.content.length && this.isScrollerEnded == false) {
			/*
			 * textReflect.destroy(); text.destroy(); text2.destroy();
			 * rasters.destroy(); //mask.destroy(); createButton(); //
			 * createRasterFont();
			 */
		}
		if (this.index >= this.content.length && this.isScrollerEnded == false) {
			/* createRasterFont(); */
			this.isScrollerEnded = true;
		}
	}

	this.game.context.clearRect(0, 0, this.game.width, this.game.height);
	//
	if (this.area != undefined) {
		if (this.area.y > 0 && this.game.time.now > this.dropTime) {
			for (var y = 0; y < this.area.y; y++) {
				this.bmd.copyRect('pic', this.area, 0, y);
			}

			this.area.y--;
			this.dropTime = this.game.time.now + 25;
		}
	}
	// img.anchor.setTo(0.5, 0.5);
	for (i = 0; i < this.vumeter.length; i++) {
		var smp_index = this.module.channel[i].sample;
		this.channels[i] = {
			sample_index: smp_index,
			sample_name: this.module.sample[smp_index].name
		};

		var w = Math.round(this.module.vu[i] * 1200);
		// you have to check that width is > 0 !
		this.vumeter[i].width = w > 0 ? w : 1;
	}
	//
	// textReflect.fill = grd;
	// module.sample = array of Objects containing informations about a played
	// sample

	for (var i = 0; i < this.vumeter.length; i++) {
		if (this.module.channel[i]) {
			var smp_index = this.module.channel[i].sample;
			this.channels[i] = {
				sample_index: smp_index,
				sample_name: this.module.sample[smp_index].name
			};

			var w = Math.round(this.module.vu[i] * 1200);

			if (w > 300) {
				w = 300;
			}

			this.vumeter[i].cropRect.width = w;
			this.vumeter[i].updateCrop();
		}
	}
	// sinus
	// font.text = "phaser x: " + game.input.x + " y: " + game.input.y;
	// sinus
	if (this.sinSprite !== undefined)
	{
	this.sinSprite.x -= 1;
	if (this.sinSprite.x <= -60000) {
		this.sinSprite.x += 60000;
	}
		}
}
LC2OpenLinkIntro.prototype.createText = function () {
	// var x = game.world.centerX / 2 + 100;
	var x = this.width / 2 + 60;
	var y = 0;
	var fontSize = 20;
	var fontWidth = 10;
	var fSize = ((this.appTitle.length * fontWidth) / 2);

	x = x - fSize;
	this.text2 = this.game.add.text(x, y, this.appTitle+this.query);
	this.text2.align = 'center';
	// Our font + size
	this.text2.font = 'Arial';
	this.text2.fontWeight = 'bold';
	this.text2.fontSize = fontSize;
	this.text2.fill = '#000000';

	// var textReflect = this.game.add.text(x, y - 20, "" + this.appTitle);

	// // Centers the text
	// textReflect.anchor.set(0.5);
	// textReflect.align = 'center';
	// textReflect.scale.y = -1;

	// // Our font + size
	// textReflect.font = 'Arial';
	// textReflect.fontWeight = 'bold';
	// textReflect.fontSize = fontSize;

	// // Here we create a linear gradient on the Text context.
	// // This uses the exact same method of creating a gradient as you do on a
	// // normal Canvas context.
	// var grd = textReflect.context.createLinearGradient(100, 100, 100,
	// this.text2.canvas.height);

	// // Add in 2 color stops
	// grd.addColorStop(0, 'rgba(0,0,0,0)');
	// grd.addColorStop(1, 'rgba(0,0,0,0.08)');

	// // And apply to the Text
	// textReflect.fill = grd;
}
LC2OpenLinkIntro.prototype.getSize = function () {
	var myWidth = 0,
		myHeight = 0;

	if (typeof (window.innerWidth) == 'number') {
		// Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if (document.documentElement &&
		(document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		// IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if (document.body &&
		(document.body.clientWidth || document.body.clientHeight)) {
		// IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	return [myWidth, myHeight];
}
LC2OpenLinkIntro.prototype.getScrollXY = function () {
	var scrOfX = 0,
		scrOfY = 0;

	if (typeof (window.pageYOffset) == 'number') {
		// Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	} else if (document.body &&
		(document.body.scrollLeft || document.body.scrollTop)) {
		// DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	} else if (document.documentElement &&
		(document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
		// IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}
	return [scrOfX, scrOfY];
}
LC2OpenLinkIntro.prototype.createImage = function () {
	this.bmd = this.game.make.bitmapData();
	// bmd = game.make.bitmapData(1920,1080);
	this.bmd.load('pic').cls();
//	this.bmd.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 1, 1);
	this.bmd.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 1, 1);
	this.game.stage.smoothed = false;
	this.area = new Phaser.Rectangle(0, this.bmd.height, this.bmd.width, 2);
	this.dropTime = this.game.time.now + 250;
}
LC2OpenLinkIntro.prototype.createBackgroundImage = function () {
	this.backgroundv = 1;
	this.starfield = this.game.add.tileSprite(0,180, 640, 350, 'scrollpic');
}
LC2OpenLinkIntro.prototype.createTextScroller = function () {
	this.text = this.game.add.text(32, 450, '', {
		font: "14pt Arial",
		fill: "#19cb65",
		stroke: "#119f4e",
		strokeThickness: 2
	});
	this.textReflect2 = this.game.add.text(32, 450, '', {
		font: "14pt Arial",
		fill: "#19cb65",
		stroke: "#119f4e",
		strokeThickness: 2
	});

	// Centers the text
	this.textReflect2.anchor.set(0.5);
	this.textReflect2.align = 'center';
	this.textReflect2.scale.y = -1;

	// Our font + size
	this.textReflect2.font = 'Arial';
	this.textReflect2.fontWeight = 'bold';
	this.textReflect2.fontSize = 30;

	// Here we create a linear gradient on the Text context.
	// This uses the exact same method of creating a gradient as you do on a
	// normal Canvas context.
	var grd = this.textReflect2.context.createLinearGradient(0, 0, 0,
		this.text.canvas.height);

	// Add in 2 color stops
	grd.addColorStop(0, 'rgba(0,0,0,0)');
	grd.addColorStop(1, 'rgba(0,0,0,0.08)');

	// And apply to the Text
	this.textReflect2.fill = grd;

	this.nextLine();
}
LC2OpenLinkIntro.prototype.updateLine = function () {

	if (this.line.length < this.content[this.index].length) {
		this.line = this.content[this.index].substr(0, this.line.length + 1);
		// text.text = line;
		this.text.setText(this.line);
	} else {
		// Wait 2 seconds then start a new line
		this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
	}

}

LC2OpenLinkIntro.prototype.nextLine = function () {

	this.index++;

	if (this.index < this.content.length) {
		this.line = '';
		var v = this.content[this.index]!== undefined?this.content[this.index]:'';
		this.game.time.events.repeat(80, v.length + 1, this.updateLine, this);
	}

}
LC2OpenLinkIntro.prototype.createRasterFontDemo = function () {
	var style = {
			font : "25px Arial",
			fill : "#ff0044",
			align : "center"
		};
		/*
		 * var text = game.add.text(500, 480, "d0n3 by HuRRican3", style);
		 * text.anchor.set(0.5); text.alpha = 0.1;
		 */
		this.game.add.tween(this.text).to({
			alpha : 1
		}, 2000, "Linear", true);
		// font = game.add.retroFont('knightHawks', 31, 25,
		// Phaser.RetroFont.TEXT_SET6 + "*", 10, 1, 1);
		this.rfont = this.game.add.retroFont('knightHawks', 31, 25,
				Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
		// There can only be 80 letters on-screen at once (10x8) so generate them
		// all now
		// Scale 1:1
		var x = 0;
		var y = 0;
		// var scale = 1;
		// var tx = 32;
		// var ty = 32;
		// var hx = 16;
		// var hy = 16;

		// Scale 2:1
		scale = 2;
		var tx = 64;
		var ty = 64;
		var hx = 32;
		var hy = 32;

		this.game.stage.smoothed = false;

		// In reverse so they overlap in the correct order
		for (var i = 0; i < 80; i++) {
			// For some reason using a BMD here doesn't allow us to share the
			// texture - need to investigate why

			var letter = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,
					'knightHawks');

			/*
			 * // the various blend modes supported by pixi PIXI.blendModes = {
			 * NORMAL:0, ADD:1, MULTIPLY:2, SCREEN:3, OVERLAY:4, DARKEN:5,
			 * LIGHTEN:6, COLOR_DODGE:7, COLOR_BURN:8, HARD_LIGHT:9, SOFT_LIGHT:10,
			 * DIFFERENCE:11, EXCLUSION:12, HUE:13, SATURATION:14, COLOR:15,
			 * LUMINOSITY:16 };
			 */

			// letter.blendMode = PIXI.blendModes.OVERLAY;
			letter.scale.set(0);
			letter.anchor.set(0.5);
			letter.animations.loadFrameData(this.rfont.frameData, 48);
			// this.world.sendToBack(letter);

			letters.push(letter);
			pos.push({
				x : x + hx,
				y : y + hy
			}); // add 16 because of the anchor

			x += tx;

			if (x === this.game.width) {
				x = 0;
				y += ty;
			}
		}

		var raster = this.game.add.sprite(0, 0, 'raster');
		raster.width = this.game.width;
		raster.height = this.game.height;
		raster.blendMode = PIXI.blendModes.COLOR;

		// this.world.sendToBack(raster);

		bringIn();	
}
LC2OpenLinkIntro.prototype.createRasterFont = function () {
	// createImprint();
	var lfont = this.game.add.retroFont('knightHawks', 31, 25,
		Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
	lfont.text = this.rasterFont[0];
	var w = lfont.text.length * 32;
	var center = this.game.world.centerX > (w / 2) ? this.game.world.centerX - (w / 2) : 0;
	var fsprite1 = this.game.add.sprite(center, 10 * 32, lfont);

	var lfont = this.game.add.retroFont('knightHawks', 31, 25,
		Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
	lfont.text = this.rasterFont[1]; // ?
	w = lfont.text.length * 32;
	center = this.game.world.centerX > (w / 2) ? this.game.world.centerX - (w / 2) : 0;
	var fsprite2 = this.game.add.sprite(center, 11 * 32, lfont);
}
LC2OpenLinkIntro.prototype.createRasterSinusFont = function () {
	var SCROLL_TEXT =
	    "you are redirected to "+this.query+" - have a nice day. take a coffee." +
		"this intro is written with phaser by phaser.io. funny isnt it. lets send some " +
		"greetings: greetings goes out to:" +
		// "bey0nd3r, violotor, phyogozator, fir3bird, meshroom, flow" +
		// "and all cool guys out there..." +
		// "have a nice day. bye bye " +
		// "damn, what are you waiting for bye " +
		"..              ";
	var sfont = this.game.add.retroFont('knightHawks', 31, 25,
		Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
	sfont.text = SCROLL_TEXT;
	var w = sfont.text.length * 32;
	var center = this.game.world.centerX > (w / 2) ? this.game.world.centerX - (w / 2) : 0;
	this.sinSprite = this.game.add.sprite(this.width, 400, sfont);
	this.sinSprite.anchor.setTo(0.5, 0.5);
	this.sinSprite.scale.setTo(2, 2);
	this.sinSprite.x = (SCROLL_TEXT.length*35);
	this.sinSprite.animations.add('run');
	this.sinSprite.animations.play('run', 10, true);
	// for (var i = 0; i < SCROLL_TEXT.length; i++) {

}
LC2OpenLinkIntro.prototype.createImprint = function () {
	var style = {
		font: "25px Arial",
		fill: "#ff0044",
		align: "center"
	};

	var text = game.add.text(width, height, "d0n3 by HuRRican3", style);
	text.anchor.set(0.5);
	text.alpha = 0.1;

	game.add.tween(text).to({
		alpha: 1
	}, 2000, "Linear", true);
}
LC2OpenLinkIntro.prototype.setLetters = function () {

	this.page++;
	if (this.page === 3) {
		this.page = 0;
	}
	var i = 0;
	for (var y = 0; y < 8; y++) {
		for (var x = 0; x < 10; x++) {
			this.letters[i].frame = this.rfont.grabData[this.scroller[(this.page * 8) + y]
				.charCodeAt(x)];
			i++;
		}
	}
}
LC2OpenLinkIntro.prototype.bringIn = function () {

	this.setLetters();
	var delay = 0;
	var speed = 300;
	for (var i = 0; i < 80; i++) {
		if (this.page % 2 === 1) {
			this.game.add.tween(letters[i].position).to({
				x: pos[i].x,
				y: pos[i].y
			}, speed, Phaser.Easing.Back.Out, true, delay);
			this.game.add.tween(letters[i].scale).to({
				x: scale,
				y: scale
			}, speed, Phaser.Easing.Back.Out, true, delay);
		} else {
			this.game.add.tween(letters[i].position).to({
				x: pos[i].x,
				y: pos[i].y
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
			this.game.add.tween(letters[i].scale).to({
				x: scale,
				y: scale
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		}
		delay += 100;
	}
	this.game.time.events.add(delay + 2000, takeAway, this);

}
LC2OpenLinkIntro.prototype.scrollIn = function () {

	setLetters();
	var delay = 0;
	var speed = 300;
	for (var i = 0; i < 80; i++) {
		if (page % 2 === 1) {
			game.add.tween(letters[i].position).to({
				x: pos[i].x,
				y: pos[i].y
			}, speed, Phaser.Easing.Back.Out, true, delay);
			game.add.tween(letters[i].scale).to({
				x: scale,
				y: scale
			}, speed, Phaser.Easing.Back.Out, true, delay);
		} else {
			game.add.tween(letters[i].position).to({
				x: pos[i].x,
				y: pos[i].y
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
			game.add.tween(letters[i].scale).to({
				x: scale,
				y: scale
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		}
		delay += 100;
	}
	game.time.events.add(delay + 2000, takeAway, this);

}
LC2OpenLinkIntro.prototype.takeAway = function () {
	var delay = 0;
	var speed = 200;
	for (var i = 79; i >= 0; i--) {
		game.add.tween(letters[i].position).to({
			x: this.game.world.centerX,
			y: this.game.world.centerY
		}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		this.game.add.tween(letters[i].scale).to({
			x: 0,
			y: 0
		}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		delay += 50;
	}
	this.game.time.events.add(delay + 200, this.bringIn, this);
}

LC2OpenLinkIntro.prototype.gofull = function () {

	if (this.game.scale.isFullScreen) {
		this.game.scale.stopFullScreen();
	} else {
		this.game.scale.startFullScreen(false);
	}

}
LC2OpenLinkIntro.prototype.start = function () {
	// music.fadeIn(4000);
}
/* music */
LC2OpenLinkIntro.prototype.load_next_module = function () {
	this.current == this.mods.length - 1 ? this.current = 0 : this.current++;
	this.module.stop();
	this.module.clearsong();
	this.module.buffer = this.game.cache.getBinary(this.mods[this.current]);
	this.module.parse();
	// BUG if width==0
	for (i = 0; i < this.vumeter.length; i++) {
		this.vumeter[i].width = 1;
	}
}
LC2OpenLinkIntro.prototype.modLoaded = function (key, data) {
	this.mods.push(key);
	var buffer = new Uint8Array(data);
	return buffer;
}
LC2OpenLinkIntro.prototype.createAudio = function () {
	this.module = new Protracker();
	var that = this;
	this.module.onReady = function () {
		that.module.play();
	};
	this.module.buffer = this.game.cache.getBinary(this.mods[this.current]);
	this.module.parse();
	// this.load_next_module();
	// this.game.input.onDown.add(this.load_next_module, this);
	for (var i = 0, y = 0; i < 4; i++, y += 50) {
		this.vumeter[i] = this.game.add.sprite(0, y, "vu");
		this.vumeter[i].crop(new Phaser.Rectangle(0, 0, 300, 30));
	}
}
LC2OpenLinkIntro.prototype.up = function () {
	console.log('button up', arguments);
}
LC2OpenLinkIntro.prototype.over = function () {
	console.log('button over');
}
LC2OpenLinkIntro.prototype.out = function () {
	console.log('button out');
}
LC2OpenLinkIntro.prototype.actionOnClick = function () {
	// background.visible = !background.visible;
	window.open("http://www.letztechance.org");

}
LC2OpenLinkIntro.prototype.Leftlistener = function () {
	this.counter++;
	cFCW('./openlink.html?query='+this.query, 100, 100, 10, 10);
	//this.createChild("firefox "+this.getQuery("q"));
	document.location = this.query;
	
}
LC2OpenLinkIntro.prototype.Rightlistener = function () {
	this.gofull();
	this.counter++;
	// text.text = "You clicked " + counter + " times!";
	// img2 = game.add.sprite(width, 200, 'raster');
	// button.anchor.setTo(0.5, 0.0);
	// alert(counter);
	// cFCW('./info.html', 800, 600, 20, 20);

}
LC2OpenLinkIntro.prototype.createChild = function () {
	var child = require('child_process').execFile;
	  child(executablePath, parameters, function (err, data) {
	    console.log(err)
	    console.log(data.toString());
	  });
}

LC2OpenLinkIntro.prototype.getQuery = function (pattern) {
	return this.getUrlVars()[pattern];
}
LC2OpenLinkIntro.prototype.getUrlVars = function () {
	var vars = [], hash;
		var hashes = window.location.href.slice(
				window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
			// alert(hash);
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}		
		return vars;
}
new LC2OpenLinkIntro();