var cLIST = {};
cLIST["0"] = {
	"title" : "LetzteChance.Org - Startseite",
	"img" : "../img/lc2circle/html5.png",
	"subject" : "Aktualisiert am 09.11.2012",
	"href" : "../index.html"
};
cLIST["1"] = {
	"title" : "Games (Action, JumpAndRun, Shooter and so on...))",
	"img" : "../img/lc2circle/html5.png",
	"subject" : "F&uuml;r Microsoft Windows VISTA/7/8/10",
	"href" : "../read-24-1.html"
};
cLIST["2"] = {
	"title" : "LetzteChance.Org - Video des Tages",
	"img" : "../img/lc2circle/play.png",
	"subject" : "Video of the Day",
	"href" : "../index.php?q=lastcontent&value1=21"
};
cLIST["3"] = {
	"title" : "LetzteChance.Org - Javascript Source Convert v.1.0",
	"img" : "../img/lc2circle/java.jpg",
	"subject" : "HTML to PHP, HTML to Javascript, HTML to ASP",
	"href" : "../read-22-5.html"
};
cLIST["4"] = {
	"title" : "LC2GoogleStreetViewDriver.v.1.0",
	"img" : "../img/lc2circle/java.jpg",
	"subject" : "Fahren Sie mit Google Maps um die Welt",
	"href" : "../read-22-503.html"
};
cLIST["5"] = {
	"title" : "LC2Mediathek (Coming soon)",
	"img" : "../img/lc2circle/java.jpg",
	"subject" : "Durchsucht die Online-Mediatheken verschiedener Sender (ARD, ZDF, Arte, 3Sat, SWR, BR, MDR, NDR, WDR, HR, RBB, ORF, SF) und zeigt oder streamt die gefundenen Videos mit dem VLC Player",
	"href" : "../read-20-6.html"
};
cLIST["6"] = {
	"title" : "LC2FFMPEGGUI - Microsoft Windows GUI f&uuml; FFMPEG.",
	"img" : "../img/lc2circle/net.jpg",
	"subject" : " Wandeln Sie HUFFYUV, FLV, MPEG 1,2, 4, QTRLE, SNOW, SGI und viele andere Video Dateien. Benï¿½tigt GNU FFMPEG.",
	"href" : "../read-20-4.html"
};
cLIST["7"] = {
	"title" : "LetzteChance.Org -LC2Launcher.NET v.0.2b .NET Update vom 06.02.2015",
	"img" : "../img/lc2circle/net.jpg",
	"subject" : "Der Java LCBrowser",
	"href" : "../read-20-1.html"
};
cLIST["8"] = {
	"title" : "LetzteChance.Org -LC2Launcher.Java v.0.1a Java 32/64 Bit Update vom 10.01.2011",
	"img" : "../img/lc2circle/java.jpg",
	"subject" : "Der Java LCBrowser",
	"href" : "../read-20-2.html"
};
cLIST["9"] = {
	"title" : "LetzteChance.Org -LC2Launcher.Java v.0.1a Java 32/64 Bit Update vom 10.01.2011",
	"img" : "../img/lc2circle/java.jpg",
	"subject" : "Der Java LCBrowser",
	"href" : "../index.php?q=lastcontent&amp;value1=20"
};
// Tree View
jQuery(document).ready(function() { // first example
	// second
	/*
	 * jQuery("#navigation").treeview({ persist : "location", collapsed : true,
	 * unique : true }); // third jQuery("#red").treeview({ animated : "fast",
	 * collapsed : true, unique : true, persist : "cookie", toggle : function() {
	 * window.console && console.log("%o was toggled", this); } }); // fourth
	 * jQuery("#black, #gray").treeview({ control : "#treecontrol", persist :
	 * "cookie", cookieId : "treeview-black" });
	 */
	if (jQuery("#da-vinci-carousel").length > 0) {
		jQuery("#da-vinci-carousel").CloudCarousel({
			reflHeight : 56,
			reflGap : 2,
			titleBox : jQuery('#da-vinci-title'),
			altBox : jQuery('#da-vinci-alt'),
			buttonLeft : jQuery('#but1'),
			buttonRight : jQuery('#but2'),
			yRadius : 40,
			xPos : 285,
			yPos : 120,
			speed : 0.15,
			FPS : 30,
			autoRotate : 'left',
			autoRotateDelay : 1200,
			mouseWheel : true,
			bringToFront : true
		});
	}
	jQuery("#carousel").html(getCarousel()):
	/*
	 * jQuery("#carousel2").CloudCarousel({ xPos:280, yPos:80, buttonLeft:
	 * jQuery('#but3'), buttonRight: jQuery('#but4'), FPS:30, autoRotate:
	 * 'left', autoRotateDelay: 1200, speed:0.2, mouseWheel:true,
	 * bringToFront:true });
	 */
});

