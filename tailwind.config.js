/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Enforce ONE single unified professional font: Plus Jakarta Sans
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        accent: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'monospace'],
      },
      colors: {
        // Brownie Chocolate Palette
        coffee: {
          950: '#170804',
          900: '#210D07',
          850: '#2B1209',
          800: '#3A1A0E',
          700: '#4D2314',
          milk: '#9A7461',
        },
        // Luminous Golden Caramel
        caramel: {
          DEFAULT: '#D49A5B',
          gold: '#E5A855',
          amber: '#F3BA6B',
          light: '#FDE68A',
        },
        // Authentic Studio Cream Palette matching frame 2
        cream: {
          DEFAULT: '#FAF6EC',
          studio: '#C8C3B7',
          light: '#FAF6EC',
          white: '#FDFBF7',
          soft: '#F5F1E4',
          muted: 'rgba(250, 246, 236, 0.75)',
        },
        // Botanical Mint (Fresh Accent)
        mint: {
          DEFAULT: '#10B981',
          light: '#34D399',
        }
      },
      backgroundImage: {
        // Decadent Brownie Gradients
        'gradient-brownie': 'linear-gradient(135deg, rgba(58, 26, 14, 0.85) 0%, rgba(33, 13, 7, 0.98) 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(58, 26, 14, 0.5) 0%, rgba(43, 18, 9, 0.85) 60%, rgba(33, 13, 7, 0.98) 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFFBEB 0%, #E5A855 50%, #D49A5B 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-caramel': '0 0 30px -5px rgba(229, 168, 85, 0.35)',
        'glow-gold': '0 0 35px -5px rgba(229, 168, 85, 0.25)',
      }
    },
  },
  plugins: [],
}
