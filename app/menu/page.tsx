"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { 
  ShoppingBag, 
  Plus,
  ArrowRight,
  Lock 
} from "lucide-react";

// --- COMPONENT IMPORTS ---
import Cart, { CartItem } from "../components/Cart"; 

// --- TYPES & DATA ---
type MenuItem = {
  id: number;
  name: string;
  price: number;
  desc: string;
  tag?: "Spicy" | "Popular" | "Veg" | "Sweet";
  image: string;
};

const MENU_DATA: Record<string, MenuItem[]> = {
  Biryani: [
    { id: 1, name: "Royal Mutton Dum Biryani", price: 450, desc: "Aged Basmati, tender mutton, and our secret 12-spice blend.", tag: "Popular", image: "/images/mutton-biryani.jpg" },
    { id: 2, name: "Kacchi Biryani", price: 520, desc: "Traditional slow-cooked raw mutton with potatoes.", tag: "Spicy", image: "/images/kacchi.jpg" },
    { id: 3, name: "Special Chicken Dum Biryani", price: 380, desc: "Classic dum-cooked chicken with fragrant saffron rice.", tag: "Spicy", image: "/images/chicken-biryani.jpg" },
  ],
  Kebabs: [
    { id: 4, name: "Reshmi Kebab", price: 280, desc: "Melt-in-your-mouth chicken marinated in cream and cashew paste.", image: "/images/reshmi.jpg" },
    { id: 5, name: "Seekh Kebab (Beef)", price: 320, desc: "Minced beef skewers grilled over natural charcoal.", tag: "Spicy", image: "/images/seekh.jpg" },
  ],
  Sides: [
    { id: 6, name: "Borhani", price: 80, desc: "Traditional spiced yogurt drink with mint.", tag: "Popular", image: "/images/borhani.jpg" },
    { id: 7, name: "Roshogolla", price: 120, desc: "Soft, spongy cottage cheese balls.", tag: "Sweet", image: "/images/roshogolla.jpg" },
  ],
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("Biryani");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // --- REFINED SYNC LOGIC ---
  const syncData = useCallback(() => {
    try {
      const savedCartRaw = localStorage.getItem("dum_pot_cart_items");
      const savedOrderStatusRaw = localStorage.getItem("dum_pot_is_ordered");
      
      const parsedCart = savedCartRaw ? JSON.parse(savedCartRaw) : [];
      const parsedStatus = savedOrderStatusRaw === "true";

      setCartItems(current => 
        JSON.stringify(current) === JSON.stringify(parsedCart) ? current : parsedCart
      );

      setIsOrdered(current => current === parsedStatus ? current : parsedStatus);
    } catch (error) {
      console.error("Failed to sync storage:", error);
    }
  }, []);

  const updateOrderState = (val: boolean) => {
    localStorage.setItem("dum_pot_is_ordered", val.toString());
    setIsOrdered(val);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    syncData();
    window.addEventListener("storage", syncData);
    window.addEventListener("focus", syncData);
    return () => {
      window.removeEventListener("storage", syncData);
      window.removeEventListener("focus", syncData);
    };
  }, [syncData]);

  const handleAddToCart = (item: MenuItem) => {
    if (isOrdered) return;
    setCartItems(prev => {
      const existing = prev.find(i => i.foodId === item.id);
      const updated = existing 
        ? prev.map(i => i.foodId === item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { _id: `item-${item.id}-${Date.now()}`, foodId: item.id, name: item.name, price: item.price, qty: 1, image: item.image }];
      
      localStorage.setItem("dum_pot_cart_items", JSON.stringify(updated));
      return updated;
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    if (isOrdered) return;
    setCartItems(prev => {
      const updated = prev.map(item => item._id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item);
      localStorage.setItem("dum_pot_cart_items", JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    if (isOrdered) return;
    setCartItems(prev => {
      const updated = prev.filter(item => item._id !== id);
      localStorage.setItem("dum_pot_cart_items", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("dum_pot_cart_items");
  };

  return (
    <div className="relative min-h-screen bg-[#fffdf5] text-[#3D3522] pt-32 pb-20">
      
      {/* 1. ORDER BLOCKER OVERLAY (Z-index lowered to 40 so Header at Z-50 stays on top) */}
      <AnimatePresence>
        {isOrdered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[40] bg-[#fffdf5]/60 backdrop-blur-md flex items-center justify-center p-6 mt-24"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white border-4 border-[#3D3522] p-10 rounded-[3rem] shadow-2xl max-w-md text-center space-y-6"
            >
              <div className="w-20 h-20 bg-[#FF9933] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Lock size={40} className="text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Order in Progress!</h2>
                <p className="text-sm font-bold opacity-60 leading-relaxed">
                  Your feast is being prepared. Please manage your current order before adding more items.
                </p>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-full py-4 bg-[#3D3522] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF9933] transition-colors flex items-center justify-center gap-2"
              >
                View Current Order <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onClearCart={clearCart}
        total={cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)}
        isOrdered={isOrdered}
        setIsOrdered={updateOrderState} 
      />

      {/* Floating Cart Button (Z-index 45) */}
      <motion.div className="fixed right-6 bottom-6 z-[45]">
        <button 
          onClick={() => setIsCartOpen(true)}
          className={`p-5 rounded-3xl shadow-2xl flex items-center gap-4 transition-all ${
            isOrdered ? "bg-[#FF9933] text-white" : "bg-[#3D3522] text-white hover:bg-[#FF9933]"
          }`}
        >
          {isOrdered ? <Lock size={24} /> : <ShoppingBag size={24} />}
          <span className="font-black uppercase text-xs tracking-widest pr-2">
            {isOrdered ? "Track Order" : "View Feast"}
          </span>
        </button>
      </motion.div>

      {/* Main Content Area (Pointer events disabled when ordered) */}
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${isOrdered ? "blur-sm grayscale pointer-events-none" : ""}`}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              The <span className="text-[#FF9933]">Menu</span>
            </h1>
            <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-40">
              Handpicked. Slow-cooked. Delivered.
            </p>
          </div>
          
          <nav className="flex items-center gap-2 bg-white border border-[#3D3522]/10 p-2 rounded-2xl shadow-sm self-start">
            {Object.keys(MENU_DATA).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 text-xs font-black uppercase tracking-widest transition-colors ${
                  activeTab === tab ? "text-white" : "text-[#3D3522]/50 hover:text-[#3D3522]"
                }`}
              >
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-[#3D3522] rounded-xl z-0"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Menu Grid */}
        <motion.div 
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {MENU_DATA[activeTab].map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="group bg-white border border-[#3D3522]/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className="relative h-64 w-full overflow-hidden bg-[#F5F5DC]">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black uppercase leading-tight">{item.name}</h3>
                  <span className="text-[#FF9933] font-black text-lg">৳{item.price}</span>
                </div>
                <p className="text-sm font-medium opacity-50 line-clamp-2">{item.desc}</p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold opacity-30 uppercase">Local Favorite</span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#3D3522] text-white hover:bg-[#FF9933] transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}