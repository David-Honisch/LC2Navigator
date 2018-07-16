// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.
var map;
//
var streetviewClient;
var panorama;
// var centre = new GLatLng(25.774252,-80.190262);
// var centre = new GLatLng(50.942375,6.962322);
var centre = new GLatLng(50.942375, 6.962322);
var marker;

var vehicleOn = 0;
var vehicleSpeed = 0;
var vehicleBearing = 255;

$('#debug').html('Calling geolocation webservice. Please wait...');
var coord = [];
var data = [];

function GeoLocateIp(id, ip, country, adress1, adress2, city) {
//	alert(adress1 +'-'+adress2);
	centre = new GLatLng(adress1, adress2);
	if (google !== undefined) {
		google.maps.event.addDomListener(window, 'load', initialize(id, ip,
				country, adress1, adress2, city));
	}
}

function initialize(id, ip, country, adress1, adress2, city) {
	var mapOptions = {
		zoom : 8
	};

	map = new GMap2(document.getElementById("map-canvas"));
	map.setCenter(centre, 15);

	map.addControl(new GScaleControl());
	map.addControl(new GMenuMapTypeControl());
	map.addControl(new GLargeMapControl3D());

	map.enableDoubleClickZoom();
	map.enableContinuousZoom();
	map.enableScrollWheelZoom();

	// set up street view
	var streetOverlay = new GStreetviewOverlay();
	map.addOverlay(streetOverlay);
	streetviewClient = new GStreetviewClient();

	// Create Street View Marker
	var icon = new GIcon();

	var imageNum = Math.round(vehicleBearing / 22.5) % 16;
	var imageUrl = "/favicon.ico";

	icon.image = imageUrl;
	icon.iconSize = new GSize(49, 52);

	icon.printImage = icon.image;
	icon.mozPrintImage = icon.image;
	icon.iconAnchor = new GPoint(25, 36);
	icon.infoWindowAnchor = new GPoint(25, 6);
	// alert(adress1);
	centre = new GLatLng(adress1, adress2);
	marker = new GMarker(centre, {
		"icon" : icon,
		"draggable" : true
	});
	map.addOverlay(marker);

	// map = new google.maps.Map(document.getElementById('map-canvas'),
	// mapOptions);
	//
	// // Try HTML5 geolocation
	// if (navigator.geolocation) {
	// navigator.geolocation.getCurrentPosition(function(position) {
	// var pos = new google.maps.LatLng(position.coords.latitude,
	// position.coords.longitude);
	//
	// var infowindow = new google.maps.InfoWindow({
	// map : map,
	// position : pos,
	// content : '<div class=\"bdrop\"></div>'
	// });
	//
	// map.setCenter(pos);
	// // create a marker
	// var pos2 = new google.maps.LatLng(adress2, adress1);
	// var infowindow2 = new google.maps.InfoWindow({
	// map : map,
	// position : pos2,
	// content : 'Provider'
	// });
	//
	// //
	// }, function() {
	// handleNoGeolocation(true);
	// });
	// } else {
	// // Browser doesn't support Geolocation
	// handleNoGeolocation(false);
//	}
}


// function initMap() {
//
// map = new GMap2(document.getElementById("map-canvas"));
// map.setCenter(centre, 15);
//
// map.addControl(new GScaleControl());
// map.addControl(new GMenuMapTypeControl());
// map.addControl(new GLargeMapControl3D());
//
// map.enableDoubleClickZoom();
// map.enableContinuousZoom();
// map.enableScrollWheelZoom();
//
// // set up street view
// var streetOverlay = new GStreetviewOverlay();
// map.addOverlay(streetOverlay);
// streetviewClient = new GStreetviewClient();
//
// // Create Street View Marker
// var icon = new GIcon();
//
// var imageNum = Math.round(vehicleBearing / 22.5) % 16;
// var imageUrl = "http://maps.google.com/intl/en_us/mapfiles/cb/man_arrow-"
// + imageNum + ".png";
//
// icon.image = imageUrl;
// icon.iconSize = new GSize(49, 52);
//
// icon.printImage = icon.image;
// icon.mozPrintImage = icon.image;
// icon.iconAnchor = new GPoint(25, 36);
// icon.infoWindowAnchor = new GPoint(25, 6);
//
// marker = new GMarker(centre, {
// "icon" : icon,
// "draggable" : true
// });
// map.addOverlay(marker);

