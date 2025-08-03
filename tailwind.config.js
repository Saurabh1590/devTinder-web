// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sets 'Inter' as the default sans-serif font
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  // DaisyUI plugin for a component library and easy theming
  plugins: [require('daisyui')],

  // DaisyUI config
  daisyui: {
    // We'll stick with the 'night' theme for a modern, dev-friendly dark mode.
    // Other great options: 'dracula', 'cyberpunk', 'synthwave'
    themes: ["night"],
    darkTheme: "night", // If you want to force dark theme
  },
};