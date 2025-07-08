// 📄 Fayl: frontend/src/app/layout.tsx
// 🎯 Maqsad: DigiWorldUZ saytining asosiy layout fayli
// 📦 Ichiga: Preloader, HeaderTop, HeaderMain, NavbarMain

import "@/styles/globals.css";
import Preloader from "@/components/Preloader";
import HeaderTop from "@/components/navbar/HeaderTop";
import HeaderMain from "@/components/layout/HeaderMain";
import NavbarMain from "@/components/layout/NavbarMain";
import { ReactNode } from "react";

export const metadata = {
  title: "DigiWorldUZ",
  description: "Professional e-commerce platform in Uzbekistan",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="relative bg-white dark:bg-black text-gray-900 dark:text-white font-[Rubik]">
        {/* 🔄 Loading animatsiyasi */}
        <Preloader />

        {/* 🔝 Yuqori aloqa paneli */}
        <HeaderTop />

        {/* 🔳 Asosiy header: logo, search, hotline */}
        <HeaderMain />

        {/* 📚 Asosiy navigatsiya menyu */}
        <NavbarMain />

        {/* 🔗 Sahifadagi kontent */}
        {children}
      </body>
    </html>
  );
}