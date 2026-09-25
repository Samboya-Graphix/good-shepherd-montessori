/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4fd',
          100: '#dde6fb',
          200: '#c2d4f8',
          300: '#99b9f3',
          400: '#6995eb',
          500: '#4372e2',
          600: '#2d54d4',
          700: '#2542bf',
          800: '#23379b',
          900: '#181b66', // Authentic deep navy blue matching school logo outer ring
          950: '#101344', // Rich midnight navy
        },
        accent: {
          blue: '#1e40af', // Classic rich royal blue
          light: '#3b82f6', // Bright clear blue
          soft: '#eff6ff',
        },
        gold: {
          500: '#d97706',
          600: '#b45309',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(24, 27, 102, 0.06)',
        'card': '0 10px 30px -5px rgba(24, 27, 102, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 20px 40px -10px rgba(24, 27, 102, 0.14)',
      },
      screens: {
        'xs': '420px',
      }
    },
  },
  plugins: [],
}
