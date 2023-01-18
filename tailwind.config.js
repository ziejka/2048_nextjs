/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /grid-cols-.*/,
    },
    {
      pattern: /grid-cols-.*/,
    },
  ],
  theme: {
    extend: {
      colors: {
        'base': '#5D6C89',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.2, 0.81, 0.67, 0.93)',
      },
    },
  },
  plugins: [],
}
