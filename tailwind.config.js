/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxl: '1600px',
      md: '768px',
      sm: '300px',

      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: '1rem',
    },
    html: {
      margin: 0,
    },
    extend: {},
  },

  plugins: [],
};
