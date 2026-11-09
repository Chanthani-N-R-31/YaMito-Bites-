import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BobaScrollytelling from './components/scrollytelling/BobaScrollytelling';
import AboutSection from './components/AboutSection';
import MarqueeTicker from './components/MarqueeTicker';
import SpecialtiesShowcase from './components/SpecialtiesShowcase';
import MenuPortfolio from './components/MenuPortfolio';
import ItemModal from './components/ItemModal';
import CartDrawer from './components/CartDrawer';
import TableReservation from './components/TableReservation';
import ReviewsSection from './components/ReviewsSection';
import LocationAndHours from './components/LocationAndHours';
import Footer from './components/Footer';
import FloatingOrderButton from './components/FloatingOrderButton';
import { MENU_ITEMS } from './data/restaurantData';

export default function App() {
  // Load initial cart from localStorage if present
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('yamito_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yamito_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Quick Add / Increment
  const handleQuickAdd = (itemId) => {
    const itemData = MENU_ITEMS.find((i) => i.id === itemId);
    if (!itemData) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...itemData, quantity: 1, selectedOptions: [] }];
      }
    });
  };

  // Decrement or remove
  const handleRemoveFromCart = (itemId) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((i) => i.id !== itemId);
      } else {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
    });
  };

  // Specific quantity update from cart drawer
  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Add from Modal with customizations
  const handleAddFromModal = (customizedItem, quantity) => {
    setCartItems((prev) => {
      // If an identical item already exists (same id and same selected options)
      const existingIdx = prev.findIndex(
        (i) =>
          i.id === customizedItem.id &&
          JSON.stringify(i.selectedOptions) ===
            JSON.stringify(customizedItem.selectedOptions)
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { ...customizedItem, quantity }];
      }
    });
  };

  const handleExploreMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFindFlavor = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#210D07] text-[#FAF6EC] flex flex-col font-sans selection:bg-[#E5A855] selection:text-[#170804]">
      {/* Header Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Pure Visual 3D Canvas Showcase (#home) */}
        <BobaScrollytelling />

        {/* Section 2: Portfolio-Style Craft & Philosophy (#about) */}
        <AboutSection onExploreMenu={handleExploreMenu} />

        {/* Endless Marquee Ribbon */}
        <MarqueeTicker />

        {/* Section 3: Signature Specialties (#specialties) */}
        <SpecialtiesShowcase onExploreMenu={handleExploreMenu} />

        {/* Section 4: Complete Physical Order Menu & Portfolio (#menu) */}
        <MenuPortfolio
          cartItems={cartItems}
          onQuickAdd={handleQuickAdd}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenModal={setActiveModalItem}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Table & Party Reservation */}
        <TableReservation />

        {/* Reviews & Social Proof */}
        <ReviewsSection />

        {/* Outlet Location & Timings */}
        <LocationAndHours />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Bar for Mobile */}
      <FloatingOrderButton
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Interactive Item Customization Modal */}
      <ItemModal
        item={activeModalItem}
        isOpen={!!activeModalItem}
        onClose={() => setActiveModalItem(null)}
        onAddToCart={handleAddFromModal}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
