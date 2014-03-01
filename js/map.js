var map = L.mapbox.map('map-canvas','bdon.h6c9omjp', {scrollWheelZoom:false}).setView([37.782254,-122.39124], 14);

L.marker([37.782254,-122.39124]).addTo(map)
  .bindPopup('GitHub HQ')

