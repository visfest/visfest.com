var map = L.map('map-canvas').setView([37.782254,-122.39124], 13);
    L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
    maxZoom: 18
}).addTo(map);

L.marker([37.782254,-122.39124]).addTo(map)
  .bindPopup('GitHub HQ')

