// 📄 Fayl: /digiworlduz/apps/admin-panel/app/admin/login/page.tsx
// 🎯 Maqsad: Admin panelga kirish sahifasi (Login) – 1:1 pixel-perfect rasmga asoslangan
// 🧱 Texnologiyalar: Next.js (App Router), Tailwind CSS, Shadcn UI

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔐 Simulyatsiya: localStorage token o‘rnatish (real API kelajakda)
    localStorage.setItem("admin_token", "demo_token");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex">
      {/* 🔵 Chap qism */}
      <div className="flex-1 bg-[#f9f7f6] flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          {/* 🛍 Logotip */}
          <h1 className="text-3xl font-extrabold text-[#1d3557]">
            <span className="text-4xl">🛍</span> DIGI WORLD
          </h1>

          <div>
            <h2 className="text-2xl font-semibold text-[#1d3557]">Sign In</h2>
            <p className="text-sm text-gray-600">
              Enter your email address and password to access admin panel.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-[#1d3557] hover:underline"
                >
                  Reset password
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>

            <Button
              className="w-full bg-red-100 text-red-600 hover:bg-red-200"
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#f9f7f6] px-2 text-gray-500">OR sign with</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center bg-blue-50 text-black"
            >
              <span className="mr-2">🌐</span> Sign in with Google
            </Button>
            <Button
              className="w-full bg-red-100 text-red-600 hover:bg-red-200"
            >
              <span className="mr-2">📘</span> Sign in with Facebook
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-blue-800 font-medium">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Test</button>

      {/* 🔴 O‘ng rasm qismi */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center rounded-l-none bg-[url('/login-image.jpg')]" />
    </div>
  );
}
