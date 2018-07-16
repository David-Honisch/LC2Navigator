jQuery(document).ready(function()
{
var settings = {
    url: "./include/fileupload/upload.php",
    dragDrop:true,
    fileName: "myfile",
    allowedTypes:"jar,jpg,png,gif,doc,pdf,mp3,sql,xls,xlsx,txt,htm,html,css,rar,zip,arj,cab,xml",
    maxFileSize:1000000*1024,	
    returnType:"json",
	 onSuccess:function(files,data,xhr)
    {
       // alert((data));
    },
    showDelete:true,
    deleteCallback: function(data,pd)
	{
    for(var i=0;i<data.length;i++)
    {
    	jQuery.post("delete.php",{op:"delete",name:data[i]},
        function(resp, textStatus, jqXHR)
        {
            //Show Message  
    		jQuery("#filestatus").append("<div>File Deleted</div>");      
        });
     }      
    pd.statusbar.hide(); //You choice to hide/not.

}
}
var uploadObj = jQuery("#mulitplefileuploader").uploadFile(settings);
});