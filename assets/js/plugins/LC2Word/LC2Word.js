function getWord() {
	var body = $(".contentbody");
	var title = document.getElementsByTagName("title")[0].innerHTML;
	//
	$.getScript('./js/LC2Word/js/JSWord.js', function() {
  		$("#zipstatus").html('Javascript is loaded successful!');
	});
	//
	loadFile("lctemplate.docx", function(err, content) {
		doc = new DocxGen(content)
		doc.setData({
			"first_name" : "LetzteChance.Org",
			"last_name" : "Sysop",
			"phone" : "webmaster@letztechance.org",
			"description" : "LetzteChance.Org - The Link Portal",
			"title" : ""+title,
			"body" : ""+((body[0]).innerHTML).replace(/[^a-zA-Z0-9]/g,'_')
		}) // set the templateVariables
		doc.render() // apply them (replace all occurences of {first_name} by
						// Hipp, ...)
		out = doc.getZip().generate({
			type : "blob"
		}) // Output the document using Data-URI
		saveAs(out, "letztechance.org.docx")
	})
}