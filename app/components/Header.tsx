"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${
      isScrolled ? "top-0 px-0" : "top-6 px-6"
    }`}>
      <div className={`container mx-auto relative transition-all duration-500 ${
        isScrolled ? "max-w-full" : "max-w-6xl"
      }`}>
        
        {/* --- MAIN NAVIGATION BAR --- */}
        <div className={`
          flex items-center justify-between transition-all duration-500 ease-in-out
          bg-[#3D3522] shadow-2xl
          ${isScrolled 
            ? "px-10 lg:px-20 py-4 rounded-none border-b border-white/10" // Balanced height (py-4)
            : "px-8 py-3 rounded-full"} // Your original sleek height
        `}>
          
          {/* LEFT SECTION */}
          <div className="flex items-center gap-8 flex-1">
            <AnimatePresence mode="wait">
              {isScrolled ? (
                <motion.div 
                  key="scrolled-logo"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20">
                    <img src="/images/header-logo.png" className="w-full h-full object-contain p-1" alt="D" />
                  </div>
                  <span className="text-xl font-serif font-black tracking-tighter text-white">
                    DUM<span className="text-[#A35D2B]">POT.</span>
                  </span>
                </motion.div>
              ) : (
                <motion.div 
                  key="top-links"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden md:flex items-center gap-8"
                >
                  {["Home", "About", "Contact"].map((item) => (
                    <a key={item} href="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FDFBF0]/80 hover:text-white transition-colors">
                      {item}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            {!isScrolled && (
              <div className="md:hidden text-[#FDFBF0]">
                <Menu size={20} />
              </div>
            )}
          </div>

          {/* CENTER SPACER */}
          {!isScrolled && <div className="w-24 hidden md:block" />}

          {/* RIGHT SECTION */}
          <div className="flex items-center justify-end gap-6 md:gap-8 flex-1">
            <div className="hidden md:flex items-center gap-8">
               {["Menu", "Branches"].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FDFBF0]/80 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            
            <button className={`
              bg-[#A35D2B] text-[#FDFBF0] rounded-full font-black uppercase tracking-widest hover:bg-[#8B9B6A] transition-all flex items-center gap-2 shadow-lg active:scale-95
              ${isScrolled ? 'px-6 py-2.5 text-[11px]' : 'px-5 py-2 text-[10px]'}
            `}>
              <span className="hidden sm:inline">Checkout</span>
              <ShoppingBag size={14} />
            </button>
          </div>
        </div>

        {/* --- THE CENTRAL LOGO --- */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div 
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] pointer-events-none"
            >
              <div className="relative group pointer-events-auto">
                <div className="absolute inset-0 bg-[#3D3522] rounded-full scale-125 shadow-lg group-hover:bg-[#A35D2B] transition-colors duration-500" />
                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-1 border-4 border-[#3D3522] flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-inner">
                  <img src="/images/header-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}