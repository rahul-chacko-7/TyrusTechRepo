/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#15803d',
          greenLight: '#22c55e',
          forest: '#14532d'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

