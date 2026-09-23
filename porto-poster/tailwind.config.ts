import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EDEAE4",
        ink: "#16140F",
        night: "#0A0A0A",
        cobalt: "#1B4FDB",
        coral: "#FF5A36",
        sun: "#FFC53D",
        moss: "#2F6E4E",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        body: ["var(--font-grotesk)"],
      },
    },
  },
  plugins: [],
};
export default config;
