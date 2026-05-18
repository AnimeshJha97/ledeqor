import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#f8fafc",
        paper: "#070b12",
        surface: "#0d1420",
        panel: "#111c2b",
        muted: "#9aa8ba",
        line: "#223044",
        brand: "#22d3ee",
        accent: "#f59e0b",
        success: "#34d399",
        danger: "#fb7185"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
