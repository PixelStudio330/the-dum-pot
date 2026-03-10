"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Plus, ChevronRight } from "lucide-react";
import Cart from "./components/Cart";

// 1. DATA DEFINITION (Updated to Taka prices)
const MENU_ITEMS = [
  {
    id: 1,
    name: "Classic Mutton Dum",
    desc: "Premium goat meat slow-cooked for 8 hours with 21 heritage spices and long-grain Basmati.",
    price: 1250, 
    tag: "Bestseller",
    image: "/images/mutton-dum.png",
    calories: "850 kcal"
  },
  {
    id: 2,
    name: "Zaffron Chicken",
    desc: "Tender chicken infused with premium Persian saffron threads and aged rose water.",
    price: 950,
    tag: "New",
    image: "/images/saffron-chicken.png",
    calories: "720 kcal"
  },
  {
    id: 3,
    name: "Vegetable Tahari",
    desc: "Seasonal heritage vegetables layered with basmati and stone-ground spices.",
    price: 650,
    tag: "Vegan",
    image: "/images/tahiri.png",
    calories: "540 kcal"
  },
  {
    id: 4,
    name: "Garlic Butter Naan",
    desc: "Clay oven-baked flatbread brushed with roasted garlic and churned butter.",
    price: 180,
    tag: "Popular",
    image: "/images/naan.png",
    calories: "280 kcal"
  }
];

export default function Page() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (!hasOpenedOnce) {
      setIsCartOpen(true);
      setHasOpenedOnce(true);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <main className="relative min-h-screen bg-[#FDFBF0] text-[#3D3522] font-sans selection:bg-[#A35D2B] selection:text-white overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen min-h-[900px] w-full flex items-center overflow-hidden isolate">
        
        {/* HERO BACKGROUND */}
        <div 
          className="absolute inset-0 grayscale-[0.1]" 
          style={{ 
            backgroundImage: `url('/images/hero-banner2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -2,
            opacity: 0.88,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF0] via-[#FDFBF0]/40 to-transparent z-[-1]" />

        {/* --- SPIRAL END ELEMENT --- */}
        <div 
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20"
          style={{ transform: 'translateY(1px)' }}
        >
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-[calc(115%+1.3px)] h-[120px]"
            style={{ fill: '#FDFBF0' }}
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 lg:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 px-4 py-2 border border-[#8B9B6A]/30 rounded-full mb-8 bg-white/20 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#8B9B6A] animate-pulse" />
              <span className="text-[#8B9B6A] text-[10px] font-bold uppercase tracking-widest">Premium Culinary Experience • 2026</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-[8rem] font-serif font-black leading-[0.8] mb-10 tracking-tight">
              The <br /> 
              <span className="text-[#A35D2B] italic">Dum Pot.</span>
            </h1>
            
            <p className="max-w-md text-xl text-gray-800 leading-relaxed mb-12 font-medium">
              We don't just cook; we preserve heritage. Every pot is sealed with dough and slow-cooked in its own juices.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({behavior: 'smooth'})}
                className="px-12 py-5 bg-[#3D3522] text-[#FDFBF0] rounded-2xl font-bold flex items-center gap-4 hover:bg-[#A35D2B] transition-all shadow-2xl active:scale-95 group"
              >
                Explore Menu <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -30, 0] 
              }}
              transition={{ 
                opacity: { duration: 1.5 },
                scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative z-20"
            >
              <div className="relative w-full aspect-square max-w-[650px] mx-auto bg-white rounded-full p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[15px] border-[#FDFBF0]">
                 <img 
                    src="/images/hero-biryani.png" 
                    className="w-full h-full object-cover rounded-full" 
                    alt="Signature Dum Pot" 
                  /> 
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0], rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -left-5 top-1/4 bg-white/90 backdrop-blur-md p-6 rounded-[30px] shadow-xl z-30 flex items-center gap-4 border border-white"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <Star fill="currentColor" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Legacy Recipe</p>
                <p className="text-sm font-black">Authentic Dum</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-32 px-6 lg:px-20 relative bg-[#FDFBF0] z-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-6xl font-serif font-black italic tracking-tighter">The Selection.</h2>
              <p className="text-xl text-[#8B9B6A] font-semibold mt-4 mb-4">A minimalist menu focused on maximalist flavor profiles.</p>
            </div>
            <div className="flex gap-4">
              {['All', 'Meat', 'Vegan', 'Sides'].map((cat) => (
                <button key={cat} className="px-6 py-2 rounded-full border border-[#3D3522]/10 text-[10px] font-bold uppercase tracking-widest hover:bg-[#3D3522] hover:text-white transition-all">{cat}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-32">
            {MENU_ITEMS.map((item, i) => {
              const cartItem = cartItems.find((ci) => ci.id === item.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group relative bg-[#DCE3C9] rounded-[60px] p-10 pt-32 hover:bg-[#C2CCAA] transition-all duration-700 hover:-translate-y-4"
                >
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48">
                    <div className="w-full h-full bg-white rounded-full border-8 border-[#FDFBF0] shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <span className="bg-[#A35D2B] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        {item.tag}
                      </span>
                      <span className="text-[10px] text-[#8B9B6A] font-bold uppercase">{item.calories}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">{item.name}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-8 opacity-80">{item.desc}</p>

                    {/* --- DYNAMIC INTERACTION ZONE --- */}
                    <div className="flex items-center justify-between bg-[#FDFBF0]/60 p-2 rounded-[32px] min-h-[64px] border border-white/20 transition-all">
                      <span className="text-2xl font-black text-[#3D3522] ml-4">৳{item.price.toLocaleString()}</span>
                      
                      <div className="flex items-center">
                        <AnimatePresence mode="wait">
                          {quantity === 0 ? (
                            <motion.button
                              key="add"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              onClick={() => addToCart(item)}
                              className="bg-[#3D3522] text-white p-4 rounded-2xl hover:bg-[#A35D2B] transition-all shadow-xl active:scale-90"
                            >
                              <Plus size={24} strokeWidth={3} />
                            </motion.button>
                          ) : (
                            <motion.div
                              key="controls"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center gap-3 bg-[#3D3522] rounded-2xl p-1 shadow-xl"
                            >
                              <button
                                onClick={() => quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, -1)}
                                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-colors"
                              >
                                <span className="text-2xl font-bold leading-none">-</span>
                              </button>
                              
                              <span className="text-white font-black text-lg min-w-[20px]">{quantity}</span>
                              
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-colors"
                              >
                                <Plus size={18} strokeWidth={4} />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- FLOATING CART WIDGETS --- */}
      <div className="fixed bottom-10 right-10 z-[200] flex flex-col items-end gap-6">
        <AnimatePresence>
          {cartItems.length > 0 && !isCartOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="bg-white p-6 rounded-[40px] shadow-2xl border border-[#DCE3C9] min-w-[280px] cursor-pointer hover:shadow-3xl transition-all group"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black text-[#A35D2B] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A35D2B] animate-ping" />
                  Active Order (click to open cart)
                </p>
                <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
              </div>
              
              <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="font-bold text-[#3D3522]">{item.quantity}x {item.name}</span>
                    <span className="font-black text-[#A35D2B]">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-[#A35D2B] text-white p-6 rounded-[28px] shadow-2xl hover:scale-110 transition-transform relative group active:scale-95"
        >
          <ShoppingBag size={30} strokeWidth={2.5} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#3D3522] text-white text-[12px] w-8 h-8 flex items-center justify-center rounded-full border-4 border-[#FDFBF0] font-black group-hover:bg-black transition-colors">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </main>
  );
}