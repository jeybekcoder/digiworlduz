// 📄 Fayl: frontend/tailwind.config.ts
// 🎯 Maqsad: DigiWorldUZ uchun Tailwind konfiguratsiyasi (TECHUS stack asosida)
// 📦 Maxsus ranglar, fontlar, content yo‘llari va responsiv container sozlamalari

import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.{css}",
    "./src/**/*.{ts,tsx}" // qo‘shimcha xavfsizlik uchun universal path
  ],
  theme: {
    extend: {
      colors: {
        digiBlue: "#0075FF",
        digiYellow: "#FFB800",
        digiGray: "#F8F9FA",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
}

export default config;
