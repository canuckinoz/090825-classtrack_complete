/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1A237E',
        sage: '#4A7C59',
        lavender: '#673AB7',
        yellowAccent: '#FFC107',
        terracottaAccent: 'rgba(183, 74, 55, 0.7)',
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
  },
  plugins: [],
};
