/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"]
      }
    },
  },
  daisyui: {
    themes: [
      "sunset",
      {
        "autumn": {
          ...require("daisyui/src/theming/themes")["autumn"],
          "primary-content": "#FAFAFA"
        }
      },
    ],
  },
  plugins: [require("daisyui")],
}

