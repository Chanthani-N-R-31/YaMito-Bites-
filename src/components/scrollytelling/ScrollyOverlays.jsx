import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { ArrowDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { BOBA_CONFIG } from '../../config/bobaExperience.config';

/**
 * MetricPillars
 * 4-column artisan spec grid with delicate vertical hairline dividers
 * matching the reference luxury patisserie layout.
 */
function MetricPillars({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-4 py-3 my-2 border-y border-[#F9EFE3]/10">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className={`flex flex-col ${
            idx < metrics.length - 1 ? 'border-r border-[#F9EFE3]/10' : ''
          } ${idx === 0 ? 'pr-3 text-left' : idx === metrics.length - 1 ? 'pl-3 text-right' : 'px-3 text-center'}`}
        >
          <span className="text-base sm:text-lg font-bold tracking-tight text-[#F9EFE3]">
            {m.value}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[#F9EFE3]/50 font-mono mt-0.5">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * MilestoneBlock
 * Single milestone section styled after the artisan chocolate theme:
 * Fluid script titles, uppercase tracked labels, 4-pillar metrics, and cream pill CTA.
 */
function MilestoneBlock({ scrollYProgress, milestone, onCtaClick }) {
  const [start, end] = milestone.range;
  const isFinal = milestone.id === 'final-hold';
  const isHero = milestone.id === 'hero';

  // Smooth opacity curve
  const opacity = useTransform(
    scrollYProgress,
    isFinal
      ? [start - 0.02, start + 0.04, 1.0]
      : isHero
      ? [0, end - 0.05, end]
      : [start, start + 0.06, end - 0.06, end],
    isFinal
      ? [0, 1, 1]
      : isHero
      ? [1, 1, 0]
      : [0, 1, 1, 0]
  );

  // Smooth subtle vertical lift
  const translateY = useTransform(
    scrollYProgress,
    isFinal
      ? [start - 0.02, start + 0.05, 1.0]
      : isHero
      ? [0, end - 0.05, end]
      : [start, start + 0.06, end - 0.06, end],
    isFinal
      ? [30, 0, 0]
      : isHero
      ? [0, 0, -30]
      : [35, 0, 0, -25]
  );

  const pointerEvents = useTransform(opacity, (val) => (val > 0.4 ? 'auto' : 'none'));

  // Flank layout rules: Keep central 45% corridor completely clear for the cup
  let layoutClasses = 'items-start justify-center text-left pl-6 sm:pl-12 lg:pl-20 pr-6 lg:pr-0 max-w-lg';
  if (milestone.position === 'right') {
    layoutClasses = 'items-end justify-center text-right pr-6 sm:pr-12 lg:pr-20 pl-6 lg:pl-0 max-w-lg ml-auto';
  } else if (milestone.position === 'bottom') {
    layoutClasses = 'items-center justify-end text-center pb-8 sm:pb-12 px-6 max-w-2xl mx-auto';
  }

  return (
    <motion.div
      style={{ opacity, y: translateY, pointerEvents }}
      className={`absolute inset-0 flex flex-col pointer-events-none p-4 sm:p-8 select-none z-20 ${layoutClasses}`}
    >
      {/* 01. HERO / PHASE 01 (Left Flank - reference style) */}
      {isHero && (
        <div className="bg-[#1C0C08]/90 backdrop-blur-xl border border-[#F9EFE3]/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 max-w-md">
          {/* Eyebrow badge */}
          <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#D49A5B] font-mono">
            <span>{milestone.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A5B] animate-pulse" />
          </div>

          {/* Fluid Cursive Script Title (matches reference "Milk Chocolate") */}
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#F9EFE3] leading-[0.95] tracking-wide pt-1">
            {milestone.scriptTitle}
          </h1>

          {/* Secondary headline */}
          <h2 className="text-xl sm:text-2xl font-serif text-[#D49A5B] tracking-tight">
            {milestone.headline}
          </h2>

          {/* Ingredients section */}
          <div className="space-y-1 pt-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D49A5B]/90 font-semibold block">
              {milestone.ingredientsLabel}
            </span>
            <p className="text-xs text-[#F9EFE3]/80 leading-relaxed font-light">
              {milestone.ingredientsList}
            </p>
          </div>

          {/* 4-Pillar Metric Grid */}
          <MetricPillars metrics={milestone.metrics} />

          {/* Price & Cream Pill Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-[#F9EFE3]">
                {milestone.price}
              </span>
              <span className="text-xs text-[#F9EFE3]/50 font-mono">
                {milestone.unit}
              </span>
            </div>

            <button
              onClick={() => onCtaClick && onCtaClick('menu')}
              className="px-6 py-2.5 rounded-full bg-[#F9EFE3] text-[#1C0C08] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
            >
              {milestone.cta}
            </button>
          </div>

          {/* Subtle scroll indicator */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#F9EFE3]/40 font-mono">
            <ArrowDown className="w-3 h-3 animate-bounce text-[#D49A5B]" />
            <span>Scroll to explore pour</span>
          </div>
        </div>
      )}

      {/* 02. INGREDIENTS STREAM IN (Left Flank) */}
      {milestone.id === 'ingredients' && (
        <div className="bg-[#1C0C08]/90 backdrop-blur-xl border border-[#F9EFE3]/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 max-w-md">
          <span className="text-xs tracking-[0.2em] uppercase text-[#82B29A] font-mono">
            {milestone.badge}
          </span>

          <h2 className="font-script text-5xl sm:text-6xl text-[#F9EFE3] leading-[0.95] tracking-wide pt-1">
            {milestone.scriptTitle}
          </h2>

          <h3 className="text-xl font-serif text-[#D49A5B] tracking-tight">
            {milestone.headline}
          </h3>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#82B29A] font-semibold block">
              {milestone.ingredientsLabel}
            </span>
            <p className="text-xs text-[#F9EFE3]/80 leading-relaxed font-light">
              {milestone.ingredientsList}
            </p>
          </div>

          <MetricPillars metrics={milestone.metrics} />

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-[#F9EFE3]">{milestone.price}</span>
              <span className="text-xs text-[#F9EFE3]/50 font-mono">{milestone.unit}</span>
            </div>
            <button
              onClick={() => onCtaClick && onCtaClick('menu')}
              className="px-6 py-2.5 rounded-full bg-[#F9EFE3] text-[#1C0C08] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg hover:scale-105 cursor-pointer pointer-events-auto"
            >
              {milestone.cta}
            </button>
          </div>
        </div>
      )}

      {/* 03. LIQUID ARC & LIGHT PULSE (Right Flank) */}
      {milestone.id === 'liquid-arc' && (
        <div className="bg-[#1C0C08]/90 backdrop-blur-xl border border-[#F9EFE3]/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 max-w-md ml-auto text-right">
          <span className="text-xs tracking-[0.2em] uppercase text-[#D49A5B] font-mono">
            {milestone.badge}
          </span>

          <h2 className="font-script text-5xl sm:text-6xl text-[#F9EFE3] leading-[0.95] tracking-wide pt-1">
            {milestone.scriptTitle}
          </h2>

          <h3 className="text-xl font-serif text-[#82B29A] tracking-tight">
            {milestone.headline}
          </h3>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D49A5B] font-semibold block">
              {milestone.ingredientsLabel}
            </span>
            <p className="text-xs text-[#F9EFE3]/80 leading-relaxed font-light">
              {milestone.ingredientsList}
            </p>
          </div>

          <MetricPillars metrics={milestone.metrics} />

          <div className="flex items-center justify-end gap-4 pt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-[#F9EFE3]">{milestone.price}</span>
              <span className="text-xs text-[#F9EFE3]/50 font-mono">{milestone.unit}</span>
            </div>
            <button
              onClick={() => onCtaClick && onCtaClick('menu')}
              className="px-6 py-2.5 rounded-full bg-[#F9EFE3] text-[#1C0C08] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg hover:scale-105 cursor-pointer pointer-events-auto"
            >
              {milestone.cta}
            </button>
          </div>
        </div>
      )}

      {/* 04. EXPLODED REVEAL (Left Flank) */}
      {milestone.id === 'exploded-reveal' && (
        <div className="bg-[#1C0C08]/90 backdrop-blur-xl border border-[#F9EFE3]/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 max-w-md">
          <span className="text-xs tracking-[0.2em] uppercase text-[#D49A5B] font-mono">
            {milestone.badge}
          </span>

          <h2 className="font-script text-5xl sm:text-6xl text-[#F9EFE3] leading-[0.95] tracking-wide pt-1">
            {milestone.scriptTitle}
          </h2>

          <h3 className="text-xl font-serif text-[#F9EFE3] tracking-tight">
            Every layer, <span className="italic text-[#D49A5B]">suspended.</span>
          </h3>

          <div className="space-y-2 pt-1">
            {milestone.features?.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/5"
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: feat.accent }}
                />
                <div>
                  <h4 className="text-xs font-semibold text-[#F9EFE3]">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-[#F9EFE3]/60 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 05. FINAL CONVERSION (Bottom Flank) */}
      {isFinal && (
        <div className="bg-[#1C0C08]/95 backdrop-blur-xl border border-[#F9EFE3]/20 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-xl mx-auto space-y-4 pointer-events-auto">
          <div className="space-y-1 text-center">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#D49A5B] font-mono">
              {milestone.badge}
            </span>
            <h2 className="font-script text-5xl sm:text-7xl text-[#F9EFE3] leading-[0.95] tracking-wide pt-1">
              {milestone.scriptTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#F9EFE3]/80 max-w-md mx-auto font-sans font-light">
              {milestone.subline}
            </p>
          </div>

          {/* Pricing & Cream Pill Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-[#F9EFE3]">{milestone.price}</span>
              <span className="text-xs text-[#F9EFE3]/50 font-mono">{milestone.unit}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onCtaClick && onCtaClick('menu')}
                className="px-8 py-3 rounded-full bg-[#F9EFE3] text-[#1C0C08] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={() => onCtaClick && onCtaClick('specialties')}
                className="px-6 py-3 rounded-full bg-[#26110A] text-[#F9EFE3] border border-[#F9EFE3]/20 font-medium text-xs uppercase tracking-wider hover:border-[#D49A5B] transition-all cursor-pointer"
              >
                <span>EXPLORE MENU</span>
              </button>
            </div>
          </div>

          <p className="text-[10px] text-[#F9EFE3]/50 tracking-wider uppercase font-mono text-center">
            {milestone.socialProof}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/**
 * ScrollyOverlays
 * Orchestrates all editorial typography blocks.
 * Supports show/hide toggle for clean view.
 */
export default function ScrollyOverlays({ scrollYProgress, onCtaClick, isVisible = true }) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300">
      {BOBA_CONFIG.milestones.map((milestone) => (
        <MilestoneBlock
          key={milestone.id}
          milestone={milestone}
          scrollYProgress={scrollYProgress}
          onCtaClick={onCtaClick}
        />
      ))}
    </div>
  );
}
