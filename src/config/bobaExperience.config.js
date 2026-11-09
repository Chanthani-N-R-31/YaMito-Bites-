/**
 * Boba Scrollytelling Experience Configuration
 * Luxury Patisserie & Artisan Coffee Edition:
 * Hero: Warm Light Cream Studio (#EEEBDC / #FAF6EC)
 * Cafe & Menu: Rich Brownie Chocolate (#210D07 / #2B1209),
 * Light French Vanilla Cream & Pure White (#FAF6EC / #FFFFFF),
 * and Salted Caramel Gold (#E5A855 / #D49A5B).
 */

export const BOBA_CONFIG = {
  brand: {
    name: "YaMito Bites",
    stylizedName: "YaMito Bites",
    tagline: "Artisan Boba & Patisserie",
    subTagline: "Molten Coffee Ganache • Slow-Pulled Teas • Crispy Belgian Waffles",
    logo: "/yamito-logo.png",
    rating: "4.9 ⭐ BTM 2nd Stage, Bangalore",
    colors: {
      // 1. Natural Studio Cream matching frame 2 master frames exactly
      creamStudio: "#C8C3B7",
      creamLight: "#FAF6EC",
      creamWhite: "#FDFBF7",
      whitePure: "#FFFFFF",

      // 2. Rich Brownie Chocolate Palette (Warm Baked Fudge Brownie)
      coffeeDark: "#170804",
      coffeeBackground: "#210D07",
      coffeeCard: "#2B1209",
      coffeeGanache: "#3A1A0E",
      coffeeRoast: "#4D2314",

      // 3. Caramel Gold Accents (Warm Patisserie Gold)
      caramelGold: "#E5A855",
      caramelAmber: "#D49A5B",
      mintBotanical: "#10B981",

      background: "#EEEBDC",
      pillBg: "#210D07",
      pillText: "#FAF6EC",
    },
  },

  sequence: {
    totalFrames: 190,
    criticalThreshold: 15,
    frameWidth: 1920,
    frameHeight: 1080,
    aspectRatio: 16 / 9,
    framePath: (index) => `/frames/frame_${String(index + 1).padStart(4, "0")}.webp`,
    fallbackFramePath: (index) => `/frames/frame_${String(index + 1).padStart(4, "0")}.jpg`,
    focalPoint: {
      desktop: { x: 0.5, y: 0.46 }, // Lifted so straw and dome have ample clearance below navbar
      mobile: { x: 0.5, y: 0.52 },
    },
  },

  scroll: {
    containerHeight: "260vh",
    spring: {
      stiffness: 140,
      damping: 30,
      mass: 0.15,
    },
  },

  milestones: [
    {
      id: "hero",
      phaseIndex: 0,
      range: [0.0, 0.20],
      position: "left",
      scriptTitle: "Iced Chocolate",
      badge: "Artisan Selection • Chapter 01",
      headline: "Pour. Layer. Unleash.",
      ingredientsLabel: "INGREDIENTS",
      ingredientsList: "Single-origin Belgian dark chocolate, slow-simmered Okinawa brown sugar boba, whole dairy cream, roasted royal Assam tea.",
      metrics: [
        { value: "72%", label: "COCOA" },
        { value: "90m", label: "BOBA SIMMER" },
        { value: "0%", label: "DILUTION" },
        { value: "2°C", label: "CHILL" },
      ],
      price: "₹219",
      unit: "/ 500 ML",
      cta: "ADD TO BAG",
    },
    {
      id: "ingredients",
      phaseIndex: 1,
      range: [0.20, 0.45],
      position: "left",
      scriptTitle: "Mint & Ganache",
      badge: "Extraction • Chapter 02",
      headline: "Cocoa. Mint. Pure dark chocolate.",
      ingredientsLabel: "BOTANICAL INFUSION",
      ingredientsList: "Crushed cacao nibs, garden-fresh spearmint infusion, and bean-to-bar velvet chocolate cascading over chilled cream.",
      metrics: [
        { value: "100%", label: "RAW CACAO" },
        { value: "MINT", label: "HAND-PICKED" },
        { value: "MUSCOVADO", label: "SUGAR" },
        { value: "SILK", label: "TEXTURE" },
      ],
      price: "₹219",
      unit: "/ 500 ML",
      cta: "EXPLORE CRAFT",
    },
    {
      id: "liquid-arc",
      phaseIndex: 2,
      range: [0.45, 0.70],
      position: "right",
      scriptTitle: "Velvet Collision",
      badge: "Synthesis • Chapter 03",
      headline: "Velvet milk tea meets molten fudge.",
      ingredientsLabel: "KINETIC EQUILIBRIUM",
      ingredientsList: "Suspended in dynamic balance: hot bittersweet fudge ganache shocks against sub-zero crystal-chilled royal tea.",
      metrics: [
        { value: "ASSAM", label: "ROASTED TEA" },
        { value: "2x", label: "GANACHE" },
        { value: "ZERO", label: "PRESERVATIVE" },
        { value: "FRESH", label: "TO ORDER" },
      ],
      price: "₹219",
      unit: "/ 500 ML",
      cta: "SEE THE LAYERS",
    },
    {
      id: "exploded-reveal",
      phaseIndex: 3,
      range: [0.70, 0.90],
      position: "left",
      scriptTitle: "Deconstructed",
      badge: "Architecture • Chapter 04",
      headline: "Every layer, suspended.",
      features: [
        {
          title: "Slow-Cooked Tapioca Pearls",
          desc: "Warm boba simmered in Okinawa brown cane sugar for 90 minutes",
          accent: "#E5A855",
        },
        {
          title: "Density-Chill Crystal Ice",
          desc: "Clear zero-dilution ice cubes that preserve silky cream consistency",
          accent: "#FAF6EC",
        },
        {
          title: "72% Molten Cocoa Ganache",
          desc: "Pure bean-to-bar dark chocolate poured in ribbons along the perimeter",
          accent: "#D49A5B",
        },
      ],
    },
    {
      id: "final-hold",
      phaseIndex: 4,
      range: [0.90, 1.0],
      position: "bottom",
      scriptTitle: "Savor the Collision",
      badge: "Perfection • Finale",
      headline: "Handcrafted for True Chocolate Lovers.",
      subline: "Freshly brewed in small batches at YaMito Bites. Take the first sip or explore our complete artisan dessert menu.",
      price: "₹219",
      unit: "/ 500 ML",
      actions: [
        {
          id: "order-now",
          label: "ADD TO BAG",
          variant: "primary",
          targetId: "menu",
        },
        {
          id: "find-flavor",
          label: "EXPLORE MENU",
          variant: "secondary",
          targetId: "specialties",
        },
      ],
      socialProof: "Served fresh daily • 4.9 ★ from 1,800+ dessert lovers in Bangalore",
    },
  ],
};
