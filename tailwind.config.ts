import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: "#e4deff",
          lighter: "#7695FF",
          DEFAULT: "#2563EB",
          darker: "#0036B2",
          darkest: "#0036b2"
        },
        secondary: {
          lightest: "#ecfeff",
          DEFAULT: "#8ef0ff"
        },
        tertiary: {
          DEFAULT: "#635bb5"
        },
        error: "#dc2626",
        alert: {
          error: "#ffebee",
          warning: "#fff7ed",
          success: "#e3f2fd",
          info: "#e8eaf6"
        },
        monochrome: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121"
        }
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" }
        },
        "fade-out": {
          // "100%": { opacity: "100%" },
          "100%": { opacity: "100%", background: "#7499ff" },
          "0%": { opacity: "0%", background: "#740000" }

          // "0%": { opacity: "0%" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.55s ease-in-out",
        "fade-out": "fade-out 5s ease-in-out"
      }
    }
  },
  plugins: []
}
export default config
