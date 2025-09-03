/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F4E6CE',
        verde: {
          600: '#38331E', // cor principal do botão
          700: '#2D2A17', // hover
          500: '#4B4729', // foco
        },
        gray: {
          800: '#2d2d2d',
          600: '#4a4a4a',
        },
      },
    },
  },
  plugins: [],
};
