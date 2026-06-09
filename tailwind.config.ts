import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#090A0F",
        panel: "#11131D",
        line: "rgba(255,255,255,0.12)",
        champagne: "#E8D6B8",
        coral: "#EF766F",
        mint: "#8DE0C5",
        skyglass: "#91B7FF"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(239, 118, 111, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
