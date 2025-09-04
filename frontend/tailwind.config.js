/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          500: "#FF6F00",
          600: "#E65100"
        }
      }
    },
  },
  plugins: [],
}
