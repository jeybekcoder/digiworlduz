// 📄 Fayl: src/lib/utils.ts
// 🎯 Maqsad: Tailwind classlarni birlashtiruvchi util funksiya (shadcn uchun standart)

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
