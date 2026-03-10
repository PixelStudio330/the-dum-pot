"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Standard Leaflet Icon Fix for Next.js
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  center: [number, number];
  name: string;
}

export default function Map({ center, name }: MapProps) {
  return (
    <MapContainer 
      center={center} 
      zoom={15} 
      scrollWheelZoom={false} 
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        eventHandlers={{
          add: (e) => {
            // Applies a warm, vintage filter to match the "The Dum Pot" aesthetic
            e.target.getContainer().style.filter = "sepia(20%) hue-rotate(5deg) brightness(95%) contrast(110%)";
          },
        }}
      />
      <Marker position={center} icon={customIcon}>
        <Popup>
          <div className="text-[#3D3522] font-medium p-1">
            <span className="font-black uppercase tracking-tight text-[#FF9933]">{name}</span> 
            <br /> 
            <span className="text-[10px] uppercase font-bold opacity-60">The Dum Pot • Virtual Kitchen</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}