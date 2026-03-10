"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MapPin, Phone, Clock, Navigation, Image as ImageIcon } from "lucide-react";

// --- TYPES ---
interface MapProps {
  center: [number, number];
  name: string;
}

const DynamicMap = dynamic<MapProps>(() => import("../components/Map"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#3D3522]/5 animate-pulse flex items-center justify-center">
      <span className="font-black uppercase opacity-20 tracking-widest text-xs">
        Loading Map Data...
      </span>
    </div>
  )
});

// --- DATA ---
const BRANCHES = [
  {
    id: 1,
    name: "Rajshahi Signature",
    location: "Greater Road, Laxmipur, Rajshahi",
    coords: [24.368, 88.588] as [number, number],
    phone: "+880 1711-000000",
    hours: "11:00 AM - 11:00 PM",
    status: "Open Now",
    image: "/images/branch-rajshahi.jpg", // Replace with your Rajshahi building pic
    mapUrl: "https://www.google.com/maps/search/?api=1&query=24.368,88.588"
  },
  {
    id: 2,
    name: "Dhaka Banani",
    location: "Road 11, Block H, Banani, Dhaka",
    coords: [23.7937, 90.4066] as [number, number],
    phone: "+880 1822-000000",
    hours: "12:00 PM - 12:00 AM",
    status: "Open Now",
    image: "/images/branch-dhaka.jpg", // Replace with your Dhaka building pic
    mapUrl: "https://www.google.com/maps/search/?api=1&query=23.7937,90.4066"
  }
];

export default function BranchesPage() {
  const [activeMap, setActiveMap] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fffdf5] text-[#3D3522] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter"
          >
            Our <span className="text-[#FF9933]">Kitchens</span>
          </motion.h1>
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 max-w-md">
            Interactive Locations. Peek inside our world.
          </p>
        </div>

        <div className="grid gap-12">
          {BRANCHES.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-[#3D3522]/5 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row h-full lg:min-h-[500px] shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* MEDIA SECTION (Image with Map Overlay) */}
              <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto overflow-hidden bg-[#F5F5DC]">
                
                {/* THE BUILDING PICTURE */}
                <img 
                  src={branch.image} 
                  alt={branch.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${activeMap === branch.id ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* THE INTERACTIVE MAP */}
                {activeMap === branch.id && (
                  <div className="absolute inset-0 z-10">
                    <DynamicMap center={branch.coords} name={branch.name} />
                  </div>
                )}
                
                {/* TOGGLE BUTTON */}
                <button 
                  onClick={() => setActiveMap(activeMap === branch.id ? null : branch.id)}
                  className="absolute bottom-6 right-6 z-[401] px-6 py-3 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-[#FF9933] hover:text-white transition-all"
                >
                  {activeMap === branch.id ? <ImageIcon size={14} /> : <MapPin size={14} />}
                  {activeMap === branch.id ? "Show Photo" : "Show Map"}
                </button>

                <div className="absolute top-6 left-6 z-[400]">
                  <span className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-500 text-white shadow-lg">
                    {branch.status}
                  </span>
                </div>
              </div>

              {/* INFO SECTION */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between bg-white">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight group-hover:text-[#FF9933] transition-colors leading-none">
                      {branch.name}
                    </h2>
                    <div className="flex items-center gap-2 opacity-50">
                      <MapPin size={16} />
                      <p className="text-sm font-bold uppercase tracking-wide">{branch.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#3D3522]/5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">Call for pickup</p>
                      <div className="flex items-center gap-3 font-bold">
                        <Phone size={16} className="text-[#FF9933]" />
                        <span>{branch.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">Serving Hours</p>
                      <div className="flex items-center gap-3 font-bold">
                        <Clock size={16} className="text-[#FF9933]" />
                        <span>{branch.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button className="flex items-center gap-3 px-8 py-4 border-2 border-[#3D3522]/10 rounded-2xl font-black uppercase text-xs tracking-widest hover:border-[#3D3522] transition-all">
                    Virtual Tour
                  </button>
                </div>
              </div>

              <span className="absolute bottom-[-20px] right-8 text-[120px] font-black opacity-[0.03] pointer-events-none select-none">
                0{branch.id}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}