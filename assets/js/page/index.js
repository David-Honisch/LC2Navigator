$(function() {
	var result = "";
	try {
		var value1 = $.getUrlVars()["value1"];
		var value2 = $.getUrlVars()["value2"];
		var index = value1 !== null && value1 !== undefined && value1 !== null ? value1	:1;
		var page = value2 !== null && value2 !== undefined && value2 !== null ? value2:1;
		var str = "" + window.location;
		if (page == 1 && str.includes(".html")
				&& !str.includes("listindex.html")) {
			var list = str.split("index-")[1].split(".html")[0].split("-");
			index = list[0];
			page = list[1];
		}
		var title = breadCrumb("index", index, page);
		result += getBoxFluid(title);
		getPreloader("index", "#out");
		result += new HTML().getIndex(index, page);
		printOut("#out", result);
		
		window.status += " - Index -"+page;
		document.title += " - Index -"+page;
	} catch (e) {
		printOut("#error",getBoxFluid( e + "<br>" + e.stack));
	}
});