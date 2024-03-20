/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "nord",
      "dracula"
    ],
  },
  plugins: [require("daisyui")],
}

