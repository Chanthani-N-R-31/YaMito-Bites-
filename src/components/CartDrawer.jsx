import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Tag, 
  ExternalLink
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onClearCart }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [orderType, setOrderType] = useState('takeaway'); // takeaway, delivery, dine-in
  const [customerName, setCustomerName] = useState('');
  const [addressOrTable, setAddressOrTable] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon === 'YAMITO10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'SWEETDEAL') {
    discount = Math.min(subtotal, 50);
  }

  const packagingFee = subtotal > 0 ? 25 : 0;
  const grandTotal = Math.max(0, subtotal - discount + packagingFee);

  const applyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'YAMITO10') {
      setAppliedCoupon('YAMITO10');
      try {
        confetti({ particleCount: 30, spread: 50 });
      } catch (e) {}
    } else if (code === 'SWEETDEAL') {
      setAppliedCoupon('SWEETDEAL');
      try {
        confetti({ particleCount: 30, spread: 50 });
      } catch (e) {}
    } else {
      setCouponError('Invalid coupon code. Try YAMITO10');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Generate WhatsApp Order Link
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `*🛒 NEW ORDER - YaMito Bites (BTM Layout)*\n`;
    message += `----------------------------------------\n`;
    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. *${item.quantity}x ${item.name}* — ₹${item.price * item.quantity}\n`;
      if (item.selectedOptions && item.selectedOptions.length > 0) {
        message += `   Extras: ${item.selectedOptions.join(', ')}\n`;
      }
      if (item.customizations) {
        message += `   Prefs: ${item.customizations.sweetness}, ${item.customizations.ice}\n`;
      }
    });
    message += `----------------------------------------\n`;
    message += `*Subtotal:* ₹${subtotal}\n`;
    if (discount > 0) {
      message += `*Coupon Discount (${appliedCoupon}):* -₹${discount}\n`;
    }
    message += `*Packaging & Handling:* ₹${packagingFee}\n`;
    message += `*TOTAL AMOUNT:* ₹${grandTotal}\n`;
    message += `----------------------------------------\n`;
    message += `*Order Type:* ${orderType.toUpperCase()}\n`;
    if (customerName) {
      message += `*Customer Name:* ${customerName}\n`;
    }
    if (addressOrTable) {
      message += `*Address / Table / Notes:* ${addressOrTable}\n`;
    }
    message += `----------------------------------------\n`;
    message += `Please confirm preparation time and payment QR link. Thank you!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Slide-over panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#210D07] border-l border-[#E5A855]/25 shadow-2xl flex flex-col justify-between text-left"
          >
            
            {/* Header */}
            <div className="p-5 border-b border-[#E5A855]/20 flex items-center justify-between bg-gradient-to-r from-[#3A1A0E] to-[#2B1209]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF6EC] text-[#170804] flex items-center justify-center shadow-md">
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#FAF6EC]">
                    Your Order Bag
                  </h3>
                  <p className="text-xs text-[#FAF6EC]/70">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} from YaMito Bites
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-[#FAF6EC]/60 hover:text-rose-400 px-2 py-1 rounded transition-colors cursor-pointer"
                    title="Empty bag"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              
              {cartItems.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="text-5xl mb-3">🧇</div>
                  <h4 className="font-bold text-lg text-[#FAF3EB] mb-1">Your bag is empty</h4>
                  <p className="text-xs text-[#FAF3EB]/60 mb-6 max-w-xs mx-auto">
                    Add crispy Belgian waffles, Boba drinks, or hot loaded fries to start your order!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF3EB] text-[#1A0D07] font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Items list */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div 
                        key={item.id}
                        className="p-3 rounded-2xl bg-[#2B1209] border border-[#E5A855]/20 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-sm text-[#FAF6EC] truncate">
                              {item.name}
                            </h5>
                            <span className="text-xs font-semibold text-[#E5A855]">
                              ₹{item.price} each
                            </span>
                            {item.selectedOptions && item.selectedOptions.length > 0 && (
                              <p className="text-[10px] text-[#FAF6EC]/60 truncate mt-0.5">
                                + {item.selectedOptions.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 bg-[#170804] border border-[#E5A855]/20 rounded-xl p-1 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 flex items-center justify-center text-xs cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-[#FAF6EC] text-xs w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-[#FAF6EC] text-[#170804] flex items-center justify-center text-xs font-bold cursor-pointer"
                          >
                            <Plus className="w-3 h-3 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Type Toggle */}
                  <div className="p-3.5 rounded-2xl bg-[#2B1209] border border-[#E5A855]/20">
                    <label className="text-xs font-bold text-[#FAF6EC]/80 uppercase tracking-wider block mb-2">
                      Order Fulfillment
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'takeaway', label: 'Takeaway' },
                        { id: 'delivery', label: 'Delivery' },
                        { id: 'dine-in', label: 'Dine In' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setOrderType(t.id)}
                          className={`py-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                            orderType === t.id
                              ? 'bg-[#FAF6EC] border-[#FAF6EC] text-[#170804] shadow-sm'
                              : 'bg-white/5 border-white/10 text-[#FAF6EC]/60 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* Customer Inputs */}
                    <div className="mt-3 space-y-2">
                      <input 
                        type="text" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your Name (Optional)"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#170804] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5A855]"
                      />
                      <input 
                        type="text" 
                        value={addressOrTable}
                        onChange={(e) => setAddressOrTable(e.target.value)}
                        placeholder={
                          orderType === 'dine-in' 
                            ? 'Table number or seating note' 
                            : orderType === 'delivery' 
                              ? 'Delivery Address (BTM Layout)' 
                              : 'Pickup time / Notes'
                        }
                        className="w-full px-3 py-2 text-base sm:text-xs rounded-xl bg-[#170804] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5A855]"
                      />
                    </div>
                  </div>

                  {/* Promo Code Box */}
                  <div className="p-3.5 rounded-2xl bg-[#2B1209] border border-[#E5A855]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-3.5 h-3.5 text-[#E5A855]" />
                      <span className="text-xs font-bold text-[#FAF6EC]">Have a Promo Coupon?</span>
                    </div>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Check className="w-4 h-4" />
                          <span>Code '{appliedCoupon}' Applied (-₹{discount})</span>
                        </div>
                        <button 
                          onClick={removeCoupon}
                          className="text-gray-400 hover:text-white text-xs underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="e.g. YAMITO10"
                          className="flex-1 px-3 py-2 text-base sm:text-xs rounded-xl bg-[#170804] border border-white/10 text-white placeholder-gray-500 uppercase tracking-wider focus:outline-none focus:border-[#E5A855]"
                        />
                        <button
                          onClick={applyCoupon}
                          className="px-4 py-2 min-h-[44px] rounded-xl bg-[#E5A855]/20 border border-[#E5A855]/40 text-[#E5A855] font-bold text-xs hover:bg-[#E5A855] hover:text-[#170804] transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-rose-400 mt-1.5">{couponError}</p>
                    )}
                  </div>

                  {/* Bill Details */}
                  <div className="p-3.5 rounded-2xl bg-[#2B1209] border border-[#E5A855]/20 space-y-2 text-xs text-[#FAF6EC]/80">
                    <div className="flex justify-between">
                      <span>Item Total</span>
                      <span className="text-white font-semibold">₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Coupon Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Packaging & Handling</span>
                      <span className="text-white font-semibold">₹{packagingFee}</span>
                    </div>
                    <div className="pt-2 border-t border-[#E5A855]/20 flex justify-between text-sm font-extrabold text-[#FAF6EC]">
                      <span>To Pay</span>
                      <span className="text-[#E5A855] text-base">₹{grandTotal}</span>
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Bottom Actions */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-[#170804] border-t border-[#E5A855]/20 space-y-2.5">
                
                {/* Primary WhatsApp Direct Checkout */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full min-h-[44px] py-3.5 px-4 rounded-2xl bg-[#FAF6EC] hover:bg-white text-[#170804] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <span className="text-lg">💬</span>
                  <span>Confirm Order via WhatsApp • ₹{grandTotal}</span>
                </button>

                {/* Delivery Partners fallback */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={RESTAURANT_INFO.deliveryPartners.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 rounded-xl bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-600/25 transition-all text-center"
                  >
                    <span>Order on Zomato</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={RESTAURANT_INFO.deliveryPartners.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 rounded-xl bg-orange-600/15 border border-orange-500/30 text-orange-400 text-xs font-bold hover:bg-orange-600/25 transition-all text-center"
                  >
                    <span>Order on Swiggy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-[10px] text-[#FAF6EC]/50 text-center pt-1">
                  Instant confirmation • Pay via UPI (GPay / PhonePe / Paytm) on delivery/pickup
                </p>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
