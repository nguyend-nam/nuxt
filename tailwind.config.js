/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.gradient-text': {
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
}

