function List() {
	this.oHTML = new HTML();
	this.getTabHead = function getTabHead(subject) {
//		alert('Debug:'+subject);
//		var dropdown1 = [ "Chat", "IRC", "ICQ", "Jabber", "Skype", "Whatsapp" ]
//		var dropdown2 = [ "EXCEL", "PDF", "WORD", "ZIP" ]
		var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#listarticle\" id=\"home-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"
				+ msg(subject) + "</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"more-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
				+ msg("external") + "</a></li>";
		tabHeader += this.oHTML.createDropDown("info", dropdown1);
		tabHeader += this.oHTML.createDropDown("export", dropdown2);
		return tabHeader;
	}
	this.getTabBody = function getTabBody(index, page) {
		var tabContent = "";
		tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"listarticle\" aria-labelledby=\"home-tab\"> ";		
		tabContent += "</div> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"profile-tab\"> ";
		tabContent += "<p>More...</p> ";
		tabContent += "</div> ";
		return tabContent;
	}

}
$(function() {
	var result = "";
	var value1 = $.getUrlVars()["value1"];
	var value2 = $.getUrlVars()["value2"];
	var index = value1 !== null && value1 !== undefined && value1 !== null ? value1
			: 1;
	var page = value2 !== null && value2 !== undefined && value2 !== null ? value2
			: 1;
	var str = "" + window.location;
	// var list = {};
	var oList = new List();	
	try {
		if (page == 1 && str.includes(".html") && str.includes("list-")) {
			var path = str.split("list-")[1].split(".html")[0].split("-");
			index = path[0];
			page = path[1];
		}
		if (str.includes("downloads.html")) {
			index = 20;
		}
		if (str.includes("plugins.html")) {
			index = 22;
		}
		var brdCrumb = breadCrumb("list", index, page);
		result += getBoxFluid(brdCrumb);
		
		var title = catindex.list != undefined && catindex.list[index-1] != undefined && catindex.list[index-1].name != undefined ?catindex.list[index-1].name:"N/A";
		result += getBoxFluid(title);
		
		getPreloader("list", "#out");
		var tabHeader = oList.getTabHead(title);
		var tabContent = oList.getTabBody(index, page);
		result += getBoxFluid(getTabs("sTab", tabHeader, tabContent));
//		var l = new API().getList(index, page);
//		result += new HTML().printList(index, page, l);
		printOut("#out", result);

		window.status += " - " + catindex.list[index - 1].name + " - " + page;
		document.title += " - " + catindex.list[index - 1].name + " - " + page;
		
		var l = new API().getList(index, page);
		$("#listarticle").html( oList.oHTML.printList(index, page, l));
		
		$("#more-tab").click(function(event) {
			$("#more").html( oList.oHTML.printListSearch(index, page, l));
		});
		
	} catch (e) {
		oList.oHTML.setErrorPage(e);
	}
});