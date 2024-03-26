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

