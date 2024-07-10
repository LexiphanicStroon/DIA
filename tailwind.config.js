/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'electric-blue': '#45c7ea',
        'dark-blue': '#2e3a4f',
      },
    },
  },
  plugins: [],
};
