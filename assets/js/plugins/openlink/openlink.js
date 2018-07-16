function JSRedirect(type) {
	this.type = type;
	this.color = "black";
	this.getInfo = function() {
		return this.color + ' ' + this.type + ' JSRedirect';
	};
	//
	this.doCreateLink = function doCreateLink(pUrl, pText) {
		this.doCreateLink(pUrl, pUrl);
	}
	//
	this.doCreateLink = function doCreateLink(pUrl, pText) {
		pText = typeof pText !== 'undefined' ? pText : 'more...';
		return "" + "<a href=\"" + pUrl + "\">" + pText + "</a>";
	}
	//
	this.doCreateLinkButton = function doCreateLinkButton(pUrl, pText, pTarget,
			pClass) {
		pText = typeof pText !== 'undefined' ? pText : 'more...';
		pTarget = typeof pTarget !== 'undefined' ? pTarget : '_parent';
		pUrl = typeof pUrl !== 'undefined' ? pUrl : '#download';
		pClass = typeof pClass !== 'undefined' ? pClass : '_blank';
		return "" + "<center><input type=\"button\" id=\"" + pClass
				+ "\" onclick=\"window.open('" + pUrl + "','" + pTarget
				+ "');\" value=\"" + pText + "\"></input></center>";
	}
	this.doCreateLinkButtonWindow = function doCreateLinkButton(pUrl, pText,
			pTarget, pClass) {
		pText = typeof pText !== 'undefined' ? pText : 'more...';
		pTarget = typeof pTarget !== 'undefined' ? pTarget : '_parent';
		pUrl = typeof pUrl !== 'undefined' ? pUrl : '#download';
		pClass = typeof pClass !== 'undefined' ? pClass : '_blank';
		return "" + "<center><input type=\"button\" id=\"" + pClass
				+ "\" onclick=\"window.open('" + pUrl + "','" + pTarget
				+ "');\" value=\"" + pText + "\"></input></center>";
	}
	//
	this.doCreateTimerForm = function doCreateTimerForm() {
		return "<form name=\"form1\"><input type=\"hidden\" name=\"field1\" value=\"0\"></input></form>";
	}
	// text += "<iframe src=\"./js/LC2Intro.II.v.1.0/openlink.html\"
	// height=\"600\" width=\"800\" frameborder=\"0\" scolling=\"no\"></iframe>
	// ";
	this.doCreateIFrame = function doCreateIFrame() {
		return "<iframe src=\"./js/LC2Intro.II.v.1.0/index.html\" height=\"620\" width=\"840\" frameborder=\"0\" scolling=\"no\"></iframe> ";
	}
	this.doCreateIFrameNoSnd = function doCreateIFrameNoSnd() {
		return "<iframe src=\"./js/LC2Intro.II.v.1.0/openlink.html\" height=\"620\" width=\"840\" frameborder=\"0\" scolling=\"no\"></iframe> ";
	}
	this.doCreateIFrameBrd = function doCreateIFrameBrd(url) {
		url = typeof(url) ? url: "./js/LC2Intro.II.v.1.0/openlink.html";
		
		return "<iframe src=\""+url+"\" height=\"620\" width=\"100%\" frameborder=\"0\" scolling=\"auto\"></iframe> ";
	}
	this.isIE = function isIE() {
		var rV = -1; // Return value assumes failure.

		if (navigator.appName == 'Microsoft Internet Explorer'
				|| navigator.appName == 'Netscape') {
			var uA = navigator.userAgent;
			var rE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

			if (rE.exec(uA) != null) {
				rV = parseFloat(RegExp.$1);
			}
			/* check for IE 11 */
			else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
				rV = 11;
			}
		}
		return rV;
	}
}
function urlencodeURI(str) {
	return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g,
			"%2A");
}
function urlencode(str) {
	str = (str + '').toString();
	// Tilde should be allowed unescaped in future versions of PHP (as reflected
	// below), but if you want to reflect current
	// PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the
	// following.
	// return encodeURIComponent(str)
	return encodeURI(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(
			/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(
			/%20/g, '+').replace('http%3A%2F%2F', 'http').replace(
			'https%3A%2F%2F', 'https');
}
function utf8ArrayToStr(array) {
	var out, i, len, c;

	out = "";
	len = array.length;
	i = 0;

	// XXX: Invalid bytes are ignored
	while (i < len) {
		c = array[i++];
		if (c >> 7 == 0) {
			// 0xxx xxxx
			out += String.fromCharCode(c);
			continue;
		}

		// Invalid starting byte
		if (c >> 6 == 0x02) {
			continue;
		}

		// #### MULTIBYTE ####
		var extraLength = null;
		if (c >> 5 == 0x06) {
			extraLength = 1;
		} else if (c >> 4 == 0x0e) {
			extraLength = 2;
		} else if (c >> 3 == 0x1c) {
			extraLength = 3;
		} else if (c >> 2 == 0x3c) {
			extraLength = 4;
		} else if (c >> 1 == 0x7c) {
			extraLength = 5;
		} else {
			continue;
		}

		if (i + extraLength >= len) {
			return {
				result : out,
				leftovers : array.slice(i - 1)
			};
		}

		var mask = (1 << (8 - extraLength - 1)) - 1, res = c & mask, nextChar, count;

		for (count = 0; count < extraLength; count++) {
			nextChar = array[i++];
			if (nextChar >> 6 != 0x02)
				break;
			res = (res << 6) | (nextChar & 0x3f);
		}

		if (count != extraLength) {
			continue;
		}
		out += String.fromCharCode(res);
	}

	return {
		result : out,
		leftovers : []
	};
}

function ua2text(ua) {
	s = "";
	for (var i = 0; i < ua.length; i++) {
		s += String.fromCharCode(ua[i]);
	}
	return s;
}
function doTimePopUp(pUrl) {
	var text = "<div id=\"timer\"></div>";
	text += "<script type=\"text/javascript\" src=\"./assets/js/timepop/timepop.js\"></script>";
	text += "<script type=\"text/javascript\">StartTimedPopup('" + pUrl
			+ "')</script>";
	return text;
}

/* Pfad Ausgabe */
function doCreateRedirect(pUrl) {
//	alert('Debug:'+pUrl);
	var text = "";
	var path = "";
	var href = document.location.href;
	var oMain = new JSRedirect('JSRedirect');
	var s = href.split("/");
	for (var i = 2; i < (s.length - 1); i++) {
		path += "<A HREF=\""
				+ href.substring(0, href.indexOf(s[i]) + s[i].length)
				+ "/\" target=\"_parent\">" + s[i] + "</A> / ";
	}
	// length
	i = s.length - 1;
	var out = href.substring(0, href.indexOf(s[i]) + s[i].length);
	// create link
	path += "<A HREF=\"" + out + "\">" + s[i] + "</A>";
	var url = window.location.protocol + "//" + path;
	pUrl = urlencode(pUrl);
	// print
	text = "<style>"
			+ "#openlink{background:#ffffff;height:200;widht:320px;text-align:center;margin-left:auto;margin-right:auto; }"
			+ "#lc2introCanvas{height:200;widht:320px;text-align:center;margin-left:auto;margin-right:auto; }"
			+ "</style>";
	text += url;
	text += "<hr>";
	text += oMain.doCreateLinkButton("#download", "Visit:\n" +pUrl,  "_parent","_parent");
	text += "<hr>";
	//text += oMain.doCreateLinkButton(pUrl, "Visit:\n" +pUrl+"\n - Direct Link -", "_parent", "_parent");
	text += oMain.doCreateLinkButtonWindow(pUrl, "Visit:\n" +pUrl+"\n - Direct Link -", "" + pUrl, "blue")
	// text += "<hr>";
	// text += oMain.doCreateLinkButton("#download", "Direct Link to:"
	// + urlencode(out), "_parent", "_parent");
	text += "<hr>";
	//
//	text += doTimePopUp(pUrl);

	
	text += "<script type=\"text/javascript\" src=\"./assets/js/demo/LC2Intro2.0/js/phaser.min.js\"></script>";
	text += "<script type=\"text/javascript\" src=\"./assets/js/demo/LC2Intro2.0/js/index.js\"></script>";
	text += "<link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"./assets/js/demo/LC2Intro2.0/css/core.css\" />";
	text += "<center><div class=\"democontent\"><center><div id=\"lc2introCanvas\"></div></center></div></center>";
//	if (oMain.isIE() == -1)
//		text += oMain.doCreateTimerForm();
//	text += "<div id=\"intro\"></div> ";
//	if (oMain.isIE() != -1) {
//		text += oMain.doCreateIFrame();
//	} else {
//		text += oMain.doCreateIFrameBrd(pUrl);
//	}
	text += "<div id=\"download\"></div> ";
	text += "<h1>Direct Link:</h1> ";

	text += oMain.doCreateLinkButtonWindow(pUrl, pUrl, "" + pUrl, "blue");
	// append
	jQuery(document).ready(function() {
		jQuery("#plugins").append("" + text);
	});

}