function Home() {
	this.oHTML = new HTML();
	this.getTabHead = function getTabHead(subject) {
		var tabs = [ "home", "rss feeds", "info", "export" ];
		var dropdown1 = [ "Chat", "IRC", "ICQ", "Jabber", "Skype", "Whatsapp" ];
		var dropdown2 = [ "EXCEL", "PDF", "WORD", "ZIP" ];
		var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#home\" id=\"home-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"
				+ msg(tabs[0]) + "</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#rss\" id=\"rss-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"
				+ msg(tabs[1]) + "</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"profile-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
				+ msg("external") + "</a></li>";
		tabHeader += this.oHTML.createDropDown("info", dropdown1);
		tabHeader += this.oHTML.createDropDown("export", dropdown2);
		return tabHeader;
	}
	this.getTabBody = function getTabBody() {
		var tabContent = "";
		tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"home\" aria-labelledby=\"home-tab\">";
		tabContent += "<p><a href=\"#\" onclick=\"FCW(getRead(28,224).body,400,640,10,100);\">"
				+ msg("all") + " " + msg("feeds") + "</a></p>";
		tabContent += "</div>";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"rss\" aria-labelledby=\"profile-tab\">";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://9gagrss.com/feed/',400,1024,10,100);\">"
				+ msg("9gag") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://www.heise.de/newsticker/heise.rdf',400,1024,10,100);\">"
				+ " " + msg("heise") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://rss.golem.de/rss.php?feed=RSS2.0',400,1024,10,100);\">"
				+ " " + msg("golem") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://www.general-anzeiger-bonn.de/?service=rss&p=rr-gesamt.xml',400,1024,10,100);\">"
				+ msg("ga") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://www.faz.net/aktuell/?rssview=1',400,1024,10,100);\">"
				+ msg("faz") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://www.ksta.de/blueprint/servlet/xml/ksta/23698894-asYahooFeed.xml',400,1024,10,100);\">"
				+ msg("ksta") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://www.ksta.de/blueprint/servlet/xml/ksta/23699858-asYahooFeed.xml',400,1024,10,100);\">"
				+ msg("ksta") + "</a></p>";
		tabContent += "</div>";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"profile-tab\">";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://www.oracle.com/technetwork/rssmanager/rss-1501416.html',400,1024,10,100);\">OTN - Headlines</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://www.oracle.com/ocom/groups/public/@otn/documents/webcontent/rss-otn-sec.xml',400,1024,10,100);\">OTN - Critical Patch Updates</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://www.oracle.com/ocom/groups/public/@otn/documents/webcontent/rss-oramag-recent.xml',400,1024,10,100);\">OTN - Oracle Magazine</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=http://blogs.oracle.com/otn/feed/entries/rss',400,1024,10,100);\">OTN TechBlog</a></p>";

		tabContent += "<p><a href=\"#\" onclick=\"FCW(getRead(28,252).body,410,640,10,100);\">"
				+ msg("all")
				+ " "
				+ msg("microsoft")
				+ " "
				+ msg("feeds")
				+ "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=https://www.microsoft.com/germany/techwiese/feeds/rss/aktuell.xml',400,1024,10,100);\">"
				+ msg("actual") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=https://www.microsoft.com/germany/techwiese/feeds/rss/events.xml',400,1024,10,100);\">"
				+ msg("events") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=https://www.microsoft.com/germany/techwiese/feeds/rss/netframework.xml',400,1024,10,100);\">"
				+ msg(".net") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=https://www.microsoft.com/germany/techwiese/feeds/rss/asp.net.xml',400,1024,10,100);\">"
				+ msg("asp") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=https://www.microsoft.com/germany/techwiese/feeds/rss/VisualStudio.xml',400,1024,10,100);\">"
				+ msg("visual studio") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=https://www.microsoft.com/germany/techwiese/feeds/rss/programmiersprachen.xml',400,1024,10,100);\">"
				+ msg("language") + "</a></p>";
		tabContent += "<p><a href=\"#\" onclick=\"cFCW('./?q=srss&query=https://www.microsoft.com/germany/techwiese/feeds/rss/Windows.xml',400,1024,10,100);\">"
				+ msg("windows") + "</a></p>";
		tabContent += "</div>";
		tabContent += "</div>";
		return tabContent;
	}



	this.getCharts = function getCharts(res) {
		result = " <div class=\"container-fluid\"> ";
		result += "                 <div class=\"row\"> ";
		result += "                     <div class=\"col-sm-4\"> ";
		result += "                         <div class=\"panel panel-default\"> ";
		result += "                             <div class=\"panel-heading\">"
				+ msg("News") + "</div> ";
		result += "                             <div class=\"panel-body\"> ";
		result += "                                 <div id=\"d1-c1\" style=\"height:150px\"></div> ";
		result += "                             </div> ";
		result += "                         </div> ";
		result += "                     </div> ";
		result += "                     <div class=\"col-sm-4\"> ";
		result += "                         <div class=\"panel panel-default\"> ";
		result += "                             <div class=\"panel-heading\">"
				+ msg("News Average") + "</div> ";
		result += "                             <div class=\"panel-body\"> ";
		result += "                                 <div id=\"d1-c2\" style=\"height:150px\"></div> ";
		result += "                             </div> ";
		result += "                         </div> ";
		result += "                     </div> ";
		result += "                     <div class=\"col-sm-4\"> ";
		result += "                         <div class=\"panel panel-default\"> ";
		result += "                             <div class=\"panel-heading\">"
				+ msg("News Posts") + "</div> ";
		result += "                             <div class=\"panel-body\"> ";
		result += "                                 <div id=\"d1-c3\" style=\"height:150px\"></div> ";
		result += "                             </div> ";
		result += "                         </div> ";
		result += "                     </div> ";
		result += "                 </div> ";
		result += "                 <div class=\"panel panel-default\"> ";
		result += "                     <div class=\"panel-heading\">C3 Bars</div> ";
		result += "                     <div class=\"panel-body\"> ";
		result += "                         <div id=\"d1-c5\" style=\"height:320px\"></div> ";
		result += "                     </div> ";
		result += "                 </div> ";
		result += "                 <div class=\"panel panel-default\"> ";
		result += "                     <div class=\"panel-heading\">Post statistic</div> ";
		result += "                     <div class=\"panel-body\"> ";
		result += "                         <div id=\"d1-c4\" style=\"height:320px\"></div> ";
		result += "                     </div> ";
		result += "                 </div> ";

		// result += " <div class=\"alert alert-info shadowed\" role=\"alert\">
		// <i class=\"fa fa-fw fa-info-circle\"></i> C3.js chart library by
		// Masayuki Tanaka (MIT): <a
		// href=\"http://c3js.org/\">http://c3js.org/</a> </div> ";
		result += "                 <div class=\"alert alert-info shadowed\" role=\"alert\"> <i class=\"fa fa-fw fa-info-circle\"></i>LetzteChance.Org - Posts Average of month"
				+ "</div> ";
		result += "                 <div class=\"panel panel-default\"> ";
		result += "                 <div class=\"panel-heading\">Post statistic</div> ";

		result += "<div id=\"panelprogress\">Loading data...</div> ";
		// result += "<div id=\"panelprogressData\">Loading...</div> ";

		result += "                 </div> ";
		result += "             </div> ";
		return result;
	}
	this.getTD = function getTD(value, title) {
		var title = title !== undefined ? title : "N/A";
		var value = value !== undefined ? value : 0;
		var result = "<tr>";
		result += "<td style=\"white-space:nowrap\">" + title + "</td>";
		result += "<td>";
		result += "<div class=\"progress\">";
		result += "<div class=\"progress-bar progress-bar-danger\" style=\"width:"
				+ value + "%\"></div>";
		result += "</div>";
		result += "</td>";
		result += "<td>" + value + "%</td>";
		result += "</tr>";
		return result;
	}

	this.getProgressBars = function getProgressBars(res) {
		var result = "";
		try {			
		
		result = "<table class=\"table table-bordered\"> ";
		var list = {};
		$("#panelprogressData").html();
		for ( var v in res) {
			var t = res[v].url.split("-")[1];
			if (t !== undefined) {
				if (list[t] !== undefined) {
					var c = parseInt(list[t]);
					list[t] = (+1 + c);
				} else {
					list[t] = 0;
				}
			}
		}
		var max = 0;
		for ( var v in list) {
			max = +max + list[v];
		}
		var onePercent = +(+max / 100);
		for ( var v in list) {
			var val = list[v];
			// $("#panelprogressData").append(onePercent);
			var currentPercent = ((+onePercent * +val) / 100);
			// $("#panelprogressData").append("<hr>val "+val+" 1%:"+onePercent+"
			// Max:"+max+"<hr>"+currentPercent+" %<hr>");
			var td = this.getTD(currentPercent, catindex.list[v - 1].name)
			result += td;
			// $("#panelprogressData").append(td);
		}
		result += "</table> ";
		} catch (e) {
			console.log(e+e.stack);
		}
		return result;
	}

}
$(function() {
	var result = "";
	var index = 1;
	var page = 1;
	var html = new HTML();
	var oHome = new Home();
	try {
		getPreloader("home", "#out");

		var title = "<h2 style=\"margin-top:0;\">Welcome to LetzteChance.Org</h2> \n";
		title += "<p>More than links...</p>\n";
		// title += "<p id=\"marquee\" class=\"microsoft marquee\"></p>\n";

		result += getBoxFluid(title);

		var vod = "<h2 style=\"margin-top:0;\">Video of the day</h2> \n";
		vod += "<div id=\"videoofday\">Video of the day initializing...</div> \n";
		result += getBoxFluid(vod);
		// tabs
		var tabHeader = oHome.getTabHead("RSS Feeds");
		var tabContent = oHome.getTabBody();
		result += getBoxFluid(getTabs("sTab", tabHeader, tabContent));
		// eof tbs
		result += getRow(""
				+ getBox3(msg("route"), "<div id=\"route\">" + getRouteForm()
						+ "</div>" + "<div id=\"tags\">Loading tags...</div>") + getBox3("News",html.createList(index, page))
				+ getBox3("Security", html.createList(2, page)));

		result += "<div class=\"container-fluid cm-container-white\">\n";
		result += "<div id='fullcalendar'>Calendar loading...</div>\n";
		result += "</div>\n";

		result += getRow("" + getBox3("Videos", html.createList(21, page)) + ""
				+ getBox3(msg("politic"), html.createList(29, page))
				+ getBox3(msg("sport"), html.createList(42, page)));

		result += getRow("" + getBox3(msg("java"), html.createList(38, page)) + ""
				+ getBox3(msg("plsql"), html.createList(27, page))
				+ getBox3(msg("c#"), html.createList(41, page)));

		result += getRow("" + getBox3(msg("pictures"), html.createList(3, page))
				+ getBox3(msg("media"), html.createList(18, page))
				+ getBox3(msg("music"), html.createList(19, page)) + "");

		result += getRow("" + getBox3(msg("events"), html.createList(63, page))
				+ getBox3(msg("3rd Party Downloads"), html.createList(23, page))
				+ getBox3(msg("cheats"), html.createList(4, page)) + "");

		result += oHome.getCharts(index);
		printOut("#out", result);

		$.getScript('./assets/js/page/dashboard.js', function() {
			$("#c3out").append("Initializing dashboard page...");
			new DashBoard().makeGauge('#d1-c1', 42, '#1abc9c');
			new DashBoard().makeGauge('#d1-c2', 22, '#3498db');
			new DashBoard().makeGauge('#d1-c3', 72, '#f39c12');
			new DashBoard().makeChart('#d1-c4', 'spline', [ '#1abc9c',
					'#3498db' ], true);
			new DashBoard().makeChart('#d1-c5', 'bar',
					[ '#3498db', '#2980b9' ], false);
		});
		getVideoClipOfTheDay('#videoofday');

		$.getScript('./assets/js/fullcalendar/fullcalendar.min.js', function() {
			$("#c3out").append("js/fullcalendar/fullcalendar.min.js...");
		});

		$.getScript('./assets/js/fullcalendar/lang/de.js', function() {
			$("#c3out").append("lang.js...");
		});

		$.getScript('./assets/js/fullcalendar/mainview.js', function() {
			$("#c3out").append("js/fullcalendar/mainview.js...");
		});
		jQuery(document)
				.ready(
						function() {
							try {								
								new HTML().getTags('#tags');
								$("#panelprogress")
										.html(
												"Initializing events. Please wait paitently...");
								if (eventsList !== undefined) {
									$("#panelprogress")
											.html(
													"Initializing data done. Printing out hits. Please wait paitently...");
									$("#panelprogress").html(
											oHome.getProgressBars(eventsList));
								} else {
									$("#panelprogress").html(
											"Sorry, no data found ?");
								}								
							} catch (e) {
								$("#panelprogressData").append(
										"Exception:" + JSON.stringify(e)
												+ e.stack);
							}
						});

		// $('#demo-buttons button').click(function() {
		// var color = $(this).data('switch-color');
		// $('.cm-navbar').removeClass(navbar_cc);
		// navbar_cc = 'cm-navbar-' + color;
		// $('.cm-navbar').addClass(navbar_cc);
		// $('.cm-navbar .btn').removeClass(btn_cc);
		// btn_cc = 'btn-' + color;
		// $('.cm-navbar .btn').addClass(btn_cc);
		// });
		// alert('Debug');

	} catch (e) {
		oRead.oHTML.setErrorPage(e);
	}
});