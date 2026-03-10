import React from "react";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3D3522] text-[#FDFBF0] pt-20 pb-10 px-6 lg:px-20 relative overflow-hidden">
      {/* Subtle Pattern Overlay for the Footer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url('/images/hero-banner.jpg')`, backgroundSize: '400px' }} 
      />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-black">DUMPOT.</h2>
            <p className="text-[#FDFBF0]/60 leading-relaxed text-sm">
              Bringing the royal heritage of slow-cooked Dum biryani to the modern corporate table. 
              Taste the history in every grain.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#FDFBF0]/20 flex items-center justify-center hover:bg-[#A35D2B] hover:border-[#A35D2B] transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#8B9B6A] mb-6 text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#A35D2B] transition-colors">Daily Menu</a></li>
              <li><a href="#" className="hover:text-[#A35D2B] transition-colors">Corporate Plans</a></li>
              <li><a href="#" className="hover:text-[#A35D2B] transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="hover:text-[#A35D2B] transition-colors">Our Chefs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#8B9B6A] mb-6 text-xs">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone size={16} className="text-[#A35D2B]" /> +1 (555) 234-5678</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-[#A35D2B]" /> hello@dumpot.com</li>
              <li className="flex items-start gap-3"><MapPin size={16} className="text-[#A35D2B] shrink-0" /> 123 Spice Route Ave, <br />Culinary District, NY</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#8B9B6A] mb-6 text-xs">Newsletter</h4>
            <p className="text-xs text-[#FDFBF0]/60 mb-4">Join the inner circle for secret recipes and event invites.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#FDFBF0]/10 border border-[#FDFBF0]/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#A35D2B] w-full"
              />
              <button className="bg-[#A35D2B] px-4 py-2 rounded-lg font-bold text-sm">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-[#FDFBF0]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDFBF0]/40">
          <p>© 2026 THE DUM POT CATERING CO.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#FDFBF0] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FDFBF0] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}