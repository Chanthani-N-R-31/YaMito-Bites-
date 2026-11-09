import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Minus, 
  Check, 
  ShoppingBag, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Award,
  Heart,
  Layers,
  Coffee,
  Utensils,
  BookOpen,
  SlidersHorizontal,
  X,
  ListFilter
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';

// 5 Master Super-Groups to group the 18 physical categories logically
const SUPER_GROUPS = [
  { 
    id: "all", 
    label: "All Menu", 
    icon: "🌟", 
    count: 84,
    categoryIds: [] 
  },
  { 
    id: "waffles", 
    label: "Belgian Waffles", 
    icon: "🧇", 
    count: 48,
    categoryIds: [
      "vintage-waffles", 
      "choco-rich", 
      "signature-cream", 
      "yamito-pops", 
      "chef-signature", 
      "choco-lovers", 
      "velvet-club", 
      "waffizza", 
      "waffle-dreams", 
      "waff-ice"
    ] 
  },
  { 
    id: "drinks", 
    label: "Boba & Drinks", 
    icon: "🧋", 
    count: 17,
    categoryIds: ["boba-drinks", "shakes", "mojitos"] 
  },
  { 
    id: "savory", 
    label: "Sandwiches & Fries", 
    icon: "🥪", 
    count: 9,
    categoryIds: ["sandwich", "fries"] 
  },
  { 
    id: "desserts", 
    label: "Ice Creams & Extras", 
    icon: "🍨", 
    count: 9,
    categoryIds: ["ice-cream", "addons"] 
  },
  { 
    id: "combos", 
    label: "Combos", 
    icon: "🎁", 
    count: 4,
    categoryIds: ["combo-meals"] 
  }
];

