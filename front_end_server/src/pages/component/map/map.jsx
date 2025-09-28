import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

function ChangeView({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], map.getZoom());
    }
  }, [lat, lon, map]);
  return null;
}

export function MyMap({ lat, lon }) {
  return (
    <MapContainer
      center={[lat || 13.7367, lon || 100.5231]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat || 13.7367, lon || 100.5231]} />
      <ChangeView lat={lat} lon={lon} />
    </MapContainer>
  );
}
