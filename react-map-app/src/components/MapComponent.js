// MapComponent.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ markers }) => {
  return (
    <MapContainer
      center={[49.255, -123]}
      zoom={13}
      style={{ height: "600px", width: "90%", justifyContent: "center" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={L.icon({
            iconUrl: marker.iconUrl,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          })}
        >
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
