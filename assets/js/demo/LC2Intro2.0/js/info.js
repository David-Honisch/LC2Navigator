'use strict'
function XMASInfo2017() {
	this.emptyLine = "          ";
	this.rasterFont = ["MERRY","CHRISTMAS"];
	this.content = [" ",	
	"MERRY CHRISTMAS 2017", ""];
	this.line = '';
	this.introCanvas = 'lc2infoCanvas'
	this.appTitle = "FROHE WEIHNACHTEN 2017\nwünsch Euch\nDavid"
	this.prodTitle = "David"
	this.isScrollerEnded = false;
	this.bgColor = 0xffffff;
	this.counter = 0;
	this.backgroundv;
	this.starfield;
	// resolution
	this.browserVersion = navigator.appVersion;
	this.browserVersionNum = parseFloat(this.browserVersion);
	this.height = window.availHeight;
	this.width = window.availWidth;
	// if (browserVersionNum >= 4) {
	// height = screen.availHeight;
	// width = screen.availWidth;
	this.size = this.getSize();
	this.height = this.size[1];
	this.width = this.size[0];

	this.area;
	this.bmd;
	// text
	this.text, this.text2 = null;
	this.index = 0;
	this.line = '';

	this.textReflect = null;
	this.textReflect2 = null;
	this.font, this.bfont;
	this.letters = [];
	this.pos = [];
	this.pos2 = [];
	this.rasters, this.braster;

	this.data;
	this.scale = 2;
	this.page = -1;

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

}
XMASInfo2017.prototype.preload = function () {
	this.game.load.script('protracker', '_plugins/ProTracker.js');
	this.game.load.binary('shampoo', 'audio/letitsnow.mod', this.modLoaded, this);
	this.game.load.image('knightHawks', 'img/knighthawks.png');
	this.game.load.image('fw', 'img/fw.png');
	this.game.load.image('raster', 'img/wm.png');
	this.game.load.image('woman', 'img/woman.png');
	this.game.load.image('woman2', 'img/woman2.png');
	this.game.load.image('pic', 'img/bg.jpg');
	this.game.load.image('scrollpic', 'img/scroller.png');
}
XMASInfo2017.prototype.create = function () {
	this.game.stage.setBackgroundColor(this.bgColor);
	this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	// game.input.onDown.add(gofull, this);
	//this.createAudio();
	this.createImage();
	this.createBackgroundImage();
	this.addRightSprite();
	this.addLeftSprite();
	// this.addSprite();
	this.addSpriteTitle();
	// createRasterFontDemo();
	this.createText();
	this.createTextScroller();
	this.createRasterFont();
	// Stretch to fill
	this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;



}
XMASInfo2017.prototype.addRightSprite = function () {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.button = this.game.add.sprite(this.width - 100, 400, 'woman2');
	this.game.physics.enable(this.button, Phaser.Physics.ARCADE);
	// img3.body.velocity.x = 100;
	this.button.body.velocity.y = 200;
	this.button.body.collideWorldBounds = true;
	// img3.body.bounce.set(1);
	this.button.anchor.setTo(0.5, 0.0);
	this.button.inputEnabled = true;
	//	button.input.enableDrag();
	this.button.events.onInputDown.add(this.Rightlistener, this);
}

