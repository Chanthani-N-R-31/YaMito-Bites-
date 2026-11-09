import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Minus, 
  Check, 
  ShoppingBag, 
  ChevronRight,
  Flame,
  Award,
  Heart,
  Layers,
  Coffee,
  Utensils
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';

export default function MenuPortfolio({ 
  cartItems = [], 
  onQuickAdd, 
  onRemoveFromCart, 
  onOpenModal,
  onOpenCart 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart quantity lookup map
  const cartQtyMap = useMemo(() => {
    const map = {};
    cartItems.forEach(item => {
      map[item.id] = (map[item.id] || 0) + item.quantity;
    });
    return map;
  }, [cartItems]);

  // Filtered items based on category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subName && item.subName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Group items by category to maintain exact physical menu order
  const groupedCategories = useMemo(() => {
    const list = selectedCategory === 'all' 
      ? MENU_CATEGORIES.filter(c => c.id !== 'all')
      : MENU_CATEGORIES.filter(c => c.id === selectedCategory);

    return list.map(cat => ({
      ...cat,
      items: filteredItems.filter(item => item.categoryId === cat.id)
    })).filter(group => group.items.length > 0);
  }, [selectedCategory, filteredItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <section id="menu" className="py-24 bg-[#1E0B05] text-[#FAF6EC] relative overflow-hidden border-t border-[#E5A855]/20">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#E5A855]/10 via-[#FAF6EC]/5 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2B1209] border border-[#E5A855]/30 text-[#E5A855] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete 18-Category Menu & Ordering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EC] tracking-tight">
            The YaMito <span className="text-[#E5A855]">Order Menu</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#FAF6EC]/75 font-normal leading-relaxed">
            Every single item crafted fresh from our physical menu. Click on any item or tap &ldquo;+ Add&rdquo; to build your order directly.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#E5A855] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search waffles, boba, sandwich, fries, shakes..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#2B1209]/90 border border-[#FAF6EC]/20 focus:border-[#E5A855] focus:outline-none text-base sm:text-sm text-[#FAF6EC] placeholder-[#FAF6EC]/40 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#FAF6EC]/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills (Horizontal scrollable) */}
        <div className="relative mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar snap-x">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`snap-start whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-[#E5A855] text-[#170804] shadow-lg shadow-[#E5A855]/20 font-bold scale-105'
                      : 'bg-[#2B1209] text-[#FAF6EC]/75 border border-[#FAF6EC]/10 hover:border-[#E5A855]/40 hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grouped Menu List following EXACT Menu Order */}
        <div className="space-y-14">
          {groupedCategories.map((group, groupIdx) => (
            <div key={group.id} className="space-y-5">
              
              {/* Category Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF6EC]/15">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E5A855]/20 border border-[#E5A855]/40 flex items-center justify-center text-[#E5A855] font-bold text-xs">
                    {groupIdx + 1 < 10 ? `0${groupIdx + 1}` : groupIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#FAF6EC] tracking-tight">
                      {group.name}
                    </h3>
                    <p className="text-xs text-[#FAF6EC]/60 font-medium">
                      {group.tagline}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#E5A855] font-semibold bg-[#2B1209] px-3 py-1 rounded-full border border-[#E5A855]/20 w-fit">
                  {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                </div>
              </div>

              {/* Items Grid for this Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {group.items.map((item) => {
                  const qty = cartQtyMap[item.id] || 0;
                  const hasOptions = item.options && item.options.length > 0;

                  return (
                    <div
                      key={item.id}
                      className="group rounded-2xl p-5 bg-gradient-to-br from-[#2D140B] via-[#240E06] to-[#1E0B05] border border-[#FAF6EC]/10 hover:border-[#E5A855]/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative"
                    >
                      {/* Top Row: Veg indicator & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          {/* Pure Veg Green Icon */}
                          <div className="w-4 h-4 rounded border border-emerald-500 flex items-center justify-center p-0.5" title="100% Pure Vegetarian">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                          {item.subName && (
                            <span className="text-[11px] font-medium text-[#FAF6EC]/60 tracking-wider">
                              {item.subName}
                            </span>
                          )}
                        </div>

                        {item.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E5A855]/20 text-[#E5A855] border border-[#E5A855]/30">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Item Title & Description */}
                      <div 
                        onClick={() => onOpenModal && onOpenModal(item)}
                        className="space-y-1.5 my-2 cursor-pointer"
                      >
                        <h4 className="text-base sm:text-lg font-bold text-[#FAF6EC] group-hover:text-[#E5A855] transition-colors flex items-center justify-between">
                          <span>{item.name}</span>
                          <span className="text-xs text-[#E5A855]/70 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">Details →</span>
                        </h4>
                        <p className="text-xs text-[#FAF6EC]/70 leading-relaxed font-normal line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Row: Price & Add-To-Cart Action */}
                      <div className="pt-3 border-t border-[#FAF6EC]/10 flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[11px] text-[#FAF6EC]/60 font-medium">Price</span>
                          <div className="text-lg font-black text-[#E5A855]">
                            ₹{item.price}
                          </div>
                        </div>

                        {/* Interactive Add / Counter Controls */}
                        {qty > 0 ? (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 bg-[#2B1209] border border-[#E5A855]/50 rounded-full px-2.5 py-1"
                          >
                            <button
                              type="button"
                              onClick={() => onRemoveFromCart && onRemoveFromCart(item.id)}
                              className="w-7 h-7 rounded-full bg-[#FAF6EC]/10 hover:bg-[#FAF6EC]/25 flex items-center justify-center text-[#FAF6EC] transition-all cursor-pointer"
                              title="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-black text-[#FAF6EC] min-w-[18px] text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onQuickAdd && onQuickAdd(item.id)}
                              className="w-7 h-7 rounded-full bg-[#E5A855] hover:bg-[#FAF6EC] flex items-center justify-center text-[#170804] transition-all cursor-pointer font-bold"
                              title="Add one more"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (hasOptions && onOpenModal) {
                                onOpenModal(item);
                              } else if (onQuickAdd) {
                                onQuickAdd(item.id);
                              }
                            }}
                            className="min-h-[38px] px-4 py-2 rounded-full bg-[#FAF6EC] hover:bg-[#E5A855] text-[#170804] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#170804]" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}

          {groupedCategories.length === 0 && (
            <div className="text-center py-16 bg-[#2B1209]/50 rounded-3xl border border-[#FAF6EC]/10">
              <p className="text-base text-[#FAF6EC]/70">No items match your search criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-3 px-5 py-2 rounded-full bg-[#E5A855] text-[#170804] text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

