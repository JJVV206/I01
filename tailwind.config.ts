import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 22px 80px rgba(0, 0, 0, 0.38)",
        glow: "0 0 0 1px rgba(255, 255, 255, 0.05), 0 18px 80px rgba(0, 0, 0, 0.4)",
      },
      fontFamily: {
        sans: ["Avenir Next", "Helvetica Neue", "Segoe UI", "sans-serif"],
        mono: ["SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
      backgroundImage: {
        "hero-fade":
          "linear-gradient(180deg, rgba(7,7,8,0.12) 0%, rgba(7,7,8,0.35) 38%, rgba(7,7,8,0.92) 100%)",
        "panel-noise":
          "radial-gradient(circle at 12% 10%, rgba(255,255,255,0.06), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
