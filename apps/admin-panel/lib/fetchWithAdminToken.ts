// 📄 Fayl: apps/admin-panel/lib/fetchWithAdminToken.ts
// 🎯 Maqsad: Admin panel uchun token avtomatik qo‘shiladigan fetch helper

export const fetchWithAdminToken = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
