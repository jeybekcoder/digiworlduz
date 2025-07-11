// 📄 Fayl: src/lib/utils.ts
// 🎯 Maqsad: Tailwind classlarni birlashtiruvchi util funksiya (shadcn uchun standart)
// ✅ ESLint talablariga to‘liq moslashtirildi (no-explicit-any yo‘q)

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | number | null | undefined | false)[]): string {
  return twMerge(clsx(inputs));
}
