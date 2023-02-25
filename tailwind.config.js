/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#111111",
      },
      backgroundImage: {
        "radial-gradient-pink-light": `radial-gradient(circle, ${colors.pink["300"]} 0%, transparent 60% )`,
        "radial-gradient-pink-dark": `radial-gradient(circle, ${colors.pink["400"]} 0%, transparent 60% )`,
      },
      backgroundSize: {
        "100vmin": "100vmin",
      },
    },
  },
  plugins: [],
};
