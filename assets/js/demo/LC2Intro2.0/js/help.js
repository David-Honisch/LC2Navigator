var appTitle = "FROHE WEIHNACHTEN 2017\nwünsch Euch\nDavid"
var prodTitle = "David"
var isScrollerEnded = false;
var introCanvas = 'lc2infoCanvas'
var bgColor = 0xffffff;
var counter = 0;
var backgroundv;
var starfield;
// resolution
var browserVersion = navigator.appVersion;
var browserVersionNum = parseFloat(browserVersion);
var height = window.availHeight;
var width = window.availWidth;
// if (browserVersionNum >= 4) {
// height = screen.availHeight;
// width = screen.availWidth;
var size = getSize();
height = size[1];
width = size[0];
var bmd;
// text
var text, text2 = null;
var index = 0;
var line = '';

var textReflect = null;
var textReflect2 = null;
var font, bfont;
var letters = [];
var pos = [];
var pos2 = [];
var rasters, braster;

var data;
var scale = 2;
var page = -1;

var bfont;
var alpha;
var mask = new Phaser.Rectangle();
// textreflect
// var textReflect;
// var grd;
// music
// var music;
var mods = [];
var current = 0;

var vumeter = [];
var channels = [];

var module;
var content = [ " ",
// /*
"MERRY CHRISTMAS 2017","" ];

// /*
var emptyLine = "          ";
var rasterFont = "MERRY CHRISTMAS";

// */
var gameInfo = new Phaser.Game(width, height, Phaser.CANVAS, introCanvas, {
	preload : preload,
	create : create,
	update : update
});
var img;
function preload() {
	gameInfo.load.script('protracker', '_plugins/ProTracker.js');
	gameInfo.load.binary('shampoo', 'audio/letitsnow.mod', modLoaded, this);
	gameInfo.load.image('knightHawks', 'img/knighthawks.png');
	gameInfo.load.image('fw', 'img/fw.png');
	gameInfo.load.image('raster', 'img/wm.png');
	gameInfo.load.image('woman', 'img/woman.png');
	gameInfo.load.image('woman2', 'img/woman2.png');
	gameInfo.load.image('pic', 'img/bg.jpg');
	gameInfo.load.image('scrollpic', 'img/scroller.png');
}
function create() {
	gameInfo.stage.setBackgroundColor(bgColor);
	gameInfo.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

	// gameInfo.input.onDown.add(gofull, this);
	// gameInfo.input.onDown.add(gofull, this);

	//createAudio();
	createImage();
	
	
	createBackgroundImage();
	addRightWomanSprite();
	addLeftWomanSprite();
	addSprite();
	addSpriteTitle();
	// createRasterFontDemo();

	createText();
	createTextScroller();
	createRasterFont();
	
//	gameInfo.input.onDown.add(gofull, this);
	// Stretch to fill
	gameInfo.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

	

}

function addRightWomanSprite() {
	gameInfo.physics.startSystem(Phaser.Physics.ARCADE);
	button = gameInfo.add.sprite(width-100, 400, 'woman2');
	gameInfo.physics.enable(button, Phaser.Physics.ARCADE);
	// img3.body.velocity.x = 100;
	button.body.velocity.y = 200;
	button.body.collideWorldBounds = true;
	// img3.body.bounce.set(1);
	button.anchor.setTo(0.5,0.0);
	button.inputEnabled = true;
//	button.input.enableDrag();
	button.events.onInputDown.add(Rightlistener, this);
}

