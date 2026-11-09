import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton
 * Awwwards-style micro-interaction that magnetically pulls toward cursor on hover.
 */
export default function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  strength = 0.25,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = variant === 'primary'
    ? 'bg-gradient-to-r from-[#C68B59] via-[#D49E6A] to-[#B37848] text-[#151C24] font-bold shadow-[0_10px_30px_rgba(198,139,89,0.35)] hover:shadow-[0_15px_40px_rgba(198,139,89,0.55)] border border-[#F5E6D3]/30'
    : 'bg-[#151C24]/80 backdrop-blur-md text-[#F5E6D3] border border-[#F5E6D3]/20 hover:border-[#C68B59] hover:bg-[#151C24] shadow-lg';

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: smoothX, y: smoothY }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm sm:text-base tracking-wide transition-colors duration-300 cursor-pointer overflow-hidden group ${baseStyles} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Shimmer sweep effect on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    </motion.button>
  );
}

