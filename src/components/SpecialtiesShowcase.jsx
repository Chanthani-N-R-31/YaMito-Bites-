import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function SpecialtiesShowcase({ onExploreMenu }) {
  const [activeTab, setActiveTab] = useState('waffles');

  const specialties = {
    waffles: {
      tag: "Freshly Pressed Daily",
      title: "Artisanal Belgian Waffles",
      desc: "Our waffles are whipped from scratch using our secret golden malt batter. Cooked to crisp golden perfection with deep pockets that hold warm Belgian chocolate, melted Biscoff, or fresh fruit compotes.",
      image: "/images/specialties/waffles.jpg",
      highlights: [
        "Crispy golden exterior with pillow-soft interior",
        "Authentic Belgian dark, milk & white chocolate ganache",
        "Lotus Biscoff, KitKat, Nutella & Almond varieties",
        "Available with ice-cream scoops & whipped cream"
      ],
      badge: "Signature Craft"
    },
    boba: {
      tag: "Hand-Shaken & Fresh",
      title: "Taiwanese Boba & Bubble Teas",
      desc: "Experience the chewy delight of authentic slow-cooked brown sugar tapioca pearls, premium Japanese matcha, royal purple taro root, and fruity popping boba pearls that burst with natural fruit juice.",
      image: "/images/specialties/boba.jpg",
      highlights: [
        "Fresh tapioca cooked in brown sugar every 4 hours",
        "Taro, Thai Spiced, Matcha & Chocolate flavors",
        "Customizable sweetness & ice levels",
        "Fruit green teas with bursting popping pearls"
      ],
      badge: "Bangalore's Favorite"
    },
    savory: {
      tag: "Crispy & Cheesy",
      title: "Gourmet Sandwiches & Loaded Fries",
      desc: "Balance your sweet tooth with our savory quick-bites. Freshly toasted butter cheese chilli sandwiches, cheese corn melts, peri-peri seasoned fries, cheese balls, and crispy potato wedges.",
      image: "/images/specialties/savory.jpg",
      highlights: [
        "Artisanal Butter Cheese Chilli & Corn Cheese grilled sandwiches",
        "Golden crinkle & classic salted fries with peri-peri dust",
        "Crispy cheese balls, potato wedges & veg nuggets",
        "100% vegetarian, served fresh and piping hot"
      ],
      badge: "Savory Comfort"
    }
  };

  const current = specialties[activeTab];

  return (
    <section id="specialties" className="py-16 sm:py-24 bg-[#210D07] text-[#FAF6EC] relative overflow-hidden border-t border-[#E5A855]/20">
      {/* Soft warm ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#E5A855]/12 to-[#FAF6EC]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2B1209] border border-[#E5A855]/35 text-[#E5A855] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The YaMito Experience</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF6EC] tracking-tight">
            Crafted With Passion, <br className="hidden sm:inline" />
            <span className="text-gradient-gold">Loved By BTM Layout</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-base text-[#FAF6EC]/70 font-normal">
            Every bite and sip at YaMito Bites is crafted using premium ingredients, authentic recipes, and attention to detail.
          </p>

          {/* Interactive Toggle Pills (Mobile-optimized) */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 p-1 sm:p-1.5 rounded-2xl bg-[#2B1209] border border-[#E5A855]/25 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('waffles')}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'waffles'
                  ? 'bg-[#FAF6EC] text-[#170804] shadow-lg'
                  : 'text-[#FAF6EC]/70 hover:text-white'
              }`}
            >
              🧇 <span className="hidden sm:inline">Belgian </span>Waffles
            </button>
            <button
              onClick={() => setActiveTab('boba')}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'boba'
                  ? 'bg-[#FAF6EC] text-[#170804] shadow-lg'
                  : 'text-[#FAF6EC]/70 hover:text-white'
              }`}
            >
              🧋 Boba<span className="hidden sm:inline"> Teas</span>
            </button>
            <button
              onClick={() => setActiveTab('savory')}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'savory'
                  ? 'bg-[#FAF6EC] text-[#170804] shadow-lg'
                  : 'text-[#FAF6EC]/70 hover:text-white'
              }`}
            >
              🥪 <span className="hidden sm:inline">Sandwiches & Fries</span><span className="sm:hidden">Savory</span>
            </button>
          </div>
        </div>

        {/* Feature Spotlight Card */}
        <div className="rounded-3xl p-5 sm:p-10 bg-gradient-to-br from-[#3A1A0E] via-[#2B1209] to-[#210D07] border border-[#E5A855]/25 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Box */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#170804]">
                <motion.img 
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={current.image} 
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-[#210D07]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5A855]/35 text-xs font-bold text-[#E5A855]">
                  {current.badge}
                </div>
              </div>
            </div>

            {/* Details Box */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5A855]">
                  {current.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6EC] mt-1">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#FAF6EC]/80 leading-relaxed font-normal">
                  {current.desc}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-3 pt-2">
                {current.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#FAF6EC]/90 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20YaMito%20Bites,%20I%20would%20like%20to%20order!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAF6EC] hover:bg-white text-[#170804] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 text-center min-h-[44px]"
                >
                  <span>Order on WhatsApp (10% OFF)</span>
                  <ArrowRight className="w-4 h-4 text-[#170804]" />
                </a>
                <a
                  href="#reservation"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-[#FAF6EC] border border-[#E5A855]/30 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer text-center min-h-[44px]"
                >
                  <span>Book a Table</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
