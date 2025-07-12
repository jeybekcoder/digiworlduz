// 📄 Fayl: /digiworlduz/apps/admin-panel/tailwind.config.ts
// 🎯 Maqsad: Tailwind CSS sozlamalari – ranglar, shriftlar va content qamrovi
// ⚙️ Tailwind 4.x + Shadcn + Rubik shrift uchun to‘liq konfiguratsiya

import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#0075FF",
        secondary: "#FFB800",
      },
    },
  },
  plugins: [],
};

export default config;
