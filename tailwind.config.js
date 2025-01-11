/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  theme: {
    extend: {
        fontFamily: {
            sans: ["Montserrat", "sans-serif"], // Add Montserrat as the default font
          },
        colors: {
            "primary-light": "#4f80ff",
            "primary-dark": "#3a62cc",
         // Light mode colors
         accentLight: "#FF69B4", // Pastel pink
         navbarLight: "#87CEEB", // Light blue
         bannerLight: "#C9E4CA", // Soft green
         buttonLight: "#FFC107", // Bright orange
         textLight: "#333333", // Dark gray
 
         // Dark mode colors
         accentDark: "#8e44ad", // Deep plum
         navbarDark: "#2c3e50", // Deep blue
         bannerDark: "#3498db", // Vibrant blue
         buttonDark: "#e74c3c", // Deep red
         textDark: "#ffffff", // White
          },
    },
  },
//   plugins: [
//     require('daisyui'),
//   ],
daisyui: {
    themes: ["light", "dark"],
  },
}

