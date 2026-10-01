import type { Config } from "tailwindcss";

/* Tokens live as CSS custom properties in app/globals.css; this file only maps them. */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* brand hues as hex (same values as the tokens) so opacity modifiers like border-navy/10 keep working */
        navy: "#0B2B43",
        blue: { DEFAULT: "#2C86C7", tint: "#9CC9EA" },
        cyan: "#24B5C6",
        sand: "#D8C7A2",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        border: "var(--border)",
        rule: "var(--rule)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      spacing: {
        "section-lg": "var(--section-lg)",
        "section-md": "var(--section-md)",
        "section-sm": "var(--section-sm)",
        gutter: "var(--gutter)",
      },
      maxWidth: {
        wrap: "var(--wrap)",
      },
      borderRadius: {
        token: "var(--radius)",
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
