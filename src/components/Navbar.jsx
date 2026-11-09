import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

/**
 * Navbar
 * Dynamic luxury glass navbar.
 * Matches Light Cream (#EEEBDC) when over the 3D hero canvas,
 * and seamlessly transitions into Brownie (#210D07) when scrolling through the cafe sections.
 * Strict Single Font: Plus Jakarta Sans.
 */
export default function Navbar({ cartCount, cartTotal, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition as user scrolls past the top cream hero viewport
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Specialties", href: "#specialties" },
    { name: "Menu", href: "#menu" },
    { name: "Reservation", href: "#reservation" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Floating Glass Navbar */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#210D07]/94 backdrop-blur-xl shadow-2xl py-3 border-b border-[#E5A855]/20' 
          : 'bg-[#C8C3B7]/85 backdrop-blur-xl py-3.5 border-b border-[#210D07]/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group select-none"
          >
            {/* Brownie Icon Container */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#210D07] border border-[#E5A855]/40 p-1 flex items-center justify-center shadow-md transform group-hover:scale-105 transition-all duration-200 overflow-hidden">
              <img
                src="/yamito-logo.png"
                alt="YaMito Bites"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <span className={`font-extrabold text-lg sm:text-xl tracking-tight transition-colors ${
                isScrolled ? 'text-[#FAF6EC] group-hover:text-[#E5A855]' : 'text-[#210D07] group-hover:text-[#E5A855]'
              }`}>
                YaMito Bites
              </span>
              <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-colors ${
                isScrolled 
                  ? 'bg-white/5 border-white/10 text-[#FAF6EC]/70' 
                  : 'bg-[#210D07]/10 border-[#210D07]/15 text-[#210D07]/80'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>BTM 2nd Stage</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                  isScrolled
                    ? 'text-[#FAF6EC]/80 hover:text-[#E5A855] hover:bg-white/5'
                    : 'text-[#210D07]/80 hover:text-[#E5A855] hover:bg-[#210D07]/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls: Orders / Bag Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Orders / Cart Trigger Pill */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onOpenCart}
              className={`relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-lg transition-all duration-200 cursor-pointer ${
                isScrolled
                  ? 'bg-[#FAF6EC] hover:bg-white text-[#170804]'
                  : 'bg-[#210D07] hover:bg-black text-[#FAF6EC]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Orders</span>
              {cartCount > 0 ? (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isScrolled ? 'bg-[#210D07] text-[#FAF6EC]' : 'bg-[#FAF6EC] text-[#170804]'
                }`}>
                  {cartCount} • ₹{cartTotal}
                </span>
              ) : (
                <span className="text-[10px] opacity-70 font-semibold">(0)</span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border transition cursor-pointer ${
                isScrolled
                  ? 'bg-white/5 text-[#FAF6EC] border-white/10 hover:bg-white/10'
                  : 'bg-[#210D07]/10 text-[#210D07] border-[#210D07]/20 hover:bg-[#210D07]/15'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-6 rounded-3xl bg-[#210D07]/95 backdrop-blur-2xl border border-[#E5A855]/20 shadow-2xl space-y-4 text-left"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-3 rounded-2xl text-sm font-semibold text-[#FAF6EC] hover:bg-white/10 transition"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3 rounded-full bg-[#FAF6EC] text-[#170804] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Orders ({cartCount}) • ₹{cartTotal}</span>
              </button>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20YaMito%20Bites,%20I%20would%20like%20to%20order!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#2B1209] text-[#E5A855] border border-[#E5A855]/30 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>WhatsApp Order & Pickup</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
