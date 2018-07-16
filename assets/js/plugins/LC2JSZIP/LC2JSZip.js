function getZIP() {
	var zip = new JSZip();
	var body = $(".contentbody");
	var title = document.getElementsByTagName("title")[0].innerHTML; 
	// zip.file("Hello.txt", "Hello World\n");
	// var img = zip.folder("images");
	// img.file("smile.gif", imgData, {base64: true});
	// var content = zip.generate({type:"blob"});
	// see FileSaver.js
	//saveAs(content, "example.zip");
	imgData = "R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=";
	zip.file("article.html",title+"\n\nWelcome to LetzteChance.Org\n\n"+(body.get(0).innerHTML));
	var img = zip.folder("img");
	img.file("runtime.gif", "../img/t.gif", {
		base64 : true
	});
	var img2 = zip.folder("img");
	img2.file("lc.gif", imgData, {
		base64 : true
	});
	var blob = zip.generate({type:"blob"});
	saveAs(blob, "letztechance.org.zip");

//	var content = zip.generate({
//		type : "blob"
//	});
	// see FileSaver.js
	//saveAs(content, "letztechance.org.article.zip");
	$("#zipstatus").removeClass().addClass("green").text("Zip successfully created.")
	
	$("#zipstatusfile").html('<input type=\"file\" id=\"file\" name=\"file\" multiple />')
}

// jQuery(function($) {
// if(!JSZip.support.blob) {
// $("#demo-not-supported").removeClass("hidden");
// $("#demo").hide();
// return;
// }
// $("#demo").click(function () {
// try {
// //eval($("#demo-code").val());
// zip.file("Welcome to LetzteChance.Org", "LetzteChance.Org\n");
// var img = zip.folder("images");
// img.file("./img/t.gif", imgData, {base64: true});
// var content = zip.generate({type:"blob"});
// // see FileSaver.js
// saveAs(content, "letztechance.org.article.zip");
// $("#zipstatus")
// .removeClass()
// .addClass("text-success")
// .text("Done!");
// }
// catch (e) {
// $("#status")
// .removeClass()
// .addClass("text-danger")
// .text(e);
// }
// });
// });
