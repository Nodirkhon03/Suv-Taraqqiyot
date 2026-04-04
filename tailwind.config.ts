import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B2B43",
        engineering: "#2C86C7",
        cyan: "#24B5C6",
        sand: "#D8C7A2",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.02em",
        widest: "0.08em",
      },
      lineHeight: {
        relaxed: "1.7",
      },
    },
  },
  plugins: [],
};
export default config;
