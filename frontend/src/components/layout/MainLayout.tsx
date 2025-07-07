// 📄 Fayl: src/components/layout/MainLayout.tsx
// 🎯 Maqsad: <main> konteyneri ichiga HomeSliderSection ulangan holatda — barcha bloklar shu yerga ulab boriladi
//           Eni aniq 1905px bo‘lishi uchun `max-w-[1905px] mx-auto` klasslar bilan cheklangan

"use client";

import React from "react";
import HomeSliderSection from "@/components/sections/HomeSliderSection";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full max-w-[1905px] mx-auto text-[13px] font-normal leading-[24px] text-[#666] font-[Rubik,sans-serif] box-border">
      {/* Slider + kategoriya menyusi */}
      <HomeSliderSection />

      {/* Keyingi bo‘limlar */}
      {children}
    </main>
  );
}
