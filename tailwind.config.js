/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        couture: {
          burgundy: '#5B172E',
          'burgundy-dark': '#431021',
          'burgundy-light': '#7A2240',
          gold: '#9B783E',
          'gold-light': '#C5A059',
          'gold-dark': '#785A28',
          cream: '#FAF6F0',
          'cream-dark': '#F2ECE1',
          card: '#FFFFFF',
          border: '#E8DFD3',
          muted: '#8C827A'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

