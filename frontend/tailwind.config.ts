// 📄 Fayl: tailwind.config.ts
// 📁 Joylashuvi: digiworlduz/frontend/
// 🎯 Maqsad: Tailwind CSS’ni Next.js loyihasida to‘liq faollashtirish va "app/", "components/" papkalarida ishlashini ta’minlash
// 🧠 Ushbu fayl Tailwind'ning qayerda ishlashini belgilaydi va kerakli kengaytmalarni (dark mode, pluginlar) sozlaydi

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: []
};

export default config;
