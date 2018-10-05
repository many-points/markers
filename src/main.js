const map = L.map('map');
const token = require('./token');

map.setView([48.208176, 16.373819], 5)
navigator.geolocation.getCurrentPosition(
  (loc) => map.setView([loc.coords.latitude, loc.coords.longitude], 14),
  (err) => console.error("Can't get current position")
);

/*
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
               '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
               'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom:     18,
  id:          'mapbox.streets',
  accessToken: token
}).addTo(map);
*/

/*
 * Empty layer for development
 */
L.tileLayer('', {
  attribution: '',
  maxZoom:     18
}).addTo(map);

const onMapClick = (event) => {
  const popup = L.popup();
  const latlng = event.latlng;
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'text';
  form.appendChild(input);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let marker = L.marker(latlng).addTo(map);
    map.closePopup();
    marker.bindPopup(input.value).openPopup();
  });
  popup.setLatLng(latlng)
       .setContent(form)
       .openOn(map);
  input.focus();
};

map.on('click', onMapClick);
