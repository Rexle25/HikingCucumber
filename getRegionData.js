function getRegionData(lat, lon) {
    const delta = 0.052;

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

    return fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
    })
    .then((res) => res.json());
}
