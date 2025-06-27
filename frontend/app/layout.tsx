// 📄 Fayl: layout.tsx
// 📁 Joylashuvi: digiworlduz/frontend/app/
// 🎯 Maqsad: Barcha sahifalarning umumiy tuzilmasi va global style’larni yuklash (shu jumladan globals.css)
// 🧠 Bu Next.js App Router strukturasidagi asosiy layout bo‘lib, barcha sahifalar shu komponent ichida ochiladi

import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "DigiWorld UZ",
  description: "Eng zamonaviy eCommerce platforma",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
