/* 📄 Fayl: digiworlduz/frontend/app/layout.tsx */
/* 🎯 Maqsad: Barcha sahifalarda umumiy layout. Rubik font + Preloader + Tailwind antialiased. */
/* 💡 Texnologiyalar: Next.js 14 App Router, React, Tailwind CSS, TypeScript */

import "../styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Preloader from "@/components/Preloader";

// ✅ Rubik shriftini Next.js orqali dinamik yuklash
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigiWorld UZ - Onlayn Do‘kon",
  description: "Raqamli texnika va elektronika uchun onlayn xarid qilish markazi",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={`${rubik.className} font-rubik antialiased text-[13px] leading-[24px] text-[#666]`}>
        {/* 🔁 Yuklanishda bir marta ko‘rinadigan preloader */}
        <Preloader />

        {/* 🔲 Barcha sahifalar uchun umumiy kontent */}
        {children}
      </body>
    </html>
  );
}
