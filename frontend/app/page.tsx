/* 📄 Fayl: digiworlduz/frontend/app/page.tsx
   📁 Joylashuvi: app/
   🎯 Maqsad: Asosiy sahifada HeaderTopBar, MainHeader, ScrollProgressButton va kontentni birlashtirish
   ⚙️ Texnologiyalar: React + TypeScript + Tailwind CSS + Next.js 14 App Router + TECHUS qoidalari */

import React from "react";
import HeaderTopBar from "@/components/HeaderTopBar";
import MainHeader from "@/components/MainHeader";
import ScrollProgressButton from "@/components/ScrollProgressButton";

export default function HomePage() {
  return (
    <>
      {/* 🔝 Yuqoridagi Top Bar */}
      <HeaderTopBar />

      {/* 🎯 Asosiy Header (Logo + Search + Actions) */}
      <MainHeader />

      {/* 🧾 Asosiy sahifa kontenti */}
      <main className="min-h-screen px-4 py-8 bg-white text-[#333]">
        <section className="max-w-[960px] mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center font-[Rubik]">
            Welcome to DigiWorld
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 font-[Rubik]">
            This is a sample homepage designed to showcase the Scroll Progress + Back to Top button component.
            You can scroll down to see how the button appears and tracks your scroll position.
          </p>

          {/* 🌀 Scroll uchun fake kontent */}
          <div className="space-y-6">
            {Array.from({ length: 30 }).map((_, i) => (
              <p key={i} className="text-gray-500 font-[Rubik]">
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
