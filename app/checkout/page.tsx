"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Receipt, 
  Search,
  ShoppingBag,
  ArrowRight,
  History,
  Trash2 // Added for deletion
} from "lucide-react";
import Link from "next/link";

interface PastOrder {
  id: string;
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Cancelled";
  items: { name: string; qty: number; price: number }[];
  address: string;
}

export default function CheckoutHub() {
  const [tab, setTab] = useState<"history" | "active">("history");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [history, setHistory] = useState<PastOrder[]>([]);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedHistory = localStorage.getItem("dum_pot_history");
    const savedActive = localStorage.getItem("dum_pot_order");
    const savedItems = localStorage.getItem("dum_pot_cart_items");

    if (savedHistory) setHistory(JSON.parse(savedHistory));
    
    if (savedActive && savedItems) {
      setActiveOrder({
        ...JSON.parse(savedActive),
        items: JSON.parse(savedItems)
      });
    }
  }, []);

  // --- Deletion Logic ---
  const deleteOrder = (id: string) => {
    const updatedHistory = history.filter(order => order.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("dum_pot_history", JSON.stringify(updatedHistory));
    if (expandedOrder === id) setExpandedOrder(null);
  };

  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire order history?")) {
      setHistory([]);
      localStorage.removeItem("dum_pot_history");
    }
  };

  const filteredHistory = history.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered": return <CheckCircle2 size={16} className="text-green-500" />;
      case "Processing": return <Clock size={16} className="text-[#FF9933]" />;
      default: return <Truck size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf5] text-[#3D3522] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
              >
                Order <span className="text-[#FF9933]">{tab === 'history' ? 'Archive' : 'Status'}</span>
              </motion.h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                {tab === 'history' ? 'Your past culinary journeys' : 'Real-time tracking for your current feast'}
              </p>
            </div>

            {/* Clear All Button */}
            {tab === "history" && history.length > 0 && (
              <button 
                onClick={clearAllHistory}
                className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-red-500 transition-all flex items-center gap-2 mb-2"
              >
                <Trash2 size={12} /> Clear Archive
              </button>
            )}
          </div>

          {/* TAB TOGGLE */}
          <div className="flex bg-[#3D3522]/5 p-1 rounded-2xl w-fit border border-[#3D3522]/10">
            <button 
              onClick={() => setTab("history")}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${tab === 'history' ? 'bg-[#3D3522] text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
            >
              <History size={14} /> History
            </button>
            <button 
              onClick={() => setTab("active")}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${tab === 'active' ? 'bg-[#3D3522] text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
            >
              <Truck size={14} /> {activeOrder?.isOrdered ? 'Active Order' : 'Current Cart'}
            </button>
          </div>
        </div>

        {tab === "history" ? (
          <div className="space-y-6">
            {/* SEARCH BAR */}
            <div className="relative group mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH BY ORDER ID OR LOCATION..."
                className="bg-white border-2 border-[#3D3522]/5 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#FF9933] transition-all w-full shadow-sm"
              />
            </div>

            {filteredHistory.length > 0 ? (
              filteredHistory.map((order, index) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white border-2 border-[#3D3522]/5 rounded-[2rem] overflow-hidden transition-all duration-500 ${expandedOrder === order.id ? 'shadow-2xl border-[#3D3522]/10' : 'shadow-sm hover:shadow-md'}`}
                >
                  {/* ORDER CARD HEADER */}
                  <div 
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="p-6 md:p-8 cursor-pointer flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-[#F5F5DC] border-2 border-[#3D3522]/10 text-[#3D3522] rounded-2xl flex items-center justify-center">
                        <Package size={24} />
                      </div>
                      <div>
                        <h3 className="font-black text-lg uppercase tracking-tight">{order.id}</h3>
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{order.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Total Amount</p>
                        <p className="font-black">৳{order.total.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-[#F5F5DC] px-4 py-2 rounded-full border border-[#3D3522]/5">
                        {getStatusIcon(order.status)}
                        <span className="text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                      </div>
                      <motion.div animate={{ rotate: expandedOrder === order.id ? 180 : 0 }} className="opacity-20">
                        <ChevronDown />
                      </motion.div>
                    </div>
                  </div>

                  {/* EXPANDED DETAILS */}
                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t-2 border-dashed border-[#3D3522]/5 bg-[#fffdfa]"
                      >
                        <div className="p-8 space-y-8">
                          <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase opacity-30 tracking-widest flex items-center gap-2">
                              <Receipt size={12} /> Itemized Receipt
                            </p>
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                  <span className="w-8 h-8 rounded-lg bg-[#3D3522] flex items-center justify-center text-[10px] font-black text-[#FF9933]">
                                    {item.qty}x
                                  </span>
                                  <span className="font-bold text-sm uppercase tracking-tight">{item.name}</span>
                                </div>
                                <span className="font-bold text-sm opacity-60">৳{(item.price * item.qty).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>

                          <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-[#3D3522]/10">
                            <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">Destination</p>
                              <p className="text-sm font-bold leading-relaxed opacity-70">{order.address}</p>
                            </div>
                            <div className="flex items-center gap-3">
                               <button className="flex-[3] py-4 bg-[#3D3522] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#FF9933] transition-all flex items-center justify-center gap-2">
                                 Order Again <ArrowRight size={14} />
                               </button>
                               {/* Individual Delete Button */}
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   deleteOrder(order.id);
                                 }}
                                 className="flex-1 py-4 border-2 border-[#3D3522]/10 text-[#3D3522]/30 hover:text-red-500 hover:border-red-500/20 rounded-2xl transition-all flex items-center justify-center"
                                 title="Delete from history"
                               >
                                 <Trash2 size={16} />
                               </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 opacity-30">
                <Package size={48} className="mx-auto mb-4" />
                <p className="font-black uppercase text-xs tracking-[0.2em]">No records found</p>
              </div>
            )}
          </div>
        ) : (
          /* ACTIVE ORDER / CART VIEW ... (rest of your existing code remains the same) */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-20 border-4 border-dashed border-[#3D3522]/10 rounded-[3rem] bg-white/50"
          >
            {activeOrder?.isOrdered ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto text-[#4CAF50]">
                   <Truck size={40} className="animate-bounce" />
                </div>
                <h2 className="text-2xl font-black uppercase">Order in Progress</h2>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest max-w-xs mx-auto">
                  Your Dum Pot is currently being prepared and delivered to {activeOrder.address}.
                </p>
                <div className="pt-6">
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('openCart'))}
                    className="px-10 py-4 bg-[#3D3522] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#FF9933] transition-all"
                  >
                    Track Live Progress
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-[#3D3522]/5 rounded-full flex items-center justify-center mx-auto text-[#3D3522]/20">
                   <ShoppingBag size={40} />
                </div>
                <h2 className="text-2xl font-black uppercase">No Active Order</h2>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-2">The kitchen is waiting for your command.</p>
                <Link href="/menu">
                  <button className="mt-8 px-10 py-4 bg-[#FF9933] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                    Fill the Pot <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}