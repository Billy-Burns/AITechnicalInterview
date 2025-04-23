/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0A0A',
        'dark-surface': '#1A1A1A',
        'dark-border': '#2A2A2A',
        'primary': '#10B981',
        'primary-dark': '#059669',
        'text-primary': '#F3F4F6',
        'text-secondary': '#9CA3AF',
        'rainbow-start': '#FF0000',
        'rainbow-end': '#FF00FF',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'rainbow-gradient': 'linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF)',
      },
    },
  },
  plugins: [],
} 