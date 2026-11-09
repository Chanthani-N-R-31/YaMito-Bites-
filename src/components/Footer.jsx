import React from 'react';
import { ArrowUp, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#170804] border-t border-[#E5A855]/20 text-[#FAF6EC]/70 text-left pt-20 pb-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF6EC]/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3A1A0E] to-[#210D07] border border-[#E5A855]/30 p-1 flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src="/yamito-logo.png"
                  alt="YaMito Bites"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <span className="font-extrabold text-2xl text-[#FAF6EC]">
                YaMito Bites
              </span>
            </div>
            <p className="text-sm text-[#FAF6EC]/70 max-w-sm leading-relaxed font-normal">
              {RESTAURANT_INFO.shortDesc}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Kitchen open till 1:00 AM Daily
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAF6EC]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-[#E5A855] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E5A855] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-[#E5A855] transition-colors">Specialties</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#E5A855] transition-colors">Our Menu</a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-[#E5A855] transition-colors">Table Booking</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E5A855] transition-colors">Visit Cafe</a>
              </li>
            </ul>
          </div>

          {/* Order Online */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAF6EC]">
              Order Delivery
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a 
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20YaMito%20Bites,%20I%20would%20like%20to%20order!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5A855] transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp (10% OFF)</span>
                  <ExternalLink className="w-3 h-3 text-[#E5A855]" />
                </a>
              </li>
              <li>
                <a 
                  href={RESTAURANT_INFO.deliveryPartners.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Zomato</span>
                  <ExternalLink className="w-3 h-3 text-red-400" />
                </a>
              </li>
              <li>
                <a 
                  href={RESTAURANT_INFO.deliveryPartners.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Swiggy</span>
                  <ExternalLink className="w-3 h-3 text-orange-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAF6EC]">
              Location & Call
            </h4>
            <div className="space-y-2 text-xs text-[#FAF6EC]/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E5A855] shrink-0 mt-0.5" />
                <span>18th Main Rd, BTM 2nd Stage, Bengaluru 560076</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E5A855] shrink-0" />
                <span>10:00 AM – 1:00 AM (Mon – Sun)</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5A855] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6EC]/50">
          <p>© {new Date().getFullYear()} YaMito Bites. All rights reserved. BTM Layout 2nd Stage, Bangalore.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#FAF6EC]/70 hover:text-[#E5A855] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