// updateLocation();

// GEvent.addListener(marker, "dragend", function() {
// var point = marker.getPoint();
// streetviewClient.getNearestPanoramaLatLng(point, function(reply) {
// if (reply) {
// centre = reply;
// marker.setPoint(centre);
// map.setCenter(centre);
//
// panorama.setLocationAndPOV(centre, {
// yaw : vehicleBearing
// });
//
// vehicleSpeed = -1;
//
// updateLocation();
// }
// });
// });
//
// GEvent.addListener(this.map, "click", function(streetOverlay, point) {
// if (point) {
// streetviewClient.getNearestPanoramaLatLng(point, function(reply) {
// if (reply) {
// centre = reply;
// marker.setPoint(centre);
// map.setCenter(centre);
//
// panorama.setLocationAndPOV(centre, {
// yaw : vehicleBearing
// });
//
// vehicleSpeed = -1;
//
// updateLocation();
// }
// });
//
// }
// });
//
// panorama = new GStreetviewPanorama(document.getElementById("streetDiv"));
// panorama.setLocationAndPOV(centre, {
// yaw : 0
// });
//
// GEvent.addListener(panorama, "initialized", function(a) {
// if (a && a.latlng) {
// marker.setPoint(a.latlng);
// map.setCenter(a.latlng);
//
// updateLocation();
// }
// });
//
// GEvent
// .addListener(
// panorama,
// "yawchanged",
// function(a) {
// if (a) {
// vehicleBearing = parseInt(a);
//
// // update marker image
// var imageNum = Math.round(vehicleBearing / 22.5) % 16;
// // var imageUrl =
// // "http://maps.google.com/intl/en_us/mapfiles/cb/man_arrow-"
// // + imageNum + ".png";
// var imageUrl = "http://maps.google.com/intl/de_DE/mapfiles/cb/man_arrow-"
// + imageNum + ".png";
//
// marker.setImage(imageUrl);
//
// }
// });
//
// moveStart();
//
// setTimeout("displayStats()", 1);
// }

// function resizeMap() {
// map.checkResize();
// panorama.checkResize();
// }

// function updateLocation() {
// var point = marker.getPoint();
//
// var stats = "lat: <b>" + point.lat() + "</b> lng: <b>" + point.lng()
// + "</b>";
// if (document.getElementById("locDiv") != null
// && document.getElementById("locDiv") !== 'undefined')
// document.getElementById("locDiv").innerHTML = stats;
// }

