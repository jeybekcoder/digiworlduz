// 📄 Fayl: tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0075FF",
        secondary: "#FFB800",
      },
    },
  },
  plugins: [],
};

export default config;
