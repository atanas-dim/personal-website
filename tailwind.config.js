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
        "hero-pattern-light": `radial-gradient( rgba(0, 0, 0, 0) 1px, ${colors.white} 1px )`,
        "hero-pattern-dark": `radial-gradient( rgba(0, 0, 0, 0) 1px, ${colors.zinc["900"]} 1px )`,
        "radial-gradient-pink-light": `radial-gradient(circle, ${colors.pink["600"]} 0%, transparent 60% )`,
        "radial-gradient-pink-dark": `radial-gradient(circle, ${colors.pink["400"]} 0%, transparent 60% )`,
      },
      backgroundSize: {
        "4px": "4px 4px",
        "100vmin": "100vmin",
      },
    },
  },
  plugins: [],
};
