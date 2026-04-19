/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B1B4D',
        accent: '#D4AF37',
        background: '#F5F3ED',
        secondary: {
          terracotta: '#B85D3E',
          sage: '#6B8069',
        }
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        source: ['"Source Serif Pro"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
