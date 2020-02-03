

var config = {
    HEREIoT_APIKey: "",
    HEREIoT_AppID: "",
    HEREIoT_AppCode: "",

    HEREIoT_initial_longitude: 10.00,
    HEREIoT_initial_latitude: 5.00,
    HEREIoT_initial_zoom: 13,
    HEREIoT_initial_tilt: 63,
    HEREIoT_initial_heading: 60,
}

var map = L.map( 'map', {
    center: [config.HEREIoT_initial_longitude, config.HEREIoT_initial_latitude],
    minZoom: 2,
    zoom: config.HEREIoT_initial_zoom
});

L.tileLayer('https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=' + config.HEREIoT_APIKey, {
    attribution: '&copy; <a href="https://www.facebook.com/Walied.Cheetos">WaliedCheetos, HERE 2020</a>',
 subdomains: ['a','b','c']
}).addTo( map );

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < markers.length; ++i )
{
  var popup = markers[i].name +
              '<br/>' + markers[i].city +
              '<br/><b>IATA/FAA:</b> ' + markers[i].iata_faa +
              '<br/><b>ICAO:</b> ' + markers[i].icao +
              '<br/><b>Altitude:</b> ' + Math.round( markers[i].alt * 0.3048 ) + ' m' +
              '<br/><b>Timezone:</b> ' + markers[i].tz;

  var m = L.marker( [markers[i].lat, markers[i].lng], {icon: myIcon} )
                  .bindPopup( popup );

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );
