function ZIP() {
	this.createZip = function createZip() {
		loadFile("./assets/js/plugins/LC2Word/lctemplate.docx", function(err,
				content) {
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
				// saveAs(out, title+"-output.docx");
				var zip = new JSZip();
				zip.file(title + "-text.txt", "LETZTECHANCE.ORG " + title
						+ "\n" + text);
				// zip.file(title-"-word.docx", out.getZip());
				zip.file(title + "-word.docx", text);

				var img = zip.folder("images");
				img.file("lc.txt", "letztechance.org");
				// img.file("smile.gif", imgData, {base64: true});
				var content = zip.generate({
					type : "blob"
				});
				// see FileSaver.js
				saveAs(content, title + "-lc.download.zip");
				// alert('Done');
			} catch (e) {
				alert('Done' + e + "" + e.stack);
			}
		})

	}

}