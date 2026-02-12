"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LiveMapInner() {
  const position: [number, number] = [20.5937, 78.9629]; 

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative z-0">
      <MapContainer center={position} zoom={5} scrollWheelZoom={false} className="h-full w-full" style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            Headquarters <br /> Service Available All India.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
