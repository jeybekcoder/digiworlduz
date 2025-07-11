// 📄 Fayl: digiworlduz/apps/admin-panel/app/layout.tsx
// 🎯 Maqsad: Tailwind + Global styles ishlashi uchun asosiy layout komponenti

import "../src/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "DigiWorldUZ Admin Interface",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  );
}