export default function MenuPortfolio({ 
  cartItems = [], 
  onQuickAdd, 
  onRemoveFromCart, 
  onOpenModal, 
  onOpenCart 
}) {
  const [activeSuperGroup, setActiveSuperGroup] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [isSectionSheetOpen, setIsSectionSheetOpen] = useState(false);
  const menuRef = useRef(null);

  // Cart quantity lookup map
  const cartQtyMap = useMemo(() => {
    const map = {};
    cartItems.forEach(item => {
      map[item.id] = (map[item.id] || 0) + item.quantity;
    });
    return map;
  }, [cartItems]);

  // Starting price per category for the directory
  const categoryMinPrices = useMemo(() => {
    const map = {};
    MENU_CATEGORIES.forEach(cat => {
      if (cat.id === 'all') return;
      const items = MENU_ITEMS.filter(i => i.categoryId === cat.id);
      if (items.length > 0) {
        map[cat.id] = Math.min(...items.map(i => i.price));
      }
    });
    return map;
  }, []);

  // Categories belonging to current super group
  const visibleCategories = useMemo(() => {
    if (activeSuperGroup === 'all') {
      return MENU_CATEGORIES.filter(c => c.id !== 'all');
    }
    const currentGroup = SUPER_GROUPS.find(g => g.id === activeSuperGroup);
    if (!currentGroup) return MENU_CATEGORIES.filter(c => c.id !== 'all');
    return MENU_CATEGORIES.filter(c => currentGroup.categoryIds.includes(c.id));
  }, [activeSuperGroup]);

  // Filtered items based on super group, category, and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // 1. Super group filter
      let matchesSuperGroup = true;
      if (activeSuperGroup !== 'all') {
        const group = SUPER_GROUPS.find(g => g.id === activeSuperGroup);
        matchesSuperGroup = group ? group.categoryIds.includes(item.categoryId) : true;
      }

      // 2. Subcategory filter
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;

      // 3. Search query
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q === '' || 
        item.name.toLowerCase().includes(q) ||
        (item.subName && item.subName.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.categoryName && item.categoryName.toLowerCase().includes(q));

      return matchesSuperGroup && matchesCategory && matchesSearch;
    });
  }, [activeSuperGroup, selectedCategory, searchQuery]);

  // Group items by category to maintain exact physical menu order
  const groupedCategories = useMemo(() => {
    const list = selectedCategory === 'all' 
      ? visibleCategories 
      : visibleCategories.filter(c => c.id === selectedCategory);

    return list.map(cat => ({
      ...cat,
      items: filteredItems.filter(item => item.categoryId === cat.id)
    })).filter(group => group.items.length > 0);
  }, [visibleCategories, selectedCategory, filteredItems]);

  // Toggle single category collapse
  const toggleCollapse = (catId) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Collapse or expand all
  const toggleAllCollapse = () => {
    const areAnyExpanded = groupedCategories.some(g => !collapsedCategories[g.id]);
    const newState = {};
    groupedCategories.forEach(g => {
      newState[g.id] = areAnyExpanded;
    });
    setCollapsedCategories(newState);
  };

  // Jump directly to a section from directory sheet
  const handleSelectSection = (catId) => {
    // Find which supergroup this category belongs to
    const targetGroup = SUPER_GROUPS.find(g => g.categoryIds.includes(catId));
    if (targetGroup) {
      setActiveSuperGroup(targetGroup.id);
    } else {
      setActiveSuperGroup('all');
    }
    setSelectedCategory(catId);
    setIsSectionSheetOpen(false);

    // Smooth scroll to menu section
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="menu" 
      ref={menuRef}
      className="py-16 sm:py-24 bg-[#1E0B05] text-[#FAF6EC] relative overflow-hidden border-t border-[#E5A855]/20"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#E5A855]/10 via-[#FAF6EC]/5 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2B1209] border border-[#E5A855]/30 text-[#E5A855] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>18 Authentic Menu Categories • Pure Veg</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-[#FAF6EC] tracking-tight">
            The YaMito <span className="text-[#E5A855]">Order Menu</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-base text-[#FAF6EC]/75 font-normal leading-relaxed">
            Choose a section below or use the section browser to find exactly what you are craving without endless scrolling.
          </p>

          {/* Search Bar */}
          <div className="mt-5 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#E5A855] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search waffles, boba, sandwich, fries, shakes..."
              className="w-full pl-11 pr-14 py-3 rounded-full bg-[#2B1209]/90 border border-[#FAF6EC]/20 focus:border-[#E5A855] focus:outline-none text-base sm:text-sm text-[#FAF6EC] placeholder-[#FAF6EC]/40 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FAF6EC]/60 hover:text-white px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 1. Master Super-Group Navigation Tabs */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar snap-x justify-start sm:justify-center">
            {SUPER_GROUPS.map((group) => {
              const isActive = activeSuperGroup === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveSuperGroup(group.id);
                    setSelectedCategory('all');
                  }}
                  className={`snap-start whitespace-nowrap px-3.5 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-[#E5A855] text-[#170804] shadow-lg shadow-[#E5A855]/25 scale-102 font-extrabold'
                      : 'bg-[#2B1209] text-[#FAF6EC]/80 border border-[#FAF6EC]/10 hover:border-[#E5A855]/40 hover:text-white'
                  }`}
                >
                  <span className="text-base">{group.icon}</span>
                  <span>{group.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Subcategory Quick Filter Pills */}
        <div className="mb-8 pt-1 border-t border-[#FAF6EC]/10">
          <div className="flex items-center justify-between gap-3 pt-3 mb-3">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E5A855] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Section Filter:</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSectionSheetOpen(true)}
                className="text-xs font-bold text-[#E5A855] hover:text-white bg-[#2B1209] px-3 py-1.5 rounded-xl border border-[#E5A855]/30 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Jump to Section (18)</span>
              </button>

              {selectedCategory === 'all' && groupedCategories.length > 1 && (
                <button
                  onClick={toggleAllCollapse}
                  className="text-xs font-medium text-[#FAF6EC]/60 hover:text-white underline cursor-pointer"
                >
                  Toggle All
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar snap-x">
            {/* "All in this group" pill */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`snap-start whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#FAF6EC] text-[#170804] shadow-md font-extrabold'
                  : 'bg-[#2B1209]/80 text-[#FAF6EC]/70 border border-white/5 hover:text-white'
              }`}
            >
              All Sections
            </button>

            {/* Individual Subcategories */}
            {visibleCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = MENU_ITEMS.filter(i => i.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`snap-start whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-[#E5A855] text-[#170804] shadow-md font-extrabold'
                      : 'bg-[#2B1209]/80 text-[#FAF6EC]/70 border border-white/5 hover:border-[#E5A855]/40 hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#170804]/20 text-[#170804]' : 'bg-white/10 text-[#FAF6EC]/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Section Results Counter & Quick Status */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#FAF6EC]/10 text-xs text-[#FAF6EC]/65">
          <span>
            Showing <strong>{filteredItems.length}</strong> items across <strong>{groupedCategories.length}</strong> {groupedCategories.length === 1 ? 'section' : 'sections'}
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-[#E5A855] hover:underline font-bold"
            >
              Show all sections in {SUPER_GROUPS.find(g => g.id === activeSuperGroup)?.label}
            </button>
          )}
        </div>

        {/* 4. Grouped Sections following EXACT Physical Order */}
        <div className="space-y-10 sm:space-y-12">
          {groupedCategories.map((group, groupIdx) => {
            const isCollapsed = !!collapsedCategories[group.id];

            return (
              <div 
                key={group.id} 
                id={`section-${group.id}`}
                className="space-y-4 scroll-mt-24"
              >
                
                {/* Category Header Card with Collapse Toggle */}
                <div 
                  onClick={() => toggleCollapse(group.id)}
                  className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#2B1209] to-[#210D07] border border-[#FAF6EC]/15 hover:border-[#E5A855]/40 transition-all cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E5A855]/20 border border-[#E5A855]/40 flex items-center justify-center text-[#E5A855] font-black text-xs shrink-0">
                      {groupIdx + 1 < 10 ? `0${groupIdx + 1}` : groupIdx + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg sm:text-xl font-black text-[#FAF6EC] tracking-tight flex items-center gap-2">
                        <span>{group.name}</span>
                        <span className="text-xs text-[#E5A855] font-semibold bg-[#3A1A0E] px-2 py-0.5 rounded-full border border-[#E5A855]/20">
                          {group.items.length}
                        </span>
                      </h3>
                      <p className="text-xs text-[#FAF6EC]/60 font-medium line-clamp-1">
                        {group.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-[#E5A855] font-bold hidden sm:inline">
                      from ₹{categoryMinPrices[group.id] || group.items[0]?.price}
                    </span>
                    <button 
                      type="button" 
                      aria-label="Toggle Section"
                      className="p-1 rounded-lg text-[#FAF6EC]/60 hover:text-white"
                    >
                      {isCollapsed ? <ChevronDown className="w-5 h-5 text-[#E5A855]" /> : <ChevronUp className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Items Grid for this Category (Animated Collapse) */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-1"
                    >
                      {group.items.map((item) => {
                        const qty = cartQtyMap[item.id] || 0;
                        const hasOptions = item.options && item.options.length > 0;

                        return (
                          <div
                            key={item.id}
                            className="group rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#2D140B] via-[#240E06] to-[#1E0B05] border border-[#FAF6EC]/10 hover:border-[#E5A855]/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative"
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
                              className="space-y-1.5 my-2 cursor-pointer text-left"
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
                              <div className="text-left">
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
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}

          {groupedCategories.length === 0 && (
            <div className="text-center py-16 bg-[#2B1209]/50 rounded-3xl border border-[#FAF6EC]/10 space-y-3">
              <p className="text-base text-[#FAF6EC]/70">No items match your search or filter.</p>
              <button
                onClick={() => { 
                  setSearchQuery(''); 
                  setActiveSuperGroup('all');
                  setSelectedCategory('all'); 
                }}
                className="px-5 py-2.5 rounded-full bg-[#E5A855] text-[#170804] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* 5. Floating "18 Sections" Directory Trigger Pill */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 sm:left-6 z-40">
        <button
          onClick={() => setIsSectionSheetOpen(true)}
          className="px-4 py-3 rounded-2xl bg-[#210D07]/95 backdrop-blur-md text-[#FAF6EC] hover:text-[#E5A855] border border-[#E5A855]/40 shadow-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#E5A855]" />
          <span>Sections (18)</span>
        </button>
      </div>

      {/* 6. Quick Jump Section Directory Modal / Bottom Sheet */}
      <AnimatePresence>
        {isSectionSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSectionSheetOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-[#210D07] border border-[#E5A855]/30 rounded-t-[32px] sm:rounded-3xl overflow-hidden shadow-2xl z-10 text-left"
            >
              {/* Sheet Header */}
              <div className="p-5 border-b border-[#FAF6EC]/10 flex items-center justify-between bg-gradient-to-r from-[#3A1A0E] to-[#2B1209]">
                <div>
                  <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#E5A855]" />
                    <span>All 18 Menu Sections</span>
                  </h3>
                  <p className="text-xs text-[#FAF6EC]/70">
                    Tap any category to jump directly to its items
                  </p>
                </div>
                <button
                  onClick={() => setIsSectionSheetOpen(false)}
                  className="p-2 rounded-full bg-white/10 text-[#FAF6EC]/80 hover:text-white hover:bg-white/20 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Grid List */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5 flex-1 no-scrollbar">
                {MENU_CATEGORIES.filter(c => c.id !== 'all').map((cat, idx) => {
                  const count = MENU_ITEMS.filter(i => i.categoryId === cat.id).length;
                  const minPrice = categoryMinPrices[cat.id];
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectSection(cat.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#3A1A0E] border-[#E5A855] text-white shadow-lg'
                          : 'bg-[#2B1209]/80 border-white/10 hover:border-[#E5A855]/40 text-[#FAF6EC]/85 hover:bg-[#3A1A0E]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#E5A855]/20 text-[#E5A855] font-black text-xs flex items-center justify-center shrink-0">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <div>
                          <strong className="block text-sm font-bold text-white">
                            {cat.name}
                          </strong>
                          <span className="text-[11px] text-[#FAF6EC]/60 block line-clamp-1">
                            {cat.tagline}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-[#E5A855] block">
                          from ₹{minPrice}
                        </span>
                        <span className="text-[10px] text-[#FAF6EC]/50 block">
                          {count} {count === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-3 bg-[#170804] border-t border-white/10 text-center">
                <button
                  onClick={() => {
                    setActiveSuperGroup('all');
                    setSelectedCategory('all');
                    setIsSectionSheetOpen(false);
                  }}
                  className="text-xs font-bold text-[#E5A855] hover:underline cursor-pointer"
                >
                  View All 18 Sections at Once
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
