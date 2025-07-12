// 📄 Fayl: apps/admin-panel/hooks/useAdminAuthGuard.ts
// 🎯 Maqsad: Admin panel sahifalariga faqat token bor foydalanuvchilarni kiritish (aks holda login sahifaga yo‘naltirish)

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAdminAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);
};
