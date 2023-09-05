/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary)",
        "secondary-color": "var(--secondary)",
      },
    },

    fontFamily: {
      custom: ["poppins-mono", "poppins", "sans-serif"],
    },
  },
  plugins: [],
};
