// 📄 Fayl: src/hooks/useAutoplaySlider.ts
// 🎯 Maqsad: KeenSlider uchun autoplay + pause-on-hover funksiyasini reusable hook orqali boshqarish (callback ref bilan moslashtirildi + delay + window blur qo‘llab-quvvatlandi)

import { useEffect, useRef } from "react";
import { KeenSliderInstance } from "keen-slider/react";

export function useAutoplaySlider(
  instanceRef: React.MutableRefObject<KeenSliderInstance | null>,
  delay: number = 4000 // ⏱️ Slider aylanish vaqti, default: 4000ms
) {
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (instanceRef.current && !autoplayRef.current) {
      autoplayRef.current = setInterval(() => {
        instanceRef.current?.next();
      }, delay);
    }
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    // Boshlanishda autoplay
    startAutoplay();

    // Window blur/focus holatida autoplay boshqarish
    const handleBlur = () => stopAutoplay();
    const handleFocus = () => startAutoplay();

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      stopAutoplay();
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [delay]);

  return {
    startAutoplay,
    stopAutoplay,
  };
}