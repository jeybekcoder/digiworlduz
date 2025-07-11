// 📄 Fayl: apps/web/tailwind.config.ts
// 🎯 Maqsad: DigiWorldUZ uchun Tailwind konfiguratsiyasi (TECHUS stack asosida)
// 📦 Maxsus ranglar, fontlar, content yo‘llari, responsiv container va CSS variable-based ranglar

import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.css",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        digiBlue: "#0075FF",
        digiYellow: "#FFB800",
        digiGray: "#F8F9FA",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        popoverForeground: "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        primaryForeground: "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        secondaryForeground: "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        accentForeground: "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        destructiveForeground: "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      maxWidth: {
        container: "1440px"
      }
    }
  },
  plugins: []
}

export default config;
