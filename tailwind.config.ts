import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cinema-black": "#0a0a0a",
        "cinema-dark": "#0d0d1a",
        "cinema-navy": "#1a1a2e",
        "cinema-gold": "#c9a84c",
        "cinema-amber": "#d4a017",
        "cinema-red": "#8b1a1a",
        "cinema-cream": "#f5f0e8",
        "cinema-parchment": "#e8dcc8",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(4%, -1%)" },
          "50%": { transform: "translate(-3%, 3%)" },
          "60%": { transform: "translate(2%, -4%)" },
          "70%": { transform: "translate(-4%, 1%)" },
          "80%": { transform: "translate(1%, -2%)" },
          "90%": { transform: "translate(-2%, 4%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
