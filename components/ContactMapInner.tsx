"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Exact coordinates from Waze: lat=40.40494280, lng=49.87657520
const STORE_POSITION: [number, number] = [40.4049428, 49.8765752];

// Custom SVG pin icon — avoids the broken default leaflet marker in Next.js
const redPinIcon = L.divIcon({
  html: `
    <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z" fill="#D11F26"/>
      <path d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z" fill="url(#pin-gradient)" opacity="0.3"/>
      <circle cx="16" cy="16" r="7" fill="white"/>
      <circle cx="16" cy="16" r="4" fill="#D11F26"/>
      <defs>
        <radialGradient id="pin-gradient" cx="30%" cy="25%" r="60%">
          <stop offset="0%" stop-color="white" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="black" stop-opacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  `,
  className: "",
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -44],
});

export default function ContactMapInner() {
  return (
    <MapContainer
      center={STORE_POSITION}
      zoom={16}
      style={{ height: "100%", width: "100%", minHeight: 400 }}
      scrollWheelZoom={false}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        maxZoom={19}
      />

      <Marker position={STORE_POSITION} icon={redPinIcon}>
        <Popup>
          <div className="font-body text-sm">
            <strong className="font-heading font-bold block mb-1">
              🏎 Spacer Azerbaijan
            </strong>
            Əliyar Əliyev 25, Bakı
            <br />
            <a
              href="tel:+994515411147"
              className="text-brand-blue hover:underline mt-1 block"
            >
              +994 51 541 11 47
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