function getCarousel() {
	var result = "";
		result += "<div id=\"da-vinci-carousel\" style=\"width: 570px; height: 384px; background: repeat scroll 0% 0% transparent; overflow: hidden; position: relative;\"><div style=\"position: absolute; width: 100%; height: 100%; display: block;\"> ");
		result += "<a href=\""
						+ cLIST["0"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\""
						+ cLIST["0"]["title"]
						+ "\"><img style=\"position: "
						+ "absolute; left: 221px; top: 160px; z-index: 100;\" "
						+ "class=\"cloudcarousel\" src=\""
						+ cLIST["0"]["img"]
						+ "\" alt=\""
						+ cLIST["0"]["subject"]
						+ "\" title=\""
						+ cLIST["0"]["title"]
						+ "\" height=\"164\" width=\"128\"><canvas title=\""
						+ cLIST["0"]["title"]
						+ "\" alt=\""
						+ cLIST["0"]["title"]
						+ "\" height=\"56\" width=\"128\" class=\"reflection\" "
						+ "style=\"position: absolute; left: 221px; top: 326px; width: 128px; height: 56px;\"></canvas></a>");

		result += "<a href=\""
						+ cLIST["1"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\"Mona Lisa\"><img style=\"position: absolute;"
						+ " left: 74.761px; top: 148.85px; z-index: 94;\" "
						+ "class=\"cloudcarousel\" src=\""
						+ cLIST["1"]["img"]
						+ "\" alt=\""
						+ cLIST["1"]["title"]
						+ "\" title=\""
						+ cLIST["1"]["title"]
						+ "\""
						+ " height=\"154\" width=\"120\"><canvas title=\""
						+ cLIST["1"]["title"]
						+ "\" "
						+ "alt=\""
						+ cLIST["0"]["subject"]
						+ "\" height=\"56\" width=\"128\" class=\"reflection\" style=\"position: absolute;"
						+ " left: 74.761px; top: 305.14px; width: 120.513px; height: 52.7246px;\"></canvas></a> ");

		result += "<a href=\""
						+ cLIST["2"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\""
						+ cLIST["2"]["title"]
						+ "\">"
						+ "<img style=\"position: absolute; left: 40.5807px; top: 125.511px; z-index: 79;\" class=\"cloudcarousel\" src=\""
						+ cLIST["2"]["img"]
						+ "\" "
						+ "alt=\""
						+ cLIST["2"]["subject"]
						+ "\" title=\""
						+ cLIST["2"]["title"]
						+ "\" height=\"130\" width=\"101\"><canvas title=\""
						+ cLIST["2"]["title"]
						+ "\""
						+ " alt=\""
						+ cLIST["2"]["subject"]
						+ "\" height=\"56\" width=\"128\" class=\"reflection\" style=\"position: absolute;"
						+ " left: 40.5807px; top: 257.217px; width: 101.557px; height: 44.4311px;\"></canvas></a> ");

		result += "<a href=\""
						+ cLIST["3"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\""
						+ cLIST["3"]["title"]
						+ "\">"
						+ "<img style=\"position: absolute; left: 110.86px; top: 107.5px; z-index: 62;\""
						+ " class=\"cloudcarousel\" src=\""
						+ cLIST["3"]["img"]
						+ "\" alt=\""
						+ cLIST["3"]["subject"]
						+ "\" title=\""
						+ cLIST["3"]["title"]
						+ "\""
						+ " height=\"102\" width=\"79\"><canvas title=\""
						+ cLIST["3"]["title"]
						+ "\""
						+ " alt=\"Oil on canvas, circa 1501.\" height=\"56\" width=\"128\" class=\"reflection\" style=\"position: absolute; left: 110.86px;"
						+ " top: 211.25px; width: 80px; height: 35px;\"></canvas></a> ");

		result += "<a href=\""
						+ cLIST["4"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\""
						+ cLIST["4"]["title"]
						+ "\"><img style=\"position: absolute;"
						+ " left: 208.376px; top: 100.639px; z-index: 51;\""
						+ " class=\"cloudcarousel\" src=\""
						+ cLIST["4"]["img"]
						+ "\" alt=\""
						+ cLIST["4"]["subject"]
						+ "\" title=\""
						+ cLIST["4"]["title"]
						+ "\" height=\"84\""
						+ " width=\"65\"><canvas title=\""
						+ cLIST["4"]["title"]
						+ "\" alt=\""
						+ cLIST["4"]["subject"]
						+ "\" height=\"56\" width=\"128\""
						+ " class=\"reflection\" style=\"position: absolute; left: 208.376px; top: 186.142px; width: 65.9298px; height: 28.8443px;\"></canvas></a> ");

		result += "<a href=\""
						+ cLIST["5"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\""
						+ cLIST["5"]["title"]
						+ "\">"
						+ "<img style=\"position: absolute; left: 295.694px; top: 100.639px; z-index: 51;\" class=\"cloudcarousel\" src=\""
						+ cLIST["5"]["img"]
						+ "\" "
						+ "alt=\""
						+ cLIST["5"]["subject"]
						+ "\""
						+ " title=\""
						+ cLIST["5"]["title"]
						+ "\" height=\"84\" width=\"65\"><canvas title=\""
						+ cLIST["5"]["title"]
						+ "\" alt=\""
						+ cLIST["5"]["subject"]
						+ "\" height=\"56\" width=\"128\" class=\"reflection\""
						+ " style=\"position: absolute; left: 295.694px; top: 186.142px; width: 65.9298px; height: 28.8443px;\"></canvas></a> ");

		result += "<a href=\""
						+ cLIST["6"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\""
						+ cLIST["6"]["title"]
						+ "\"><img style=\"position:"
						+ " absolute; left: 379.14px; top: 107.5px; z-index: 62;\""
						+ " class=\"cloudcarousel\" src=\""
						+ cLIST["6"]["img"]
						+ "\" alt=\""
						+ cLIST["6"]["subject"]
						+ "\" title=\""
						+ cLIST["0"]["title"]
						+ "\" "
						+ "height=\"102\" width=\"80\">"
						+ "<canvas title=\""
						+ cLIST["6"]["title"]
						+ "\" alt=\""
						+ cLIST["6"]["subject"]
						+ "\" height=\"56\" width=\"128\" class=\"reflection\""
						+ " style=\"position: absolute; left: 379.14px; top: 211.25px; width: 80px; height: 35px;\"></canvas></a> ");

		result += "<a href=\""
						+ cLIST["7"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\""
						+ cLIST["0"]["title"]
						+ "\">"
						+ "<img style=\"position: absolute; left: 427.863px; top: 125.511px; z-index: 79;\" class=\"cloudcarousel\" src=\""
						+ cLIST["7"]["img"]
						+ "\" "
						+ "alt=\""
						+ cLIST["7"]["subject"]
						+ "\""
						+ " title=\""
						+ cLIST["7"]["title"]
						+ "\" height=\"130\" width=\"101\"><canvas title=\""
						+ cLIST["7"]["subject"]
						+ "\" alt=\""
						+ cLIST["0"]["title"]
						+ "\" height=\"56\" width=\"128\" class=\"reflection\" style=\"position: absolute; left: 427.863px; top: 257.217px; width: 101.557px;"
						+ " height: 44.4311px;\"></canvas></a> ");

		result += "<a href=\""
						+ cLIST["8"]["href"]
						+ "\" rel=\"external\" target=\"_parent\" title=\""
						+ cLIST["8"]["title"]
						+ "\">"
						+ "<img style=\"position: absolute; left: 374.726px; top: 148.85px; z-index: 94;\""
						+ " class=\"cloudcarousel\" src=\""
						+ cLIST["8"]["img"]
						+ "\" alt=\""
						+ cLIST["8"]["subject"]
						+ "\" "
						+ "title=\""
						+ cLIST["8"]["title"]
						+ "\" height=\"154\" width=\"120\"><canvas title=\""
						+ cLIST["8"]["title"]
						+ "\""
						+ " alt=\""
						+ cLIST["8"]["subject"]
						+ "\" height=\"56\" width=\"128\" class=\"reflection\" style=\"position: absolute;"
						+ " left: 374.726px; top: 305.14px; width: 120.513px; height: 52.7246px;\"></canvas></a> ");
		/**/
		result += " <div style=\"display: block;\" id=\"da-vinci-title\">Start</div> ");

		result += " <div style=\"display: block;\" id=\"da-vinci-alt\">Welcome to Letztechance.org</div> ");
		result += " <div id=\"but1\" class=\"carouselLeft\" style=\"position: absolute; top: 20px; right: 64px; display: inline;\"></div> ");
		result += " <div id=\"but2\" class=\"carouselRight\"	 style=\"position: absolute; top: 20px; right: 20px; display:inline;\"></div> ");
		result += " </div></div> ");
		return result;

	}
