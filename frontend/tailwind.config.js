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
          DEFAULT: '#6750A4', // Purple Seed
          hover: '#5A4393',
        },
        background: '#FFFBFE', // Warm Surface
        card: '#F3EDF7',       // Surface Container
        border: '#E7E0EC',     // Surface Container Low / Recessed border
        text: {
          primary: '#1C1B1F',   // On Surface
          secondary: '#49454F', // On Surface Variant
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',

        // Material Design 3 Core tokens
        "md-background": "#FFFBFE",
        "md-on-background": "#1C1B1F",
        "md-primary": "#6750A4",
        "md-on-primary": "#FFFFFF",
        "md-secondary-container": "#E8DEF8",
        "md-on-secondary-container": "#1D192B",
        "md-tertiary": "#7D5260",
        "md-surface-container": "#F3EDF7",
        "md-surface-container-low": "#E7E0EC",
        "md-outline": "#79747E",
        "md-on-surface-variant": "#49454F",
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(to right, #6750A4, #7D5260, #E8DEF8)',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px', // MD3 Large (Standard Card)
        '3xl': '32px', // MD3 Extra Large (Dialogs, Sheets)
        '4xl': '48px', // MD3 Extra Extra Large (Hero)
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