XMASInfo2017.prototype.addSpriteTitle = function () {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.img = this.game.add.sprite(200, 20, 'fw');
	this.game.physics.enable(this.img, Phaser.Physics.ARCADE);
	this.img.body.velocity.x = 100;
	this.img.body.velocity.y = 0;
	this.img.body.collideWorldBounds = true;
	this.img.body.bounce.set(1);
	this.img.anchor.setTo(0.5, 0.0);
}
XMASInfo2017.prototype.addSprite = function () {
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
XMASInfo2017.prototype.addLeftSprite = function () {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.img3 = this.game.add.sprite(20, 20, 'woman');
	this.game.physics.enable(this.img3, Phaser.Physics.ARCADE);
	// img3.body.velocity.x = 100;
	this.img3.body.velocity.y = 200;
	this.img3.body.collideWorldBounds = true;
	// img3.body.bounce.set(1);
	this.img3.anchor.setTo(0.5, 0.0);
	this.img3.inputEnabled = true;
	//	img3.input.enableDrag();
	this.img3.events.onInputDown.add(this.Leftlistener, this);

}
XMASInfo2017.prototype.update = function () {
	if (this.braster != null) {
		this.braster.resetCursor();
		for (var i = 0; i < this.braster.total; i++) {
			this.pos2[i]++;

			if (this.pos2[i] === this.data.length) {
				this.pos2[i] = 0;
			}

			this.braster.cursor.y = 300 + this.data[pos2[i]].y;
			this.braster.next();
		}
	}

	// if (index >= content.length && isScrollerEnded == false) {
	// }
	// if (index >= content.length && isScrollerEnded == false) {
	// 	/* createRasterFont(); */
	// 	isScrollerEnded = true;
	// }
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
		channels[i] = {
			sample_index: smp_index,
			sample_name: this.module.sample[smp_index].name
		};

		var w = Math.round(this.module.vu[i] * 1200);
		// you have to check that width is > 0 !
		this.vumeter[i].width = w > 0 ? w : 1;
	}
	//
	// textReflect.fill = grd;
	// font.text = "phaser x: " + game.input.x + " y: " + game.input.y;
	if (this.starfield != undefined)
		this.starfield.tilePosition.x += this.backgroundv;
}
XMASInfo2017.prototype.createText = function () {
	// var x = game.world.centerX / 2 + 100;
	var x = this.width / 2 - 200;
	var y = this.height / 2 - 100;
	y = 200;
	var fontSize = 20;
	this.text2 = this.game.add.text(x, y, "" + this.appTitle);
	this.text2.align = 'center';
	// Our font + size
	this.text2.font = 'Arial';
	this.text2.fontWeight = 'bold';
	this.text2.fontSize = fontSize;
	this.text2.fill = '#FFFFFF';

	var textReflect = this.game.add.text(x, y - 20, "" + this.appTitle);

	// Centers the text
	textReflect.anchor.set(0.5);
	textReflect.align = 'center';
	textReflect.scale.y = -1;

	// Our font + size
	textReflect.font = 'Arial';
	textReflect.fontWeight = 'bold';
	textReflect.fontSize = fontSize;

	// Here we create a linear gradient on the Text context.
	// This uses the exact same method of creating a gradient as you do on a
	// normal Canvas context.
	var grd = textReflect.context.createLinearGradient(100, 100, 100,
		this.text2.canvas.height);

	// Add in 2 color stops
	grd.addColorStop(0, 'rgba(0,0,0,0)');
	grd.addColorStop(1, 'rgba(0,0,0,0.08)');

	// And apply to the Text
	textReflect.fill = grd;
}
XMASInfo2017.prototype.getSize = function () {
	var myWidth = 0, myHeight = 0;

	if (typeof (window.innerWidth) == 'number') {
		// Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if (document.documentElement
		&& (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		// IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if (document.body
		&& (document.body.clientWidth || document.body.clientHeight)) {
		// IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	return [myWidth, myHeight];
}
XMASInfo2017.prototype.getScrollXY = function () {
	var scrOfX = 0, scrOfY = 0;

	if (typeof (window.pageYOffset) == 'number') {
		// Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	} else if (document.body
		&& (document.body.scrollLeft || document.body.scrollTop)) {
		// DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	} else if (document.documentElement
		&& (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
		// IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}
	return [scrOfX, scrOfY];
}
XMASInfo2017.prototype.createImage = function () {
	this.bmd = this.game.make.bitmapData();
	// bmd = game.make.bitmapData(1920,1080);
	this.bmd.load('pic').cls();
	this.bmd.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 1, 1);
	this.game.stage.smoothed = false;
	this.area = new Phaser.Rectangle(0, this.bmd.height, this.bmd.width, 1);
	this.dropTime = this.game.time.now + 250;
}
XMASInfo2017.prototype.createBackgroundImage = function () {
	this.backgroundv = 1;
	this.starfield = this.game.add.tileSprite(0, 0, this.width, this.height, 'scrollpic');
}
XMASInfo2017.prototype.createTextScroller = function () {
	this.text = this.game.add.text(32, 450, '', {
		font: "30pt Arial",
		fill: "#19cb65",
		stroke: "#119f4e",
		strokeThickness: 2
	});
	this.textReflect2 = this.game.add.text(32, 450, '', {
		font: "30pt Arial",
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
XMASInfo2017.prototype.updateLine = function () {

	if (this.line.length < this.content[this.index].length) {
		this.line = this.content[this.index].substr(0, this.line.length + 1);
		// text.text = line;
		this.text.setText(this.line);
	} else {
		// Wait 2 seconds then start a new line
		this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
	}

}

XMASInfo2017.prototype.nextLine = function () {

	this.index++;

	if (this.index < this.content.length) {
		this.line = '';
		this.game.time.events
			.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
	}

}
XMASInfo2017.prototype.createRasterFontDemo = function () {
	var style = {
		font: "25px Arial",
		fill: "#ff0044",
		align: "center"
	};

	var text = game.add.text(500, 480, "d0n3 by HuRRican3", style);
	text.anchor.set(0.5);
	text.alpha = 0.1;

	game.add.tween(text).to({
		alpha: 1
	}, 2000, "Linear", true);
	// font = game.add.retroFont('knightHawks', 31, 25,
	// Phaser.RetroFont.TEXT_SET6 + "*", 10, 1, 1);
	font = game.add.retroFont('knightHawks', 31, 25,
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

	game.stage.smoothed = false;

	// In reverse so they overlap in the correct order
	for (var i = 0; i < 80; i++) {
		// For some reason using a BMD here doesn't allow us to share the
		// texture - need to investigate why

		var letter = game.add.sprite(game.world.centerX, game.world.centerY,
			'knightHawks');
		// letter.blendMode = PIXI.blendModes.OVERLAY;
		letter.scale.set(0);
		letter.anchor.set(0.5);
		// letter.animations.loadFrameData(font.frameData, 48);
		letter.animations.loadFrameData(font.frameData, 48);
		// this.world.sendToBack(letter);
		letters.push(letter);
		pos.push({
			x: x + hx,
			y: y + hy
		}); // add 16 because of the anchor

		x += tx;

		if (x === game.width) {
			x = 0;
			y += ty;
		}
	}

	var raster = game.add.sprite(0, 0, 'raster');
	raster.width = game.width;
	raster.height = game.height;
	raster.blendMode = PIXI.blendModes.COLOR;

	// this.world.sendToBack(raster);

	bringIn();
}
XMASInfo2017.prototype.createRasterFont = function () {
	// createImprint();
	var lfont = this.game.add.retroFont('knightHawks', 31, 25,
		Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
	lfont.text = this.rasterFont[0];//?
	var center = this.game.world.centerX >300?this.game.world.centerX:0;
	var fsprite1 = this.game.add.sprite(center, 10 * 32, lfont);
	var lfont = this.game.add.retroFont('knightHawks', 31, 25,
	Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
	lfont.text = this.rasterFont[1];//?
	var fsprite2 = this.game.add.sprite(center, 11 * 32, lfont);
	// fsprite1.tint = 2 * 0xFFFFFF;
	// fsprite1.set(0.5, 1);
	// for (var c = 1; c < 12; c++) {
	// 	var i = this.game.add.sprite(this.game.world.centerX, 6 + c * 32, lfont);
	// 	i.tint = 2 * 0xFFFFFF;
	// 	i.anchor.set(0.5, 1);
	// 	// if (i.body !== null) {
	// 	// i.body.velocity.setTo(200, 200);
	// 	// i.body.collideWorldBounds = true;
	// 	// i.body.bounce.set(1);
	// 	// }

	// }	

	// 	}
	// for (var i = 0; i < 6; i++) {
	//this.lfont.anchor.setTo(0.5, 0.5);
	//lfont.anchor != null ? lfont.anchor.setTo(0.5, 0.5):null;
	// Add a simple bounce tween to each character's position.
	this.game.add.tween(this.lfont).to({
		y: 240
	}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * 1, false);
	this.game.add.tween(this.lfont).to({
		angle: 360
	}, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400 * 1, false);
}
XMASInfo2017.prototype.createImprint = function () {
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
XMASInfo2017.prototype.setLetters = function () {

	page++;
	if (page === 3) {
		page = 0;
	}
	var i = 0;
	for (var y = 0; y < 8; y++) {
		for (var x = 0; x < 10; x++) {
			letters[i].frame = font.grabData[scroller[(page * 8) + y]
				.charCodeAt(x)];
			i++;
		}
	}
}
XMASInfo2017.prototype.bringIn = function () {

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
XMASInfo2017.prototype.scrollIn = function () {

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
XMASInfo2017.prototype.takeAway = function () {
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

XMASInfo2017.prototype.gofull = function () {

	if (this.game.scale.isFullScreen) {
		this.game.scale.stopFullScreen();
	} else {
		this.game.scale.startFullScreen(false);
	}

}

XMASInfo2017.prototype.start = function () {

	// music.fadeIn(4000);

}
/* music */
XMASInfo2017.prototype.load_next_module = function () {
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
XMASInfo2017.prototype.modLoaded = function (key, data) {
	this.mods.push(key);
	var buffer = new Uint8Array(data);
	return buffer;
}
XMASInfo2017.prototype.createAudio = function () {
	// music = game.add.audio('boden');
	// music.onDecoded.add(start, this);
	this.module = new Protracker();
	var that = this;
	// module.play() has to be called from a callback
	this.module.onReady = function () {
		// module.play();
		//that.module.loopFull(0.6);
		that.module.play();
	};
	this.module.buffer = this.game.cache.getBinary(this.mods[this.current]);
	this.module.parse();
	this.load_next_module();
	// this.game.input.onDown.add(this.load_next_module, this);
}
XMASInfo2017.prototype.up = function () {
	console.log('button up', arguments);
}
XMASInfo2017.prototype.over = function () {
	console.log('button over');
}
XMASInfo2017.prototype.out = function () {
	console.log('button out');
}
XMASInfo2017.prototype.actionOnClick = function () {
	// background.visible = !background.visible;
	window.open("http://www.letztechance.org");

}
XMASInfo2017.prototype.Leftlistener = function () {
	this.counter++;
	cFCW('./info.html', 800, 600, 10, 10);
}
XMASInfo2017.prototype.Rightlistener = function () {
	this.gofull();
	this.counter++;
	//text.text = "You clicked " + counter + " times!";
	//    img2 = game.add.sprite(width, 200, 'raster');
	//    button.anchor.setTo(0.5, 0.0);
	//    alert(counter);
	cFCW('./info.html', 800, 600, 20, 20);

}
new XMASInfo2017();