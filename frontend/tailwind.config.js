// 📄 Fayl: tailwind.config.ts

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ❗️src ichidagi barcha fayllar uchun
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"], // Rubik uchun qo‘shimcha
      },
    },
  },
  plugins: [],
}
