// wait for DOM to load before running JS
$(function() {

 var quakesUrl = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
 var $quakesList = $('#quakes-list');
 var map;

});

var source   = $("#quakes").html();
var template = Handlebars.compile(source);

$.get('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson', function (data) {
//    console.log(data.features[0].properties.title);
//    console.log(data.features[0].geometry.coordinates);
//    console.log(data.features[0]);

    console.log(data.features[0].properties.time);

   	data.features.forEach(function(feature) {
   		feature.properties.hoursAgo = ((Date.now() - feature.properties.time)/(1000*60*60)).toFixed(1);
		new google.maps.Marker({
			position: {lat: feature.geometry.coordinates[0], lng: feature.geometry.coordinates[1]},
			map: map,
		});
   	});

	var quakeHtml= template({quakes: data.features});

    	$('#quakes-list').append(quakeHtml);

    });

// (data.features[0].properties.title) Title of earthquake
// coordinates

// var quakeTitle = data.features[0].properties.title;



