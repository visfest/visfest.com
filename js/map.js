try {
var map2014 = L.mapbox.map('map-canvas-2014','bdon.h6c9omjp', {scrollWheelZoom:false}).setView([37.782254,-122.39124], 14);

L.marker([37.782254,-122.39124]).addTo(map2014)
  .bindPopup('GitHub HQ')
} catch(e) {
}


try {
var map2015 = L.mapbox.map('map-canvas-2015','bdon.h6c9omjp', {scrollWheelZoom:false}).setView([37.7543922,-122.4185027], 16);

L.marker([37.7543922,-122.4185027]).addTo(map2015)
  .bindPopup('GAFFTA')
} catch(e) {
}