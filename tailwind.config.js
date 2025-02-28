/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        dark: "#121826",
        crimson: "#DE1544",
        emerald: "#c1dc45",
        silver: "#E0E0E0", // Ajustado para um branco acinzentado mais claro
        night: "#1A202C", // Ajustado para uma cor escura menos intensa
         // Ajustado para uma cor mais escura que night
      },
    },
  },
  plugins: [],
};