// turn left or right
// function turn(a) {
// vehicleBearing += a;
// panorama.setPOV({
// yaw : vehicleBearing
// });
//
// if (vehicleBearing < 0) {
// vehicleBearing += 360;
// }
// if (vehicleBearing > 360) {
// vehicleBearing -= 360;
// }
// }
//
// function speed(a) {
// if (a < 0) {
// // brake
// vehicleSpeed = -1;
// } else {
// // accel
// vehicleSpeed += a;
//
// // speed limit
// if (vehicleSpeed > 6) {
// vehicleSpeed = 6;
// }
// }
// }
//
// function restart() {
// panorama.setLocationAndPOV(centre, {
// yaw : 270
// });
//
// vehicleSpeed = 0;
// }
//
// function setFocus(a) {
// if (a.checked) {
// panorama.focus();
// } else {
// panorama.blur();
// }
// }
//
// function moveStart() {
// setTimeout("moveStage()", parseInt(3000 / vehicleSpeed));
// }
//
// function moveStage() {
// // forward
// if (vehicleSpeed > 0) {
// panorama.followLink(vehicleBearing);
// }
//
// // break;
// if (vehicleSpeed < 0) {
// vehicleSpeed = 0;
// }
//
// setTimeout("moveStage()", parseInt(3000 / Math.abs(vehicleSpeed)));
// }
//
// // show speed and direction
// function displayStats() {
// var stats = "";
//
// var pov = panorama.getPOV();
// var displayBearing = parseInt(pov.yaw);
// if (displayBearing >= 360) {
// displayBearing -= 360;
// }
// if (displayBearing < 0) {
// displayBearing += 360;
// }
//
// if (displayBearing > 0) {
// } else {
// displayBearing = 0;
// }
//
// var displaySpeed = vehicleSpeed * 10;
// if (displaySpeed < 0) {
// displaySpeed = 0;
// }
//
// stats = "<span style='color:" + (vehicleSpeed >= 6 ? "red'" : "green")
// + "'>" + "Speed: <b>" + displaySpeed + "</b></span>" + "<br/>"
// + "Direction: <b>" + displayBearing + "&deg;</b>";
// if (document.getElementById("statDiv") != null
// && document.getElementById("statDiv") !== 'undefined') {
// document.getElementById("statDiv").innerHTML = stats;
// }
//
// setTimeout("displayStats()", 500);
// }
//
// function chooseCity(a) {
// var cityID = parseInt(a.options[a.selectedIndex].value);
//
// // default is Miami
// // var x = -80.190262;
// // var centre = new GLatLng(50.942375,6.962322);
// var x = 50.942375;
// var y = 6.962322;
// var bearing = 215;
//
// switch (cityID) {
// case 1: // Albany, NY
// x = -73.755093;
// y = 42.651725;
// break;
// case 2: // Boise, ID
// x = -116.282579;
// y = 43.607478;
// bearing = 90;
// break;
// case 3: // Boston, MA
// x = -71.05682;
// y = 42.35888;
// bearing = 90;
// break;
// case 4: // Chicago, IL
// x = -87.624333;
// y = 41.879535;
// break;
// case 5: // Dallas, TX
// x = -96.797111;
// y = 32.781078;
// break;
// case 6: // Detroit, MI
// x = -83.049452;
// y = 42.334961;
// bearing = 330;
// break;
// case 7: // Houston, TX
// x = -95.369503;
// y = 29.7608;
// bearing = 305;
// break;
// case 8: // Indianapolis, IN
// x = -86.156255;
// y = 39.767016;
// break;
// case 9: // Kansas City, MO
// x = -94.583653;
// y = 39.090432;
// break;
// case 10: // Los Angeles, CA
// x = -118.243425;
// y = 34.052187;
// break;
// case 11: // Manchester, NH
// x = -71.463079;
// y = 42.990931;
// break;
// case 12: // Miami, FL
// x = -80.190262;
// y = 25.774252;
// break;
// case 13: // Milwaukee, WI
// x = -87.91448;
// y = 43.040182;
// break;
// case 14: // Minneapolis, MN
// x = -93.264351;
// y = 44.977482;
// break;
// case 15: // New York, NY
// x = -73.985506;
// y = 40.757929;
// break;
// case 16: // Orlando, FL
// x = -81.364438;
// y = 28.553154;
// break;
// case 17: // Philadelphia, PA
// x = -75.163808;
// y = 39.951639;
// break;
// case 18: // Phoenix, AZ
// x = -112.073821;
// y = 33.448262;
// break;
// case 19: // Pittsburgh, PA
// x = -80.001983;
// y = 40.438355;
// break;
// case 20: // Portland, OR
// x = -122.670132;
// y = 45.523104;
// bearing = 268;
// break;
// case 21: // Providence, RI
// x = -71.408718;
// y = 41.826956;
// bearing = 332;
// break;
// case 22: // Raleigh, NC
// x = -78.643414;
// y = 35.779748;
// break;
// case 23: // Salt Lake City, UT
// x = -111.888189;
// y = 40.771592;
// bearing = 180;
// break;
// case 24: // San Antonio, TX
// x = -98.493826;
// y = 29.428515;
// bearing = 180;
// break;
// case 25: // San Diego, CA
// x = -117.163841;
// y = 32.718834;
// bearing = 270;
// break;
// case 26: // San Francisco, CA
// x = -122.419204;
// y = 37.775196;
// bearing = 345;
// break;
// case 27: // Tucson, AZ
// x = -110.943959;
// y = 32.227832;
// bearing = 270;
// break;
// case 28: // Bonn
// x = 7.144744;
// y = 50.7304;
// bearing = 270;
// break;
// case 29: // K�LN, COLOGNE 41.880454,-87.624239
// x = 6.962322;
// y = 50.942375;
// bearing = 270;
// break;
// case 30: // London
// x = -0.074367;
// y = 51.507027;
// bearing = 200;
// break;
// case 31: // Paris, Frankreich
// x = 2.133252;
// y = 48.801412;
// bearing = 103;
// break;
// case 32: // Rome, Italien
// x = -12.505822;
// y = 41.887422;
// bearing = 103;
// break;
// case 33: // Rome, Italien
// x = 8.668689;
// y = 50.109481;
// bearing = 215;
// break;
// case 34: // Siegburg
// x = 7.144744;
// y = 50.7304;
// bearing = 215;
// break;
// case 35: // Hamburg
// x = 9.99685;
// y = 53.541217;
// bearing = 215;
// break;
// case 36: // Hamburg
// x = 13.425327;
// y = 52.536381;
// bearing = 305;
// break;
//
// }
//
// vehicleSpeed = -1;
// vehicleBearing = bearing;
//
// centre = new GLatLng(y, x);
// map.setCenter(centre, 15);
// marker.setPoint(centre);
// panorama.setLocationAndPOV(centre, {
// yaw : bearing
// });
//
// }

