// 📄 Fayl: frontend/src/components/Preloader.tsx
// 🎯 Maqsad: DigiWorldUZ uchun sahifa yuklanayotganda ko‘rsatiladigan preloader komponenti
// 📦 Texnologiyalar: React (Next.js client component), Tailwind CSS

"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 soniya simulyatsiya

    return () => clearTimeout(timeout);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
      <div className="w-16 h-16 border-4 border-digiBlue border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

// 💡 Eslatma:
// - "use client" → bu fayl faqat clientda ishlashi kerakligini bildiradi (useState + useEffect)
// - Preloaderni layout.tsx yoki loading.tsx ichida ishlatish mumkin
// - Tailwind bilan to‘liq animatsiyalangan spinner yaratilgan