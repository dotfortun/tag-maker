/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: "#323439"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

