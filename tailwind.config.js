/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      // Burada genişletmelerinizi ekleyin
    },
  },
  plugins: [
    // Scrollbar gizleme için özel plugin
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities);
    }
  ],
};
