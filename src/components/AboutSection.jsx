import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * AboutSection
 * Editorial showcase harmonizing Fudgy Brownie (#210D07)
 * with Light Cream (#FAF6EC) and Caramel Gold highlights (#E5A855).
 * Unified single font: Plus Jakarta Sans.
 */
export default function AboutSection({ onExploreMenu }) {
  const craftFeatures = [
    {
      title: "72% Single-Origin Ganache",
      desc: "Bean-to-cup Belgian dark chocolate melted to silky perfection without synthetic syrups or artificial powders.",
      tag: "Pure Cocoa"
    },
    {
      title: "90-Min Okinawa Boba Simmer",
      desc: "Authentic tapioca pearls slow-cooked in raw unrefined dark brown cane sugar, yielding that unmistakable soft, bouncy chew.",
      tag: "Authentic Craft"
    },
    {
      title: "Late-Night Kitchen Till 1:00 AM",
      desc: "Freshly pressed crispy Belgian waffles, cheesy fries, grilled sandwiches, and iced teas made fresh to order until 1:00 AM every night.",
      tag: "Midnight Dining"
    }
  ];

  return (
    <section 
      id="about" 
      className="relative z-20 -mt-10 sm:-mt-20 rounded-t-[32px] sm:rounded-t-[56px] py-16 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#210D07] text-[#FAF6EC] overflow-hidden border-t border-[#E5A855]/35 shadow-[0_-25px_60px_rgba(0,0,0,0.6)]"
    >
      {/* Warm Ambient Glows */}
      <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-[#E5A855]/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-24 w-[500px] h-[500px] bg-[#FAF6EC]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-4 border-b border-[#FAF6EC]/10">
          <div className="space-y-3 sm:space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B1209] border border-[#E5A855]/30 text-[#E5A855] text-[11px] sm:text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About YaMito Bites • BTM 2nd Stage</span>
            </div>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] text-[#FAF6EC]">
              Molten Chocolate.{' '}
              <span className="text-[#E5A855] block sm:inline font-bold">
                Crafted After Midnight.
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-base text-[#FAF6EC]/80 max-w-md font-normal leading-relaxed text-left">
            YaMito Bites is BTM Layout’s premier dessert and quick-bites retreat. From authentic hand-shaken boba teas to golden Belgian waffles and savory late-night comfort food.
          </p>
        </div>

        {/* 3 Craft Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 pt-2 sm:pt-6 text-left">
          {craftFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#3A1A0E]/50 via-[#2B1209]/80 to-[#210D07] border border-[#FAF6EC]/15 hover:border-[#E5A855]/50 transition-all duration-300 space-y-2.5 sm:space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#E5A855]">
                  0{idx + 1} • {feat.tag}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#FAF6EC]">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF6EC]/75 font-normal leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Menu Explorer CTA */}
        <div className="p-6 sm:p-12 rounded-3xl bg-gradient-to-r from-[#3A1A0E] via-[#2B1209] to-[#210D07] border border-[#E5A855]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-[#FAF6EC]">Ready to Taste the Magic?</h4>
            <p className="text-xs sm:text-sm text-[#FAF6EC]/75 font-normal">
              Explore our full menu of handcrafted desserts, boba teas, and late-night munchies.
            </p>
          </div>
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FAF6EC] hover:bg-white text-[#170804] font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 flex-shrink-0 min-h-[44px]"
          >
            <span>Explore Order Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
