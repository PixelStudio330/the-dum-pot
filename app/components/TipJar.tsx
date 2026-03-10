"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Heart, CheckCircle2 } from "lucide-react";

export function TipJar() {
  const [tip, setTip] = useState(20);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [isTipped, setIsTipped] = useState(false);

  const moveButton = () => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 80;
    setBtnPos({ x: randomX, y: randomY });
  };

  return (
    <div className="bg-[#fff9e6] border-2 border-[#f59e0b] rounded-2xl p-4 shadow-[4px_4px_0px_#f59e0b] space-y-4 relative overflow-hidden">
      {!isTipped ? (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black text-[#800000] uppercase flex items-center gap-2">
              <Utensils size={14} /> Buy Sagor a tea?
            </h4>
            <span className="text-xs font-black text-[#f59e0b]">৳ {tip}</span>
          </div>

          <div className="flex gap-2">
            {[20, 50, 80, 100].map((amt) => (
              <button
                key={amt}
                onClick={() => { setTip(amt); setBtnPos({ x: 0, y: 0 }); }}
                className={`flex-1 py-2 rounded-xl text-[10px] font-bold border-2 transition-all ${
                  tip === amt 
                    ? 'bg-[#f59e0b] text-white border-[#800000]' 
                    : 'bg-white border-[#800000]/10 text-[#800000]'
                }`}
              >
                ৳{amt}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setIsTipped(true)}
              className="w-full bg-[#16a34a] text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest border-2 border-[#800000] shadow-[0_4px_0_#14532d] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <Heart size={12} fill="white" /> Tip with Love
            </button>

            <div className="relative h-8 flex items-center justify-center">
              <motion.button
                animate={{ x: btnPos.x, y: btnPos.y }}
                onMouseEnter={moveButton}
                className="absolute text-[9px] font-black text-[#b91c1c]/60 uppercase underline decoration-1 underline-offset-4 cursor-pointer"
              >
                I am a miser (No Tip)
              </motion.button>
            </div>
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-4 flex flex-col items-center justify-center text-center space-y-2"
        >
          <div className="bg-[#16a34a] p-2 rounded-full text-white">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-[11px] font-black text-[#800000] uppercase">
            ৳{tip} added!
          </p>
          <p className="text-[10px] font-bold text-[#16a34a]">
            Sagor will deliver even faster now! 🌶️
          </p>
        </motion.div>
      )}
    </div>
  );
}