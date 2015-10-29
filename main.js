// wait for DOM to load before running JS
$(function() {

  var quakesUrl = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
  var $quakesList = $('#quakes-list');
  var map;

  // compile handlebars template
  var source = $('#quakes-template').html();
  var template = Handlebars.compile(source);

  // custom handlebars helper for formatting time in hours ago
  Handlebars.registerHelper('hoursAgo', function (time) {
    var hoursAgo = Math.round((Date.now() - time) / (1000*60*60));
    return hoursAgo + ' hours ago';
  });

  // function to display map on the page
  var createMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.78, lng: -122.44 },
      zoom: 2
    });
  };

  // function to get earthquake data and display it on the page
  var fetchQuakeData = function() {
    $.get(quakesUrl, function (data) {

      var earthquakes = data.features;
      
      // pass in data to render in the template
      var quakesHtml = template({ quakes: earthquakes });

      // append html to the view
      $quakesList.append(quakesHtml);
      
      // iterate through earthquakes to create map markers
      earthquakes.forEach(function (quake) {
        var lat = quake.geometry.coordinates[1];
        var lng = quake.geometry.coordinates[0];
        new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
          title: quake.properties.title,
          icon: 'earthquake.png'
        });
      });
    });
  };

  createMap();
  fetchQuakeData();

});