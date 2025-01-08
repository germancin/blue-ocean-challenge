import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'cyber-blue': '#00FF9F',
        'electric-purple': '#9D00FF',
        'neon-pink': '#FF00E4',
        'dark-cyber': '#0A0A0A',
        'cyber-black': '#000000',
        'bright-blue': '#00FFFF',
        'white': '#FFFFFF',
        'light-gray': '#F8F9FA',
        'dark-gray': '#222222',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "glow": {
          "0%, 100%": { 
            filter: "drop-shadow(0 0 2em #39FF14)",
          },
          "50%": { 
            filter: "drop-shadow(0 0 0.5em #39FF14)",
          },
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "glow": "glow 3s ease-in-out infinite",
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to right, #39FF14, #00FF9F)',
        'neon-gradient': 'linear-gradient(to right, #FF00E4, #9D00FF)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;