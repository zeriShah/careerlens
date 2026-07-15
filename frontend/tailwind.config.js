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
          DEFAULT: '#1DB954', // Spotify Green
          hover: '#1aa34a',
        },
        background: '#FFFFFF', // Canvas background
        card: '#FFFFFF',
        border: '#EBEBEB',
        text: {
          primary: '#121212',   // Near Black
          secondary: '#5B5B5B', // Slate Gray
        },
        success: '#1DB954',
        warning: '#F59E0B',
        danger: '#E22134', // Red

        // Core Connect UIUX compatibility
        "cl-green": "#1DB954",
        "cl-dark": "#121212",
        "cl-muted": "#5B5B5B",
        "cl-border": "#EBEBEB",
        "cl-bg": "#E8E9E8",
        "cl-sidebar": "#FBFBFB",
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(to right, #1DB954, #121212, #5B5B5B)',
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '18px',
        '3xl': '24px',
        'full': '9999px',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        card: '0 30px 70px rgba(18, 18, 18, 0.14)',
      }
    },
  },
  plugins: [],
}
