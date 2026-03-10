"use client";

import React, { useState } from "react"; // Added useState
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  // 1. Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  // 2. Handle Logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    // Success Logic (You can add your API call here)
    setStatus("success");
    console.log("Form Sent:", formData);

    // Reset after 3 seconds
    setTimeout(() => {
      setStatus("idle");
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fffdf5] text-[#3D3522] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Get in <span className="text-[#FF9933]">Touch</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest opacity-60">
            For catering, feedback, or just to say "Swayam!"
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* CORPORATE INFO SIDEBAR */}
          <div className="space-y-8">
            <div className="bg-white border-2 border-[#8B4513]/10 p-8 rounded-3xl shadow-sm">
              <h3 className="font-black uppercase text-xs tracking-widest mb-6 text-[#FF9933]">Contact Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F5F5DC] rounded-xl flex items-center justify-center text-[#8B4513]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-40">Headquarters</p>
                    <p className="text-sm font-bold">Saheb Bazar, Rajshahi, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F5F5DC] rounded-xl flex items-center justify-center text-[#8B4513]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-40">Phone</p>
                    <p className="text-sm font-bold">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F5F5DC] rounded-xl flex items-center justify-center text-[#8B4513]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-40">Email</p>
                    <p className="text-sm font-bold">hello@thedumpot.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#3D3522] text-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-[#FF9933]" />
                <h3 className="font-black uppercase text-xs tracking-widest">Service Hours</h3>
              </div>
              <div className="space-y-2 text-xs font-medium opacity-80">
                <div className="flex justify-between"><span>Sun - Thu:</span> <span>11:00 AM - 11:00 PM</span></div>
                <div className="flex justify-between"><span>Fri - Sat:</span> <span>11:00 AM - 12:00 AM</span></div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border-2 border-[#8B4513]/10 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF9933]" />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className={`w-full bg-[#F9F9F9] rounded-xl p-4 text-sm font-bold transition-all outline-none border-2 ${status === 'error' && !formData.name ? 'border-red-400' : 'border-transparent focus:border-[#FF9933]'}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className={`w-full bg-[#F9F9F9] rounded-xl p-4 text-sm font-bold transition-all outline-none border-2 ${status === 'error' && !formData.email ? 'border-red-400' : 'border-transparent focus:border-[#FF9933]'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-[#F9F9F9] border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#FF9933] transition-all outline-none appearance-none"
                  >
                    <option>General Inquiry</option>
                    <option>Catering Request</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Your Message</label>
                  <textarea 
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us what's on your mind..."
                    className={`w-full bg-[#F9F9F9] rounded-xl p-4 text-sm font-bold transition-all outline-none resize-none border-2 ${status === 'error' && !formData.message ? 'border-red-400' : 'border-transparent focus:border-[#FF9933]'}`}
                  />
                </div>

                {/* Status Messages */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                    <AlertCircle size={14} /> Please fill in all required fields
                  </div>
                )}

                <button 
                  type="submit"
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${
                    status === 'success' ? 'bg-green-500 text-white' : 'bg-[#3D3522] text-white hover:bg-[#A35D2B]'
                  }`}
                >
                  {status === 'success' ? (
                    <>Sent Successfully! <CheckCircle size={16} /></>
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* REDIRECT CTA */}
        <div className="mt-20 text-center">
          <Link href="/">
            <button className="px-10 py-5 bg-[#FF9933] text-white rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-[0_8px_20px_rgba(255,153,51,0.3)] hover:scale-105 active:scale-95 transition-all">
              Back to Order Your Feast
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}