/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./**/*.tsx', './src/scripts/*.ts'],
  theme: {
    extend: {
      screens: {
        xs: '398px',
      },
      maxHeight: {
        98: '310px',
        100: '330px',
        102: '365px',
      },
      transitionProperty: { 'max-w': 'max-width' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
