/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f6fc",
          100: "#e0eef9",
          200: "#c2def2",
          300: "#93c5e6",
          400: "#08478B",  // Main blue
          500: "#08478B",
          600: "#08478B",
          700: "#06379a",
          800: "#0a2d69",
          900: "#07223a",
        },
        secondary: {
          50: "#f5f9f0",
          100: "#e8f4df",
          200: "#cfe9c1",
          300: "#a8d994",
          400: "#469838",  // Main green
          500: "#469838",
          600: "#3a7d2d",
          700: "#2d6624",
          800: "#245019",
          900: "#1a3610",
        },
      },
      fontFamily: {
        sans: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 20px 25px rgba(0, 0, 0, 0.15)",
        modal: "0 25px 50px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
