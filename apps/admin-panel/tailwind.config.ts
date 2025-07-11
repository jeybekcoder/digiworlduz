// 📄 Fayl: digiworlduz/apps/admin-panel/tailwind.config.ts
// 🎯 Maqsad: Tailwind konfiguratsiyasining TypeScript versiyasi – type-check + autocomplete bilan

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
