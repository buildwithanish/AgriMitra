/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1fbf4",
          100: "#dcf6e4",
          200: "#bbebc9",
          300: "#8fdaaa",
          400: "#5cc182",
          500: "#349e61",
          600: "#257d4a",
          700: "#1f633d",
          800: "#1c5034",
          900: "#18422d",
          950: "#07170f"
        },
        accent: {
          50: "#fefde8",
          100: "#fff8c2",
          200: "#ffef85",
          300: "#ffe14e",
          400: "#ffd11a",
          500: "#f3b300",
          600: "#c98a00",
          700: "#9f6503",
          800: "#834f0c",
          900: "#6f4210"
        },
        slateGreen: "#9ec4a4"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(52, 158, 97, 0.18)",
        panel: "0 30px 80px rgba(7, 23, 15, 0.14)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at top left, rgba(92, 193, 130, 0.28), transparent 36%), radial-gradient(circle at top right, rgba(243, 179, 0, 0.18), transparent 34%), linear-gradient(180deg, rgba(7, 23, 15, 0.96), rgba(12, 41, 24, 0.86))"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Manrope'", "sans-serif"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
