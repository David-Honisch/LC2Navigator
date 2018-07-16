$(function() {
	var result = "";
	var TokenPREFIX = "LC2Token-RSA-a22343sZIA4C22211sTB33331112";
	var token = TokenPREFIX + "" + doReadCookieSession();
	var value1 = $.getUrlVars()["value1"];
	var value2 = $.getUrlVars()["value2"];
	var index = value1 !== null && value1 !== undefined && value1 !== null
			&& Number.isInteger(value1) ? value1 : 1;
	var page = value2 !== null && value2 !== undefined && value2 !== null
			&& Number.isInteger(value2) ? value2 : 1;
	try {
		var str = ""+window.location;
		if (page == 1 && str.includes(".html")) {
			var list = str.split("edit-")[1].split(".html")[0].split("-");
			index = list[0];
			page = list[1];
		}
		var userName = $.getUrlVars()["user"];
		var passWord = $.getUrlVars()["pass"];
		var user;

		getPreloader("login", "#out");

		var title = breadCrumb("Login", index, page);
		setPage("#out", title);

		var tabHeader = "<li role=\"presentation\" class=\"active\"><a href=\"#article\" id=\"home-tab\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"home\" aria-expanded=\"true\">"
				+ msg("login") + "</a></li>";
		tabHeader += "<li role=\"presentation\" class=\"\"><a href=\"#more\" role=\"tab\" id=\"profile-tab\" data-toggle=\"tab\" aria-controls=\"profile\" aria-expanded=\"false\">"
				+ msg("more") + "</a></li>";

		var tabContent = "";
		tabContent += "<div id=\"myTabContent\" class=\"tab-content\"> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"article\" aria-labelledby=\"home-tab\"> ";
		if (isAuthorized) {
			tabContent += "<h1>Login</h1>";
			var auth = doGetAuth(userName, passWord);
			user = doIsAuth(token);
			// login
			var dto = JSON.parse(JSON.stringify(user.data.data));
			var userName = dto !== undefined && dto[0] !== undefined
					&& dto[0].name !== undefined ? dto[0].name : "anonymous";
			tabContent += "Welcome, <strong>" + userName + "</strong><hr>";
			
			var read = new API().getRead(index, page);
			var subject = read.subject;
			var body = read.body;
//			alert(subject+""+index+"#"+page+JSON.stringify(read));
			tabContent += getEditForm(isAuthorized, value1, page, subject, body);

		} else {
			tabContent += "<h1>Not logged in. Please try again.<h1>";

		}

		tabContent += "</div> ";
		tabContent += "<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"more\" aria-labelledby=\"profile-tab\"> ";
		tabContent += "<p>More..</p> ";

		tabContent += "</div> ";

		result += getBoxFluid(getTabs("sTab", tabHeader, tabContent));
		setPage("#out", result);
		
		
		jQuery(document).ready(function() {
			try {				
			
			$('#value1').val(value2);
			$('#cdate').val('06.06.2018');
//			$.getScript('./assets/js/jquery-datepicker/jquery.mobile.datepicker.js', function() {
			$.getScript('./assets/js/jquery.ui/jquery-ui.min.js', function() {
			$.getScript('./assets/js/jquery-datepicker/jquery.ui.datepicker.js', function() {
//				alert('Debug');
				$("#cdate").datepicker();
				$("head").prepend('<link rel="stylesheet" href="./assets/js/jquery-datepicker/jquery.ui.datepicker.css">');
				$("head").prepend('<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">');
				$("#cdate" ).datepicker( "setDate", new Date() );
				
//				$("#cdate").datepicker({ dateFormat: 'dd.mm.yy', defaultDate: new Date() });
//				$('#cdate').val('12/04/2018').datepicker({
//				    dateFormat: 'dd/mm/yy',
//				});
//				$('#cdate2').val('12/04/2018').datepicker({
//				    dateFormat: 'dd/mm/yy',
//				});
				$('#cdate').val('12/04/2018').datepicker({
					changeMonth: true,
			        changeYear: true,
			        yearRange: '1920:2018',
			        dateFormat : 'dd-mm-yy',
			        defaultDate: new Date(1985, 00, 01)
				});
			});
			});
			} catch (e) {
				$("#error").html(getBoxFluid(e+""+e.stack));
			}
		});
		
		
	} catch (e) {
		setPage("#out", getBoxFluid(e + "<hr>" + e.stack));
	}
	// events
	$(function() {
//		var theValue = $('#value1').val();
//		$('option[value=' + theValue + ']').attr('selected',true);
//		$(document).ready(
		var selectedValue = 
				$('#value1').val(2);
//		});
		
		$('#btnCopy').on('click', function(e) { // use on if jQuery 1.7+
			e.preventDefault(); // prevent form from submitting
			var data = $("#ytsrc").html();
			$("#body").append($("#ytsrc").html());
			return false;
		});
		$('#btnSubmit').on('click', function(e) { // use on if jQuery 1.7+
			e.preventDefault(); // prevent form from submitting
//			var data = $("#insertForm :input").serializeArray();
			var data = $("#insertForm").serializeArray();
			initPostForm(e, data);
			return false;
		});

		$.getScript('./assets/js/summernote.min.js', function() {

			$("head").append("<link>");
			var css = $("head").children(":last");
			css.attr({
				rel : "stylesheet",
				type : "text/css",
				href : "assets/css/summernote.css"
			});


			$('#body2').summernote(
					{
						// height : ($(window).height() - 440),
						height : 400,
						width : 480,
						toolbar : [
								[ 'style', [ 'style' ] ],
								[
										'font',
										[ 'bold', 'italic', 'underline',
												'clear' ] ],
								[ 'color', [ 'color' ] ],
								[ 'id', [ 'bodycnt' ] ],
								[ 'para', [ 'ul', 'ol', 'paragraph' ] ],
								[ 'height', [ 'height' ] ],
								[ 'table', [ 'table' ] ],
								[ 'insert', [ 'link', 'picture', 'hr' ] ],
								[ 'view', [ 'fullscreen', 'codeview' ] ] ]

					});
		});

	});
	function initPostForm(e, data) {
		// alert(data);
		var value1 = $("#value1").val();
		var value2 = $("#value2").val();
		var cdate = $("#cdate").val();
		var subject = $("#subject").val();
		var body = utf8_encode($("#body").val());
//		alert(body);
		// $(".note-editable").html(utf8_encode($("#body").html());
		// note-editable
		var url = "./webservices/client.php?q=doUpdate&token=" + token
				+ "&value1=" + value1 + "&value2=" + value2 + "&cdate=" + cdate
				+ "&subject=" + subject + "&body=" + body + "";
//		alert(url);
		$.ajax({
			type : "POST",
			url : url,
			data : $("#insertForm").serialize(), // serializes the form's
			// elements.
			success : function(data) {
				// alert(data);
				$('#msg').html(getBoxFluid(data));
				$('#msg').append(getBoxFluid(url));
			}
		});

		e.preventDefault(); // avoid to execute the actual submit of the form.
	}
	
	function getEditForm(isAuthorized, value1, value2, subject, body) {
		var result = "";
		try {
			if (isAuthorized) {
				// if ($env ["user"] ["isAdmin"] == 1) {
				var body = body != undefined ? body : "";
				result += "";
				result += getEditTags();
				// ----------------------------------------------------------------
				result += "<form method=\"POST\" id=\"insertForm\" name=\"insertForm\">";
				// ----------------------------------------------------------------
				//tables
				// ----------------------------------------------------------------				
				result += getEditTables(isAuthorized, value1, value2, subject, body);
				
				result += getEditDate(isAuthorized, value1, value2, subject, body);
				// ----------------------------------------------------------------
				// ----------------------------------------------------------------
				//subject
				// ----------------------------------------------------------------
				result += getEditSubject(subject);
				// ----------------------------------------------------------------
				// ----------------------------------------------------------------
				//body
				// ----------------------------------------------------------------
				result += getEditBody(body);
				// ----------------------------------------------------------------
				//protection
				// ----------------------------------------------------------------
				result += getEditProtection(isAuthorized, value1, value2, subject, body)
				
				// ----------------------------------------------------------------
				// Update
				// ----------------------------------------------------------------
				result += "<fieldset>";
				result += "<input type=\"button\" id=\"btnSubmit\" name=\"btnSubmit\" value=\"submit\"><br />";
				result += "</fieldset>";
				// ----------------------------------------------------------------
				// Delete
				// ----------------------------------------------------------------
				result += "<fieldset>";
				result += "<input type=\"button\" id=\"btnDelete\" name=\"btnDelete\" value=\"Delete\"><br />";
				result += "</fieldset>";

				result += "</form>";

				result += "<fieldset>";
				// ----------------------------------------------------------------
				// ----------------------------------------------------------------
				result += "</fieldset>";
				result += "<div id=\"msg\"></div>";
			}
		} catch (e) {
			alert(e.stack);
			$("#error").html(JSON.stringify(e) + e.stack);
			result = JSON.stringify(e) + e.stack;
		}
		return result;
	}
	
	function getEditSubject(subject) {
		var result = "<fieldset>";
		// ----------------------------------------------------------------
		result += "<legend>" + msg("subject") + "</legend>";
		result += "<input type=\"text\" id=\"subject\" name=\"subject\" value=\""
				+ subject
				+ "\" title=\""
				+ msg("subject")
				+ "\" size=\"110;\"><br />";
		result += "</fieldset>";
		return result;
	}
	
	function getEditBody(body) {
		var result = "<fieldset>";
		result += "<legend>Body</legend>";
		result += "<textarea name=\"body\" id=\"body\" rows=\"10\" style=\"min-width:100%;width:100%;\">"
				+ body + "</textarea>";
		// result += "<div id=\"body2\"></div>";
		result += "</fieldset>";
		return result;

	}
	
	function getEditTags(isAuthorized, value1, value2, subject, body) {
		var result = "<input type=\"button\" value=\"Add Bold\" onclick=\"FCKeditorAPI.GetInstance('body').SetHTML(FCKeditorAPI.GetInstance('body').GetHTML()+'[b]Title[/b]');\">";
		result += "<input type=\"button\" value=\"Add Url\" onclick=\"FCKeditorAPI.GetInstance('body').SetHTML(FCKeditorAPI.GetInstance('body').GetHTML()+'[url]URL[/url]');\">";
		result += "<input type=\"button\" value=\"Add Img\" onclick=\"FCKeditorAPI.GetInstance('body').SetHTML(FCKeditorAPI.GetInstance('body').GetHTML()+'[img]http://www.letztechance.org/img/download/ldisc.jpg[/img]');\">";
		result += "<input id=\"btnCopy\" type=\"button\" value=\"Copy Src\">";
		var ytsrc = utf8_encode("<center><!-- ytdiv --><div id='player'>&nbsp;</div><!-- The Script --><script>var vId = 'LmDZqp1i9vk';</script><script src='./js/plugins/google/ythtml5.js'></script></center>\n");
		result += "<input id=\"ytsrc\" type=\"hidden\" rows=\"1\" src=\""+ytsrc+"\">";
		result += "<input type=\"button\" value=\"Clear\" onclick=\"FCKeditorAPI.GetInstance('body').SetHTML('');\">";
		return result;

	}
	
	function getEditTables(isAuthorized, value1, value2, subject, body) {
		result += "<fieldset>";
		result += "<legend>" + msg("forum") + "</legend>";
		var result = "<select name=\"value1\" id=\"value1\">\n";
		result += "<option value=\"-1\">All</option>\n";
		for ( var v in catindex.list) {
			var isFound = false;
			if (v) {
				if (v == value1) {
					isFound = true;
				}
			}
			// alert(JSON.stringify(v));
			if (isFound) {
				result += "<option value=\"" + v.id
						+ "\" selected=\"selected\">"
						+ catindex.list[v] + "</option>\n";
			} else {

				result += "<option value=\"" + catindex.list[v].id
						+ "\">" + catindex.list[v].name + "</option>\n";
			}
		}
		result += "</select>\n";
		result += "</fieldset>";
		return result;
	}
	
	function getEditDate(isAuthorized, value1, value2, subject, body) {
		var result = "<fieldset>";
		result += "<legend>" + msg("timestamp") + "</legend>";
		result += "<input name=\"value2\" id=\"value2\" type=\"text\" value=\""	+ value2	+ "\"/>";
		var d = new Date();
		var df = "" + d.getDay() + "-" + (d.getMonth() + 1) + "-"
				+ d.getFullYear();
		result += "<div id=\"cdate\"></div>";
		result += "<input name=\"cdate\" id=\"cdate\" type=\"date\" data-role=\"date\" data-inline=\"true\" value=\""+ df	+ "\"/>";

//		result += "<input name=\"cdate2\" id=\"cdate2\" type=\"text\" value=\""
//				+ df
//				+ "\" data-date-format=\"dd-mm-yyyy\" data-role=\"date\"/>";

//		result += "<script>\n";
//		// ----------------------------------------------------------------
//		var dp = $('#cdate');
//		dp.val(df);
//		dp.trigger("click");
//		result += "</script>\n";
		result += "</fieldset>";
		return result;
	}
	
	function getEditProtection(isAuthorized, value1, value2, subject, body) {
		var result = "<fieldset>";
		result += "<select name=\"isProtected\" id=\"isProtected\">";
		result += "<option value=\"0\">no protection</option>";
		result += "<option value=\"1\">protection</option>";
		result += "<option value=\"2\">require admin rights</option>";
		result += "<option value=\"99\">hidden</option>";
		result += "</select>";

		result += "<select name=\"isPHPCode\" id=\"isPHPCode\">";
		result += "<option value=\"0\">is no code</option >";
		result += "<option value=\"1\">is code</option>";
		result += "</select>";

		result += "</fieldset>";
		var result;
	}

});