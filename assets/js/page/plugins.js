$(function() {
	var result = "";
	var value1 = $.getUrlVars()["value1"];
	var value2 = $.getUrlVars()["value2"];
	var index = value1 !== null && value1 !== undefined && value1 !== null ? value1
			: 1;
	var page = value2 !== null && value2 !== undefined && value2 !== null ? value2
			: 1;

	var str = "" + window.location;
	if (page == 1 && str.includes(".html")) {
		var list = str.split("list-")[1].split(".html")[0].split("-");
		index = list[0];
		page = list[1];
	}
	try {
		var title = breadCrumb("list", index, page);
		result += getBoxFluid(title);
		getPreloader("list", "#out");

		result += getList(index, page, 100);

		printOut("#out", result);
	} catch (e) {
		printOut("#error", getBoxFluid(e + "<br>" + e.stack));
	}
});