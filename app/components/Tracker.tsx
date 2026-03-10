"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Bike, Clock, ShieldCheck, AlertCircle } from "lucide-react";

// Note: In a real app, you'd use 'mapbox-gl' or 'google-maps'
// For this UI, we will simulate the "live" feel with a styled container

interface TrackerProps {
  customerAddress: string;
  orderItems: any[];
  totalAmount: number;
}

export default function Tracker({ customerAddress, orderItems, totalAmount }: TrackerProps) {
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [riderPos, setRiderPos] = useState(0); // 0 to 100 percentage of route

  // Simulate rider movement
  useEffect(() => {
    const interval = setInterval(() => {
      setRiderPos((prev) => {
        if (prev >= 100) return 100;
        return prev + 0.5;
      });
      setEstimatedTime((prev) => (prev > 5 ? prev - 0.1 : 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#FDFBF0]">
      {/* 1. MAP SECTION */}
      <div className="relative h-[400px] w-full bg-[#DCE3C9] overflow-hidden">
        {/* Placeholder for real Map (Mapbox/Google) */}
        <div 
          className="absolute inset-0 opacity-40 grayscale"
          style={{ 
            backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/90.4125,23.8103,12/800x600?access_token=YOUR_TOKEN')`,
            backgroundSize: 'cover'
          }}
        />
        
        {/* Animated Route Line (SVG Simulation) */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 50 300 Q 150 150 350 100"
            fill="none"
            stroke="#3D3522"
            strokeWidth="4"
            strokeDasharray="8 4"
            className="opacity-20"
          />
          <motion.path
            d="M 50 300 Q 150 150 350 100"
            fill="none"
            stroke="#A35D2B"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: riderPos / 100 }}
          />
        </svg>

        {/* Rider Icon */}
        <motion.div 
          className="absolute z-10 p-2 bg-white rounded-full shadow-xl text-[#A35D2B]"
          style={{ left: `${20 + riderPos * 0.6}%`, top: `${70 - riderPos * 0.5}%` }}
        >
          <Bike size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </motion.div>

        {/* Customer Pin */}
        <div className="absolute right-[10%] top-[20%] text-[#3D3522]">
          <div className="bg-white px-3 py-1 rounded-full text-[10px] font-black mb-1 shadow-lg border border-[#A35D2B]">
            YOU
          </div>
          <MapPin size={32} fill="#A35D2B" className="text-white" />
        </div>

        {/* Floating ETA Tag */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3D3522] rounded-xl flex items-center justify-center text-[#FDFBF0]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Estimated Arrival</p>
              <p className="text-xl font-black text-[#3D3522]">{Math.round(estimatedTime)} mins</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ORDER SUMMARY SECTION */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div>
          <h3 className="text-2xl font-serif font-black italic text-[#3D3522] mb-1">Coming to you.</h3>
          <p className="text-sm text-[#8B9B6A] font-medium flex items-center gap-1">
            <MapPin size={14} /> {customerAddress}
          </p>
        </div>

        <div className="bg-white rounded-[32px] p-6 border border-[#DCE3C9] space-y-4">
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <span className="text-[10px] font-black uppercase text-gray-400">Order Status</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              On the Way
            </span>
          </div>

          <div className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-[#3D3522] font-bold">{item.quantity}x {item.name}</span>
                <span className="text-gray-400 font-medium">৳{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
            <span className="font-serif italic font-bold">Paid via COD</span>
            <span className="text-lg font-black text-[#A35D2B]">৳{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center gap-3 bg-[#DCE3C9]/30 p-4 rounded-2xl border border-[#DCE3C9]">
          <ShieldCheck className="text-[#8B9B6A]" size={20} />
          <p className="text-[10px] font-bold text-[#3D3522] leading-tight uppercase tracking-tight">
            Our rider follows all food safety protocols for the freshest Dum experience.
          </p>
        </div>
      </div>
    </div>
  );
}