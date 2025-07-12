// 📄 Fayl: /digiworlduz/apps/admin-panel/components/layouts/AdminLayout.tsx
// 🎯 Maqsad: Har bir admin sahifada ishlatiladigan asosiy layout (Sidebar + Navbar + children)
// 🧱 Texnologiyalar: Tailwind CSS + Shadcn + Next.js App Router
// 🔐 Maxsus: Xavfsizlik, performance va komponentlar modullashtirilgan

"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/ui/Sidebar";
import { Navbar } from "@/components/ui/Navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  // ✅ Auth check: token mavjudligini tekshiradi
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* 📦 Sidebar: asosiy admin navigatsiya */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* 📌 Yuqori Navbar (bildirishnoma, avatar) */}
        <Navbar />

        {/* 📄 Sahifa kontenti (dynamic) */}
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}