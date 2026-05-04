/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#415167",
        accent: "#c7a17a",
        cream: "#f9f5e8",
        ink: "#151d28",
        mist: "#edf0f5",
        paper: "#f9fbff",
        danger: "#db6c6c",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 24px rgba(21, 29, 40, 0.12)",
      },
    },
  },
  plugins: [],
};
