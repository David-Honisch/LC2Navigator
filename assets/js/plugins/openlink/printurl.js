//  10 x 8
// var game2 = new Phaser.Game(320, 256, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var appTitle = "LETZTECHANCE.ORG\nproud to present"
var prodTitle = typeof pUrl !== 'undefined' ? pUrl :"LETZTECHANCE INTRO v.1.0";
var isScrollerEnded = false;

var game2 = new Phaser.Game(320 * 2, 256 * 2, Phaser.CANVAS, 'lc2urlCanvas', {
	preload : preload,
	create : create,
	update : update
});
var font;
var letters = [];
var pos = [];
var pos2 = [];

var data;
var scale = 2;
var page = -1;

var bfont;
var alpha;
var mask = new Phaser.Rectangle();
/*
 * var filter; var sprite;
 */
var data;
var rasters, braster;
var pos = [];

var button;
var background;

var bmd;
// var text;
var text, text2 = null;
var index = 0;
var line = '';

var textReflect = null;
var textReflect2 = null;
// music
// var music;
var mods = [];
var current = 0;

var vumeter = [];
var channels = [];

var module;
var content = [ " ",
// /*
"LetzteChance.Org", "proud to present", " ", prodTitle, "Written in", " ",
		"TypeWriter", " ", "coding by David Honisch",
		"rendering by David Honisch", "       ", "Thanx goes out to",
		"Violator, Phygozator,", "FireBird and ", " ",
		// */
		"all cool guys out there...", " ", " ", "Bye ", " " ];

// /*
var scroller = [ "----------", "- LETZTE -", "- CHANCE -", "-  .ORG  -",
		"----------", "- 2.1.0  -", "- PROUD  -", "-   TO   -", "- PRESENT-",
		"----------",

		" ATARI    ", " RETRO    ", " INTRO    ", " v.1.0    ", " USING    ",
		"TEXTWRITER", "EFFECT IN ", "PHASER ...",

		"GREETINGS ", "  GOES    ", "  OUT TO  ", "HURRICANE ", " VIOLATOR ",
		"PHYGOZATOR", " FIREBIRD ", " WARLORD  ", ];
//

