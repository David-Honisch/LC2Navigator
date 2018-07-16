function WORD() {
	this.createWord = function createWord() {
		loadFile("./assets/js/plugins/LC2Word/lctemplate.docx", function(err, content) {
			try {
				var doc = new DocxGen(content);
				var title = $("#article h1").html();
				var text = $("#bodycontent").html();
				doc.setData({
					"title" : title,
					"first_name" : "David",
					"last_name" : "Honisch",
					"email" : "david@honisch.org",
					"body" : "" + text,
					"description" : "" + text
				});
				doc.render();
				out = doc.getZip().generate({
					type : "blob"
				});
				saveAs(out, title + "-output.docx");
			} catch (e) {
				alert('Done' + e + "" + e.stack);
			}
		})

	}

	this.init = function init() {
		var that = this;
		$.when($.getScript("./assets/js/plugins/LC2Word/js/FileSaver.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/jszip-utils.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/JSWord.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/downloadify.js"),
				$.Deferred(function(deferred) {
					$(deferred.resolve);
				})).done(function() {
			that.createWord();
			alert('Word download done.');
		});
	}

}