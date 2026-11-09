import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ItemModal({ item, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !item) return null;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [bobaSweetness, setBobaSweetness] = useState('75% Normal Sweet');
  const [bobaIce, setBobaIce] = useState('Regular Ice');

  const isBoba = item.category === 'bubble-tea' || item.categoryId === 'boba-drinks';

  const toggleOption = (opt) => {
    if (selectedOptions.includes(opt)) {
      setSelectedOptions(selectedOptions.filter(o => o !== opt));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  const handleAdd = () => {
    // Fire confetti effect
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E5A855', '#D49A5B', '#FAF3EB', '#10B981']
      });
    } catch (e) {}

    onAddToCart({
      ...item,
      selectedOptions,
      customizations: isBoba ? { sweetness: bobaSweetness, ice: bobaIce } : null
    }, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#210D07] border border-[#E5A855]/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-left"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2.5 rounded-full bg-black/70 text-[#FAF6EC]/80 hover:text-white hover:bg-black/90 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image & Header */}
          <div className="relative h-44 sm:h-60 w-full bg-[#170804] shrink-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#210D07] via-[#210D07]/40 to-transparent" />
            
            {/* Badges on image */}
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="inline-block w-3.5 h-3.5 rounded-sm border border-emerald-500 bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-[#FAF6EC]/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                100% Pure Veg
              </span>
              {item.badge && (
                <span className="text-xs font-bold text-[#FAF6EC] bg-[#3A1A0E]/90 border border-[#E5A855]/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.badge}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-4 flex-1 overflow-y-auto no-scrollbar">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-xl text-[#FAF6EC]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#FAF6EC]/60 mt-1">{item.calories || 'Made fresh to order'}</p>
              </div>
              <div className="font-extrabold text-2xl text-[#E5A855]">
                ₹{item.price}
              </div>
            </div>

            <p className="text-sm text-[#FAF6EC]/80 leading-relaxed font-normal">
              {item.description}
            </p>

            {/* Custom Options / Add-ons */}
            {item.options && item.options.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5A855] mb-2.5">
                  Customize & Add Extras
                </h4>
                <div className="space-y-2">
                  {item.options.map((opt) => {
                    const selected = selectedOptions.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleOption(opt)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          selected
                            ? 'bg-[#3A1A0E] border-[#E5A855] text-[#FAF6EC]'
                            : 'bg-[#2B1209] border-[#E5A855]/20 text-[#FAF6EC]/70 hover:bg-[#3A1A0E]'
                        }`}
                      >
                        <span>{opt}</span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          selected 
                            ? 'bg-[#E5A855] border-[#E5A855] text-[#170804]' 
                            : 'border-white/20'
                        }`}>
                          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Boba Sweetness & Ice Selectors */}
            {isBoba && (
              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5A855] mb-2">
                    Sweetness Level
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['50% Less Sweet', '75% Normal Sweet', '100% Extra Sweet'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setBobaSweetness(lvl)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          bobaSweetness === lvl
                            ? 'bg-[#FAF6EC] border-[#FAF6EC] text-[#170804]'
                            : 'bg-[#2B1209] border-[#E5A855]/20 text-[#FAF6EC]/60 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5A855] mb-2">
                    Ice Preference
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Regular Ice', 'Less Ice'].map((ice) => (
                      <button
                        key={ice}
                        type="button"
                        onClick={() => setBobaIce(ice)}
                        className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          bobaIce === ice
                            ? 'bg-[#FAF6EC] border-[#FAF6EC] text-[#170804]'
                            : 'bg-[#2B1209] border-[#E5A855]/20 text-[#FAF6EC]/60 hover:text-white'
                        }`}
                      >
                        {ice}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Controls: Quantity & Add Button */}
          <div className="p-4 sm:p-5 pb-[max(1rem,env(safe-area-inset-bottom))] bg-[#170804] border-t border-[#E5A855]/20 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 bg-[#2B1209] border border-[#E5A855]/25 p-1 rounded-xl">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-extrabold text-[#FAF6EC] text-base px-2">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 min-h-[44px] py-3 px-4 rounded-xl bg-[#FAF6EC] hover:bg-white text-[#170804] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
            >
              <span>Add to Bag • ₹{item.price * quantity}</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
