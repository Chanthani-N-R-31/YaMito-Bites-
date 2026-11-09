import React from 'react';
import { Star, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS, RESTAURANT_INFO } from '../data/restaurantData';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-[#210D07] text-[#FAF6EC] relative overflow-hidden border-t border-[#E5A855]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          <div className="lg:col-span-7 text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2B1209] border border-[#E5A855]/30 text-[#E5A855] text-xs font-semibold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-[#E5A855]" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6EC] tracking-tight">
              Loved by 10,000+ Bangalore <br className="hidden sm:inline" />
              <span className="text-gradient-gold">Dessert & Food Lovers</span>
            </h2>
            <p className="text-sm sm:text-base text-[#FAF6EC]/70 font-normal">
              See why foodies across BTM Layout, Koramangala, and JP Nagar rate us 4.9 stars on Google and Zomato.
            </p>
          </div>

          {/* Rating Summary Card (Warm Roasted Brownie & Caramel) */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#3A1A0E] via-[#2B1209] to-[#210D07] border border-[#E5A855]/25 flex items-center justify-between shadow-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-5xl text-[#E5A855]">4.9</span>
                  <div>
                    <div className="flex text-[#E5A855] text-lg">★★★★★</div>
                    <span className="text-xs text-[#FAF6EC]/60">Based on 540+ reviews</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#FAF6EC]/80">
                  <span className="bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded">
                    Top Rated BTM Cafe
                  </span>
                </div>
              </div>

              <div className="border-l border-white/10 pl-6 space-y-1.5 text-xs text-[#FAF6EC]/70">
                <div className="flex justify-between gap-4">
                  <span>Waffles & Desserts</span>
                  <strong className="text-[#E5A855]">5.0</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Bubble Tea</span>
                  <strong className="text-[#E5A855]">4.9</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Late Night Vibe</span>
                  <strong className="text-[#E5A855]">4.9</strong>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {TESTIMONIALS.map((review) => (
            <div 
              key={review.id}
              className="p-6 rounded-3xl bg-gradient-to-br from-[#3A1A0E]/40 via-[#2B1209]/80 to-[#210D07]/95 border border-[#E5A855]/20 hover:border-[#E5A855]/45 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                {/* Stars and Platform */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#E5A855] text-sm">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#E5A855] bg-[#3A1A0E] px-2 py-0.5 rounded-full border border-[#E5A855]/30">
                    {review.source}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#FAF6EC]/85 leading-relaxed font-normal">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Favorite Item */}
              <div className="pt-4 mt-4 border-t border-[#E5A855]/15 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#FAF6EC] flex items-center gap-1.5">
                    <span>{review.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <span className="text-[11px] text-[#FAF6EC]/50">
                    Favorite: <strong className="text-[#E5A855] font-semibold">{review.dish}</strong>
                  </span>
                </div>
                <span className="text-[10px] text-[#FAF6EC]/40 font-medium">
                  {review.date}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className="mt-12 text-center">
          <a
            href={RESTAURANT_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2B1209] hover:bg-[#3A1A0E] border border-[#E5A855]/30 text-xs font-bold uppercase tracking-wider text-[#FAF6EC] transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 text-[#E5A855]" />
            <span>Read all 540+ Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FAF6EC]/50" />
          </a>
        </div>

      </div>
    </section>
  );
}
