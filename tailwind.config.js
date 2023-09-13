/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'main-outfit': ['Outfit', 'sans-serif'],
        'main-poppins': ['Poppins', 'sans-serif'],
        'main-roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        'main-purple': 'hsl(259, 100%, 65%)',
        'main-light-red': 'hsl(0, 100%, 67%)',
        'main-white': 'hsl(0, 0%, 100%)',
        'main-off-white': 'hsl(0, 0%, 94%)',
        'main-smokey-grey': 'hsl(0, 1%, 44%)',
        'main-off-black': 'hsl(0, 0%, 8%)'
      }
    },
  },
  plugins: [],
}
