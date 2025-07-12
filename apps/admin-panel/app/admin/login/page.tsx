// 📄 Fayl: apps/admin-panel/app/admin/login/page.tsx
// 🎯 Maqsad: Admin panel login sahifasi – JWT backendga ulanib, token bilan tizimga kirish (2FA bilan yoki holda), tokenni saqlash va redirect qilish

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [userId, setUserId] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [twoFactorNotEnabled, setTwoFactorNotEnabled] = useState(false);

  const MAX_ATTEMPTS = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (honeypot) {
      setError("❌ Bot faoliyati aniqlandi. Kirish rad etildi.");
      return;
    }

    if (attempts >= MAX_ATTEMPTS) {
      setError("🚫 Juda ko‘p noto‘g‘ri urinish! Iltimos, keyinroq urinib ko‘ring.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok && res.status === 403 && data.detail?.includes("2FA yoqilmagan")) {
        // 2FA yoqilmagan holat — token qaytariladi (doimiy emas!)
        setTwoFactorNotEnabled(true);

        localStorage.setItem("admin_token", data.access_token);
        setSuccess("🟡 2FA yoqilmagan. Tizimga kirildi, lekin xavfsizlik past!");
        setTimeout(() => router.push("/admin/dashboard"), 2000);
        return;
      }

      if (!res.ok) {
        throw new Error(data.detail || "Login xatoligi");
      }

      setUserId(data.user_id);
      setShow2FA(true);
    } catch (err: any) {
      setError("⚠️ " + err.message);
      setAttempts((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8001/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, code: twoFactorCode }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "2FA tekshiruvida xatolik");
      }

      const data = await res.json();
      localStorage.setItem("admin_token", data.access_token);
      setSuccess("✅ Muvaffaqiyatli tizimga kirdingiz!");
      setTimeout(() => router.push("/admin/dashboard"), 1000);
    } catch (err: any) {
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fefcfc] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-[#1e2d5c] mb-1">Tizimga kirish</h2>
        <p className="text-sm text-gray-500 mb-6">
          Admin panelga kirish uchun maʼlumotlaringizni kiriting.
        </p>

        <form
          className="space-y-4"
          onSubmit={!loading ? (show2FA ? handleVerify2FA : handleSubmit) : undefined}
          aria-label="Admin panelga kirish formasi"
        >
          <input
            type="text"
            name="nickname"
            className="hidden"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {!show2FA && (
            <>
              <div>
                <label htmlFor="email" className="text-sm block mb-1">
                  Elektron pochta
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email manzilingiz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm block mb-1">Parol</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolingiz"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(e) => setCapsLockOn(e.getModifierState("CapsLock"))}
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500 hover:underline"
                  >
                    {showPassword ? "Yopish" : "Ko‘rsatish"}
                  </button>
                </div>
                {capsLockOn && (
                  <p className="text-yellow-600 text-xs mt-1">Eslatma: Caps Lock yoqilgan!</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-blue-600 scale-110 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Meni eslab qol
                </label>
              </div>
            </>
          )}

          {show2FA && (
            <div>
              <label htmlFor="code" className="text-sm block mb-1">2FA Kodi</label>
              <input
                id="code"
                name="code"
                type="text"
                placeholder="Mobil ilovadagi 6 xonali kod"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                autoComplete="one-time-code"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          )}

          {twoFactorNotEnabled && (
            <div className="text-yellow-600 text-sm border border-yellow-200 p-2 rounded-md bg-yellow-50">
              ⚠️ Sizda ikki bosqichli autentifikatsiya yoqilmagan. Iltimos, xavfsizlik uchun <strong>Sozlamalar</strong> bo‘limida yoqing.
            </div>
          )}

          {error && <div role="alert" className="text-red-600 text-sm">{error}</div>}
          {success && <div role="status" className="text-green-600 text-sm">{success}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 bg-[#ffe1e1] text-[#e86c4c] rounded-md hover:opacity-90 font-semibold disabled:opacity-60"
            aria-disabled={loading}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-t-transparent border-[#e86c4c] rounded-full animate-spin"></span>
            )}
            {loading ? "Yuklanmoqda..." : show2FA ? "Tasdiqlash" : "Kirish"}
          </button>
        </form>
      </div>
    </main>
  );
}
