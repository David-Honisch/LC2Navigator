function Read() {
	this.oHTML = new HTML();
	this.oAPI = new API();

	this.getTabHead = function getTabHead(subject) {
		var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#article\" id=\"home-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"
				+ utf8_decode(subject) + "</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"profile-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
				+ msg("external") + "</a></li>";
		tabHeader += this.oHTML.createDropDown("info",dropdown1);
		tabHeader += this.oHTML.createDropDown("export",dropdown2);
		return tabHeader;
	}
	this.getTabBody = function getTabBody() {
		var tabContent = "";
		tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"article\" aria-labelledby=\"home-tab\"> ";
		tabContent += "<p>Loading...</p> ";
		tabContent += "</div> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"profile-tab\"> ";
		tabContent += "<p>More..</p> ";
		tabContent += "</div> ";
		return tabContent;
	}

}
$(function() {
	var result = "";
	var oRead = new Read();
	
	try {

		var value1 = $.getUrlVars()["value1"];
		var value2 = $.getUrlVars()["value2"];
		// alert(value1+"-"+value2);
		var index = value1 !== null && value1 !== undefined && value1 !== null ? value1
				: 1;
		var page = value2 !== null && value2 !== undefined && value2 !== null ? value2
				: 1;
		// alert(index+"-"+page);
		var str = "" + window.location;
		if (page == 1 && str.includes(".html")
				&& !str.includes("ytidplayer.html")) {
			var list = str.split("read-")[1].split(".html")[0].split("-");
			index = list[0];
			page = list[1];
		}
		if (str.includes("ytidplayer.html")) {
			index = 22;
			page = 2;
		}
		// alert(index+"-"+page);
		var title = breadCrumb("read", index, page);
		result += getBoxFluid(title);
		getPreloader("read", "#out");

		var read = new API().getRead(index, page);
		var subject = getSubject(read, true);

		var tabHeader = oRead.getTabHead(subject);
		var tabContent = oRead.getTabBody();
		result += getBoxFluid(getTabs("sTab", tabHeader, tabContent));
		setPage("#out", result);
		//print read
		oRead.oHTML.printRead("#article", read, index, page);
		oRead.oHTML.printReadQuery("#more", read, index, page);
		//set status and title
		window.status = read.subject;
		document.title = read.subject;
		//read plugin
		var pluginUrl = oRead.oAPI.hostName+"plugins-" + index + "-" + page + ".html";
		$.ajax({
			url : pluginUrl,
			success : function(res) {
				$("#plugins").append(res);
			}
		});
	} catch (e) {
		oRead.oHTML.setErrorPage(e);
	}

});
