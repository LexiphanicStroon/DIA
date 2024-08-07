/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        gothamBold: ['Gotham', 'sans-serif'],
        gothamBook: ['Gotham Book', 'sans-serif'],
      },
      colors: {
        'electric-blue': '#45c7ea',
        'dark-blue': '#2e3a4f',
      },
    },
  },
  plugins: [],
};
