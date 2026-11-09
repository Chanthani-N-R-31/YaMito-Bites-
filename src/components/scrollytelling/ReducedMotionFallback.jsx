import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BOBA_CONFIG } from '../../config/bobaExperience.config';

/**
 * ReducedMotionFallback
 * Static, accessible luxury editorial layout presented when the user prefers reduced motion.
 * Shows the hero frame alongside a structured story sequence without intensive scroll-linked scrubbing.
 */
export default function ReducedMotionFallback({ onCtaClick }) {
  const { brand, milestones, sequence } = BOBA_CONFIG;
  // Final frame path or fallback
  const heroImageSrc = sequence.fallbackFramePath ? sequence.fallbackFramePath(sequence.totalFrames - 1) : sequence.framePath(sequence.totalFrames - 1);

  return (
    <section className="relative w-full py-20 px-6 sm:px-12 bg-[#210D07] text-[#FAF6EC]">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Header Hero */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2B1209] border border-[#E5A855]/40 text-[#E5A855] text-xs font-semibold uppercase tracking-widest">
            <span>{brand.name} • Reserve Selection</span>
          </div>
          <h1
            className="text-4xl sm:text-6xl font-extrabold leading-tight"
          >
            Pour. Layer.{' '}
            <span className="text-[#E5A855]">Unleash.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F5E6D3]/80 font-light">
            Single-origin Belgian dark chocolate meets slow-steeped milk tea in a gravity-defying collision.
          </p>
        </div>

        {/* Static Feature Image */}
        <div className="relative rounded-3xl overflow-hidden border border-[#F5E6D3]/15 shadow-2xl bg-[#0D1115] max-w-4xl mx-auto aspect-video">
          <img
            src={heroImageSrc}
            alt={`${brand.name} Artisan Boba`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Narrative Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {milestones.slice(1, 4).map((m) => (
            <div
              key={m.id}
              className="p-8 rounded-3xl bg-[#0D1115]/80 border border-[#F5E6D3]/10 space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-[#C68B59]">
                {m.badge}
              </span>
              <h3
                className="text-2xl font-serif text-[#F5E6D3]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {m.headline}
              </h3>
              <p className="text-sm text-[#F5E6D3]/70 leading-relaxed font-light">
                {m.subline}
              </p>
              {m.features && (
                <ul className="space-y-2 pt-2 text-xs text-[#F5E6D3]/80">
                  {m.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C68B59]" />
                      <span>{f.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Final Conversion CTA */}
        <div className="text-center space-y-6 pt-10">
          <h2
            className="text-3xl sm:text-5xl font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Savor The <span className="italic text-[#C68B59]">Collision.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onCtaClick && onCtaClick('menu')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C68B59] to-[#B37848] text-[#151C24] font-bold shadow-xl hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onCtaClick && onCtaClick('specialties')}
              className="px-8 py-4 rounded-full bg-[#0D1115] border border-[#F5E6D3]/20 text-[#F5E6D3] font-medium hover:border-[#C68B59] transition cursor-pointer"
            >
              <span>Find Your Flavor</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

