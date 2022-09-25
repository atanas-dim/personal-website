/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111111",
      },
      backgroundImage: {
        "hero-pattern": `radial-gradient( rgba(0, 0, 0, 0) 1px, ${colors.zinc["900"]} 1px )`,
        "radial-gradient-pink": `radial-gradient(circle, ${colors.pink["800"]} 0%, transparent 60% )`,
      },
      backgroundSize: {
        "4px": "4px 4px",
        "100vmin": "100vmin",
      },
    },
  },
  plugins: [],
};
