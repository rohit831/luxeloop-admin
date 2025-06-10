/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          // Sophisticated blacks and grays
          obsidian: '#0B0B0F',
          charcoal: '#1A1A1F',
          slate: '#2A2A35',
          ash: '#3A3A45',
          dove: '#6B6B7B',
          silver: '#9CA3AF',
          pearl: '#E5E7EB',
          ivory: '#F9FAFB',
          
          // Premium golds
          bronze: '#CD7F32',
          champagne: '#F7E7CE',
          gold: '#D4AF37',
          amber: '#FFBF00',
          
          // Sophisticated emerald accents
          emerald: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          
          // Luxury cream tones
          cream: '#FDF6E3',
          linen: '#FAF0E6',
          vanilla: '#F3E5AB',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'luxe-gradient': 'linear-gradient(135deg, #0B0B0F 0%, #1A1A1F 50%, #2A2A35 100%)',
        'luxe-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFBF00 50%, #CD7F32 100%)',
        'luxe-emerald': 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
        'luxe-emerald-gradient': 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
        'luxe-card': 'linear-gradient(135deg, #FDF6E3 0%, #FAF0E6 100%)',
        'luxe-premium': 'linear-gradient(135deg, #0B0B0F 0%, #1A1A1F 25%, #D4AF37 25.1%, #D4AF37 26%, #1A1A1F 26.1%, #2A2A35 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
} 