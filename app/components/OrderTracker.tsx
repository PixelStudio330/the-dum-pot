"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LatLngTuple = [number, number];
// The Shop location
const SHOP_START: LatLngTuple = [23.8103, 90.4125];

function MapController({ route }: { route: LatLngTuple[] }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.length >= 2) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [route, map]);
  return null;
}

// Icons (Fixed SSR checks and anchors)
const riderIcon = typeof window !== 'undefined' ? L.icon({ 
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", 
  iconSize: [35, 35], 
  iconAnchor: [17, 35] 
}) : null;

const destinationIcon = typeof window !== 'undefined' ? L.icon({ 
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", 
  iconSize: [30, 30], 
  iconAnchor: [15, 30] 
}) : null;

const cafeEmojiIcon = typeof window !== 'undefined' ? L.divIcon({
  html: `<div style="font-size: 24px; filter: drop-shadow(2px 2px 0px rgba(0,0,0,0.1));">🍲</div>`,
  className: "custom-div-icon", 
  iconSize: [30, 30],
  iconAnchor: [15, 25]
}) : null;

interface OrderTrackerProps {
  address?: string;
  destination: LatLngTuple;
  onProgressUpdate?: (progress: number) => void;
  initialProgress?: number;
}

export default function OrderTracker({ 
  destination, 
  onProgressUpdate, 
  initialProgress = 0 
}: OrderTrackerProps) {
  const [route, setRoute] = useState<LatLngTuple[]>([]);
  const [progress, setProgress] = useState(initialProgress);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // 1. Fetch Route (FIXED DIRECTION: SHOP -> DESTINATION)
  useEffect(() => {
    if (!destination || (destination[0] === 0 && destination[1] === 0)) return;
    
    const getRoute = async () => {
      try {
        // FIXED: Swapped coordinates. It must be START_LNG,START_LAT ; END_LNG,END_LAT
        const url = `https://router.project-osrm.org/route/v1/driving/${SHOP_START[1]},${SHOP_START[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const json = await res.json();
        
        if (json.code === "Ok" && json.routes?.[0]?.geometry?.coordinates) {
          const coords = json.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]] as LatLngTuple);
          setRoute(coords);
        } else {
          setRoute([SHOP_START, destination]);
        }
      } catch (e) {
        setRoute([SHOP_START, destination]);
      }
    };
    getRoute();
  }, [destination]);

  // 2. Movement Engine
  useEffect(() => {
    if (progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.5; 
        return next >= 100 ? 100 : next;
      });
    }, 150); // Slightly slower for better visual tracking

    return () => clearInterval(interval);
  }, [progress]);

  // 3. Parent Sync
  useEffect(() => {
    if (onProgressUpdate) {
      onProgressUpdate(Math.floor(progress));
    }
  }, [Math.floor(progress), onProgressUpdate]);

  // 4. Smooth Position Interpolation
  const currentPos = useMemo((): LatLngTuple => {
    if (route.length === 0) return SHOP_START;
    if (route.length === 1) return route[0];

    const totalSegments = route.length - 1;
    const decimalIndex = (progress / 100) * totalSegments;
    const index = Math.floor(decimalIndex);
    const fraction = decimalIndex - index;

    if (index >= totalSegments) return route[totalSegments];

    const start = route[index];
    const end = route[index + 1];

    const lat = start[0] + (end[0] - start[0]) * fraction;
    const lng = start[1] + (end[1] - start[1]) * fraction;

    return [lat, lng];
  }, [route, progress]);

  // Calculate index for the path color change
  const splitIndex = Math.floor(((route.length - 1) * progress) / 100);

  if (!mounted || !destination) return null;

  return (
    <div className="space-y-4 mb-6">
      <div className="w-full h-[250px] rounded-2xl overflow-hidden border-2 border-[#8B4513] shadow-[4px_4px_0px_#8B4513] relative z-0">
        <MapContainer center={SHOP_START} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          
          {route.length > 0 && (
            <>
              <MapController route={route} />
              {/* Green line: Part already traveled */}
              <Polyline 
                positions={route.slice(0, splitIndex + 1)} 
                pathOptions={{ color: '#4CAF50', weight: 5, lineCap: 'round' }} 
              />
              {/* Dashed line: Remaining path */}
              <Polyline 
                positions={route.slice(splitIndex)} 
                pathOptions={{ color: '#8B4513', weight: 2, dashArray: '5, 10', opacity: 0.3 }} 
              />
            </>
          )}

          {/* Shop Location */}
          {cafeEmojiIcon && <Marker position={SHOP_START} icon={cafeEmojiIcon} />}
          
          {/* Moving Rider */}
          {riderIcon && (
            <Marker 
              key={`rider-${progress}`} 
              position={currentPos} 
              icon={riderIcon} 
            />
          )}

          {/* User Destination */}
          {destinationIcon && <Marker position={destination} icon={destinationIcon} />}
        </MapContainer>
      </div>

      <div className="bg-white border-2 border-[#8B4513] p-4 rounded-2xl shadow-[4px_4px_0px_rgba(139,69,19,0.1)]">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
              <span className="text-[10px] font-black text-[#8B4513] uppercase tracking-widest">Live Delivery Status</span>
              <span className="text-[9px] font-bold text-[#8B4513]/60 uppercase">
                {progress >= 100 ? "Sagor has arrived with the pot! 🍲" : "Captain is navigating traffic..."}
              </span>
          </div>
          <span className="text-sm font-black text-[#FF9933]">{Math.floor(progress)}%</span>
        </div>
        
        <div className="h-3 w-full bg-[#F5F5DC] border-2 border-[#8B4513] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#4CAF50]" 
            style={{ 
              width: `${progress}%`,
              transition: 'width 100ms linear'
            }}
          />
        </div>
      </div>
    </div>
  );
}