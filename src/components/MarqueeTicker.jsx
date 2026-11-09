import React from 'react';

export default function MarqueeTicker() {
  const items = [
    { icon: "🧇", text: "Freshly Pressed Belgian Waffles" },
    { icon: "🧋", text: "Hand-Crafted Boba & Bubble Teas" },
    { icon: "🍟", text: "Cheesy Overloaded Crispy Fries" },
    { icon: "🥪", text: "Artisan Grilled Cheese & Paneer Sandwiches" },
    { icon: "🌙", text: "Late Night Cravings Open Till 1:00 AM" },
    { icon: "⭐", text: "4.9/5 Rated (540+ Foodie Reviews)" },
    { icon: "📍", text: "18th Main BTM Layout 2nd Stage" },
    { icon: "🛵", text: "Fast Delivery via Swiggy & Zomato" },
    { icon: "💬", text: "Direct WhatsApp Ordering with 10% OFF" },
  ];

  return (
    <div className="relative py-4 bg-gradient-to-r from-[#210D07] via-[#2B1209] to-[#210D07] border-y border-[#E5A855]/20 overflow-hidden select-none shadow-lg">
      <div className="flex w-max animate-marquee">
        {/* Repeat list twice for seamless infinite scroll */}
        {[...items, ...items].map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2.5 mx-6 text-xs sm:text-sm font-bold tracking-wider text-[#FAF6EC]/90 uppercase whitespace-nowrap"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="hover:text-[#E5A855] transition-colors">{item.text}</span>
            <span className="text-[#E5A855] ml-4 font-black">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
