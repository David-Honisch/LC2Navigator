//<![CDATA[
function GeoLocateIp(id, ip, country, adress1, adress2, city) {
	if (GBrowserIsCompatible()) {

		// Create and Center a Map
		var map = new GMap2(document.getElementById(id));
		var marker = new GMarker(new GLatLng(adress2,adress1));
		map.addOverlay(marker);
		map.setCenter(new GLatLng(adress2, adress1), 8);
		// map.addControl(new GLargeMapControl());
		map.addControl(new GSmallMapControl());
		map.addControl(new GMenuMapTypeControl());

		// bind a search control to the map, suppress result list
		map.addControl(new google.maps.LocalSearch(), new GControlPosition(
				G_ANCHOR_BOTTOM_RIGHT, new GSize(0, 0)));		
	}
}
function BigGeoLocateIp(id, ip, country, adress1, adress2, city) {
	if (GBrowserIsCompatible()) {

		// Create and Center a Map
		var map = new GMap2(document.getElementById(id));
		map.setCenter(new GLatLng(adress2, adress1), 8);
		// map.addControl(new GLargeMapControl());
		map.addControl(new GSmallMapControl());
		map.addControl(new GMenuMapTypeControl());

		// bind a search control to the map, suppress result list
		map.addControl(new google.maps.LocalSearch(), new GControlPosition(
				G_ANCHOR_BOTTOM_RIGHT, new GSize(0, 0)));

		// create a marker
		var marker = new GMarker(new GLatLng(adress2,adress1));
		GEvent
				.addListener(
						marker,
						"click",
						function() {
							var html = '<div style="width: 110px; padding-right: 10px">'+ip+',<br>'+country+','+city+'</div>';
							marker.openInfoWindowHtml(html);
						});

		map.addOverlay(marker);
		google.maps.Event.trigger(marker, "click");
	}
}
// ]]>