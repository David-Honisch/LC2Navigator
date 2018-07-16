function Search() {
	this.oHTML = new HTML();
	this.readFile = function readFile(api) {
		$.ajax({url: api, dataType: 'text' ,success: function(result){			
	        printOut("#chat", result, false);
	    }});
	}
	
	this.clearChatTab = function clearChatTab() {
		printOut("#chat","",false);
	}
	 
	// eof static
	this.init = function init(query) {
		var result = "<div class=\"container-fluid cm-container-white\">";		
		result += "<h1>Searching...</h1>";
		result += "<h2>";
		if (query != "") {
			result += query;
		} else {
			result += msg('noquery');
		}
		result += "</h2>";
// result += getPreloaderIMG();
		result += "</div>";
		printOut("#out", result);
		$("#searchout").html(getPreloaderIMG()+"Initializing full scan...");
		return result;
	}
	this.createTabHead = function createTabHead(subject) {
		var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#search\" id=\"search-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"
				+ msg("search") + "</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#linksdb\" role=\"tab\" id=\"linksdb-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
			+ msg("links") + "</a></li>";		
		// wiki
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#wiki\" role=\"tab\" id=\"wiki-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
				+ msg("wiki") + "</a></li>";
		// youtube
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#yt\" role=\"tab\" id=\"yt-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
			+ msg("Youtube") +"</a></li>";
		
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#imdb\" role=\"tab\" id=\"imdb-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
				+ msg("imdb") + "</a></li>";		
				
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#jssearch\" role=\"tab\" id=\"jssearch-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
			+ msg("searchengines") + "</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"more-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
				+ msg("more") + "</a></li>";		
		tabHeader += this.oHTML.createDropDown("info", dropdown1);
		tabHeader += this.oHTML.createDropDown("export", dropdown2);
		return tabHeader;
	}

	this.createTabContent = function createTabContent() {
		var tabContent = "";
		tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"search\" aria-labelledby=\"search-tab\"> ";
		tabContent += "<p>"+getPreloaderIMG()+"</p> ";
		tabContent += "</div> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"wiki\" aria-labelledby=\"wiki-tab\"> ";
		tabContent += "<div id=\"wikicnt\">"+msg("No content selected. Please click a link to select")+".</div> ";
		tabContent += "<div id=\"wikiarticle\">"+msg("No article selected")+".</div> ";
		tabContent += "</div> ";
		
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"yt\" aria-labelledby=\"yt-tab\"> ";
		tabContent += "<p>Loading Youtube Search..</p> ";
		tabContent += "</div> ";

		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"imdb\" aria-labelledby=\"wiki-tab\"> ";
		tabContent += "<p>Loading IMDB Database..</p> ";
		tabContent += "</div> ";		
		
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"linksdb\" aria-labelledby=\"linksdb-tab\"> ";
		tabContent += "<p>Loading linksdb database..</p> ";
		tabContent += "</div> ";
	
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"jssearch\" aria-labelledby=\"jssearch-tab\"> ";
		tabContent += "<p>Coming soon.</p> ";
		tabContent += "</div> ";
		
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"more-tab\"> ";
		tabContent += "<p>More coming soon.</p> ";
		tabContent += "</div> ";
		return tabContent;
	}	
}

$(function() {
	var result = "";
	var value1 = $.getUrlVars()["value1"];
	var value2 = $.getUrlVars()["value2"];
	var query = $.getUrlVars()["query"];
	var type = $.getUrlVars()["q"];
	var index = value1 !== null && value1 !== undefined ? value1 : 1;
	var page = value2 !== null && value2 !== undefined ? value2 : 1;
//	alert(index+"#"+page+"#"+value1+"#"+value2);
	var query = query !== null && query !== undefined && query !== null ? query
			: undefined;
	var type = query !== null && query !== undefined ? query: undefined;
	var str = "" + window.location;
	var oHTML = new HTML();
//	alert(index+"#"+page+"#"+value1+"#"+value2);
	if (page == 1 && str.includes(".html")) {
		var list = str.split("search-")[1].split(".html")[0].split("-");
		index = list[0];
		page = list[1];
	}
	var search = new Search();
	var title = breadCrumb("search", index, page);
	result += getBoxFluid(title);
	getPreloader("search", "#out");
	result += search.init(query);

	try {
		var tabHeader = search.createTabHead();
		var tabContent = search.createTabContent();
		result += getBoxFluid(getTabs("sTab", tabHeader, tabContent));

		setPage("#out", result);
//		alert(index+"#"+page);
		oHTML.getSearchTables(index, page,catindex, query);
//		var res = oHTML.getSearchTables(index, page,catindex, query);
//		printSearchTables(index, page, query, res);
	} catch (e) {
		$("#error").append(getBoxFluid("Exception occured:"+e.message + JSON.stringify(e.stack)));
	}
	//events
	$("#search-tab").click(function(event) {
		search.clearChatTab();
	});
	$("#wiki-tab").click(function(event) {
		search.clearChatTab();
		getWiki(query);

	});
	
	$("#yt-tab").click(function(event) {
		search.clearChatTab();
		getYT(query);

	});

	$("#imdb-tab").click(function(event) {
		search.clearChatTab();
		$("#imdb").html(getOpenIMDB(query));
		$("#t").val(query);
		$.getScript('./assets/js/plugins/imdb.js', function() {
			$('#search-by-title-button').click();
			printOut("#error", "Error", true);

		});
	});
	
	$("#linksdb-tab").click(function(event) {
		search.clearChatTab();
		var api = "/tools/lc2searchsite/?q=read&value1="+index+"&value2="+page+"&query="+query+"&search=1";		
		$.ajax({url: api, dataType: 'text' ,success: function(result){
	        printOut("#linksdb", result, false);
	    }});
	});
	
	$("#Chat-tab").click(function(event) {
		alert('Debug');
		var api = "/tools/lc2php-irc/index.php?server=irc.dal.net&bot=LCBOT&channel=LCBOT";
		printOut("#more", createIFrame(api), true);
		$("#more").click();
		
	});
	$("#IRC-tab").click(function(event) {
		alert('Debug');
		var api = "/tools/lc2php-irc/index.php?server=irc.dal.net&bot=LCBOT&channel=LCBOT";
		printOut("#more", createIFrame(api), true);
		$("#more").click();
		
	});
	$("#Flickr-tab").click(function(event) {
//		alert('Flickr Debug');
		var api = "./plugins-22-24.html?query="+query+"&search=15";		
		$.ajax({url: api, dataType: 'text' ,success: function(result){
	        printOut("#more", result, false);
	    }});
		$("#more-tab").click();
		
	});
	

});