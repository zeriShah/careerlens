/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A47A8C', // Dusty Mauve
          hover: '#8C6677',   // Darker Dusty Mauve
        },
        background: '#F5F0E8', // Warm Ivory
        dark: {
          DEFAULT: '#222222', // Charcoal Black
          section: '#1E1E1E',
        },
        card: '#FFFFFF',
        border: '#E5DED2',     // Warm Border matching Ivory
        text: {
          primary: '#1A1A1A',   // Near Black
          secondary: '#8C8C8C', // Soft Gray
        },
        accent: '#A47A8C',      // Dusty Mauve
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(to right, #B56CFF, #FFB37A, #FF9A3C)',
      },
      borderRadius: {
        'lg': '12px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
