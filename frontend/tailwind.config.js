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
          DEFAULT: '#FFBB00', // Gold Yellow
          hover: '#E8A800',
        },
        background: '#ffffff', // canvas
        dark: {
          DEFAULT: '#0D0D0D', // ink / marketing-bg
          section: '#1A1A1A',
        },
        card: '#ffffff',
        border: '#E5E5E5',
        text: {
          primary: '#0D0D0D',
          secondary: '#6B7280',
        },
        accent: '#FFBB00',
        success: '#22C55E',
        danger: '#EF4444',
        
        // Exact names from downloads config
        "on-primary": "#0D0D0D",
        "primary-hover": "#E8A800",
        "ink": "#0D0D0D",
        "ink-muted": "#6B7280",
        "canvas": "#ffffff",
        "surface-1": "#F9F9F9",
        "surface-2": "#F0F0F0",
        "marketing-bg": "#0D0D0D",
        "marketing-ink": "#F5F5F5",
        "marketing-muted": "#888888",
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(to right, #FFBB00, #FFD254, #E8A800)',
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