// */
function preload() {
	// game2.load.audio('boden', 'bodenstaendig_2000_in_rock_4bit.ogg');
	//game2.load.script('protracker', 'js/LC2Intro/_plugins/ProTracker.js');
	//game2.load.binary('shampoo', 'js/LC2Intro/audio/shampoo.mod', modLoaded, this);
	game2.load.image('knightHawks', 'js/LC2Intro/img/knighthawks.png');
	// game2.load.image('knightHawks',
	// 'assets/fonts/retroFonts/knighthawks_font.png');
	// game2.load.image('knightHawks', 'assets/fonts/retroFonts/KNIGHT3.png');
	game2.load.image('raster', 'js/LC2Intro/img/sunset-raster.png');
	// game2.load.image('raster', 'assets/demoscene/multi-color-raster.png');
	// game2.load.image('raster', 'img/raster-blue.png');
	// game2.load.image('back',
	// 'phaser-examples-master/examples/assets/pics/swirl1.jpg');
	// game2.load.image('background','phaser-examples-master/examples/assets/misc/starfield.jpg');
	game2.load.spritesheet('button', 'js/LC2Intro/img/button_sprite_sheet.png', 193, 71);
}
function createTextScroller() {
	text = game2.add.text(32, 450, '', {
		font : "30pt Arial",
		fill : "#19cb65",
		stroke : "#119f4e",
		strokeThickness : 2
	});
	textReflect2 = game2.add.text(32, 450, '', {
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
function createText() {
	var x = game2.world.centerX / 2 + 50;
	var y = game2.world.centerY / 2;
	y = 0;
	var fontSize = 20;
	text2 = game2.add.text(x, y, "" + appTitle);
	text2.align = 'center';

	// Our font + size
	text2.font = 'Arial';
	text2.fontWeight = 'bold';
	text2.fontSize = fontSize;
	text2.fill = '#000000';

	// Here we create our fake reflection :)
	// It's just another Text object, with an alpha gradient and flipped
	// vertically

	// textReflect = game2.add.text(game2.world.centerX, game2.world.centerY + 50,
	// ""+appTitle);
	textReflect = game2.add.text(x, y + 50, "" + appTitle);

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
	var grd = textReflect.context.createLinearGradient(0, 0, 0,
			text2.canvas.height);

	// Add in 2 color stops
	grd.addColorStop(0, 'rgba(0,0,0,0)');
	grd.addColorStop(1, 'rgba(0,0,0,0.08)');

	// And apply to the Text
	textReflect.fill = grd;
}
function createRaster() {
	// Generate our motion data
	data = game2.make.tween({
		y : 0
	}).to({
		y : 500
	}, 640, Phaser.Easing.Sinusoidal.In).yoyo(true).generateData(100);
	// A group of rasters
	braster = game2.add.group();
	// The total number + spacing between each one
	var total = 8;
	var offset = 4;
	// /*
	for (var i = 0; i < total; i++) {
		var raster = braster.create(0, 0, 'raster');
		raster.width = 640;
		raster.alpha = (i + 1) * (1 / total);
		pos2.push(i * offset);
	}
	// */

}
function createButton() {
	button = game2.add.button(game2.world.centerX - 95, 500, 'button',
			actionOnClick, this, 2, 1, 0);
	button.onInputOver.add(over, this);
	button.onInputOut.add(out, this);
	button.onInputUp.add(up, this);

}
function createRasterFontDemo() {
	var style = {
		font : "25px Arial",
		fill : "#ff0044",
		align : "center"
	};
	/*
	 * var text = game2.add.text(500, 480, "d0n3 by HuRRican3", style);
	 * text.anchor.set(0.5); text.alpha = 0.1;
	 */
	game2.add.tween(text).to({
		alpha : 1
	}, 2000, "Linear", true);
	// font = game2.add.retroFont('knightHawks', 31, 25,
	// Phaser.RetroFont.TEXT_SET6 + "*", 10, 1, 1);
	font = game2.add.retroFont('knightHawks', 31, 25,
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

	game2.stage.smoothed = false;

	// In reverse so they overlap in the correct order
	for (var i = 0; i < 80; i++) {
		// For some reason using a BMD here doesn't allow us to share the
		// texture - need to investigate why

		var letter = game2.add.sprite(game2.world.centerX, game2.world.centerY,
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
		letter.animations.loadFrameData(font.frameData, 48);
		// this.world.sendToBack(letter);

		letters.push(letter);
		pos.push({
			x : x + hx,
			y : y + hy
		}); // add 16 because of the anchor

		x += tx;

		if (x === game2.width) {
			x = 0;
			y += ty;
		}
	}

	var raster = game2.add.sprite(0, 0, 'raster');
	raster.width = game2.width;
	raster.height = game2.height;
	raster.blendMode = PIXI.blendModes.COLOR;

	// this.world.sendToBack(raster);

	bringIn();
}

function createRasterFont() {

	bfont = game2.make.bitmapData();
	alpha = game2.make.bitmapData();
	raster = game2.make.bitmapData();

	// Load the font
	bfont.load('knightHawks');

	// Extract all the pink pixels into the alpha bmd
	bfont.extract(alpha, 237, 0, 140, 255, true);

	raster.resize(bfont.width, bfont.height);

	// Display the 4 stages of the process
	// game2.add.image(0, 0, 'knightHawks');
	// game2.add.image(360, 0, alpha);
	// game2.add.image(0, 200, raster);
	// game2.add.image(360, 200, bfont);

	// Tween the rasters
	mask.setTo(0, 0, bfont.width, game2.cache.getImage('raster').height);

	game2.add.tween(mask).to({
		y : -(mask.height - bfont.height)
	}, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);

}
// music
function createAudio() {
	// music = game2.add.audio('boden');
	// music.onDecoded.add(start, this);
	module = new Protracker();
	// module.play() has to be called from a callback
	module.onReady = function() {
		module.play();
	};
	module.buffer = game2.cache.getBinary(mods[current]);
	module.parse();
}
// eof music

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
			game2.add.tween(letters[i].position).to({
				x : pos[i].x,
				y : pos[i].y
			}, speed, Phaser.Easing.Back.Out, true, delay);
			game2.add.tween(letters[i].scale).to({
				x : scale,
				y : scale
			}, speed, Phaser.Easing.Back.Out, true, delay);
		} else {
			game2.add.tween(letters[i].position).to({
				x : pos[i].x,
				y : pos[i].y
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
			game2.add.tween(letters[i].scale).to({
				x : scale,
				y : scale
			}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		}
		delay += 100;
	}
	game2.time.events.add(delay + 2000, takeAway, this);

}

function takeAway() {
	var delay = 0;
	var speed = 200;
	for (var i = 79; i >= 0; i--) {
		game2.add.tween(letters[i].position).to({
			x : game2.world.centerX,
			y : game2.world.centerY
		}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		game2.add.tween(letters[i].scale).to({
			x : 0,
			y : 0
		}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
		delay += 50;
	}
	game2.time.events.add(delay + 200, bringIn, this);
}

function gofull() {

	if (game2.scale.isFullScreen) {
		game2.scale.stopFullScreen();
	} else {
		game2.scale.startFullScreen(false);
	}

}

function start() {

	// music.fadeIn(4000);

}

//
function updateLine() {

	if (line.length < content[index].length) {
		line = content[index].substr(0, line.length + 1);
		// text.text = line;
		text.setText(line);
	} else {
		// Wait 2 seconds then start a new line
		game2.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
	}

}

function nextLine() {

	index++;

	if (index < content.length) {
		line = '';
		game2.time.events
				.repeat(80, content[index].length + 1, updateLine, this);
	}

}
// audio
function modLoaded(key, data) {

	mods.push(key);
	var buffer = new Uint8Array(data);
	return buffer;

}
function create() {
	game2.stage.setBackgroundColor(0xffffff);

	//createAudio();
	/*
	 * createRaster(); createText(); createTextScroller();
	 */
	createRaster();

	//createTextScroller();
	//createRasterFontDemo();
	// createRasterFont();

	//createText();
	//game2.input.onDown.add(gofull, this);
	// Stretch to fill
	game2.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	// Keep original size
	// game2.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
	// Maintain aspect ratio
	// game2.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
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

			braster.cursor.y = 100 + data[pos2[i]].y;
			braster.next();
		}
	}
	// */
	//
	// if (line.length > content.length)
	if (index >= content.length && isScrollerEnded == false) {
		/*
		 * textReflect.destroy(); text.destroy(); text2.destroy();
		 * rasters.destroy(); //mask.destroy(); createButton(); //
		 * createRasterFont();
		 */
	}
	if (index >= content.length && isScrollerEnded == false) {
		/* createRasterFont(); */
		isScrollerEnded = true;
	}
	game2.context.clearRect(0, 0, game2.width, game2.height);
}

// events
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

	background.visible = !background.visible;

}