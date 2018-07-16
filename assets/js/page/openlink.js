$(function() {
	var result = "";
	try {	
	var value1 = $.getUrlVars()["value1"];
	var value2 = $.getUrlVars()["value2"];
	var query = $.getUrlVars()["query"];
	query = query != undefined?query:"";
//	alert(value1+"-"+value2);
	var index = value1 !== null && value1 !== undefined && value1 !== null ? value1:22;
	var page = value2 !== null && value2 !== undefined && value2 !== null  ? value2:1;
//	alert(index+"-"+page);
	var str = ""+window.location;
	if (page == 1 && str.includes("?")){
		query = str.split("?")[1].split("&")[0];
	}
	var title = breadCrumb("read", index, page);
	result += getBoxFluid(title);
	getPreloader("read","#out");
	

	var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#article\" id=\"home-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"+msg("open link")+"</a></li>";
	tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"profile-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"+msg("directlink")+"</a></li>";
	
	var tabContent = "";
	tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
	tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"article\" aria-labelledby=\"home-tab\"> ";
//	tabContent += "<p>"+query+"</p> ";	
	tabContent += "</div> ";
	tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"profile-tab\"> ";
//	tabContent += "<p>"+query+"</p> ";
	tabContent += "</div> ";
	
	result += getBoxFluid(getTabs("sTab",tabHeader, tabContent));			
	setPage("#out", result);
	var read = {};
	
	read.subject = "Openlink";
	read.body = "<a href=\""+ query+"\" target=\"_blank\">"+ query+"</a>";
	new HTML().printRead("#article",read,index, page);
	//read.body = "<a href=\""+ query+"\" target=\"_blank\">"+ query+"</a>";
	$("#more").html("<a href=\""+ query+"\" target=\"_blank\">"+ query+"</a>");
	
	
	
	var pluginUrl = "plugins-"+index+"-"+page+".html?l=de";
	$.ajax({url: pluginUrl, success: function(res){
        $("#plugins").html(""+res+"");
    }});
	} catch (e) {
		alert("Exception:\n"+e+"\n"+e.stack);
	}
	
});
