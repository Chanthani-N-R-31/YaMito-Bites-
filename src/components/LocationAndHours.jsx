import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  ExternalLink, 
  ChevronDown, 
  Copy,
  Check
} from 'lucide-react';
import { RESTAURANT_INFO, FAQS } from '../data/restaurantData';
import { getCafeStatus } from '../utils/timeHelper';

export default function LocationAndHours() {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const status = getCafeStatus();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 bg-[#210D07] text-[#FAF6EC] relative overflow-hidden border-t border-[#E5A855]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2B1209] border border-[#E5A855]/30 text-[#E5A855] text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us in BTM Layout</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6EC] tracking-tight">
            Find <span className="text-gradient-gold">YaMito Bites</span>
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#FAF6EC]/70 font-normal">
            Conveniently situated on 18th Main Road in BTM 2nd Stage, near Canara Bank. Open late until 1:00 AM!
          </p>
        </div>

        {/* Location & Schedule Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#3A1A0E]/60 via-[#2B1209]/85 to-[#210D07]/95 border border-[#E5A855]/25 shadow-2xl space-y-6">
              
              {/* Live Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5A855]/15">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  <span className={`text-sm font-bold ${status.isOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {status.statusText}
                  </span>
                </div>
                <span className="text-xs text-[#FAF6EC]/60 font-medium">BTM 2nd Stage</span>
              </div>

              {/* Address block with Copy Button */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5A855]">
                  <MapPin className="w-4 h-4" />
                  <span>Cafe Address</span>
                </div>
                <p className="text-sm text-[#FAF6EC]/85 leading-relaxed font-normal">
                  {RESTAURANT_INFO.address}
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#FAF6EC]/80 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
                  </button>
                  <a
                    href={RESTAURANT_INFO.deliveryPartners?.googleMaps || "https://maps.google.com/?q=YaMito+Bites+BTM+Layout+Bangalore"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5A855]/20 hover:bg-[#E5A855] text-xs font-bold text-[#E5A855] hover:text-[#170804] transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Hours Table */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5A855]">
                  <Clock className="w-4 h-4" />
                  <span>Cafe Timings</span>
                </div>
                <div className="space-y-2 text-xs text-[#FAF6EC]/80">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span>Monday – Sunday</span>
                    <strong className="text-white">10:00 AM – 1:00 AM</strong>
                  </div>
                  <div className="flex justify-between py-1.5 text-emerald-400 font-semibold">
                    <span>Late Night Deliveries</span>
                    <span>Till 1:00 AM Every Night</span>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Cafe</span>
                </a>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20YaMito%20Bites,%20I%20have%20an%20inquiry!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FAF6EC] hover:bg-white text-[#170804] font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>WhatsApp Us</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Interactive Google Map & Location Preview */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <div className="rounded-3xl overflow-hidden border border-[#E5A855]/25 shadow-2xl relative min-h-[440px] flex-1 flex flex-col bg-[#170804]">
              
              {/* Interactive Google Map iframe */}
              <div className="relative w-full h-[320px] sm:h-[350px] bg-[#170804] overflow-hidden">
                <iframe
                  title="YaMito Bites Google Maps"
                  src={`https://maps.google.com/maps?q=${RESTAURANT_INFO.coordinates?.lat || 12.914002},${RESTAURANT_INFO.coordinates?.lng || 77.610864}&hl=en&z=16&output=embed`}
                  className="w-full h-full border-0 filter brightness-95 contrast-105"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Pill */}
                <div className="absolute top-3 left-3 bg-[#210D07]/90 backdrop-blur-md border border-[#E5A855]/30 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#FAF6EC]">Live Location • 18th Main BTM</span>
                </div>
              </div>

              {/* Map Information & Directions Action */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-[#3A1A0E]/80 via-[#2B1209] to-[#210D07] border-t border-[#E5A855]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📍</span>
                    <strong className="font-extrabold text-sm sm:text-base text-white">
                      YaMito Bites
                    </strong>
                  </div>
                  <p className="text-xs text-[#FAF6EC]/70">
                    {RESTAURANT_INFO.landmark} • Bengaluru, Karnataka 560076
                  </p>
                </div>

                <a
                  href={RESTAURANT_INFO.deliveryPartners?.googleMaps || "https://maps.google.com/?q=YaMito+Bites+BTM+Layout+Bangalore"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#FAF6EC] hover:bg-white text-[#170804] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#170804]" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#170804]" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto pt-6 text-left">
          <h3 className="text-center font-extrabold text-2xl text-white mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-gradient-to-br from-[#3A1A0E]/30 via-[#2B1209]/70 to-[#210D07]/90 border border-[#E5A855]/15 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-sm text-[#FAF6EC] hover:text-[#E5A855] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#E5A855] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#FAF6EC]/70 leading-relaxed font-normal border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
