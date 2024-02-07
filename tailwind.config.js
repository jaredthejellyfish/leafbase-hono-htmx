/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./**/*.tsx', './src/scripts/*.ts'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
