// 📄 Fayl: frontend/src/app/layout.tsx
// 🎯 Maqsad: DigiWorldUZ saytining asosiy layout fayli
// 📦 Ichiga Preloader, HeaderTop va HeaderMain komponentlari ulangan + Google Fonts ulanishi

import "@/styles/globals.css"
import Preloader from "@/components/Preloader"
import HeaderTop from "@/components/navbar/HeaderTop"
import HeaderMain from "@/components/layout/HeaderMain"
import { ReactNode } from "react"

export const metadata = {
  title: "DigiWorldUZ",
  description: "Professional e-commerce platform in Uzbekistan",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative bg-white dark:bg-black text-gray-900 dark:text-white font-[Rubik]">
        <Preloader />
        <HeaderTop />
        <HeaderMain />
        {children}
      </body>
    </html>
  )
}

// 💡 Izoh:
// - `<head>` bo‘limida Rubik font Google Fonts orqali ulandi
// - `font-[Rubik]` body’ga berildi — barcha elementlarda ishlaydi
// - `Preloader`, `HeaderTop` va `HeaderMain` dizaynning boshlang‘ich elementlari sifatida joylashtirildi