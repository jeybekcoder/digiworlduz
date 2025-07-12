// 📄 Fayl: apps/admin-panel/hooks/useAdminLogout.ts
// 🎯 Maqsad: Admin panel uchun logout hook – tokenni o‘chirish va login sahifasiga redirect qilish

"use client";

import { useRouter } from "next/navigation";

export const useAdminLogout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return logout;
};
