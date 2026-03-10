"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Truck, Info, MapPin, ChevronLeft, Search, CheckCircle2 } from "lucide-react";
import Tracker from "./Tracker"; 

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 60 : 0;
  const total = subtotal + deliveryFee;

  // Mock Address API logic
  useEffect(() => {
    if (address.length > 3 && !isCheckingOut) {
      const mockPlaces = [
        `${address}, Dhanmondi, Dhaka`,
        `${address}, Banani, Dhaka`,
        `${address}, Uttara, Dhaka`,
        `${address}, Chittagong, Bangladesh`
      ];
      setSuggestions(mockPlaces);
    } else {
      setSuggestions([]);
    }
  }, [address, isCheckingOut]);

  const handleCheckout = () => {
    if (!address) {
      alert("Please enter a delivery address.");
      return;
    }
    if (!address.toLowerCase().includes("bangladesh") && !address.toLowerCase().includes("dhaka")) {
      alert("🚨 We do not deliver outside Bangladesh!");
      return;
    }

    setIsProcessing(true);
    // Simulate a brief server "Order Placement" delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckingOut(true);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsProcessing(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[150]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FDFBF0] shadow-2xl z-[200] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-[#3D3522]/10 flex items-center justify-between bg-[#3D3522] text-[#FDFBF0]">
              <div className="flex items-center gap-4">
                {isCheckingOut ? (
                   <button onClick={() => setIsCheckingOut(false)} className="hover:text-[#A35D2B] transition-colors">
                     <ChevronLeft size={24} />
                   </button>
                ) : (
                  <div className="relative">
                    <ShoppingBag size={24} />
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#A35D2B] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {items.length}
                      </span>
                    )}
                  </div>
                )}
                <h2 className="text-2xl font-serif font-black italic tracking-tight">
                  {isCheckingOut ? "Tracking." : "Your Pot."}
                </h2>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 border-4 border-[#A35D2B] border-t-transparent rounded-full animate-spin" />
                    <p className="font-serif italic text-xl text-[#3D3522]">Sealing your pot...</p>
                  </motion.div>
                ) : !isCheckingOut ? (
                  <motion.div
                    key="cart-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-8 space-y-8"
                  >
                    {items.length === 0 ? (
                      <div className="h-[60vh] flex flex-col items-center justify-center text-[#3D3522]/30 space-y-4 text-center">
                        <div className="w-20 h-20 bg-[#DCE3C9]/30 rounded-full flex items-center justify-center text-[#3D3522]">
                          <ShoppingBag size={40} strokeWidth={1} />
                        </div>
                        <p className="font-serif italic text-xl">Your pot is empty...</p>
                        <button onClick={onClose} className="text-[#A35D2B] font-bold text-sm uppercase tracking-widest hover:underline">Start Filling It</button>
                      </div>
                    ) : (
                      items.map((item) => (
                        <motion.div layout key={item.id} className="flex gap-5 items-start">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 border-[#DCE3C9] flex-shrink-0 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-black text-[#3D3522] text-base leading-tight">{item.name}</h4>
                              <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center bg-[#DCE3C9]/40 rounded-xl p-1 border border-[#3D3522]/5">
                                <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-[#3D3522]"><Minus size={12} strokeWidth={3} /></button>
                                <span className="text-sm font-black w-8 text-center">{item.quantity}</span>
                                <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-[#3D3522]"><Plus size={12} strokeWidth={3} /></button>
                              </div>
                              <div className="text-right font-black text-[#A35D2B]">
                                ৳{(item.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="tracker-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                  >
                    <Tracker 
                      customerAddress={address} 
                      orderItems={items} 
                      totalAmount={total} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary Footer */}
            {!isCheckingOut && !isProcessing && items.length > 0 && (
              <div className="p-8 bg-white border-t border-[#3D3522]/10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#A35D2B] uppercase tracking-wider bg-orange-50 p-3 rounded-xl border border-orange-100">
                    <Info size={14} />
                    <span>Deliveries limited to Bangladesh.</span>
                  </div>
                  
                  {/* Address Input with Suggestions */}
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 text-[#3D3522]" size={18} />
                    <input 
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Delivery Address..."
                      className="w-full pl-12 pr-4 py-4 bg-[#FDFBF0] rounded-2xl border-2 border-[#DCE3C9] text-sm font-bold focus:outline-none focus:border-[#A35D2B] transition-all placeholder:text-gray-300"
                    />
                    
                    <AnimatePresence>
                      {suggestions.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-0 w-full bg-white border-2 border-[#DCE3C9] rounded-2xl mb-2 overflow-hidden shadow-xl z-50"
                        >
                          {suggestions.map((s, i) => (
                            <button 
                              key={i}
                              onClick={() => { setAddress(s); setSuggestions([]); }}
                              className="w-full text-left px-4 py-3 text-xs font-bold text-[#3D3522] hover:bg-[#FDFBF0] border-b border-[#DCE3C9] last:border-0 flex items-center gap-2"
                            >
                              <Search size={14} className="text-gray-400" />
                              {s}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#FDFBF0] rounded-2xl border border-[#DCE3C9]">
                    <div className="flex items-center gap-2">
                      <Truck size={18} className="text-[#3D3522]" />
                      <span className="text-xs font-bold text-[#3D3522]">Cash on Delivery</span>
                    </div>
                    <CheckCircle2 size={18} className="text-[#8B9B6A]" />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="font-bold text-[#3D3522]">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-4 border-t border-[#3D3522]/10">
                    <span className="font-serif italic text-[#3D3522]">Total</span>
                    <span className="text-[#A35D2B]">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="group w-full bg-[#3D3522] text-[#FDFBF0] py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#A35D2B] transition-all shadow-xl active:scale-[0.98]"
                >
                  Confirm Order
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex justify-center w-full mt-6">
                  <button 
                    onClick={onClose} 
                    className="relative text-[#8B9B6A] font-black text-[10px] uppercase tracking-[0.2em] group flex items-center gap-2"
                  >
                    <Plus size={14} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>Add More Items</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A35D2B] transition-all duration-300 group-hover:w-full" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}