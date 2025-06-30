/* 📄 Fayl: digiworlduz/frontend/components/ScrollProgressButton.tsx */
/* 🌟 Maqsad: Sahifa skroll qilinganda paydo bo‘ladigan "Back to Top" tugmasi va scroll progress indikatorini birlashtirgan zamonaviy, interaktiv komponent yaratish.
   📌 Yangi versiya: Pixel-perfect SVG ring bilan 0.11111px aniqlikda
   💡 Texnologiyalar: React + TypeScript + Tailwind CSS (Next.js 14 uchun, Client Component) */

"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "lucide-react";

const ScrollProgressButton: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const percent = totalHeight ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollPercent(percent);
      setIsVisible(currentScrollY > 100);
    };

    const onScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 22;
  const stroke = 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-[999] w-[48px] h-[48px] rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg group
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* SVG Progress Ring */}
      <svg
        className="absolute top-0 left-0 rotate-[-90deg]"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="#facc15"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-150 ease-out"
        />
      </svg>

      {/* Icon */}
      <ArrowUpIcon className="relative z-10 w-5 h-5 text-gray-600 group-hover:text-yellow-400 transition-colors duration-200" />
    </button>
  );
};

export default ScrollProgressButton;
