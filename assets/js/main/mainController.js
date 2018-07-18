'use strict'
//var isDebug = false;
var FastClick = function(FastClick) {
	FastClick.attach(document.body);
	};
//var hostName = "./";
//var hostName = "http://localhost/cms5/";
var hostName = "http://www.letztechance.org/";
var openLink = this.hostName+"openlink?";
var isDebug = true;
var isAuthorized = false;
var isAdmin = false;
var isOpen = false;
var isLangLoaded = false;
var isGamesLoaded = false;
var isPluginsLoaded = false;
var userName = "anonymous";
var msgList = [];
var ImagePath = "./img/";
var lang = "";
var catindex = {};
var eventList = {};
var TokenPREFIX = "LC2Token-RSA-a22343sZIA4C22211sTB33331112";
var session;
var user;
var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
var pathArray = window.location.pathname.split( '/' );
var secondLevelLocation = pathArray[0];
var dropdown1 = [ "Chat","Flickr", "IRC", "ICQ", "Jabber", "Skype", "Whatsapp" ];
var dropdown2 = [ "EXCEL", "PDF", "WORD", "ZIP" ];
var LIST = {};
LIST["News"] = {
"All" : new API().hostName+"list-1-1.html",
"Videos" : new API().hostName+"index.php?q=lastcontent&amp;value1=21",
"All Videos" : new API().hostName+"list-21-1.html"
};
LIST["Website Search"] = {
"All" : new API().hostName+"?q=plugins&plugin=lc2javascriptsearch.v.1.0"
};
function MainController(page) {
	this.page = page;
	this.pageController;

	this.getPage = function getPage(page) {
		$.getScript('./assets/js/page/PageController.js', function() {
			try {
				printOut("#out", getBoxFluid(getPreloaderIMG()+"Initializing page controller..."), true);
				this.pageController = new PageController();
				printOut("#out", getBoxFluid(getPreloaderIMG()+"Initializing page controller..."
						+ 'Page Controller ' + this.pageController.getInfo()),
						true);
				this.pageController.doAuth();				
				printOut("#out", getBoxFluid(getPreloaderIMG()+"Initializing page done.", true));
				this.pageController.getPage(page);
				
				printOut("#cnt", getBoxFluid("(c) by LetzteChance.Org", false));
			} catch (e) {
				printOut("#error", getBoxFluid(e + "" + e.stack, true));
			}
		});
	}
}

function PageCheck() {
	this.init = function init(page) {
		var str = "" + window.location;
		if (str.includes(".html")) {
			page = CheckStaticPages(page, str);						
		}
		page = str.includes("?logout=1") ? "logout" : page;
		page = str.includes("openlink") ? "openlink" : page;
		page = page == "home" && str.includes("q=upload") ? "upload" : page;
//		alert('Debug!!:'+page);
		return page;
	}
	
	function CheckStaticPages(page, str) {		
		page = page == "home" && str.includes("list-") ? "list" : page;
		page = page == "home" && str.includes("read-") ? "read" : page;
		page = page == "home" && str.includes("sread-") ? "sread" : page;
		page = page == "home" && str.includes("q=search") ? "search" : page;
		//downloads, youtube player
		page = page == "home" && str.includes("downloads.html") ? "list": page;
		page = page == "home" && str.includes("ytidplayer.html") ? "read": page;
		// contact, imprint
		page = page == "home" && str.includes("contact.html") ? "contact": page;
		page = page == "home" && str.includes("imprint.html") ? "imprint": page;
		// crud
		page = page == "home" && str.includes("post") ? "post" : page;
		page = page == "home" && str.includes("edit") ? "edit" : page;
		page = page == "home" && str.includes("delete") ? "delete" : page;
		page = page == "home" && str.includes("plugins.html") ? "list" : page;
		page = page == "home" && str.includes("listindex.html") ? "index" : page;
		// plugins
		return page;
	}
}

jQuery(document).ready(function() {
			var html = new HTML();
			var lang = lang != undefined ? lang : getLang('l');
			var isShortHead = $.getUrlVars()["q"] !== null
					&& $.getUrlVars()["q"] !== undefined
					&& $.getUrlVars()["q"] == "srss" ? true : false;
			var page = $.getUrlVars()["q"] !== null
					&& $.getUrlVars()["q"] !== undefined
					&& $.getUrlVars()["q"] !== null ? $.getUrlVars()["q"]
					: "home";

			page = new PageCheck().init(page);
			catindex = new API().getIndex(0);			
			var ctrl = new MainController(page);

			ctrl.getPage(page);
		});
$.extend({
	getUrlVars : function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(
				window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar : function(name) {
		return $.getUrlVars()[name];
	}
});