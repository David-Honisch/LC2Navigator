function getFlickrAPI(strPattern) 
{
	(function() {
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		jQuery.getJSON(flickerAPI, {
			tags : ""+strPattern,
			tagmode : "any",
			format : "json"
		}).done(function(data) {
			jQuery.each(data.items, function(i, item) {
				jQuery("<img>").attr("src", item.media.m).appendTo("#images");
				if (i === 3) {
					return false;
				}
			});
		});
	})();
}