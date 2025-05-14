// Helper: neue Station-Form erstellen
function createStationForm(id) {
  const div = document.createElement('div');
  div.className = 'station';

  div.innerHTML = `
    <h3>Station ${id}</h3>
    <label>Typ:
      <select class="type">
        <option value="question">Quiz</option>
        <option value="gps">GPS</option>
        <option value="gpsSound">GPS mit Sound</option>
      </select>
    </label><br>
    <label>Text:<br><input class="text" placeholder="Aufgaben-Text"></label><br>

    <div class="questionFields">
      <label>Antwort:<br><input class="answer"></label><br>
    </div>

    <div class="gpsFields" style="display:none">
      <label>Lat:<br><input type="number" step="any" class="lat"></label><br>
      <label>Lng:<br><input type="number" step="any" class="lng"></label><br>
      <label>Radius (m):<br><input type="number" class="radius" value="50"></label><br>
      <div class="map" id="map-${id}"></div>
    </div>

    <label>Bild-URL:<br><input class="imageUrl" placeholder="optional"></label><br>
    <button class="remove">✖ Entfernen</button>
  `;

  const typeSelect = div.querySelector('.type');
  const gpsFields = div.querySelector('.gpsFields');
  const questionFields = div.querySelector('.questionFields');
  const mapDiv = div.querySelector(`#map-${id}`);
  let leafletMap = null;
  let marker = null;

  typeSelect.onchange = e => {
    const type = e.target.value;
    const isQuestion = type === 'question';
    const isGPS = type === 'gps' || type === 'gpsSound';
    questionFields.style.display = isQuestion ? '' : 'none';
    gpsFields.style.display      = isGPS ? '' : 'none';
    mapDiv.style.display         = isGPS ? 'block' : 'none';

    if (isGPS && !leafletMap) {
      setTimeout(() => {
        leafletMap = L.map(mapDiv).setView([46.948, 7.447], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(leafletMap);

        leafletMap.on('click', e => {
          const latInput = div.querySelector('.lat');
          const lngInput = div.querySelector('.lng');
          latInput.value = e.latlng.lat.toFixed(6);
          lngInput.value = e.latlng.lng.toFixed(6);

          if (marker) {
            marker.setLatLng(e.latlng);
          } else {
            marker = L.marker(e.latlng, { draggable: true }).addTo(leafletMap);
            marker.on('dragend', () => {
              const pos = marker.getLatLng();
              latInput.value = pos.lat.toFixed(6);
              lngInput.value = pos.lng.toFixed(6);
            });
          }
        });
      }, 0);
    }
  };

  div.querySelector('.remove').onclick = () => div.remove();
  return div;
}

const stationsDiv = document.getElementById('stations');
let stationCount = 0;

document.getElementById('addStation').onclick = () => {
  stationCount++;
  stationsDiv.appendChild(createStationForm(stationCount));
};

document.getElementById('generate').onclick = () => {
  const title = document.getElementById('boundTitle').value.trim();
  const stations = Array.from(stationsDiv.children).map(div => {
    const type     = div.querySelector('.type').value;
    const text     = div.querySelector('.text').value.trim();
    const imageUrl = div.querySelector('.imageUrl').value.trim();
    const obj = {
      id: Number(div.querySelector('h3').textContent.split(' ')[1]),
      type,
      text
    };
    if (imageUrl) obj.imageUrl = imageUrl;
    if (type === 'question') {
      obj.answer = div.querySelector('.answer').value.trim();
    } else if (type === 'gps' || type === 'gpsSound') {
      obj.lat    = parseFloat(div.querySelector('.lat').value);
      obj.lng    = parseFloat(div.querySelector('.lng').value);
      obj.radius = Number(div.querySelector('.radius').value);
    }
    return obj;
  });

  const boundData = { title, stations };
  const jsonStr   = JSON.stringify(boundData, null, 2);

  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'bounds.json';
  a.click();
  URL.revokeObjectURL(url);
};