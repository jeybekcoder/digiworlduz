// 📄 Fayl: digiworlduz/frontend/components/Preloader.tsx
// 📁 Joylashuvi: digiworlduz/frontend/components/
// 🌟 Maqsad: Zamonaviy, animatsiyalangan preloader komponenti
// 💡 Texnologiyalar: React + TypeScript + Tailwind CSS (Next.js 14 Client Component)

"use client";

import React, { useEffect, useState } from "react";

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsLoading(false);
        document.body.classList.remove("overflow-hidden");
      }, 700);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ease-in-out transform bg-white ${
        isFadingOut ? "opacity-0 scale-90" : "opacity-100 scale-100"
      }`}
      aria-label="Loading... Please wait."
      role="status"
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin-slow"></div>
          <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-300 rounded-full animate-ping-slow"></div>
        </div>

        {/* Shimmer Loading Text */}
        <p className="text-base md:text-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent animate-pulse">
          Loading the future...
        </p>
      </div>
    </div>
  );
};

export default Preloader;

// 📜 Eslatma: tailwind.config.js faylingizda quyidagilar bo'lishi shart
// animation: {
//   'spin-slow': 'spin 2.5s linear infinite',
//   'ping-slow': 'ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite',
// },
