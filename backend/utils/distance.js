import fetch from "node-fetch";

// Convert city name to coordinates using Nominatim (OSM)
export async function getCoordinatesFromCity(name) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      name
    )}&format=json&limit=1`;

    const res = await fetch(url, {
      headers: { "User-Agent": "MERN-App" }, // required by Nominatim
    });
    const data = await res.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return [parseFloat(lat), parseFloat(lon)];
    }
    return null;
  } catch (err) {
    console.error("❌ Error fetching coordinates:", err);
    return null;
  }
}

// Get distance using OSRM
export async function getDistanceKm(originName, destinationName) {
  try {
    const originCoords = await getCoordinatesFromCity(originName);
    const destCoords = await getCoordinatesFromCity(destinationName);

    if (!originCoords || !destCoords) return 10.0; // default 10 km

    const url = `http://router.project-osrm.org/route/v1/driving/${originCoords[1]},${originCoords[0]};${destCoords[1]},${destCoords[0]}?overview=false`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.code === "Ok") {
      const distanceMeters = data.routes[0].distance;
      return distanceMeters / 1000; // km
    }

    return 10.0; // default fallback
  } catch (err) {
    console.error("❌ Error fetching distance:", err);
    return 10.0;
  }
}