function addSpriteTitle() {
	gameInfo.physics.startSystem(Phaser.Physics.ARCADE);
	img = gameInfo.add.sprite(200, 20, 'fw');
	gameInfo.physics.enable(img, Phaser.Physics.ARCADE);
	img.body.velocity.x = 100;
	img.body.velocity.y = 0;
	img.body.collideWorldBounds = true;
	img.body.bounce.set(1);
	img.anchor.setTo(0.5, 0.0);
}
function addSprite() {
	gameInfo.physics.startSystem(Phaser.Physics.ARCADE);
	img2 = gameInfo.add.sprite(width, 20, 'raster');
	gameInfo.physics.enable(img2, Phaser.Physics.ARCADE);
	img2.body.velocity.x = 100;
	img2.body.velocity.y = 200;
	img2.body.collideWorldBounds = true;
	img2.body.bounce.set(1);
	img2.anchor.setTo(0.5, 0.0);
	img2.inputEnabled = true;
	img2.input.enableDrag();

}
function addLeftWomanSprite() {
	gameInfo.physics.startSystem(Phaser.Physics.ARCADE);
	img3 = gameInfo.add.sprite(20, 20, 'woman');
	gameInfo.physics.enable(img3, Phaser.Physics.ARCADE);
	// img3.body.velocity.x = 100;
	img3.body.velocity.y = 200;
	img3.body.collideWorldBounds = true;
	// img3.body.bounce.set(1);
	img3.anchor.setTo(0.5, 0.0);
	img3.inputEnabled = true;
//	img3.input.enableDrag();
	img3.events.onInputDown.add(Leftlistener, this);

}
function update() {
	// /*
	if (braster != null) {
		braster.resetCursor();
		for (var i = 0; i < braster.total; i++) {
			pos2[i]++;

			if (pos2[i] === data.length) {
				pos2[i] = 0;
			}

			braster.cursor.y = 300 + data[pos2[i]].y;
			braster.next();
		}
	}

	// if (index >= content.length && isScrollerEnded == false) {

	// 	textReflect.destroy();
	// 	text.destroy();
	// 	text2.destroy();
	// 	rasters.destroy(); // mask.destroy(); createButton(); //
	// 	createRasterFont();

	// }
	// if (index >= content.length && isScrollerEnded == false) {
	// 	/* createRasterFont(); */
	// 	isScrollerEnded = true;
	// }
	gameInfo.context.clearRect(0, 0, gameInfo.width, gameInfo.height);
	//
	if (area.y > 0 && gameInfo.time.now > dropTime) {
		for (var y = 0; y < area.y; y++) {
			bmd.copyRect('pic', area, 0, y);
		}

		area.y--;
		dropTime = gameInfo.time.now + 25;
	}
	// img.anchor.setTo(0.5, 0.5);
	// module.sample = array of Objects containing informations about a played
	// sample

	for (i = 0; i < vumeter.length; i++) {
		var smp_index = module.channel[i].sample;
		channels[i] = {
			sample_index : smp_index,
			sample_name : module.sample[smp_index].name
		};

		var w = Math.round(module.vu[i] * 1200);
		// you have to check that width is > 0 !
		vumeter[i].width = w > 0 ? w : 1;
	}
	//
	// textReflect.fill = grd;
	// font.text = "phaser x: " + gameInfo.input.x + " y: " + gameInfo.input.y;
	starfield.tilePosition.x += backgroundv;
}
function createText() {
	// var x = gameInfo.world.centerX / 2 + 100;
	var x = width / 2 - 200;
	var y = height / 2 - 100;
	y = 200;
	var fontSize = 20;
	text2 = gameInfo.add.text(x, y, "" + appTitle);
	text2.align = 'center';
	// Our font + size
	text2.font = 'Arial';
	text2.fontWeight = 'bold';
	text2.fontSize = fontSize;
	text2.fill = '#FFFFFF';

	var textReflect = gameInfo.add.text(x, y - 20, "" + appTitle);

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
			text2.canvas.height);

	// Add in 2 color stops
	grd.addColorStop(0, 'rgba(0,0,0,0)');
	grd.addColorStop(1, 'rgba(0,0,0,0.08)');

	// And apply to the Text
	textReflect.fill = grd;
}
function getSize() {
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
	return [ myWidth, myHeight ];
}
function getScrollXY() {
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
	return [ scrOfX, scrOfY ];
}
function createImage() {
	bmd = gameInfo.make.bitmapData();
	// bmd = gameInfo.make.bitmapData(1920,1080);
	bmd.load('pic').cls();
	bmd.addToWorld(gameInfo.world.centerX, gameInfo.world.centerY, 0.5, 0.5, 1, 1);
	gameInfo.stage.smoothed = false;
	area = new Phaser.Rectangle(0, bmd.height, bmd.width, 1);
	dropTime = gameInfo.time.now + 250;
}
function createBackgroundImage() {
	backgroundv = 1;
	starfield = gameInfo.add.tileSprite(0, 0, width, height, 'scrollpic');
}
function createTextScroller() {
	text = gameInfo.add.text(32, 450, '', {
		font : "30pt Arial",
		fill : "#19cb65",
		stroke : "#119f4e",
		strokeThickness : 2
	});
	textReflect2 = gameInfo.add.text(32, 450, '', {
		font : "30pt Arial",
		fill : "#19cb65",
		stroke : "#119f4e",
		strokeThickness : 2
	});

	// Centers the text
	textReflect2.anchor.set(0.5);
	textReflect2.align = 'center';
	textReflect2.scale.y = -1;

	// Our font + size
	textReflect2.font = 'Arial';
	textReflect2.fontWeight = 'bold';
	textReflect2.fontSize = 30;

	// Here we create a linear gradient on the Text context.
	// This uses the exact same method of creating a gradient as you do on a
	// normal Canvas context.
	var grd = textReflect2.context.createLinearGradient(0, 0, 0,
			text.canvas.height);

	// Add in 2 color stops
	grd.addColorStop(0, 'rgba(0,0,0,0)');
	grd.addColorStop(1, 'rgba(0,0,0,0.08)');

	// And apply to the Text
	textReflect2.fill = grd;

	nextLine();
}
function updateLine() {

	if (line.length < content[index].length) {
		line = content[index].substr(0, line.length + 1);
		// text.text = line;
		text.setText(line);
	} else {
		// Wait 2 seconds then start a new line
		gameInfo.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
	}

}

