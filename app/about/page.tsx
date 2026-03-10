"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; // Added Variants type
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  MapPin, 
  History, 
  ChefHat, 
  Star,
  Coffee,
  ArrowRight,
  Sparkles
} from "lucide-react";

// --- ANIMATION VARIANTS (Fixed TS Error with 'as const') ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const // Fixed: Added 'as const'
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#fffdf5] text-[#3D3522] pb-20 selection:bg-[#FF9933] selection:text-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden border-b-[3px] border-[#8B4513] bg-[#F5F5DC]">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" 
        />
        
        <div className="text-center px-6 relative z-10">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="p-4 bg-white rounded-2xl shadow-xl border-2 border-[#8B4513]/10">
              <ChefHat size={40} className="text-[#FF9933]" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 text-[#3D3522]"
          >
            Behind the <br /> <span className="text-[#FF9933]">Dum Pot</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
            className="font-bold text-sm md:text-base uppercase tracking-[0.3em]"
          >
            Est. 2024 — Rajshahi, Bangladesh
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-20">
        
        {/* --- ENHANCED JOURNEY CARD (Corporate-Cool) --- */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative group bg-white border-[1px] border-[#3D3522]/10 rounded-[3rem] p-8 md:p-16 shadow-2xl mb-24 overflow-hidden"
        >
          {/* Background Tech/Grid Decor */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Image Section (lg:span 5) */}
            <div className="lg:col-span-5 relative">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-10 border-8 border-white"
              >
                <Image 
                  src="/images/biryani-about.jpg" 
                  alt="Biryani Craft" 
                  fill 
                  className="object-cover"
                />
              </motion.div>
              
              {/* Floating Decorative Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -bottom-6 bg-[#FF9933] text-white p-6 rounded-3xl shadow-xl z-20 hidden md:block"
              >
                <Sparkles size={24} className="mb-2" />
                <p className="font-black uppercase text-[10px] tracking-widest leading-tight">Authentic<br/>Dum Ritual</p>
              </motion.div>
            </div>

            {/* Text Section (lg:span 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#3D3522] rounded-full">
                <History size={14} className="text-[#FF9933]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Our Mastercraft Journey</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] text-[#3D3522]">
                Precision. <br />Patience. <br /><span className="text-[#FF9933]">Perfection.</span>
              </h2>
              
              <div className="space-y-6 text-base md:text-lg font-medium opacity-80 leading-relaxed max-w-xl">
                <p>
                  The Dum Pot is an intersection of ancient culinary heritage and modern operational excellence. We don't just cook; we engineer flavor.
                </p>
                <div className="h-px w-20 bg-[#FF9933]" />
                <p className="text-sm opacity-60">
                  Every handi is sealed with a precision-mixed flour dough, creating a natural pressure chamber that forces the essence of cloves and cardamom into the very heart of the long-grain Basmati.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- CORE VALUES (STAGGERED REVEAL) --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          {[
            { icon: Heart, title: "Ethical Sourcing", desc: "100% Traceable ingredients from verified Rajshahi spice cooperatives." },
            { icon: Users, title: "People First", desc: "Our chefs undergo a 6-month specialized Dum-certification process." },
            { icon: MapPin, title: "Locally Rooted", desc: "Expanding the flavors of North Bengal across the nation." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white border-[1px] border-[#3D3522]/10 p-10 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center group transition-all hover:shadow-xl"
            >
              <div className="mb-6 p-4 bg-[#F5F5DC] rounded-2xl group-hover:bg-[#FF9933] group-hover:text-white transition-all duration-300">
                <item.icon size={28} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-widest mb-4">{item.title}</h3>
              <p className="text-xs font-bold opacity-50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- CTA SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#3D3522] rounded-[4rem] overflow-hidden p-12 md:p-20 text-center"
        >
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Ready for the <br /><span className="text-[#FF9933]">Royal Experience?</span>
            </h2>
            <Link href="/" className="inline-block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-4 px-10 py-5 bg-[#FF9933] text-white rounded-full font-black uppercase text-sm tracking-widest shadow-2xl transition-all"
              >
                Order Your Feast
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}