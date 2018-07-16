function brCheck(data)
{
  var ns4 = document.layers;
  var ns6 = document.getElementById && !document.all;
  var ie4 = document.all;
  
  if(ns4) br = "%0A";
  else if(ns6) br = "%0A";
  else if(ie4) br = "%0D%0A";
  else br = "%0D%0A";
	 
  data.value=data.value.replace(/"/gi,'\\"'); 
  dataArr=escape(data.value).split(br);
  data.value="";
	 
}
function scriptCPP(data){
	brCheck(data);
	for (i=0; i<dataArr.length; i++){
	data.value+= (i==0) ? "#include <stdio.h>\n#include <stdlib.h>\n\nint main(){\n printf(" : "printf("
	data.value+= "\"" + unescape(dataArr[i]); 
	data.value+= (i!=dataArr.length-1) ? "\\n\"); \n" : "\\n\");\n"
	}
	data.value+="\ return 0;\n}"
}

function scriptPHP(data){
brCheck(data);
for (i=0; i<dataArr.length; i++){
data.value+= (i==0) ? "<?php\necho " : "echo "
data.value+= "\\\"" + unescape(dataArr[i]); 
data.value+= (i!=dataArr.length-1) ? "\\n\"; \n" : "\\n\";\n"
}
data.value+="\?>"
}

function scriptJS(data){
brCheck(data);
for (i=0; i<dataArr.length; i++){
data.value+= (i==0) ? "<script type=\"text/javascript\">\n<!-- \ndocument.writeln(\" " : "document.writeln(\" "
data.value+= "" + unescape(dataArr[i])
data.value+= (i!=dataArr.length-1) ? " \"); \n" : " \");\n" 
}
data.value+=" \// \-->\n<\/script>"
}

function scriptASP(data){
brCheck(data);
for (i=0; i<dataArr.length; i++){
data.value+= (i==0) ? "#!/usr/bin/perl\nprint \"Content-type: text/html\\n\\n\";\n$code[0] = " : "$code["+i+"] = "
data.value+= "\"" + unescape(dataArr[i])
data.value+= (i!=dataArr.length-1) ? "\"; \n" : "\";\n" 
}
data.value+="for ($i=0;$i<scalar(@code);$i++) {print($code[$i].\"\\n\");}" 
}

function copyF(txx) {
with(txx){
focus(); select() 
}
if(document.all){
txt=txx.createTextRange()
txt.execCommand("Copy") 
}}

