// 📄 Fayl: /digiworlduz/apps/admin-panel/tailwind.config.ts

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
        background: "#f9fafb", // ✅ ring-offset-background uchun kerak
      },
    },
  },
  plugins: [],
};

export default config;
