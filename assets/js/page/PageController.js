function PageController(page) {
	this.page = page;
	this.isAuthorized = false;
	this.html = new HTML();
	this.api = new API();

	this.getInfo = function getInfo() {
		return JSON.stringify(this);
	}

	this.doAuth = function doAuth() {
		var that = this;
		try {
			this.api = new API();
			session = doReadCookieSession();
			if (session == null || session == undefined || session.length == 0) {
				session = "anonymous";
			}
			token = TokenPREFIX + session;
			user = this.api.doIsAuth(token);
			isAuthorized = IsAuthorized(user);
			isAdmin = IsAdmin(user);
		} catch (e) {
			this.html.setErrorPage(e);
//			$("#error").append(e.stack);
		}
	}

	this.initEvents = function initEvents() {
		this.eventsList = new API().doGetEvents();
		this.eventsList.sort(function(x, y) {
			return x.created_at - y.created_at;
		})
		eventsList = this.eventsList;
		printOut("#out", getBoxFluid(getPreloaderIMG()
				+ "Initializing events...", true));
		this.addEvents(eventsList);
		printOut("#out", getBoxFluid(getPreloaderIMG()
				+ "Initializing events done. Selecting :" + eventsList.length
				+ " items.", true));
	}
	
	this.init = function init() {
		var mDialog = getBoxFluid(this.html.getModalDialog());
		printOut("#out", mDialog
				+ getBoxFluid("<div =\"mainfoot\">"
						+ doCreateSocialMediaLinks('#mainfoot',
								document.location.href, 'Title')
						+ "</div>"), true);
		new addExportEvents().addEvents();
		// this.addAutoCompletion(eventsList);
		printOut("#conntected", userName + " is authorized:<strong>"
				+ isAuthorized + "</strong>", false);
		this.html.addTabs();
		printOut("#modal-body", this.html.getLoginForm(),false);
	}

	this.doLoadPage = function doLoadPage(page) {
		try {
			var that = this;
			var pageScript = './assets/js/page/' + page + '.js';
			printOut("#out", "", false);
			this.initEvents();
			printOut("#out", getBoxFluid(getPreloaderIMG() + "Reading :" + page
					+ ".", true));
			this.html.getNavigation();
			$.getScript(pageScript, function() {
				that.init();
			});
		} catch (e) {
			alert(e.name+"\n"+e.message + "" + e.stack);
			printOut("#error", getBoxFluid(e + "" + e.stack, true));
		}
	}
	this.getPage = function getPage(page) {
		// alert('Debug:'+page);
		switch (page) {
		case 'home':
			this.doLoadPage(page);
			break;
		case 'index':
			this.doLoadPage(page);
			break;
		case 'list':
			this.doLoadPage(page);
			break;
		case 'read':
			this.doLoadPage(page);
			break;
		case 'sread':
			this.doLoadPage(page);
			break;
		case 'search':
			this.doLoadPage(page);
			break;
		case 'contact':
			this.doLoadPage(page);
			break;
		case 'imprint':
			this.doLoadPage(page);
			break;
		case 'login':
			this.doLoadPage(page);
			break;
		case 'logout':
			this.doLoadPage(page);
			break;
		case 'post':
			this.doLoadPage(page);
			break;
		case 'edit':
			this.doLoadPage(page);
			break;
		//
		case 'plugins':
			this.doLoadPage(page);
			break;
		//
		case 'openlink':
			this.doLoadPage(page);
			break;
		case 'upload':
			this.doLoadPage('upload');
			break;
		default:
			this.doLoadPage("error");
			break;
		}
	}

	this.addAutoCompletion = function addAutoCompletion(eventsList) {
		// var availableTags = [
		// "ActionScript",
		// "AppleScript",
		// "Asp",
		// "BASIC",
		// "C",
		// "C++",
		// "Clojure",
		// "COBOL",
		// "ColdFusion",
		// "Erlang",
		// "Fortran",
		// "Groovy",
		// "Haskell",
		// "Java",
		// "JavaScript",
		// "Lisp",
		// "Perl",
		// "PHP",
		// "Python",
		// "Ruby",
		// "Scala",
		// "Scheme"
		// ];
		// $( "#btnquery" ).autocomplete({
		// source: availableTags
		// });
		// $( "#qtags" ).autocomplete({
		// source: availableTags
		// });
	}

	this.addEvents = function addEvents(eventsList) {
		try {
			this.api = this.api !== undefined ? this.api : new API();
			this.html = this.html !== undefined ? this.html : new HTML();
			var that = this;

			$('.cookie-message').cookieBar();
			// addWebserviceFormEvent();
			// html.doCreateMarquee();
			$(".cm-flex").on("click", function() {
				$("#cm-search-btn").click();
				$("#cm-search-btn").focus();
			});
			$("#btngames").on("click", function() {
				that.html.doGetGames();
			});
			$("#btnplugins").on("click", function() {
				that.html.doGetPlugins();
			});
			$("#btnalerts").on("click", function() {
				that.html.getAlerts(eventsList);
			});
			$("#btnenv").on("click", function() {
				that.html.doPrintEnv("#env");
			});
			$("#btnisp").on("click", function() {
				that.html.doPrintISP("#isp");
			});
			$(".marquee").on("click", function() {
				$(".marquee").toggleClass("microsoft");
				// $("#out").append("Debug");
			});
			// $("#toogleme").on("click", function() {
			// $("#two").toggleClass("unvisibleUI");
			// // $("#one").toggleClass("visibleUI");
			// });
			$(".cm-flex").keypress(
					function(e) {
						if (e.which == 13) {
							var url = that.api.hostName+"index.php?q=search&query="
									+ $("#btnquery").val() + "";
							window.location = url;
						}
					});

			var btn_cc = 'btn-primary';
			var navbar_cc = 'cm-navbar-primary';

			$('#demo-buttons button').click(function() {
				var color = $(this).data('switch-color');
				$('.cm-navbar').removeClass(navbar_cc);
				navbar_cc = 'cm-navbar-' + color;
				$('.cm-navbar').addClass(navbar_cc);
				$('.cm-navbar .btn').removeClass(btn_cc);
				btn_cc = 'btn-' + color;
				$('.cm-navbar .btn').addClass(btn_cc);
			});

		} catch (e) {
			printOut("#error", getBoxFluid(e + "" + e.stack, true));
			console.log(e + "" + e.stack);
		}

	}
}