function nextLine() {

	index++;

	if (index < content.length) {
		line = '';
		gameInfo.time.events
				.repeat(80, content[index].length + 1, updateLine, this);
	}

}
function createRasterFontDemo() {
	var style = {
		font : "25px Arial",
		fill : "#ff0044",
		align : "center"
	};

	var text = gameInfo.add.text(500, 480, "d0n3 by HuRRican3", style);
	text.anchor.set(0.5);
	text.alpha = 0.1;

	gameInfo.add.tween(text).to({
		alpha : 1
	}, 2000, "Linear", true);
	// font = gameInfo.add.retroFont('knightHawks', 31, 25,
	// Phaser.RetroFont.TEXT_SET6 + "*", 10, 1, 1);
	font = gameInfo.add.retroFont('knightHawks', 31, 25,
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

	gameInfo.stage.smoothed = false;

	// In reverse so they overlap in the correct order
	for (var i = 0; i < 80; i++) {
		// For some reason using a BMD here doesn't allow us to share the
		// texture - need to investigate why

		var letter = gameInfo.add.sprite(gameInfo.world.centerX, gameInfo.world.centerY,
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
		// letter.animations.loadFrameData(font.frameData, 48);
		letter.animations.loadFrameData(font.frameData, 48);
		// this.world.sendToBack(letter);

		letters.push(letter);
		pos.push({
			x : x + hx,
			y : y + hy
		}); // add 16 because of the anchor

		x += tx;

		if (x === gameInfo.width) {
			x = 0;
			y += ty;
		}
	}

	var raster = gameInfo.add.sprite(0, 0, 'raster');
	raster.width = gameInfo.width;
	raster.height = gameInfo.height;
	raster.blendMode = PIXI.blendModes.COLOR;

	// this.world.sendToBack(raster);

	bringIn();
}
function createRasterFont() {
	createImprint();
	var lfont = gameInfo.add.retroFont('knightHawks', 31, 25,
			Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
	lfont.text = rasterFont;

	for (var c = 10; c < 12; c++) {
		var i = gameInfo.add.sprite(gameInfo.world.centerX, 6 + c * 32, lfont);
		i.tint = 2 * 0xFFFFFF;
		i.anchor.set(0.5, 1);
		i.body.velocity.setTo(200, 200);
		i.body.collideWorldBounds = true;
		i.body.bounce.set(1);
	}
	// for (var i = 0; i < 6; i++) {
	lfont.anchor.setTo(0.5, 0.5);
	// Add a simple bounce tween to each character's position.
	gameInfo.add.tween(lfont).to({
		y : 240
	}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * 1, false);
	gameInfo.add.tween(lfont).to({
		angle : 360
	}, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400 * 1, false);
}
function createImprint() {
	var style = {
		font : "25px Arial",
		fill : "#ff0044",
		align : "center"
	};

	var text = gameInfo.add.text(width, height, "d0n3 by HuRRican3", style);
	text.anchor.set(0.5);
	text.alpha = 0.1;

	gameInfo.add.tween(text).to({
		alpha : 1
	}, 2000, "Linear", true);
}
function setLetters() {

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
function bringIn() {

	setLetters();
	var delay = 0;
	var speed = 300;
	for (var i = 0; i < 80; i++) {
		if (page % 2 === 1) {
			gameInfo.add.tween(letters[i].position).to({
				x : pos[i].x,
				y : pos[i].y
			}, speed, Phaser.Easing.Back.Out, true, delay);
			gameInfo.add.tween(letters[i].scale).to({
				x : scale,
				y : scale
			}, speed, Phaser.Easing.Back.Out, true, delay);
		} else {
			gameInfo.add.tween(letters[i].position).to({
				x : pos[i].x,
				y : pos[i].y
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
			gameInfo.add.tween(letters[i].scale).to({
				x : scale,
				y : scale
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		}
		delay += 100;
	}
	gameInfo.time.events.add(delay + 2000, takeAway, this);

}
function scrollIn() {

	setLetters();
	var delay = 0;
	var speed = 300;
	for (var i = 0; i < 80; i++) {
		if (page % 2 === 1) {
			gameInfo.add.tween(letters[i].position).to({
				x : pos[i].x,
				y : pos[i].y
			}, speed, Phaser.Easing.Back.Out, true, delay);
			gameInfo.add.tween(letters[i].scale).to({
				x : scale,
				y : scale
			}, speed, Phaser.Easing.Back.Out, true, delay);
		} else {
			gameInfo.add.tween(letters[i].position).to({
				x : pos[i].x,
				y : pos[i].y
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
			gameInfo.add.tween(letters[i].scale).to({
				x : scale,
				y : scale
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		}
		delay += 100;
	}
	gameInfo.time.events.add(delay + 2000, takeAway, this);

}
function takeAway() {
	var delay = 0;
	var speed = 200;
	for (var i = 79; i >= 0; i--) {
		gameInfo.add.tween(letters[i].position).to({
			x : gameInfo.world.centerX,
			y : gameInfo.world.centerY
		}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		gameInfo.add.tween(letters[i].scale).to({
			x : 0,
			y : 0
		}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		delay += 50;
	}
	gameInfo.time.events.add(delay + 200, bringIn, this);
}

function gofull() {

	if (gameInfo.scale.isFullScreen) {
		gameInfo.scale.stopFullScreen();
	} else {
		gameInfo.scale.startFullScreen(false);
	}

}

function start() {

	// music.fadeIn(4000);

}
/* music */
function load_next_module() {
	current == mods.length - 1 ? current = 0 : current++;

	module.stop();
	module.clearsong();

	module.buffer = gameInfo.cache.getBinary(mods[current]);
	module.parse();

	// BUG if width==0
	for (i = 0; i < vumeter.length; i++) {
		vumeter[i].width = 1;
	}
}
function modLoaded(key, data) {
	mods.push(key);
	var buffer = new Uint8Array(data);
	return buffer;
}
function createAudio() {
	// music = gameInfo.add.audio('boden');
	// music.onDecoded.add(start, this);
	module = new Protracker();
	// module.play() has to be called from a callback
	module.onReady = function() {
		// module.play();
		// module.loopFull(0.6);
		module.play();
	};
	module.buffer = gameInfo.cache.getBinary(mods[current]);
	module.parse();
	load_next_module();
	gameInfo.input.onDown.add(load_next_module, this);
}

function up() {
	console.log('button up', arguments);
}

function over() {
	console.log('button over');
}

function out() {
	console.log('button out');
}

function actionOnClick() {

	// background.visible = !background.visible;
	window.open("http://www.letztechance.org");

}
function Leftlistener () {

    counter++;
    //text.text = "You clicked " + counter + " times!";
//    img2 = gameInfo.add.sprite(width, 200, 'raster');
//    img3.anchor.setTo(0.5, 0.0);
    //alert('test');
    cFCW('./info.html',800,600,10,10);

}
function Rightlistener () {

    counter++;
    //text.text = "You clicked " + counter + " times!";
//    img2 = gameInfo.add.sprite(width, 200, 'raster');
//    button.anchor.setTo(0.5, 0.0);
//    alert(counter);
    cFCW('./info.html',800,600,20,20);

}