document.write('<div id=\"isp\">Loading...</div>');

$('#isp').html('calling webservice...');
var coord = [];
var data = [];
$.getJSON('./geolocation.xml', function(data) {
	$('#isp').html('validating response...');
	$('#isp').html('');
	$('#isp').append('<br>' + data.countryName);
	$('#isp').append('<br>' + data.regionName);
	$('#isp').append('<br>' + data.city);
	$('#isp').append('<br>' + data.isp);
	$('#isp').append('<br>' + coord);
	$('#isp').append('<br>' + data.timezone);
});