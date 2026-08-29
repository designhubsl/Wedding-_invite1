/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7F0',
        cream: '#F5EEE1',
        beige: '#EAE0CC',
        champagne: '#E4D3B0',
        blush: '#E8CFC9',
        sage: '#8C9A85',
        'sage-dark': '#5F6B57',
        gold: '#B8985E',
        'gold-soft': '#CDB07C',
        umber: '#4A3B2E',
        'umber-light': '#6B5949',
        charcoal: '#2B2823',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 2px 8px rgba(74, 59, 46, 0.08), 0 12px 32px rgba(74, 59, 46, 0.10)',
        soft: '0 4px 24px rgba(74, 59, 46, 0.10)',
        envelope: '0 20px 60px rgba(74, 59, 46, 0.25), 0 8px 20px rgba(74, 59, 46, 0.15)',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: 0.5, transform: 'translateY(0px)' },
          '50%': { opacity: 1, transform: 'translateY(4px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.85 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.2s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
