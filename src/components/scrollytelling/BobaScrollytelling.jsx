import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import { BOBA_CONFIG } from '../../config/bobaExperience.config';
import { useFramePreloader } from '../../hooks/useFramePreloader';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

import ScrollyCanvas from './ScrollyCanvas';
import FilmGrainOverlay from './FilmGrainOverlay';
import LuxuryPreloader from './LuxuryPreloader';

/**
 * BobaScrollytelling
 * Purely visual 3D canvas animation showcase.
 * Warm light cream studio background (#EEEBDC / #FAF6EC).
 * Strictly zero overlay text or buttons obscuring the animation.
 */
export default function BobaScrollytelling() {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // 1080p progressive frame preloader
  const {
    progressPercent,
    isCriticalReady,
    getFrame,
  } = useFramePreloader();

  // Scroll tracking across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Soft indicator fade out as user starts scrolling
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Reduced motion accessible view (static single frame)
  if (prefersReducedMotion) {
    const fallbackSrc = BOBA_CONFIG.sequence.framePath(0);
    return (
      <section id="home" className="relative w-full h-[85vh] overflow-hidden bg-[#C8C3B7]">
        <img
          src={fallbackSrc}
          alt={BOBA_CONFIG.brand.name}
          className="w-full h-full object-cover"
        />
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full select-none"
      style={{
        height: BOBA_CONFIG.scroll.containerHeight,
        backgroundColor: BOBA_CONFIG.brand.colors.creamStudio,
      }}
    >
      {/* Luxury Preloader Curtain on First Load */}
      <LuxuryPreloader
        progressPercent={progressPercent}
        isCriticalReady={isCriticalReady}
      />

      {/* Sticky 100vh Pinned Viewport - Pure Visual Experience */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Hardware-Accelerated 1080p Canvas (Zero Text Overlays) */}
        <ScrollyCanvas
          scrollYProgress={scrollYProgress}
          getFrame={getFrame}
          isCriticalReady={isCriticalReady}
        />

        {/* Seamless Edge Blending Overlay */}
        <FilmGrainOverlay scrollYProgress={scrollYProgress} />

        {/* Minimalist discreet scroll indicator at the bottom edge */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center pointer-events-none select-none z-20 gap-2"
        >
          <div className="w-5 h-9 rounded-full border border-[#210D07]/30 flex items-start justify-center p-1.5 backdrop-blur-sm bg-white/40">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#E5A855]"
            />
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#210D07]/75 font-bold">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}
