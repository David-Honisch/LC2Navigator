function PDF() {
	this.createPDF = function createPDF() {
		var body = $("#article");
		var title = document.getElementsByTagName("title")[0].innerHTML;
		var title = $("#article h1").html();
		var text = $("#bodycontent").html();
		try {
			var doc = new jsPDF();
			var subject = typeof $(".ui-collapsible-heading-toggle ui-btn ui-icon-minus ui-btn-icon-left ui-btn-inherit") !== 'undefined' ? $(".ui-collapsible-heading-toggle ui-btn ui-icon-minus ui-btn-icon-left ui-btn-inherit")
					: 'Content';
			

			var specialElementHandlers = {
				'#editor' : function(element, renderer) {
					return true;
				}
			};
			// head
			doc.setFontSize(24);
			doc.text(20, 20, 'Letztechance.org');
			doc.setFontSize(16);
			doc.text(20, 40, '' + title);
			doc.setFontSize(6);
			doc.text(20, 300, 'This is client-side Javascript PDF.');
			doc.text(20, 310, 'contact:');
			doc.text(20, 310, 'http://www.letztechance.org/contact.html');
			// content
			doc.addPage();
			doc.setFontSize(8);
			if (typeof subject.html() !== 'undefined') {
				doc.text(20, 20, '' + subject.html());
			} else {
				doc.text(20, 20, '' + title);
			}

			doc.fromHTML(text, 20, 30, {
				'width' : 170,
				'elementHandlers' : specialElementHandlers
			});
			// eof content
			doc.addPage();
			// beof
			doc.setFontSize(24);
			doc.text(20, 20, 'Thank you for visiting letztechance.org.');
			// eof
			// Save the PDF
			doc.save(title+'Letztechance.org.pdf');
			// }

		} catch (e) {
			alert('Done' + e + "" + e.stack);
		}

	}

	this.init = function init() {
		var that = this;
		$
				.when(
						$.getScript("./assets/js/plugins/jsPDF/dist/jspdf.min.js/js/FileSaver.js"),
						$.getScript("./assets/js/plugins/LC2Word/js/jszip-utils.js"),
						$.getScript("./assets/js/plugins/jsPDF/libs/require/config.js"),
						$.getScript("./assets/js/plugins/jsPDF/libs/require/require.js"),
						$.getScript("./assets/js/plugins/jsPDF/libs/html2pdf.js"),
//						$.getScript("./assets/js/plugins/jsPDF/dist/jspdf.min.js"),
						$.getScript("./assets/js/plugins/LC2Word/js/JSWord.js"),
						$.getScript("./assets/js/plugins/LC2Word/js/downloadify.js"),
						$.Deferred(function(deferred) {
							$(deferred.resolve);
						})).done(function() {
					that.createPDF();
					alert('PDF download done.');
				});
	}

}