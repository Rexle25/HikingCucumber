function getRegionData(lat, lon) {
    const delta = 0.0152;

    const south = lat - delta;
    const west = lon - delta;
    const north = lat + delta;
    const east = lon + delta;

    const query = `
    [out:json][timeout:25];
    (
      node["landuse"](${south},${west},${north},${east});
      way["landuse"](${south},${west},${north},${east});
      relation["landuse"](${south},${west},${north},${east});
      node["natural"](${south},${west},${north},${east});
      way["natural"](${south},${west},${north},${east});
      relation["natural"](${south},${west},${north},${east});
    );
    out body;
    `;

    fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Gefundene Objekte:");
        return data;
        data.elements.forEach((el) => {
            console.log(el.tags);
        });
    })
    .catch((err) => {
        console.error("Fehler bei der Anfrage:", err);
    });
}
