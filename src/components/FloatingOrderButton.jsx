import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingOrderButton({ cartCount, cartTotal, onOpenCart }) {
  if (cartCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-3 sm:inset-x-auto sm:right-6 z-40 sm:w-auto"
      >
        <button
          onClick={onOpenCart}
          className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-[#E5A855] hover:bg-[#FAF6EC] text-[#170804] font-black text-sm shadow-[0_12px_36px_rgba(0,0,0,0.8)] border border-white/25 flex items-center justify-between sm:gap-6 cursor-pointer active:scale-95 transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-[#170804] text-[#E5A855] font-black flex items-center justify-center text-xs shadow-inner">
              {cartCount}
            </span>
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-wider text-[#170804]/75 font-bold leading-tight">Order Bag</span>
              <span className="text-xs sm:text-sm font-black">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-black text-sm sm:text-base pl-4 border-l border-[#170804]/20">
            <span>₹{cartTotal}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
