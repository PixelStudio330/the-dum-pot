"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Trash2, Minus, Plus, X, CreditCard, 
  CheckCircle, MapPin, Clock, Loader2, 
  Search, User, Send, RefreshCcw, UtensilsCrossed, Flame,
  PlusCircle, Eraser
} from "lucide-react";
import dynamic from "next/dynamic";
import RiderReview from "./RiderReview"; 
import { TipJar } from "./TipJar";

const OrderTracker = dynamic(() => import("./OrderTracker"), { 
  ssr: false,
  loading: () => (
    <div className="h-48 w-full bg-[#fdfaf0] animate-pulse rounded-2xl flex flex-col items-center justify-center border-2 border-[#8B4513] border-dashed">
      <Loader2 className="animate-spin text-[#8B4513] mb-2" size={20} />
      <span className="text-[10px] font-bold text-[#8B4513] uppercase tracking-widest">Locating the Handi...</span>
    </div>
  )
}); 

export interface CartItem {
  _id: string | number;
  foodId: string | number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: any, delta: number) => void;
  onRemove: (id: any) => void;
  onClearCart: () => void; 
  total: number;
  isOrdered: boolean;
  setIsOrdered: (val: boolean) => void;
  setItems?: (items: CartItem[]) => void; 
}

function MemoReceipt({ items, total, orderId }: { items: CartItem[], total: number, orderId: string }) {
  const deliveryFee = 60;
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full bg-[#FCF9F2] border-x-2 border-t-2 border-[#8B4513] pt-8 px-6 pb-10 shadow-[6px_6px_0px_rgba(139,69,19,0.1)] overflow-hidden"
    >
      <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-6 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#fdfaf0] border-2 border-[#8B4513]" />
        ))}
      </div>
      <div className="text-center mb-6">
        <h3 className="font-black text-[#8B4513] text-sm uppercase tracking-[0.3em]">The Dum Pot</h3>
        <p className="text-[9px] font-bold text-[#FF9933] uppercase tracking-[0.2em]">Authentic Biryani Memo</p>
      </div>
      <div className="flex justify-between text-[9px] font-mono font-bold text-[#8B4513]/60 mb-6 border-b border-dashed border-[#8B4513]/30 pb-2">
        <span>ID: {orderId}</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <div className="space-y-4 mb-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start text-[#8B4513]">
            <div className="flex flex-col max-w-[70%]">
              <span className="font-black text-[11px] uppercase leading-tight">{item.name}</span>
              <span className="font-mono text-[9px] opacity-70">QTY: {item.qty} x ৳{item.price}</span>
            </div>
            <span className="font-mono font-black text-xs">৳{(item.qty * item.price).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1.5 border-t-2 border-dashed border-[#8B4513]/20 pt-4">
        <div className="flex justify-between text-[9px] font-bold text-[#8B4513]/50 uppercase">
          <span>Subtotal</span>
          <span>৳{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[9px] font-bold text-[#8B4513]/50 uppercase">
          <span>Delivery</span>
          <span>৳{deliveryFee}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="font-black text-xs text-[#8B4513] uppercase tracking-tighter">Total Payable</span>
          <span className="text-lg font-black text-[#FF9933]">৳{(total + deliveryFee).toLocaleString()}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-[-2px] right-[-2px] translate-y-[1px]">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-4 fill-[#fffdf5] stroke-[#8B4513] stroke-[0.5]">
          <path d="M0 0 L5 8 L10 0 L15 8 L20 0 L25 8 L30 0 L35 8 L40 0 L45 8 L50 0 L55 8 L60 0 L65 8 L70 0 L75 8 L80 0 L85 8 L90 0 L95 8 L100 0 V10 H0 Z" />
        </svg>
      </div>
    </motion.div>
  );
}

function RiderChat({ progress, total }: { progress: number; total: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: 'rider' | 'user', text: string}[]>([
    { role: 'rider', text: "Assalamu Alaikum! Your Dum Pot order is secured. I'm on my way! 🛵" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasAskedForTip, setHasAskedForTip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progress >= 100 && !hasAskedForTip) {
      setHasAskedForTip(true);
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, { role: 'rider', text: "I've arrived! Hope the biryani is steaming hot. If you liked the service, a small tip would be amazing! 🍚🔥" }]);
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [progress, hasAskedForTip]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/rider-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, riderName: "Sagor", progress: Math.floor(progress), total: total + 60 }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'rider', text: data.text || "I'm focusing on the road, talk soon! 🛵" }]);
    } catch {
      setMessages(prev => [...prev, { role: 'rider', text: "Signal is weak, but I'm moving fast! 🛵" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white border-2 border-[#8B4513] rounded-2xl shadow-[4px_4px_0px_#8B4513] overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b-2 border-[#8B4513]/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#FF9933]/10 rounded-full border-2 border-[#8B4513] flex items-center justify-center">
             <User className="text-[#8B4513]" size={20} />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-[#8B4513] uppercase">Sagor (Captain)</h4>
            <p className={`text-[9px] font-bold flex items-center gap-1 ${progress >= 100 ? 'text-[#4CAF50]' : 'text-[#FF9933]'}`}>
              <span className={progress < 100 ? "animate-pulse" : ""}>●</span> 
              {progress < 100 ? 'En route' : 'At your doorstep'}
            </p>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className={`p-2 border-2 border-[#8B4513] rounded-xl transition-all ${isOpen ? 'bg-[#8B4513] text-white' : 'bg-[#F5F5DC] text-[#8B4513]'}`}>
          <Flame size={14} fill={isOpen ? "white" : "transparent"} />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 280 }} exit={{ height: 0 }} className="flex flex-col bg-[#F5F5DC]">
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2 rounded-xl text-[10px] font-bold ${m.role === 'user' ? 'bg-[#8B4513] text-white rounded-tr-none' : 'bg-white border border-[#8B4513]/20 text-[#8B4513] rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] font-bold text-[#8B4513]/40 animate-pulse">Sagor is typing...</div>}
            </div>
            <div className="p-3 border-t-2 border-[#8B4513]/10 flex gap-2 bg-white">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Message Sagor..." className="flex-grow bg-[#F5F5DC] border-2 border-[#8B4513] rounded-lg px-3 py-1 text-[10px] font-bold focus:outline-none" />
              <button onClick={handleSend} className="p-2 bg-[#4CAF50] text-white rounded-lg border-2 border-[#8B4513] hover:brightness-110"><Send size={12} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LocationSearch({ onSelect, viewbox, disabled }: { onSelect: (addr: string, lat: number, lon: number) => void, viewbox: string, disabled?: boolean }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected || query.length < 3 || disabled) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=bd&viewbox=${viewbox}&bounded=1&limit=6&addressdetails=1`);
        const data = await res.json();
        if (!isSelected) {
          setSuggestions(data);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error("Geocoding failed", err);
      } finally {
        setLoading(false);
      }
    }, 500); 
    return () => clearTimeout(timer);
  }, [query, viewbox, isSelected, disabled]);

  return (
    <div className="relative space-y-2">
      <label className="text-[10px] font-black text-[#8B4513] uppercase ml-1">Delivery Destination</label>
      <div className="relative">
        <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSelected ? 'text-[#4CAF50]' : 'text-[#FF9933]'}`} size={16} />
        <input
          type="text"
          disabled={disabled}
          placeholder="Search location in Bangladesh..."
          value={query}
          onChange={(e) => { setIsSelected(false); setQuery(e.target.value); if(e.target.value === "") onSelect("",0,0); }}
          className={`w-full pl-10 pr-10 py-3 bg-[#F5F5DC] border-2 border-[#8B4513] rounded-xl text-xs font-bold focus:outline-none transition-all ${isSelected ? 'ring-2 ring-[#4CAF50]/20 border-[#4CAF50]' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {loading && <Loader2 className="animate-spin text-[#8B4513]/40" size={14} />}
            {query.length > 0 && !disabled && (
                <button onClick={() => {setQuery(""); setIsSelected(false); onSelect("",0,0);}} className="text-[#8B4513]/40 hover:text-[#8B4513]"><X size={14}/></button>
            )}
        </div>
      </div>
      <AnimatePresence>
        {showDropdown && !isSelected && suggestions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute z-[10001] w-full bg-white border-2 border-[#8B4513] rounded-2xl shadow-[8px_8px_0px_rgba(139,69,19,0.1)] mt-1 overflow-y-auto max-h-[200px]">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelect(s.display_name, parseFloat(s.lat), parseFloat(s.lon));
                  setQuery(s.display_name);
                  setIsSelected(true);
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-3 text-[10px] font-bold text-[#8B4513] hover:bg-[#F5F5DC] border-b border-[#8B4513]/10 last:border-0 flex items-start gap-2"
              >
                <Search size={12} className="shrink-0 text-[#FF9933] mt-0.5" />
                <span className="leading-tight">{s.display_name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Cart({ 
  isOpen, onClose, items, onUpdateQuantity, onRemove, onClearCart, total, isOrdered, setIsOrdered 
}: CartProps) {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [cancelTimer, setCancelTimer] = useState(120); 
  const [canCancel, setCanCancel] = useState(true);
  const [orderStartTime, setOrderStartTime] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const [tempQty, setTempQty] = useState<{ [key: string]: string }>({});

  const BD_BOUNDS = { viewbox: "88.01,20.34,92.67,26.63" };

  useEffect(() => {
    if (mounted && items.length > 0) {
      localStorage.setItem("dum_pot_cart_items", JSON.stringify(items));
    } else if (mounted && items.length === 0 && !isOrdered) {
        localStorage.removeItem("dum_pot_cart_items");
    }
  }, [items, mounted, isOrdered]);

  useEffect(() => {
    setMounted(true);
    const savedOrder = localStorage.getItem("dum_pot_order");
    if (savedOrder) {
      const data = JSON.parse(savedOrder);
      setAddress(data.address);
      setCoords(data.coords);
      setIsOrdered(data.isOrdered);
      setOrderStartTime(data.startTime);
      if (data.startTime && data.isOrdered) {
        const elapsedSeconds = (Date.now() - data.startTime) / 1000;
        setDeliveryProgress(Math.min(elapsedSeconds * 2.0, 100));
      }
    }
  }, [setIsOrdered]);

  useEffect(() => {
    if (isOrdered && mounted) {
      const orderData = { address, coords, isOrdered, startTime: orderStartTime || Date.now() };
      localStorage.setItem("dum_pot_order", JSON.stringify(orderData));
      if (!orderStartTime) setOrderStartTime(orderData.startTime);
    }
  }, [isOrdered, address, coords, orderStartTime, mounted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOrdered && cancelTimer > 0) {
      interval = setInterval(() => setCancelTimer((prev) => prev - 1), 1000);
    } else if (cancelTimer === 0) {
      setCanCancel(false);
    }
    return () => clearInterval(interval);
  }, [isOrdered, cancelTimer]);

  // NEW: Function to save order to history so CheckoutHub can see it
  const saveOrderToHistory = (startTime: number) => {
    const existingHistory = JSON.parse(localStorage.getItem("dum_pot_history") || "[]");
    
    const newOrderRecord = {
      id: `DP-${Math.floor(startTime / 100000)}`,
      date: new Date(startTime).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      total: total + 60, // Including delivery fee
      status: "Processing",
      items: items.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      address: address
    };

    const updatedHistory = [newOrderRecord, ...existingHistory];
    localStorage.setItem("dum_pot_history", JSON.stringify(updatedHistory));
    
    // Trigger storage event for same-tab updates
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("orderUpdated"));
  };

  const handleCheckout = () => {
    if (!coords || !address) return;
    const startTime = Date.now();
    setOrderStartTime(startTime);
    setIsOrdered(true);
    
    // Save to history when the order is placed
    saveOrderToHistory(startTime);
  };

  const handleResetEverything = () => {
    setIsOrdered(false);
    onClearCart();
    setAddress("");
    setCoords(null);
    setCancelTimer(120);
    setDeliveryProgress(0);
    setOrderStartTime(null);
    localStorage.removeItem("dum_pot_order");
    localStorage.removeItem("dum_pot_cart_items");
    onClose();
  };

  const deliveryTimeDisplay = useMemo(() => {
    if (!mounted) return "--:--";
    const timeToUse = orderStartTime || Date.now();
    const arrivalTime = new Date(timeToUse);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + 35);
    return arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [orderStartTime, mounted]);

  const handleManualQtyChange = (id: any, val: string, currentQty: number) => {
    setTempQty(prev => ({ ...prev, [id]: val }));
    if (val === "") return; 
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateQuantity(id, parsed - currentQty);
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => {
                if (!isOrdered) {
                    onClose();
                }
            }} 
            className={`fixed inset-0 bg-[#8B4513]/30 backdrop-blur-sm z-[9998] ${isOrdered ? 'cursor-default' : 'cursor-pointer'}`} 
          />

          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#fffdf5] shadow-[-10px_0_30px_rgba(139,69,19,0.1)] z-[9999] flex flex-col border-l-[3px] border-[#8B4513]"
          >
            {/* HEADER */}
            <div className={`p-6 border-b-[3px] border-[#8B4513] flex justify-between items-center transition-colors duration-500 ${isOrdered ? 'bg-[#4CAF50]' : 'bg-[#FF9933]'}`}>
              <div className="flex items-center gap-2 text-white">
                {isOrdered ? <CheckCircle size={24} /> : <UtensilsCrossed size={24} />}
                <h2 className="text-xl font-black uppercase tracking-tight">
                    {isOrdered ? (deliveryProgress >= 100 ? "Feast Time!" : "On the Way") : "Your Order"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {!isOrdered && items.length > 0 && (
                   <button onClick={onClearCart} title="Clear All" className="p-2 bg-white/10 hover:bg-white/30 rounded-full text-white transition-colors">
                     <Eraser size={20} />
                   </button>
                )}
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
              <AnimatePresence mode="wait">
                {!isOrdered ? (
                  <motion.div key="cart-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 opacity-20">
                            <ShoppingBag size={64} className="text-[#8B4513] mb-4" />
                            <p className="font-black uppercase text-xs tracking-widest">Pot is Empty</p>
                        </div>
                    ) : (
                        <>
                          {items.map((item) => (
                            <motion.div layout key={item._id} className="group relative flex gap-4 bg-white p-3 rounded-2xl border-2 border-[#8B4513] shadow-[4px_4px_0_#8B4513]">
                                <div className="relative h-16 w-16 flex-shrink-0">
                                  <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl border border-[#8B4513]/10" unoptimized />
                                </div>
                                <div className="flex flex-col justify-between py-1 flex-grow">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-black text-[#8B4513] text-xs uppercase">{item.name}</h3>
                                    <button onClick={() => onRemove(item._id)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center bg-[#F5F5DC] border border-[#8B4513]/20 rounded-lg overflow-hidden">
                                        <button onClick={() => onUpdateQuantity(item._id, -1)} className="p-1 text-[#8B4513] hover:bg-[#8B4513]/10">
                                            <Minus size={12} />
                                        </button>
                                        
                                        <input 
                                          type="number"
                                          min="1"
                                          value={tempQty[item._id] !== undefined ? tempQty[item._id] : item.qty}
                                          onChange={(e) => handleManualQtyChange(item._id, e.target.value, item.qty)}
                                          onFocus={() => setTempQty(prev => ({ ...prev, [item._id]: "" }))}
                                          onBlur={(e) => {
                                            const finalVal = parseInt(e.target.value);
                                            if (isNaN(finalVal) || finalVal < 1) {
                                              onUpdateQuantity(item._id, 1 - item.qty);
                                            }
                                            setTempQty(prev => {
                                              const newState = { ...prev };
                                              delete newState[item._id];
                                              return newState;
                                            });
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.currentTarget.blur();
                                            }
                                          }}
                                          className="w-10 text-center font-bold text-xs bg-transparent border-none focus:ring-1 focus:ring-[#FF9933] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />

                                        <button onClick={() => onUpdateQuantity(item._id, 1)} className="p-1 text-[#8B4513] hover:bg-[#8B4513]/10">
                                            <Plus size={12} />
                                        </button>
                                      </div>
                                      <span className="font-black text-[#8B4513] text-sm">৳ {(item.price * Math.max(item.qty, 1)).toLocaleString()}</span>
                                  </div>
                                </div>
                            </motion.div>
                          ))}
                          <button onClick={onClose} className="w-full py-4 border-2 border-dashed border-[#8B4513]/30 rounded-2xl flex items-center justify-center gap-2 text-[#8B4513]/50 font-black uppercase text-[10px] tracking-widest hover:bg-[#8B4513]/5 transition-all">
                            <PlusCircle size={16} /> Add More Items?
                          </button>
                        </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="tracking-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-10">
                    {coords && (
                      <OrderTracker 
                        address={address} destination={coords} 
                        onProgressUpdate={setDeliveryProgress} 
                        initialProgress={deliveryProgress} 
                      />
                    )}
                    <MemoReceipt items={items} total={total} orderId={`DP-${Math.floor((orderStartTime || Date.now()) / 100000)}`} />
                    <RiderChat progress={deliveryProgress} total={total} />
                    <div className="bg-white border-2 border-[#8B4513] rounded-2xl p-4 shadow-[4px_4px_0px_#8B4513] space-y-3">
                        <div className="flex items-start gap-3 text-[11px] font-black text-[#8B4513]">
                            <MapPin size={16} className="text-[#FF9933] shrink-0 mt-0.5" />
                            <p className="leading-relaxed">{address}</p>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-black text-[#8B4513]">
                            <Clock size={16} className="text-[#4CAF50] shrink-0" />
                            <p>{deliveryProgress >= 100 ? "Delivered Hot!" : `Expected Arrival: ${deliveryTimeDisplay}`}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {canCancel && deliveryProgress < 20 && (
                            <button onClick={handleResetEverything} className="w-full bg-white border-2 border-red-500 text-red-500 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-[0_4px_0_#ef4444] active:translate-y-1 transition-all">
                                Cancel Order ({Math.floor(cancelTimer / 60)}:{(cancelTimer % 60).toString().padStart(2, '0')})
                            </button>
                        )}

                        {deliveryProgress >= 100 ? (
                          <div className="space-y-4">
                            <TipJar />
                            <RiderReview riderName="Sagor" onSave={(data) => data && console.log("User Review:", data)} />
                            <button onClick={handleResetEverything} className="w-full bg-[#4CAF50] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-[0_4px_0_#2E7D32] active:translate-y-1 transition-all flex items-center justify-center gap-2">
                              <RefreshCcw size={16} /> Accept and Complete Order
                            </button>
                          </div>
                        ) : (
                          <button onClick={onClose} className="w-full bg-[#8B4513] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-[0_4px_0_#5D2E0C] active:translate-y-1 transition-all">
                            Close Tab
                          </button>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CHECKOUT FOOTER */}
            {items.length > 0 && !isOrdered && (
              <div className="p-6 bg-white border-t-[3px] border-[#8B4513] space-y-4">
                <LocationSearch disabled={isOrdered} viewbox={BD_BOUNDS.viewbox} onSelect={(addr, lat, lon) => { setAddress(addr); setCoords([lat, lon]); }} />
                <div className="flex justify-between items-end pt-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#8B4513]/40 uppercase tracking-tighter">Total Payable (COD)</span>
                        <span className="text-2xl font-black text-[#FF9933]">৳ {(total + 60).toLocaleString()}</span>
                    </div>
                </div>
                <button 
                    onClick={handleCheckout}
                    disabled={!coords || !address || isOrdered}
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
                        coords && address && !isOrdered
                        ? "bg-[#4CAF50] text-white shadow-[0_4px_0_#2E7D32] hover:brightness-110 active:translate-y-1" 
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  <motion.div className="flex items-center gap-2">
                    <CreditCard size={20} />
                    Seal the Dum
                  </motion.div>
                  {coords && address && !isOrdered && (
                      <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}