//
// function initMap() {
// var map = new google.maps.Map(document.getElementById('map'), {
// center : {
// lat : -34.397,
// lng : 150.644
// },
// zoom : 6
// });
// var infoWindow = new google.maps.InfoWindow({
// map : map
// });
//
// // Try HTML5 geolocation.
// if (navigator.geolocation) {
// navigator.geolocation.getCurrentPosition(function(position) {
// var pos = {
// lat : position.coords.latitude,
// lng : position.coords.longitude
// };
//
// infoWindow.setPosition(pos);
// infoWindow.setContent('Location found.');
// map.setCenter(pos);
// }, function() {
// handleLocationError(true, infoWindow, map.getCenter());
// });
// } else {
// // Browser doesn't support Geolocation
// handleLocationError(false, infoWindow, map.getCenter());
// }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
// infoWindow.setPosition(pos);
// infoWindow
// .setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.'
// : 'Error: Your browser doesn\'t support geolocation.');
// }


/*
function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map : map,
		position : new google.maps.LatLng(60, 105),
		content : content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}
*/
// window.onload = initMap
// window.onresize = resizeMap
//window.onunload = GUnload
// google.maps.event.addDomListener(window, 'load', initialize);
///*
jQuery(document).ready(function() { // first example
	$.getJSON('./geolocation.xml', function(data) {
//		alert('Debug');
		if (data['gml:coordinates'] != null) {
			coord = data['gml:coordinates'].split(';');
		}
		coord[0] = coord[0].replace(",",".");
		coord[1] = coord[1].replace(",",".");
		$('#debug').html('Validating response...');
		$('#debug').html('');
		if (data.ip == "127.0.0.1") {
			GeoLocateIp("googlemaps", "127.0.0.1", "germany", coord[0], coord[1],"siegburg");
		} else {
			GeoLocateIp("googlemaps", data.ip, data.countryName, coord[0],coord[1], data.city);
//			$('#isp').append("IP:"+data.ip);
		}
	});
});