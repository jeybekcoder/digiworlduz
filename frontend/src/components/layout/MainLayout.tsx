// 📄 Fayl: src/components/layout/MainLayout.tsx
// 🎯 Maqsad: <main> konteyneri ichiga HomeSliderSection va HomeFeaturesSection komponentlarini ulash. Eni 1905px bo‘lishi uchun `max-w-[1905px] mx-auto` klassi ishlatilgan

"use client";

import React, { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import HomeSliderSection from "@/components/sections/HomeSliderSection";
import HomeFeaturesSection from "@/components/sections/HomeFeaturesSection";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* 🔄 Preloader ko‘rinadi */}
      <Preloader />

      {/* 📦 Kontent faqat yuklanishdan keyin chiqadi */}
      {isLoaded && (
        <main className="w-full max-w-[1905px] mx-auto text-[13px] font-normal leading-[24px] text-[#666] font-[Rubik,sans-serif] box-border">
          {/* 🎞 Slider + kategoriya menyusi */}
          <HomeSliderSection />

          {/* 🧩 Xizmat afzalliklari */}
          <HomeFeaturesSection isLoaded={isLoaded} />

          {/* 🔗 Keyingi bo‘limlar */}
          {children}
        </main>
      )}
    </>
  );
}
