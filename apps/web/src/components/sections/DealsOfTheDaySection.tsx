// 📄 Fayl: src/components/sections/DealsOfTheDaySection.tsx
// 🧩 Maqsad: Layout section — ikkita mustaqil slider komponentini (DealsSlider, ElectronicsSlider) joylashtiradi

"use client";

import React from "react";
import DealsSlider from "@/components/sections/DealsSlider";
import ElectronicsSlider from "@/components/sections/ElectronicsSlider";

export default function DealsOfTheDaySection() {
  return (
    <section className="deal__area bg-[#f7f7f7] py-10" aria-labelledby="deals-heading">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <DealsSlider />
          <ElectronicsSlider />
        </div>
      </div>
    </section>
  );
}
