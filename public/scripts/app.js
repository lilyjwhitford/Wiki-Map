// Client facing scripts here

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
    <div class="popup-container">
      <b class="marker-title">${data.title}</b>
      <br><img src="${data.image_url}" alt="Marker Image" class="popup-img">
      <p class="marker-description">${data.description}</p>
      <button id="edit-marker-btn" data-marker-id="${data.id}" class="btn btn-edit">Edit</button>
      <button id="delete-marker-btn" data-marker-id="${data.id}" class="btn btn-danger">Delete</button>
    </div>`);
  });
  return map;
};
