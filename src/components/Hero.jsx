import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Clock, 
  MapPin, 
  Flame, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function Hero({ onExploreMenu, onQuickAdd }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredDishes = [
    {
      title: "Death By Chocolate (D.B.C.)",
      sub: "Crispy Belgian waffle, molten ganache, brownie & vanilla gelato",
      tag: "Signature Waffle",
      price: "₹299",
      img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=900&auto=format&fit=crop&q=80",
      accent: "from-amber-500/20 to-orange-500/20",
      id: "waffle-dbc"
    },
    {
      title: "Brown Sugar Tiger Milk Boba",
      sub: "Warm tapioca pearls simmered in dark cane sugar with creamy milk",
      tag: "Artisanal Boba",
      price: "₹219",
      img: "https://images.unsplash.com/photo-1558857563-b37cf5a93946?w=900&auto=format&fit=crop&q=80",
      accent: "from-amber-600/20 to-yellow-600/20",
      id: "boba-brown-sugar"
    },
    {
      title: "Artisan Paneer Grilled Sandwich",
      sub: "Golden toasted sourdough, spiced paneer cubes, melted mozzarella, house mint glaze",
      tag: "Savory Favorite",
      price: "₹129",
      img: "/images/specialties/savory.jpg",
      accent: "from-amber-500/20 to-orange-600/20",
      id: "paneer-grilled"
    }
  ];

  const currentDish = featuredDishes[featuredIndex];

  return (
    <section className="relative pt-6 pb-20 md:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Story & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>BTM Layout's Trending Dessert & Late Night Cafe</span>
              <span className="bg-amber-500/20 px-2 py-0.5 rounded-full text-[10px] text-amber-300 font-bold uppercase">
                4.9 ⭐ Rated
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white"
            >
              Crave The <span className="text-gradient-gold">Crunch.</span><br />
              Sip The <span className="text-gradient-amber">Boba.</span><br />
              Own The Late Night.
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed"
            >
              Freshly pressed Belgian waffles drenched in pure chocolate, authentic chewy Taiwanese boba teas, artisan grilled sandwiches, and loaded fries. Handcrafted in <strong>BTM 2nd Stage</strong> until <strong>1:00 AM every night</strong>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm sm:text-base shadow-glow-brand hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20YaMito%20Bites!%20I%20would%20like%20to%20order%20food%20for%20pickup%20/%20delivery.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
              >
                <span>Order on WhatsApp</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">10% OFF</span>
              </a>

              <a
                href={RESTAURANT_INFO.deliveryPartners.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs sm:text-sm font-semibold transition-all"
              >
                <span className="text-red-500 font-black">Zomato</span>
                <span className="text-gray-400">Delivery</span>
              </a>
            </motion.div>

            {/* Quick Key Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-display font-extrabold text-2xl">
                  <span>4.9</span>
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-xs text-gray-400 font-medium">540+ Google Reviews</div>
              </div>

              <div>
                <div className="text-white font-display font-extrabold text-2xl">
                  1:00 <span className="text-xs font-bold text-amber-400">AM</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">Late Night Kitchen</div>
              </div>

              <div>
                <div className="text-white font-display font-extrabold text-2xl">
                  35+
                </div>
                <div className="text-xs text-gray-400 font-medium">Handcrafted Items</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Featured Card Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-rose-600 rounded-3xl blur-2xl opacity-20 animate-pulse-glow" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative glass-panel rounded-3xl p-5 sm:p-6 border border-white/15 shadow-2xl overflow-hidden"
            >
              
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    {currentDish.tag}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Freshly Made
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 line-through mr-1.5">₹{parseInt(currentDish.price.replace('₹','')) + 50}</span>
                  <span className="font-display font-extrabold text-xl text-amber-400">{currentDish.price}</span>
                </div>
              </div>

              {/* Main Dish Image with Smooth Transition */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden group mb-4">
                <motion.img 
                  key={currentDish.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={currentDish.img} 
                  alt={currentDish.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Floating Rating Pill on Image */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs text-white">
                  <span className="flex text-amber-400">★★★★★</span>
                  <span className="font-semibold text-gray-200">Bestseller</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-5">
                <h3 className="font-display font-bold text-xl text-white mb-1.5">
                  {currentDish.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                  {currentDish.sub}
                </p>
              </div>

              {/* Dish Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 mb-4">
                {featuredDishes.map((dish, idx) => (
                  <button
                    key={dish.title}
                    onClick={() => setFeaturedIndex(idx)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                      featuredIndex === idx
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {idx === 0 ? "🧇 Waffle" : idx === 1 ? "🧋 Boba" : "🥪 Sandwich"}
                  </button>
                ))}
              </div>

              {/* Quick Add CTA */}
              <button
                onClick={() => onQuickAdd(currentDish.id)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-glow-brand transition-all cursor-pointer"
              >
                <span>Add {currentDish.title.split(' ')[0]} to Bag • {currentDish.price}</span>
              </button>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
