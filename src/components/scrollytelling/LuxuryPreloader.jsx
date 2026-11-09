import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOBA_CONFIG } from '../../config/bobaExperience.config';

/**
 * LuxuryPreloader
 * Minimalist luxury loading screen.
 * Warm Light Cream (#EEEBDC) with Brownie Chocolate (#210D07) and Caramel Gold (#E5A855).
 * Strict Single Font: Plus Jakarta Sans.
 */
export default function LuxuryPreloader({ progressPercent, isCriticalReady, onFinish }) {
  const [displayCount, setDisplayCount] = useState(0);
  const [shouldExit, setShouldExit] = useState(false);

  // Smoothly interpolate display percentage
  useEffect(() => {
    const target = isCriticalReady ? 100 : Math.min(progressPercent, 99);
    const interval = setInterval(() => {
      setDisplayCount((prev) => {
        if (prev < target) {
          const step = Math.max(1, Math.ceil((target - prev) / 4));
          return Math.min(prev + step, target);
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [progressPercent, isCriticalReady]);

  // Trigger smooth exit once 100% is reached
  useEffect(() => {
    if (displayCount >= 100 && isCriticalReady) {
      const timer = setTimeout(() => {
        setShouldExit(true);
        if (onFinish) onFinish();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [displayCount, isCriticalReady, onFinish]);

  return (
    <AnimatePresence>
      {!shouldExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-12 pointer-events-auto bg-[#C8C3B7]"
        >
          {/* Top Brand Tag */}
          <div className="w-full flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#210D07]/75 font-bold">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E5A855] animate-ping" />
              {BOBA_CONFIG.brand.name}
            </span>
            <span className="hidden sm:inline-block">BTM 2nd Stage • Bangalore</span>
          </div>

          {/* Center Brand Identity & Counter */}
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Logo in brownie frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#210D07] p-3 border border-[#E5A855]/40 shadow-2xl flex items-center justify-center overflow-hidden"
            >
              <img
                src={BOBA_CONFIG.brand.logo}
                alt={BOBA_CONFIG.brand.name}
                className="w-full h-full object-contain filter drop-shadow"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Single Unified Font Counter */}
            <div className="space-y-2">
              <motion.div
                key={displayCount}
                initial={{ opacity: 0.85, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl sm:text-7xl md:text-8xl font-black text-[#210D07] tracking-tight"
              >
                {String(displayCount).padStart(2, '0')}
                <span className="text-2xl sm:text-3xl font-bold text-[#E5A855] ml-1">%</span>
              </motion.div>
              <p className="text-xs sm:text-sm tracking-[0.18em] uppercase text-[#210D07]/75 font-semibold">
                {isCriticalReady ? 'Ready to Experience' : 'Steeping Dark Chocolate Boba'}
              </p>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-xs space-y-2">
            <div className="h-[3px] w-full bg-[#210D07]/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#210D07] via-[#E5A855] to-[#210D07]"
                style={{ width: `${displayCount}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex justify-between text-[10px] tracking-widest uppercase text-[#210D07]/50 font-bold">
              <span>Pure Belgian Cocoa</span>
              <span>Freshly Handcrafted</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
