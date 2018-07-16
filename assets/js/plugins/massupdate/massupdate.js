function MassUpdateGUI() {
	this.getGUICSS = function getGUICSS() {
		return "<style>#drop{border:2px dashed #bbb;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;padding:25px;text-align:center;font:20pt bold,\"Vollkorn\";color:#bbb}#b64data{width:100%;}a{text-decoration:none}</style>";
		
	}
	this.getGUIJS = function getGUIJS() {
		return "<script src=\"https://unpkg.com/canvas-datagrid/dist/canvas-datagrid.js\"></script>"
		+"<!--<script src=\"shim.js\"></script>-->"
		+"<script src=\"./assets/js/plugins/jsxlsx/xlsx.full.min.js\"></script>"
		+"<script>var X=XLSX;var cDg;var process_wb=(function(){var XPORT=document.getElementById('xport');var HTMLOUT=document.getElementById('htmlout');return function process_wb(wb){var ws=wb.Sheets[wb.SheetNames[0]];var data=XLSX.utils.sheet_to_json(ws,{header:1});if(!cDg)cDg=canvasDatagrid({parentNode:HTMLOUT,data:data});cDg.style.height='100%';cDg.style.width='100%';cDg.data=data;XPORT.disabled=false;var range=XLSX.utils.decode_range(ws['!ref']);for(var i=range.s.c;i<=range.e.c;++i)cDg.schema[i-range.s.c].title=XLSX.utils.encode_col(i);HTMLOUT.style.height=(window.innerHeight-400)+\"px\";HTMLOUT.style.width=(window.innerWidth-50)+\"px\";if(typeof console!=='undefined')console.log(\"output\",new Date());};})();var do_file=(function(){var rABS=typeof FileReader!==\"undefined\"&&(FileReader.prototype||{}).readAsBinaryString;var domrabs=document.getElementsByName(\"userabs\")[0];if(!rABS)domrabs.disabled=!(domrabs.checked=false);return function do_file(files){rABS=domrabs.checked;var f=files[0];var reader=new FileReader();reader.onload=function(e){if(typeof console!=='undefined')console.log(\"onload\",new Date(),rABS);var data=e.target.result;if(!rABS)data=new Uint8Array(data);process_wb(X.read(data,{type:rABS?'binary':'array'}));};if(rABS)reader.readAsBinaryString(f);else reader.readAsArrayBuffer(f);};})();(function(){var drop=document.getElementById('drop');if(!drop.addEventListener)return;function handleDrop(e){e.stopPropagation();e.preventDefault();do_file(e.dataTransfer.files);}function handleDragover(e){e.stopPropagation();e.preventDefault();e.dataTransfer.dropEffect='copy';}drop.addEventListener('dragenter',handleDragover,false);drop.addEventListener('dragover',handleDragover,false);drop.addEventListener('drop',handleDrop,false);})();(function(){var xlf=document.getElementById('xlf');if(!xlf.addEventListener)return;function handleFile(e){do_file(e.target.files);}xlf.addEventListener('change',handleFile,false);})();var export_xlsx=(function(){function prep(arr){var out=[];for(var i=0;i<arr.length;++i){if(!arr[i])continue;if(Array.isArray(arr[i])){out[i]=arr[i];continue};var o=new Array();Object.keys(arr[i]).forEach(function(k){o[+k]=arr[i][k]});out[i]=o;}return out;}return function export_xlsx(){if(!cDg)return;var new_ws=XLSX.utils.aoa_to_sheet(prep(cDg.data));var new_wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(new_wb,new_ws,'SheetJS');XLSX.writeFile(new_wb,'sheetjs.xlsx',{bookSST:true});};})();</script>";
		
	}
	this.getGUI = function getGUI() {
		return this.getGUICSS()+this.getGUIJS()+"<pre>"
		+"<div id=\"drop\">Drop a spreadsheet file here to see sheet data</div>"
		+"<input name=\"xlfile\" id=\"xlf\" type=\"file\">"
		+"... or click here to select a file<textarea id=\"b64data\">"
		+"... or paste a base64-encoding here</textarea>"
		+"<b>Advanced Options:</b>Use readAsBinaryString:(when available)<input name=\"userabs\" checked=\"\" type=\"checkbox\"></pre>"
		+"<p><input value=\"Export to XLSX!\" id=\"xport\" onclick=\"export_xlsx();\" disabled=\"true\" type=\"submit\"></p><div id=\"htmlout\"></div><br>";
		
	}
	
}
//var X = XLSX;
//
//var cDg;
//
//var process_wb = (function() {
//	var XPORT = document.getElementById('xport');
//	var HTMLOUT = document.getElementById('htmlout');
//
//	return function process_wb(wb) {
//		/* get data */
//		var ws = wb.Sheets[wb.SheetNames[0]];
//		var data = XLSX.utils.sheet_to_json(ws, {header:1});
//
//		/* update canvas-datagrid */
//		if(!cDg) cDg = canvasDatagrid({ parentNode:HTMLOUT, data:data });
//		cDg.style.height = '100%';
//		cDg.style.width = '100%';
//		cDg.data = data;
//		XPORT.disabled = false;
//
//		/* create schema (for A,B,C column headings) */
//		var range = XLSX.utils.decode_range(ws['!ref']);
//		for(var i = range.s.c; i <= range.e.c; ++i) cDg.schema[i - range.s.c].title = XLSX.utils.encode_col(i);
//
//		HTMLOUT.style.height = (window.innerHeight - 400) + "px";
//		HTMLOUT.style.width = (window.innerWidth - 50) + "px";
//
//		if(typeof console !== 'undefined') console.log("output", new Date());
//	};
//})();
//
//var do_file = (function() {
//	var rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
//	var domrabs = document.getElementsByName("userabs")[0];
//	if(!rABS) domrabs.disabled = !(domrabs.checked = false);
//
//	return function do_file(files) {
//		rABS = domrabs.checked;
//		var f = files[0];
//		var reader = new FileReader();
//		reader.onload = function(e) {
//			if(typeof console !== 'undefined') console.log("onload", new Date(), rABS);
//			var data = e.target.result;
//			if(!rABS) data = new Uint8Array(data);
//			process_wb(X.read(data, {type: rABS ? 'binary' : 'array'}));
//		};
//		if(rABS) reader.readAsBinaryString(f);
//		else reader.readAsArrayBuffer(f);
//	};
//})();
//
//(function() {
//	var drop = document.getElementById('drop');
//	if(!drop.addEventListener) return;
//
//	function handleDrop(e) {
//		e.stopPropagation();
//		e.preventDefault();
//		do_file(e.dataTransfer.files);
//	}
//
//	function handleDragover(e) {
//		e.stopPropagation();
//		e.preventDefault();
//		e.dataTransfer.dropEffect = 'copy';
//	}
//
//	drop.addEventListener('dragenter', handleDragover, false);
//	drop.addEventListener('dragover', handleDragover, false);
//	drop.addEventListener('drop', handleDrop, false);
//})();
//
//(function() {
//	var xlf = document.getElementById('xlf');
//	if(!xlf.addEventListener) return;
//	function handleFile(e) { do_file(e.target.files); }
//	xlf.addEventListener('change', handleFile, false);
//})();
//
//var export_xlsx = (function() {
//	function prep(arr) {
//		var out = [];
//		for(var i = 0; i < arr.length; ++i) {
//			if(!arr[i]) continue;
//			if(Array.isArray(arr[i])) { out[i] = arr[i]; continue };
//			var o = new Array();
//			Object.keys(arr[i]).forEach(function(k) { o[+k] = arr[i][k] });
//			out[i] = o;
//		}
//		return out;
//	}
//
//	return function export_xlsx() {
//		if(!cDg) return;
//		/* convert canvas-datagrid data to worksheet */
//		var new_ws = XLSX.utils.aoa_to_sheet(prep(cDg.data));
//
//		/* build workbook */
//		var new_wb = XLSX.utils.book_new();
//		XLSX.utils.book_append_sheet(new_wb, new_ws, 'SheetJS');
//
//		/* write file and trigger a download */
//		XLSX.writeFile(new_wb, 'sheetjs.xlsx', {bookSST:true});
//	};
//})();