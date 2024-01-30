/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-up": "fade-up 1s",
      },
      keyframes: {
        "fade-up": {
          from: {
            transform: "translate(0, 100px)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
  important: true,
};
