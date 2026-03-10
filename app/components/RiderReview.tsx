"use client";

import { useState } from "react";
import { Star, MessageSquare, ShieldCheck, AlertCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewProps {
  riderName: string;
  onSave: (data: { stars: number; text: string } | null) => void;
}

export default function RiderReview({ riderName, onSave }: ReviewProps) {
  const [stars, setStars] = useState(5); 
  const [visualStars, setVisualStars] = useState(5); 
  const [reviewText, setReviewText] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleSave = () => {
    if (visualStars < 5) {
      setVisualStars(5);
      setStars(5);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    } else {
      setStars(visualStars);
    }
    
    setIsEditing(false);
    onSave({ stars: 5, text: reviewText });
  };

  if (isDeleted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-[#800000] rounded-2xl p-5 shadow-[6px_6px_0px_#800000] space-y-4 relative overflow-hidden"
    >
      <div className="flex items-center justify-between border-b-2 border-[#800000]/10 pb-3">
        <h3 className="text-xs font-black text-[#800000] uppercase tracking-tighter flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#d97706]" />
          Dum Pot Authenticity Check
        </h3>
        
        <button 
          onClick={() => setIsDeleted(true)}
          className="opacity-[0.08] hover:opacity-100 transition-opacity absolute top-1 right-1 p-1"
        >
          <Trash2 size={8} className="text-[#800000]" />
        </button>
      </div>

      <div className="text-center space-y-1">
        <p className="text-[10px] font-bold text-[#800000]/60 uppercase">Delivery Partner: {riderName}</p>
        <h2 className="text-sm font-black text-[#800000]">Was your food delivered with love?</h2>
      </div>

      <div className="flex justify-center gap-2 py-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            disabled={!isEditing}
            onClick={() => setVisualStars(s)}
            className={`transition-transform ${isEditing ? 'active:scale-90 hover:scale-110' : 'cursor-default'}`}
          >
            <Star 
              size={28} 
              className={`transition-colors duration-300 ${
                s <= visualStars 
                ? 'fill-[#f59e0b] text-[#f59e0b]' 
                : 'text-[#800000]/10'
              }`} 
            />
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {isEditing ? (
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tell us about the aroma, the heat, the speed..."
            className="w-full bg-[#fffcf5] border-2 border-[#800000] rounded-xl p-3 text-[11px] font-bold focus:outline-none min-h-[80px] placeholder:text-[#800000]/30"
          />
        ) : (
          <div className="w-full bg-[#fdf2f2] border-2 border-[#800000]/10 rounded-xl p-3">
            <p className="text-[11px] font-bold text-[#800000] italic">"{reviewText || "Aromatic and fast!"}"</p>
          </div>
        )}
      </div>

      <div className="pt-2">
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="w-full bg-[#800000] text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-[0_4px_0_#4a0000] active:translate-y-1 transition-all"
        >
          {isEditing ? "Seal the Review" : "Adjust Feedback"}
        </button>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-2 px-5 pointer-events-none"
          >
            <div className="bg-[#b91c1c] text-white text-[9px] font-black uppercase p-2 rounded-lg flex items-center justify-center gap-2 shadow-lg">
              <AlertCircle size={10} />
              Spiciness Overload: Rating held at 5 stars for morale
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}