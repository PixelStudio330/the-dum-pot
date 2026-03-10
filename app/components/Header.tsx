"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react"; // Added X and ArrowRight
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New state for mobile menu

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMobileMenuOpen(false);
  };

  const leftLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const rightLinks = [
    { name: "Menu", href: "/menu" },
    { name: "Branches", href: "/branches" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled ? "top-0 px-0" : "top-6 px-6"
      }`}>
        <div className={`container mx-auto relative transition-all duration-500 ${
          isScrolled ? "max-w-full" : "max-w-6xl"
        }`}>
          
          {/* --- MAIN NAVIGATION BAR --- */}
          <div className={`
            flex items-center justify-between transition-all duration-500 ease-in-out
            bg-[#3D3522] shadow-2xl relative
            ${isScrolled 
              ? "px-10 lg:px-20 py-4 rounded-none border-b border-white/10" 
              : "px-8 py-3 rounded-full border border-white/5"} 
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
                  >
                    <Link href="/" onClick={scrollToTop} className="flex items-center gap-3 group">
                      <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 transition-transform group-hover:scale-110">
                        <img src="/images/header-logo.png" className="w-full h-full object-contain p-1" alt="Logo" />
                      </div>
                      <span className="text-xl font-serif font-black tracking-tighter text-white uppercase">
                        DUM<span className="text-[#FF9933]">POT.</span>
                      </span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="top-links-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden md:flex items-center gap-8"
                  >
                    {leftLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        href={link.href} 
                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FDFBF0]/80 hover:text-[#FF9933] transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* MOBILE HAMBURGER BUTTON */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-[#FDFBF0] hover:text-[#FF9933] transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* CENTER SECTION (Scrolled) */}
            {isScrolled && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden lg:flex items-center gap-8"
              >
                {allLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDFBF0]/60 hover:text-[#FF9933] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            )}

            {!isScrolled && <div className="w-24 hidden md:block" />}

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-end gap-6 md:gap-8 flex-1">
              <div className="hidden md:flex items-center gap-8">
                 {!isScrolled && rightLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FDFBF0]/80 hover:text-[#FF9933] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <Link href="/checkout">
                <button className={`
                  bg-[#FF9933] text-[#FDFBF0] rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-[#3D3522] transition-all flex items-center gap-2 shadow-lg active:scale-95
                  ${isScrolled ? 'px-6 py-2.5 text-[11px]' : 'px-5 py-2 text-[10px]'}
                `}>
                  <span className="hidden sm:inline">Checkout</span>
                  <ShoppingBag size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* CENTRAL LOGO (Floating) */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[110]"
              >
                <Link href="/" className="relative group block">
                  <div className="absolute inset-0 bg-[#3D3522] rounded-full scale-125 shadow-lg group-hover:bg-[#FF9933] transition-colors duration-500" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-1 border-4 border-[#3D3522] flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-inner">
                    <img src="/images/header-logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#3D3522] flex flex-col p-8"
          >
            {/* Close Button Header */}
            <div className="flex justify-between items-center mb-12">
              <span className="text-white font-serif font-black tracking-tighter text-xl">
                DUM<span className="text-[#FF9933]">POT.</span>
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-6">
              {allLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between text-4xl font-black uppercase text-[#FDFBF0] hover:text-[#FF9933] transition-colors"
                  >
                    {link.name}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer info in Menu */}
            <div className="mt-auto pt-10 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Bangladesh's Finest Dum Biryani</p>
              <Link href="/checkout" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-5 bg-[#FF9933] text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                  Start Your Order <ShoppingBag size={18} />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}