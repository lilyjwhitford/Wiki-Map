// Client facing scripts here
$(document).ready(() => {
  // add a map
  let lat = 49.2838;
  let long = -123.1193;
  let zoom = 13;

  let map = L.map('map').setView([lat, long], zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // add a marker
  let marker = L.marker([49.2838, -123.1193]).addTo(map);

  // add a pop-up to the marker
  marker.bindPopup("<b>Marker Title</b><br><img><br><button></button><button></button>").openPopup();


})