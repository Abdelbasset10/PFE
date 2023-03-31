/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "pfe-blue":"#4268EE",
        "pfe-black":"#000000",
        "pfe-white":"#FFFFFF",
        "pfe-gray":"#28333B"
      }
    },
  },
  plugins: [],
}
