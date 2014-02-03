var map = L.map('map_div').setView([37.782254,-122.39124], 13);
    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);
L.marker([37.782254,-122.39124]).addTo(map)
  .bindPopup('GitHub HQ')
