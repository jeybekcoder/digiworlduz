// 📄 Fayl: digiworlduz/apps/admin-panel/lib/utils.ts
// 🎯 Maqsad: Tailwind klasslarini shart asosida birlashtirish uchun universal `cn()` funksiyasi

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn funksiyasi: clsx + tailwind-merge asosida
 * Shartli className'larni birlashtiradi va Tailwind'da conflictlarni to‘g‘ri yechadi
 *
 * Misol:
 * cn("px-4", condition && "bg-red-500", "text-sm")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
