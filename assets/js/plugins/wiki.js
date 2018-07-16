$(function() {
	var result = "";
	var value1 = $.getUrlVars()["value1"];
	var value2 = $.getUrlVars()["value2"];
	var query = $.getUrlVars()["query"];
	var type = $.getUrlVars()["q"];
	var index = value1 !== null && value1 !== undefined && value1 !== null && Number.isInteger(value1) ? value1:1;
	var page = value2 !== null && value2 !== undefined && value2 !== null && Number.isInteger(value2) ? value2:1;
	var query = query !== null && query !== undefined && query !== null ? query:undefined;
	var type = query !== null && query !== undefined && query !== null ? query:undefined;

	var str = "" + window.location;
	if (page == 1 && str.includes(".html")) {
		var list = str.split("search-")[1].split(".html")[0].split("-");
		index = list[0];
		page = list[1];
	}
	var title = breadCrumb("search", index, page);
	result += getBoxFluid(title);
	getPreloader("search","#out");
	result += init();

	try {
		var tabHeader = createTabHead();
		var tabContent = createTabContent();		
		result += getBoxFluid(getTabs("sTab",tabHeader, tabContent));
		
		setPage("#out",result);
		var res = getSearchTables(catindex, query);
		printSearchTables(index, page, query, res);
	} catch (e) {
		$("#searchout").append("Exception occured:" + JSON.stringify(e.stack));
	}
	$("#wiki-tab").click(function(event) {
		getWiki(query);
		
	});
	getJSScript('./assets/js/page/PageController.js');
	
	$("#imdb-tab").click(function(event) {
		$("#imdb").html(getOpenIMDB(query));
		$("#t").val(query);		
		$('#t').keyup(function () {
	        if (event.keyCode == 13) {
	            $('#search-by-title-button').click();
	        } else {
	            return false
	        }
	    });
	    $('#i').keyup(function () {
	        if (event.keyCode == 13) {
	            $('#search-by-id-button').click();
	        } else {
	            return false
	        }
	    });
		$('#search-by-id-button').click(function () {
	        var c = $("#search-by-id-form :input").filter(function (index, element) {
	            return $(element).val() != "";
	        }).serialize();
	        var d = 'http://www.omdbapi.com/?' + c;
	        var e = $('#search-by-id-request');
	        e.find('a').attr('href', d).html(d);
	        e.show('slow');
	        var f = $('#search-by-id-progress');
	        f.show('slow');
	        var g = $('#search-by-id-response');
	        $.ajax({
	            type: 'GET',
	            dataType: 'text',
	            /* sure you could easily steal this key, but I'll be keeping a close eye on it ;) */
	            url: '/?' + c + '&apikey=BanMePlz',
	            statusCode: {
	                401: function () {
	                	$('#oimdbout').html('Error: Daily request limit reached!')
	                }
	            },
	            success: function (a) {
	            	var text = a.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	            	var t = JSON.parse(text);	            	
	            	$('#oimdbout').append(t.Title+"<br>");
	            	$('#oimdbout').html("<img src=\""+t.Poster+"\" height=\"466\" width=\"300\"></img><br>");
	            	$('#oimdbout').append("<strong>imdbRating:</strong>"+t.imdbRating+"<br>");
	            	$('#oimdbout').append("<strong>Writer:</strong>"+t.Writer+"<br>");
	            	$('#oimdbout').append("<strong>Source:</strong>"+t.Source+"<br>");
	            	$('#oimdbout').append("<strong>imdbID:</strong>"+t.imdbID+"<br>");
	            	$('#oimdbout').append("<strong>Director:</strong>"+t.Director+"<br>");
	            	$('#oimdbout').append("<strong>Runtime:</strong>"+t.Runtime+"<br>");
	            	$('#oimdbout').append("<strong>Genre:</strong>"+t.Genre+"<br>");
	            	$('#oimdbout').append("<strong>Actors:</strong>"+t.Actors+"<br>");
	            	$('#oimdbout').append("<strong>Plot:</strong>"+t.Plot+"<br>");
	            	$('#oimdbout').append("<strong>Type:</strong>"+t.Type+"<br>");
	            	$('#oimdbout').append(text);
	            },
	            complete: function () {
	                f.hide();
	                g.show('slow')
	            }
	        })
	    });
	    $('#search-by-id-reset').click(function () {
	        var a = $('#search-by-id-request');
	        a.hide('slow');
	        a.find('a').attr('href', 'javascript:;').html('');
	        var b = $('#search-by-id-progress');
	        b.hide('slow');
	        var c = $('#search-by-id-response');
	        c.hide('slow');
	        c.find('pre').html('');
	    });
		$('#search-by-title-button').click(function () {
			try {			
	        var c = $("#search-by-title-form :input").filter(function (index, element) {
	            return $(element).val() != "";
	        }).serialize();
	        var d = 'http://www.omdbapi.com/?' + c;
	        var e = $('#search-by-title-request');
	        e.find('a').attr('href', d).html(d);
	        e.show('slow');
	        var f = $('#search-by-title-progress');
	        f.show('slow');
	        var g = $('#search-by-title-response');
	        $.ajax({
	            type: 'GET',
	            dataType: 'text',
	            /* sure you could easily steal this key, but I'll be keeping a close eye on it ;) */
	            url: 'http://www.omdbapi.com/?' + c + '&apikey=92d5513b',
	            statusCode: {
	                401: function () {
	                    $('#oimdbout').html('Error: Daily request limit reached!')
	                }
	            },
	            success: function (a) {
	            	var text = a.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	            	var t = JSON.parse(text);	            	
	            	$('#oimdbout').append("<strong>Title:</strong>"+t.Title+"<br>");
	            	$('#oimdbout').html("<img src=\""+t.Poster+"\" height=\"466\" width=\"300\"></img><br>");
	            	$('#oimdbout').append("<strong>imdbRating:</strong>"+t.imdbRating+"<br>");
	            	$('#oimdbout').append("<strong>Writer:</strong>"+t.Writer+"<br>");
	            	$('#oimdbout').append("<strong>Source:</strong>"+t.Source+"<br>");
	            	$('#oimdbout').append("<strong>imdbID:</strong>"+t.imdbID+"<br>");
	            	$('#oimdbout').append("<strong>Director:</strong>"+t.Director+"<br>");
	            	$('#oimdbout').append("<strong>Runtime:</strong>"+t.Runtime+"<br>");
	            	$('#oimdbout').append("<strong>Genre:</strong>"+t.Genre+"<br>");
	            	$('#oimdbout').append("<strong>Actors:</strong>"+t.Actors+"<br>");
	            	$('#oimdbout').append("<strong>Plot:</strong>"+t.Plot+"<br>");
	            	$('#oimdbout').append("<strong>Type:</strong>"+t.Type+"<br>");

	            },
	            complete: function () {
	                f.hide();
	                g.show('slow');	                
	            }
	        })
			} catch (e) {
				printOut("#error",e.stack)
			}			
	    });
		$('#search-by-title-reset').click(function () {
	        var a = $('#search-by-title-request');
	        a.hide('slow');
	        a.find('a').attr('href', 'javascript:;').html('');
	        var b = $('#search-by-title-progress');
	        b.hide('slow');
	        var c = $('#search-by-title-response');
	        c.hide('slow');
	        c.find('pre').html('');
	    });
		$('#search-by-title-button').click();
		
	});
	
	// eof static	
	function init() {
		var result = "<div class=\"container-fluid cm-container-white\">";
		result += "<h1>Searching...</h1>";
		result += "<h2>";		
		if (query != "") {
			result += query;
		} else {
			result += msg('noquery');
		}
		result += "</h2>";		
		result += "</div>";
		printOut("#out", result);
		$("#searchout").html("Initializing full scan...");
		return result;
	}
	function createTabHead(subject) {
		var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#search\" id=\"search-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"+msg("search")+"</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#wiki\" role=\"tab\" id=\"wiki-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"+msg("wikisearch")+"</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#imdb\" role=\"tab\" id=\"imdb-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"+msg("imdb search")+"</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"more-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"+msg("more")+"</a></li>";
		return tabHeader;
	}
	
	function createTabContent() {
		var tabContent = "";
		tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"search\" aria-labelledby=\"search-tab\"> ";
		tabContent += "<p>Loading...</p> ";	
		tabContent += "</div> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"wiki\" aria-labelledby=\"wiki-tab\"> ";
		tabContent += "<p>Loading Wiki..</p> ";
		tabContent += "</div> ";
		
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"imdb\" aria-labelledby=\"wiki-tab\"> ";
		tabContent += "<p>Loading IMDB Database..</p> ";
		tabContent += "</div> ";
		
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"more-tab\"> ";
		tabContent += "<p>More..</p> ";
		tabContent += "</div> ";
		return tabContent;
	}	
	
	function printSearchTables(value1, value2, query, res) {
		var i = 0;
//		result += "<div class=\"container-fluid cm-container-white\">";
		var result = "<table class=\"table\"><thead>";
		for ( var v in res) {
			try {
				// var va = JSON.parse(JSON.stringify(utf8_decode(res[v])));
				var va = JSON.parse(JSON.stringify(res[v]));
				var id = va[0]["id"];
				var subject = va[0]["subject"];
				// var body = va[0]["body"];
				result += "<tr>";
				result += "<th>";
				
				result += "<div class=\"md-folder icon24\"></div>";
				
				result += "" + id + "-";
				result += "<a href=\"read-"+v+"-"+id+".html\">";
				result += "" + utf8_decode(subject) + "";
				result += "</a>";
				result += "</th>";
				result += "</tr>";
				// result += "<div class=\"hidden\">" + utf8_decode(body) +
				// "<div/>";
				printOut("#search","Found"+value1+" Id:"+id);
			} catch (e) {
				$("#search").append("Exception:"+e.stack);

			}
			i++;
		}
		result += "</table>";
//		result += "</div>";
		//getPagination(type, index, page, size, query) {
		result += getPagination("search", value1, value2, 100, query);
//		$("#global").html(result);
		setPage("#search", result);
		// $("#global").append(JSON.stringify(res));
	}
	
});