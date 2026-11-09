import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Sparkles, 
  Plus, 
  Minus, 
  SlidersHorizontal,
  CheckCircle2,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

export default function MenuSection({ cartItems, onQuickAdd, onRemoveFromCart, onOpenModal }) {
  const [activeMenuPage, setActiveMenuPage] = useState('waffles'); // waffles, waffizza, beverages, savory
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Group menu categories into 4 authentic Menu Card Pages
  const menuPages = [
    {
      id: 'waffles',
      title: '🧇 Waffles & Pops',
      subtitle: 'Artisan Belgian Waffles, Lollies & Choco Overloads',
      categories: [
        {
          id: 'vintage-waffles',
          name: 'VINTAGE WAFFLES',
          tagline: 'Classic flavors with a timeless taste',
          image: '/images/menu/vintage_waffles.jpg',
        },
        {
          id: 'choco-rich',
          name: 'CHOCO RICH WAFFLE',
          tagline: 'For true chocolate lovers',
          image: '/images/menu/choco_rich.jpg',
        },
        {
          id: 'signature-cream',
          name: 'SIGNATURE CREAM WAFFLES',
          tagline: 'Smooth, creamy indulgence',
          image: '/images/menu/signature_cream.jpg',
        },
        {
          id: 'yamito-pops',
          name: 'YAMITO POPS (Lolly Waffles)',
          tagline: 'Fun, bite-sized treats on a stick',
          image: '/images/menu/yamito_pops.jpg',
        },
        {
          id: 'chef-signature',
          name: "CHEF'S SIGNATURE WAFFLES",
          tagline: 'Premium handcrafted specialties',
          image: '/images/menu/signature_waffles.jpg',
        },
        {
          id: 'choco-lovers',
          name: 'CHOCO LOVERS WAFFLES',
          tagline: 'Ultimate chocolate overload',
          image: '/images/menu/choco_lovers.jpg',
        },
        {
          id: 'velvet-club',
          name: 'VELVET CLUB WAFFLES',
          tagline: 'Rich & velvety delights',
          image: '/images/menu/velvet_club.jpg',
        },
      ]
    },
    {
      id: 'waffizza',
      title: '🍕 Waffizza & Platters',
      subtitle: 'Waffle Meets Pizza & Dreamy Dessert Platters',
      categories: [
        {
          id: 'waffizza-dreams',
          name: 'WAFFIZZA & DESSERT PLATTERS',
          tagline: 'Shareable dessert platters, pizza waffles & ice cream sandwiches',
          image: '/images/menu/waffizza.jpg',
        }
      ]
    },
    {
      id: 'beverages',
      title: '🧋 Boba & Beverages',
      subtitle: 'Taiwan Bubble Teas, Mojitos, Shakes & Ice Cream',
      categories: [
        {
          id: 'boba-drinks',
          name: 'BOBA DRINKS (Bubble Teas)',
          tagline: 'Hand-shaken authentic Taiwan bubble teas with chewy brown sugar tapioca',
          image: '/images/menu/boba_drinks.jpg',
        },
        {
          id: 'mojitos-shakes',
          name: 'MOJITOS & THICKSHAKES',
          tagline: 'Refreshing sparkling coolers, ultra-thick shakes & waffle cones',
          image: '/images/menu/shakes.jpg',
        }
      ]
    },
    {
      id: 'savory',
      title: '🥪 Savory & Combos',
      subtitle: 'Grilled Sandwiches, Loaded Peri Peri Fries & Meal Combos',
      categories: [
        {
          id: 'savory-bites',
          name: 'SANDWICHES & LOADED FRIES',
          tagline: 'Grilled golden cheese sandwiches & crispy seasoned fries',
          image: '/images/menu/sandwich.jpg',
        },
        {
          id: 'combo-meals',
          name: 'COMBO VALUE MEALS',
          tagline: 'Complete combinations with waffles, drinks & fries',
          image: '/images/menu/combos.jpg',
        }
      ]
    }
  ];

  // Filter categories to display based on active page or search
  const visibleCategories = useMemo(() => {
    let cats = [];
    if (searchQuery.trim()) {
      // If searching, search across all categories
      cats = menuPages.flatMap(p => p.categories);
    } else {
      const page = menuPages.find(p => p.id === activeMenuPage);
      cats = page ? page.categories : [];
    }

    return cats.map(cat => {
      let items = MENU_ITEMS.filter(item => item.categoryId === cat.id);
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        items = items.filter(item => 
          item.name.toLowerCase().includes(q) || 
          (item.subName && item.subName.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return {
        ...cat,
        items
      };
    }).filter(cat => cat.items.length > 0);
  }, [activeMenuPage, searchQuery]);

  const handleDishClick = (item, e) => {
    if (e.target.closest('button')) return;
    onQuickAdd(item.id);
    showToast(`Added ${item.name} (₹${item.price}) to your order!`);
  };

  const handleAddButton = (item, e) => {
    e.stopPropagation();
    onQuickAdd(item.id);
    showToast(`Added ${item.name} (₹${item.price}) to your order!`);
  };

  const handleRemoveButton = (item, e) => {
    e.stopPropagation();
    onRemoveFromCart(item.id);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <section id="menu" className="py-24 sm:py-32 relative bg-[#210D07] text-[#FAF6EC] select-none border-t border-[#E5A855]/25">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#FAF6EC] text-[#170804] px-5 py-3.5 rounded-2xl shadow-2xl font-bold text-xs sm:text-sm flex items-center gap-2.5 border-2 border-[#E5A855] pointer-events-none"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[3]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2B1209] border border-[#E5A855]/40 text-[#E5A855] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Store Menu • BTM Layout 2nd Stage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EC] tracking-tight">
            Our Cafe <span className="text-gradient-gold">Menu Card</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#FAF6EC]/75 font-normal leading-relaxed">
            Styled directly after our authentic cafe menu card. <br className="hidden sm:inline" />
            <span className="text-[#FAF6EC] font-semibold">Click on any dish</span> or the <span className="text-[#E5A855] font-bold">+ Add</span> button to add it to your order.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FAF6EC]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search waffles, boba teas, kitkat, nutella, fries..."
            className="w-full pl-11 pr-10 py-2.5 rounded-full bg-[#2B1209] border border-[#E5A855]/30 text-[#FAF6EC] placeholder-[#FAF6EC]/40 text-sm focus:outline-none focus:border-[#E5A855] focus:bg-[#3A1A0E] transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FAF6EC]/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 4 Menu Card Page Tabs (Flip through the Menu) */}
        {!searchQuery && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {menuPages.map((page) => {
              const isActive = activeMenuPage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => setActiveMenuPage(page.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-md ${
                    isActive
                      ? 'bg-[#FAF6EC] text-[#170804] scale-105 border-2 border-[#E5A855] shadow-lg'
                      : 'bg-[#2B1209] text-[#FAF6EC]/75 hover:text-white hover:bg-[#3A1A0E] border border-[#E5A855]/25'
                  }`}
                >
                  {page.title}
                </button>
              );
            })}
          </div>
        )}

        {/* The Authentic Menu Card Sheet (Warm Cream Paper Aesthetic) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#FAF6EC] text-[#170804] p-5 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-4 border-[#E5A855]/40 relative overflow-hidden">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#E5A855]/60 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#E5A855]/60 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#E5A855]/60 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#E5A855]/60 pointer-events-none" />

          {visibleCategories.length > 0 ? (
            <div className="space-y-12">
              {visibleCategories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="rounded-3xl bg-[#F6F1E3] border border-[#D5C6AA] p-5 sm:p-7 shadow-sm"
                >
                  
                  {/* Category Header (Authentic Brownie Pill Badge from Menu Card) */}
                  <div className="mb-6">
                    <div className="inline-block px-5 py-1.5 rounded-full bg-[#210D07] text-[#FAF6EC] font-extrabold text-sm sm:text-base tracking-wider uppercase border border-[#E5A855]/40 shadow-md">
                      {cat.name}
                    </div>
                    {cat.tagline && (
                      <p className="text-xs sm:text-sm text-[#7A4E39] font-medium italic mt-1.5 ml-2">
                        {cat.tagline}
                      </p>
                    )}
                  </div>

                  {/* Body: Split View (Dishes on Left, Photo on Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Left Column: Dish List */}
                    <div className="lg:col-span-8 space-y-2">
                      {cat.items.map((item) => {
                        const inCart = cartItems.find((ci) => ci.id === item.id);
                        const inCartQty = inCart ? inCart.quantity : 0;

                        return (
                          <div
                            key={item.id}
                            onClick={(e) => handleDishClick(item, e)}
                            className={`group relative p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                              inCartQty > 0
                                ? 'bg-[#EDE4D0] border-[#210D07] shadow-sm'
                                : 'bg-[#FAF6EC] hover:bg-[#F0E9DA] border-[#E3D7C1] hover:border-[#210D07]/40'
                            }`}
                          >
                            
                            {/* Dish Info */}
                            <div className="flex items-start gap-2.5 min-w-0 flex-1">
                              {/* Veg dot */}
                              <span className="mt-1 inline-block w-3.5 h-3.5 rounded-xs border border-emerald-600 bg-white text-emerald-600 shrink-0 flex items-center justify-center p-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              </span>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-sm sm:text-base text-[#170804] group-hover:text-[#210D07] transition-colors">
                                    {item.name}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FAF6EC] bg-[#210D07] px-2 py-0.5 rounded-md shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>

                                {item.subName && (
                                  <p className="text-xs text-[#7A4E39] font-semibold">
                                    {item.subName}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Dotted Leader Line (Menu Card Aesthetic) */}
                            <div className="hidden sm:block flex-1 border-b border-dotted border-[#170804]/25 mx-2" />

                            {/* Price & Action Button */}
                            <div className="flex items-center gap-3 shrink-0">
                              
                              {/* Price */}
                              <span className="font-black text-base sm:text-lg text-[#170804] min-w-[55px] text-right">
                                ₹ {item.price}
                              </span>

                              {/* Interactive Add Button / Quantity Stepper */}
                              {inCartQty > 0 ? (
                                <div 
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1.5 bg-[#210D07] border border-[#210D07] rounded-full px-2 py-1 shadow-md"
                                >
                                  <button
                                    onClick={(e) => handleRemoveButton(item, e)}
                                    className="w-5 h-5 rounded-full bg-white/15 hover:bg-white/30 text-[#FAF6EC] flex items-center justify-center text-xs cursor-pointer"
                                    title="Decrease quantity"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-black text-[#FAF6EC] text-xs px-1 min-w-[16px] text-center">
                                    {inCartQty}
                                  </span>
                                  <button
                                    onClick={(e) => handleAddButton(item, e)}
                                    className="w-5 h-5 rounded-full bg-[#FAF6EC] hover:bg-white text-[#170804] font-black flex items-center justify-center text-xs cursor-pointer"
                                    title="Increase quantity"
                                  >
                                    <Plus className="w-3 h-3 stroke-[3]" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onOpenModal(item);
                                    }}
                                    className="p-1 rounded-lg text-[#7A4E39] hover:text-[#170804] transition cursor-pointer"
                                    title="Customize toppings & options"
                                  >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={(e) => handleAddButton(item, e)}
                                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#210D07] hover:bg-[#3A1A0E] text-[#FAF6EC] text-xs font-black transition-all duration-200 cursor-pointer shadow-md hover:scale-105"
                                  >
                                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                                    <span>Add</span>
                                  </button>
                                </div>
                              )}

                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* Right Column: Authentic Category Photo from Menu Card */}
                    <div className="lg:col-span-4 rounded-2xl overflow-hidden bg-[#FAF6EC] border-2 border-[#D5C6AA] shadow-md p-2 flex flex-col items-center justify-center">
                      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden relative">
                        <img
                          src={cat.image || '/images/menu/vintage_waffles.jpg'}
                          alt={cat.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-[#7A4E39] uppercase tracking-wider mt-2">
                        Authentic YaMito Bites Craft
                      </p>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold text-xl text-[#170804] mb-2">No matching dishes found</h3>
              <p className="text-sm text-[#7A4E39] mb-6">
                Try searching for 'waffle', 'boba', 'kitkat', 'fries' or reset your search.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-full bg-[#210D07] text-[#FAF6EC] font-bold text-xs uppercase tracking-wider hover:bg-[#3A1A0E] transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Bottom Card Footer Note */}
          <div className="mt-10 pt-6 border-t border-[#D5C6AA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A4E39] font-medium">
            <span>All items freshly prepared to order at YaMito Bites, 18th Main Road, BTM 2nd Stage.</span>
            <span className="font-bold text-[#170804]">WhatsApp: +91 88849 43237</span>
          </div>

        </div>

      </div>

    </section>
  );
}
