// 📄 Fayl: src/components/ui/CountdownCircle.tsx
// ⏱️ Maqsad: Timer raqamlarini biroz pastroqqa tushirish, aylana soyasini olib tashlash, rang va spacingni rasm asosida 1:1 qilib sozlash

import React from "react";

interface CountdownCircleProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
}

export default function CountdownCircle({
  days,
  hours,
  minutes,
  seconds,
  labels = {
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
  },
}: CountdownCircleProps) {
  const items = [
    { label: labels.days || "Days", val: days },
    { label: labels.hours || "Hours", val: hours },
    { label: labels.minutes || "Mins", val: minutes },
    { label: labels.seconds || "Secs", val: seconds },
  ];

  return (
    <div className="countdown-container" role="group" aria-label="Countdown timer">
      <div className="flex gap-[18px] flex-wrap">
        {items.map((t, i) => (
          <div
            key={t.label + i}
            className="w-[60px] h-[60px] rounded-full bg-[#f2f2f2] flex flex-col items-center justify-center text-[13px]"
            aria-label={`${t.val} ${t.label}`}
          >
            <span className="text-[16px] font-normal text-gray-700 leading-tight mt-1.5" aria-hidden="true">
              {String(t.val).padStart(2, "0")}
            </span>
            <p className="text-[11px] text-gray-500 mt-[2px]" aria-hidden="true">{t.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
