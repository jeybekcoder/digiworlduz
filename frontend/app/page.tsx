/* ============================================
📄 Fayl: digiworlduz/frontend/app/page.tsx
🎯 Maqsad: Asosiy sahifada HeaderTopBar, MainHeader_DWT3_2, ScrollProgressButton va kontentni birlashtirish (Pixel-Perfect)
⚙️ Texnologiyalar: React + TypeScript + Tailwind CSS + Next.js 14 App Router + TECHUS qoidalari
============================================ */

import React from "react";
import HeaderTopBar from "@/components/HeaderTopBar";
import MainHeader_DWT3_2 from "@/components/MainHeader";
import ScrollProgressButton from "@/components/ScrollProgressButton";

export default function HomePage() {
  return (
    <>
      {/* 🔝 Yuqoridagi Top Bar */}
      <HeaderTopBar />

      {/* 🎯 Asosiy Header (Logo + Search + Actions) */}
      <MainHeader_DWT3_2 />

      {/* 🧾 Asosiy sahifa kontenti */}
      <main className="min-h-screen px-[15px] pt-[40px] pb-[80px] bg-white text-[#333]">
        <section className="max-w-[960px] mx-auto">
          <h1 className="text-[28px] font-bold mb-[18px] text-center font-rubik tracking-tight leading-[1.2]">
            Welcome to DigiWorld
          </h1>
          <p className="text-[#666] text-[16px] leading-[26px] mb-[48px] text-center font-rubik">
            This is a sample homepage designed to showcase the Scroll Progress + Back to Top button component.
            You can scroll down to see how the button appears and tracks your scroll position.
          </p>

          {/* 🌀 Scroll uchun fake kontent */}
          <div className="space-y-[24px]">
            {Array.from({ length: 30 }).map((_, i) => (
              <p key={i} className="text-[#888] font-rubik text-[14px] leading-[24px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              </p>
            ))}
          </div>
        </section>

        {/* 🔄 Scroll to Top + Progress Button */}
        <ScrollProgressButton />
      </main>
    </>
  );
}
