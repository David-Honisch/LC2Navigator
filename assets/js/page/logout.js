$(function() {
	var result = "";	
	var value1 = $.getUrlVars()["value1"];
	var value2 = $.getUrlVars()["value2"];
	var index = value1 !== null && value1 !== undefined && value1 !== null
			&& Number.isInteger(value1) ? value1 : 1;
	var page = value2 !== null && value2 !== undefined && value2 !== null
			&& Number.isInteger(value2) ? value2 : 1;

	try {
		getPreloader("logout", "#out");

		var title = breadCrumb("Login", index, page);
		

		var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#article\" id=\"home-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"
				+ msg("logout") + "</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"profile-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
				+ msg("more") + "</a></li>";

		var tabContent = "";
		tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"article\" aria-labelledby=\"home-tab\"> ";
		
		
		if (isAuthorized) {
			tabContent += "<h1>Logout</h1>";
			tabContent += "<div id=\"logoutcnt\">Please wait paitently while logging out...</div>";	
			
		} else {
			tabContent += "<h1>Not logged in. Please login.<h1>";
		}
		

		tabContent += "</div> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"profile-tab\"> ";
		tabContent += "<p>Logged out</p> ";
		tabContent += "</div> ";

		result += getBoxFluid(title+getTabs("sTab", tabHeader, tabContent));
		setPage("#out", result);
		
		var session = TokenPREFIX + "" + doReadCookieSession();
		$("#logoutcnt").html(doLogout(session));
		
	} catch (e) {
		setPage("#error", getBoxFluid(e + "<hr>" + e.stack));
	}

});