// -->
/*
 * $(function() { var dialog, form, // From
 * http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
 * emailRegex =
 * /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
 * name = $( "#name" ), email = $( "#email" ), password = $( "#password" ),
 * allFields = $( [] ).add( name ).add( email ).add( password ), tips = $(
 * ".validateTips" );
 * 
 * function updateTips( t ) { tips .text( t ) .addClass( "ui-state-highlight" );
 * setTimeout(function() { tips.removeClass( "ui-state-highlight", 1500 ); },
 * 500 ); }
 * 
 * function checkLength( o, n, min, max ) { if ( o.val().length > max ||
 * o.val().length < min ) { o.addClass( "ui-state-error" ); updateTips( "Length
 * of " + n + " must be between " + min + " and " + max + "." ); return false; }
 * else { return true; } }
 * 
 * function checkRegexp( o, regexp, n ) { if ( !( regexp.test( o.val() ) ) ) {
 * o.addClass( "ui-state-error" ); updateTips( n ); return false; } else {
 * return true; } }
 * 
 * function addUser() { var valid = true; allFields.removeClass(
 * "ui-state-error" );
 * 
 * valid = valid && checkLength( name, "username", 3, 16 ); valid = valid &&
 * checkLength( email, "email", 6, 80 ); valid = valid && checkLength( password,
 * "password", 5, 16 );
 * 
 * valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may
 * consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
 * valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" ); valid =
 * valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only
 * allow : a-z 0-9" );
 * 
 * if ( valid ) { $( "#users tbody" ).append( "<tr>" + "<td>" + name.val() + "</td>" + "<td>" +
 * email.val() + "</td>" + "<td>" + password.val() + "</td>" + "</tr>" );
 * dialog.dialog( "close" ); } return valid; }
 * 
 * dialog = $( "#dialog-form" ).dialog({ autoOpen: false, height: 300, width:
 * 350, modal: true, buttons: { "Create an account": addUser, Cancel: function() {
 * dialog.dialog( "close" ); } }, close: function() { form[ 0 ].reset();
 * allFields.removeClass( "ui-state-error" ); } });
 * 
 * form = dialog.find( "form" ).on( "submit", function( event ) {
 * event.preventDefault(); addUser(); }); $( "#create-user" ).button().on(
 * "click", function() { dialog.dialog( "open" ); }); });
 */