// Client facing scripts here
// $(document).ready(() => {

// })

const loadMap = (paramsObj) => {
  const { lat, long, zoom, markers } = paramsObj;
  console.log('paramsObj -------', paramsObj);
  let map = L.map('map').setView([lat, long], zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // make loop to add marker to the map
  markers.forEach(data => {
    console.log('data --------', data);
    // add a marker
    let marker = L.marker([data.lat, data.long]).addTo(map);
    // add a pop-up to the marker
    marker.bindPopup(`
    <b>${data.title}</b>
    <br><img src="${data.image_url}" alt="Marker Image">
    <p>${data.description}</p>
    <button id="edit-marker-btn" class="btn btn-primary">Edit</button>
    <button id="delete-marker-btn" class="${data.id}">Delete</button>`);
  });
  return map;
};
