$(function() {
	var availableTags = [ "c++", "java", "php", "coldfusion", "javascript",
			"asp", "ruby", "python", "c", "scala", "groovy", "haskell", "perl" ];
	$("#query").autocomplete( {
		source : availableTags
	});
});