// generator.js

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
    </div>
    <label>Bild-URL:<br><input class="imageUrl" placeholder="optional"></label><br>
    <button class="remove">✖ Entfernen</button>
  `;

  // Typ-Wechsel: zeige/verdecke Felder
  div.querySelector('.type').onchange = e => {
    const isQ = e.target.value === 'question';
    div.querySelector('.questionFields').style.display = isQ ? '' : 'none';
    div.querySelector('.gpsFields').style.display      = isQ ? 'none' : '';
  };
  // Entfernen-Button
  div.querySelector('.remove').onclick = () => div.remove();

  return div;
}

// Stationen-DIV referenzieren
const stationsDiv = document.getElementById('stations');
let stationCount = 0;

// „Station hinzufügen“-Button
document.getElementById('addStation').onclick = () => {
  stationCount++;
  stationsDiv.appendChild(createStationForm(stationCount));
};

// „Generate“-Button: JSON sammeln & downloaden
document.getElementById('generate').onclick = () => {
  const title = document.getElementById('boundTitle').value.trim();
  const stations = Array.from(stationsDiv.children).map(div => {
    const type     = div.querySelector('.type').value;
    const text     = div.querySelector('.text').value.trim();
    const imageUrl = div.querySelector('.imageUrl').value.trim();
    const obj = {
      id: Number(div.querySelector('h3').textContent.split(' ')[1]),
      type, text
    };
    if (imageUrl) obj.imageUrl = imageUrl;
    if (type === 'question') {
      obj.answer = div.querySelector('.answer').value.trim();
    } else {
      obj.lat    = parseFloat(div.querySelector('.lat').value);
      obj.lng    = parseFloat(div.querySelector('.lng').value);
      obj.radius = Number(div.querySelector('.radius').value);
    }
    return obj;
  });

  const boundData = { title, stations };
  const jsonStr   = JSON.stringify(boundData, null, 2);

  // Download via Blob & download-Attribut :contentReference[oaicite:5]{index=5}
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'bounds.json';
  a.click();
  URL.revokeObjectURL(url);
};
