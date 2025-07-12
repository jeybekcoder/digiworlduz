// 📄 Fayl: apps/admin-panel/lib/fetchWithToken.ts
// 🎯 Maqsad: Har bir so‘rovda tokenni yuborish + 401 bo‘lsa avtomatik logout qilish

import { useAdminLogout } from "@/hooks/useAdminLogout";

export const fetchWithToken = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // 🔐 Agar token yaroqsiz bo‘lsa → logout
  if (response.status === 401) {
    localStorage.removeItem("admin_token");
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  }

  return response;
};
