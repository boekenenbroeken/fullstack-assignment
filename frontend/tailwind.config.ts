/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '1280': '1280px',
      },
      keyframes: {
        race: {
          '0%': { transform: 'translate(0, -50%)' },
          '100%': { transform: 'translate(100%, -50%)' },
        },
      },
      animation: {
        race: 'race 2s linear infinite',
      },
    },
  },
  plugins: [],
};
