import React from 'react';
import { Plus, Minus, SlidersHorizontal } from 'lucide-react';

export default function ItemCard({ item, inCartQuantity, onQuickAdd, onRemoveFromCart, onOpenModal }) {
  return (
    <div className="group relative rounded-2xl bg-gradient-to-br from-[#3A1A0E]/60 via-[#2B1209]/85 to-[#210D07]/95 border border-[#E5A855]/20 hover:border-[#E5A855]/50 p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between text-left">
      
      {/* Top Media & Tags */}
      <div>
        <div 
          onClick={() => onOpenModal(item)}
          className="relative h-44 w-full rounded-xl overflow-hidden mb-3.5 cursor-pointer bg-[#170804]"
        >
          <img 
            src={item.image} 
            alt={item.name} 
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#210D07]/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          
          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            <span className={`inline-block w-4 h-4 rounded-sm border ${
              item.isVeg 
                ? 'border-emerald-500 bg-[#210D07]/80 text-emerald-400' 
                : 'border-rose-500 bg-[#210D07]/80 text-rose-400'
            } flex items-center justify-center`}>
              <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            </span>

            {item.badge && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FAF6EC] bg-[#3A1A0E]/90 backdrop-blur-md border border-[#E5A855]/40 px-2 py-0.5 rounded-md">
                {item.badge}
              </span>
            )}
          </div>

          {/* Quick Customize preview pill */}
          <div className="absolute bottom-2.5 right-2.5 bg-[#210D07]/85 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-medium text-[#FAF6EC]/90 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border border-white/5">
            <SlidersHorizontal className="w-2.5 h-2.5 text-[#E5A855]" />
            <span>Customize</span>
          </div>
        </div>

        {/* Item Info */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onOpenModal(item)}
              className="font-bold text-base text-[#FAF6EC] group-hover:text-[#E5A855] transition-colors cursor-pointer line-clamp-1"
            >
              {item.name}
            </h3>
          </div>

          <p className="text-xs text-[#FAF6EC]/70 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Bottom Price & Add Controls */}
      <div className="pt-4 mt-3 border-t border-[#E5A855]/15 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-[#FAF6EC]/50 block -mb-0.5">Price</span>
          <span className="font-extrabold text-lg text-[#E5A855]">
            ₹{item.price}
          </span>
        </div>

        {inCartQuantity > 0 ? (
          <div className="flex items-center gap-2 bg-[#2B1209] border border-[#E5A855]/40 rounded-xl p-1">
            <button
              onClick={() => onRemoveFromCart(item.id)}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF6EC] flex items-center justify-center text-xs cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-black text-[#E5A855] text-xs px-1">
              {inCartQuantity}
            </span>
            <button
              onClick={() => onQuickAdd(item.id)}
              className="w-7 h-7 rounded-lg bg-[#FAF6EC] text-[#170804] font-black flex items-center justify-center text-xs cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onOpenModal(item)}
              className="p-2 rounded-xl text-xs font-semibold text-[#FAF6EC]/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Customize options"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onQuickAdd(item.id)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#FAF6EC] hover:bg-white text-[#170804] text-xs font-bold transition-all duration-200 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
