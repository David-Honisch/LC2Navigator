function Tabs() {
	var html = new HTML();
	var API = [ "QR","IP", "CAT", "DOG", "openlibrary", "openlibrary_author", "domainsdb" ];
	var apires = html.createDropDown("API", API);
	$("#sTab").append("" + apires);
	
	$('#CAT-tab').click(function() {		
		var url = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=20';

		var promiseCount = 0;
		var p1 = new Promise(
			    function(resolve, reject) {       
			    	resolve(doGetUrlData('#catresult', url));
			    });
			  p1.then(
			    // Loggen der Nachricht und des Wertes
			    function(val) {
				    var result = "";	    	
			    	var links = new HTMLParser().getURLsFromString(val)
			 		for (var v in links)
			 		{
			 			var link = links[v];
			 			if (!link.includes("openlink.letztechance.org"))
			 			{
			 				if (link.includes(".jpg"))
				 			{
				 				result += "<a href=\"./openlink?"+ links[v]+"\"><img src=\""+ links[v]+"\"></img></a><br>";
				 			}
			 				else
				 			{
				 				result += "<a href=\"./openlink?"+ links[v]+"\">"+ links[v]+"</a><br>";
				 			}
			 			}
			 		}
			    	$("#cnt").html(getBoxFluid(result));
			    	$("html, body").delay(20).animate({scrollTop: $('#cnt').offset().top }, 20);
			    });
	});
	
	$('#DOG-tab').click(function() {		
		var url = 'https://dog.ceo/api/breeds/image/random';
		var promiseCount = 0;
		var p1 = new Promise(
			    function(resolve, reject) {       
			    	resolve(doGetUrlData('#catresult', url));
			    });
			  p1.then(
			    // Loggen der Nachricht und des Wertes
			    function(val) {
				    var result = "";
				    var oVal = JSON.parse(val);
				    result += "<a href=\"./openlink?"+ oVal.message+"\"><img src=\""+ oVal.message+"\"></img></a><br>";			    	
			    	$("#cnt").html(getBoxFluid(result));
			    	$("html, body").delay(20).animate({scrollTop: $('#cnt').offset().top }, 20);
			    });
	});
	
	$('#openlibrary_author').click(function() {	
		var result = ""
		var url = 'http://openlibrary.org/search.json?q='+window.status;
//		alert(url);
		var promiseCount = 0;
	  var json = getJSON(url);
	  for (var v in json)
	  {
		  var link = json[v];
		 result += JSON.stringify(link);
	  }
	  $("#cnt").html(getBoxFluid(result));
	  $("html, body").delay(20).animate({scrollTop: $('#cnt').offset().top }, 20);
	});
	$('#openlibrary-author-tab').click(function() {	
		var result = ""
		var url = 'http://openlibrary.org/search.json?author='+window.status+'&page=1';
		var promiseCount = 0;
	  var json = getJSON(url);
	  for (var v in json)
	  {
		  var link = json[v];
		 result += JSON.stringify(link);
	  }
	  $("#cnt").html(getBoxFluid(result));
	  $("html, body").delay(20).animate({scrollTop: $('#cnt').offset().top }, 20);
	});
	
	$('#domainsdb-tab').click(function() {	
		var result = ""
		//var url = 'https://api.domainsdb.info/search?query='+window.status+'&tld=org';
		var url = 'https://api.domainsdb.info/search?query=letztechance&tld=org';
		var promiseCount = 0;
	  var json = getJSON(url);
	  for (var v in json)
	  {
		  var link = json[v];
		 result += JSON.stringify(link);
	  }
	  $("#cnt").html(getBoxFluid(result));
	  $("html, body").delay(20).animate({scrollTop: $('#cnt').offset().top }, 20);
	});	
	
	$('#IP-tab').click(function() {
		var url = 'https://api.ipify.org?format=json';
		alert(url);
		$.getJSON(url, function(data) {
			$("#cnt").html(getBoxFluid("<h1>"+JSON.stringify(data)+"</h1>"));
			$("html, body").delay(20).animate({scrollTop: $('#cnt').offset().top }, 20);
		});
	});	
	$('#QR-tab').click(function() {	
	  var url = 'https://qrtag.net/api/qr.png';
	  var result = "<img src=\""+url+"\" alt=\"qrtag\">"
	  $("#cnt").html(getBoxFluid(result));
	  $("html, body").delay(20).animate({scrollTop: $('#cnt').offset().top }, 20);
	});	



}