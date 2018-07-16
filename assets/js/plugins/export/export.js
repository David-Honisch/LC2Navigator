function ExportAPI() {
	
	this.createEXCEL = function createEXCEL() {
		new EXCELAPI().createExcel();
	}
	
	this.createPDF = function createPDF() {
		new PDF().createPDF();
	}
	
	this.createWord = function createWord() {
		new WORD().createWord();
	}
	
	this.createZip = function createZip() {
		new ZIP().createZip();
	}
}
function Export() {
	 

	$('#EXCEL-tab').click(function() {
		$.getScript('./assets/js/plugins/excel/excel.js', function() {
//			$.getScript('//unpkg.com/xlsx/dist/shim.min.js', function() {
			$.getScript('./assets/js/plugins/jsxlsx/xlsx.full.min.js', function() {
				$.getScript('//unpkg.com/blob.js@1.0.1/Blob.js', function() {
					$.getScript('//unpkg.com/file-saver@1.3.3/FileSaver.js', function() {
						new ExportAPI().createEXCEL();
					});
				});
//			});
		});
	});	

	})
	$('#PDF-tab').click(function() {
		var that = this;
		$.when(
						$.getScript("./assets/js/plugins/jsPDF/libs/FileSaver.js"),
						$.getScript("./assets/js/plugins/LC2Word/js/jszip-utils.js"),
						$.getScript("./assets/js/plugins/jsPDF/libs/require/config.js"),
						$.getScript("./assets/js/plugins/jsPDF/libs/require/require.js"),
						$.getScript("./assets/js/plugins/jsPDF/libs/html2pdf.js"),
						$.getScript("./assets/js/plugins/jsPDF/dist/jspdf.min.js"),
						$.getScript("./assets/js/plugins/LC2Word/js/downloadify.js"),
						$.getScript("./assets/js/plugins/pdf/pdf.js"),
						$.Deferred(function(deferred) {
							$(deferred.resolve);
							$("#cnt").html(getBoxFluid('PDF loading...'),false);
						})).done(function() {					
							$.getScript('./assets/js/plugins/pdf/pdf.js', function() {
								try {
									$("#cnt").html(getBoxFluid('jsPDF initialising...'),false);
									$.getScript('./assets/js/plugins/jsPDF/dist/jspdf.min.js', function() {
										try {
											$("#cnt").html(getBoxFluid('PDF generated. Loading data...'),false);
											new ExportAPI().createPDF();
											$("#cnt").html(getBoxFluid('PDF generated successfully.'),false);
											alert('PDF download done.');
										} catch (e) {
											printOut("#error", getBoxFluid(e + "" + e.stack, true));
										}
									});									
								} catch (e) {
									printOut("#error", getBoxFluid(e + "" + e.stack, true));
								}
							});
				});
	})
	$('#WORD-tab').click(function() {		
		$.when($.getScript("./assets/js/plugins/LC2Word/js/FileSaver.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/jszip-utils.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/JSWord.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/downloadify.js"),
				$.getScript("./assets/js/plugins/word/word.js"),
				$.Deferred(function(deferred) {
					$(deferred.resolve);
				})).done(function() {
					$.getScript('./assets/js/plugins/word/word.js', function() {
					try {
						$("#cnt").html(getBoxFluid('Word initialising...'),false);
						new ExportAPI().createWord();
						$("#cnt").html(getBoxFluid('Word download done.'),false);
						alert('Word download done.');
					} catch (e) {
						printOut("#error", getBoxFluid(e + "" + e.stack, true));
					}
				});

		});
	})
	$('#ZIP-tab').click(function() {
		var that = this;
		$.when($.getScript("./assets/js/plugins/LC2Word/js/FileSaver.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/jszip-utils.js"),
				$.getScript("./assets/js/plugins/LC2JSZIP/js/jszip.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/JSWord.js"),
				$.getScript("./assets/js/plugins/LC2Word/js/downloadify.js"),
				$.getScript("./assets/js/plugins/zip/zip.js"),
				$.Deferred(function(deferred) {
					$(deferred.resolve);
				})).done(function() {
					$.getScript('./assets/js/plugins/zip/zip.js', function() {
						try {
							$("#cnt").append(getBoxFluid('ZIP initialising...'),false);
							new ExportAPI().createZip();
							$("#cnt").html(getBoxFluid('ZIP download done.'),false);
							alert('ZIP download done.');							
						} catch (e) {
							printOut("#error", getBoxFluid(e + "" + e.stack, true));
						}
					});
		});
	})
}