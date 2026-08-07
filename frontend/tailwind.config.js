/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'indian-saffron': '#ff9933',
        'indian-green': '#138808',
        'indian-blue': '#0066ff',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
