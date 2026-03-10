import React from "react";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3D3522] text-[#FDFBF0] pt-20 pb-10 px-6 lg:px-20 relative overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url('/images/hero-banner.jpg')`, backgroundSize: '400px' }} 
      />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/images/header-logo.png" className="w-full h-full object-contain p-1" alt="Logo" />
               </div>
               <h2 className="text-3xl font-serif font-black tracking-tighter">
                 DUM<span className="text-[#FF9933]">POT.</span>
               </h2>
            </div>
            <p className="text-[#FDFBF0]/60 leading-relaxed text-sm">
              Bringing the royal heritage of slow-cooked Dum biryani to the modern table. 
              Taste the history in every grain, crafted with tradition.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#FDFBF0]/20 flex items-center justify-center hover:bg-[#FF9933] hover:border-[#FF9933] transition-all group">
                  <Icon size={18} className="group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#FF9933] mb-6 text-xs">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-[#FF9933] transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:text-[#FF9933] transition-colors">The Menu</Link></li>
              <li><Link href="/about" className="hover:text-[#FF9933] transition-colors">About Us</Link></li>
              <li><Link href="/branches" className="hover:text-[#FF9933] transition-colors">Our Branches</Link></li>
              <li><Link href="/contact" className="hover:text-[#FF9933] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#FF9933] mb-6 text-xs">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#FF9933]" /> 
                +880 17XX-XXXXXX
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#FF9933]" /> 
                hello@dumpot.com
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FF9933] shrink-0" /> 
                Banani, Dhaka & <br />Greater Rajshahi, BD
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#FF9933] mb-6 text-xs">Newsletter</h4>
            <p className="text-xs text-[#FDFBF0]/60 mb-4">Join the inner circle for secret recipes and event invites.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#FDFBF0]/5 border border-[#FDFBF0]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF9933] w-full transition-all"
              />
              <button className="bg-[#FF9933] hover:bg-white hover:text-[#3D3522] px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#FF9933]/10">
                Join Now <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-[#FDFBF0]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDFBF0]/40">
          <p>© 2026 THE DUM POT CATERING CO.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-[#FF9933] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#FF9933] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}