import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Phone, CheckCircle2, Send, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import confetti from 'canvas-confetti';

export default function TableReservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    occasion: 'Casual Hangout',
    specialRequests: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const occasions = [
    'Casual Hangout',
    'Dessert Date ❤️',
    'Birthday Celebration 🎂',
    'Late Night Study / Work 💻',
    'Boba Meetup 🧋'
  ];

  const guestOptions = ['1 Person', '2 People', '3-4 People', '5-8 People', 'Large Group (9+)'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Formatted WhatsApp message for direct host notification
    let msg = `*🎉 NEW TABLE RESERVATION - YaMito Bites*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Name:* ${formData.name}\n`;
    msg += `*Phone:* ${formData.phone}\n`;
    msg += `*Date:* ${formData.date}\n`;
    msg += `*Time:* ${formData.time}\n`;
    msg += `*Party Size:* ${formData.guests}\n`;
    msg += `*Occasion:* ${formData.occasion}\n`;
    if (formData.specialRequests) {
      msg += `*Special Notes:* ${formData.specialRequests}\n`;
    }
    msg += `----------------------------------------\n`;
    msg += `Please confirm my table reservation!`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`;
    
    // Auto-open WhatsApp after a brief delay
    setTimeout(() => {
      window.open(url, '_blank');
    }, 800);
  };

  return (
    <section id="reservation" className="py-24 bg-[#210D07] text-[#FAF6EC] relative overflow-hidden border-t border-[#E5A855]/20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-r from-[#E5A855]/12 to-[#FAF6EC]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2B1209] border border-[#E5A855]/30 text-[#E5A855] text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Hangouts & Celebrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6EC] tracking-tight">
            Reserve Your Spot at <span className="text-gradient-gold">YaMito Bites</span>
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#FAF6EC]/70 font-normal">
            Planning a late-night dessert date, birthday party, or weekend chill session with friends in BTM Layout? Book ahead with zero booking fees!
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#3A1A0E] via-[#2B1209] to-[#210D07] border border-[#E5A855]/25 shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#FAF6EC]/80 mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-[#2B1209] border border-[#E5A855]/20 text-white placeholder-[#FAF6EC]/40 text-base sm:text-sm focus:outline-none focus:border-[#E5A855] focus:bg-[#3A1A0E] transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#FAF6EC]/80 mb-2">
                      WhatsApp Phone *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#2B1209] border border-[#E5A855]/20 text-white placeholder-[#FAF6EC]/40 text-base sm:text-sm focus:outline-none focus:border-[#E5A855] focus:bg-[#3A1A0E] transition-all"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#FAF6EC]/80 mb-2">
                      Reservation Date *
                    </label>
                    <div className="relative">
                      <input 
                        type="date"
                        required
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#2B1209] border border-[#E5A855]/20 text-white text-base sm:text-sm focus:outline-none focus:border-[#E5A855] focus:bg-[#3A1A0E] transition-all"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#FAF6EC]/80 mb-2">
                      Expected Time *
                    </label>
                    <input 
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#2B1209] border border-[#E5A855]/20 text-white text-base sm:text-sm focus:outline-none focus:border-[#E5A855] focus:bg-[#3A1A0E] transition-all"
                    />
                  </div>

                  {/* Party Size */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#FAF6EC]/80 mb-2">
                      Party Size
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#2B1209] border border-[#E5A855]/20 text-white text-base sm:text-sm focus:outline-none focus:border-[#E5A855]"
                    >
                      {guestOptions.map((g) => (
                        <option key={g} value={g} className="bg-[#2B1209]">{g}</option>
                      ))}
                    </select>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#FAF6EC]/80 mb-2">
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#2B1209] border border-[#E5A855]/20 text-white text-base sm:text-sm focus:outline-none focus:border-[#E5A855]"
                    >
                      {occasions.map((occ) => (
                        <option key={occ} value={occ} className="bg-[#2B1209]">{occ}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#FAF6EC]/80 mb-2">
                    Special Requests or Cake / Decoration Notes (Optional)
                  </label>
                  <textarea 
                    rows="3"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Tell us if it's someone's birthday or if you have specific seating preferences..."
                    className="w-full px-4 py-3 rounded-xl bg-[#2B1209] border border-[#E5A855]/20 text-white placeholder-[#FAF6EC]/40 text-base sm:text-sm focus:outline-none focus:border-[#E5A855] focus:bg-[#3A1A0E] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-full bg-[#FAF6EC] hover:bg-white text-[#170804] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#1A0D07]" />
                    <span>Confirm via WhatsApp (Instant Reply)</span>
                  </button>
                </div>

              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl border border-emerald-500/30">
                  ✓
                </div>
                <h3 className="font-extrabold text-2xl text-[#FAF3EB]">
                  Reservation Request Sent!
                </h3>
                <p className="text-sm text-[#FAF3EB]/70 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>! We’ve initiated your booking for <strong>{formData.guests}</strong> on <strong>{formData.date} at {formData.time}</strong>. WhatsApp has been opened for instant confirmation.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-[#FAF3EB] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Book Another Table
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
