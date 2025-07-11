// 📄 Fayl: digiworlduz/apps/admin-panel/app/login/page.tsx
// 🎯 Maqsad: Admin login sahifasi – pixel-perfect dizayn (Larkon style) bilan Tailwind + Shadcn asosida qurilgan

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#fdfbfa]">
      {/* Chap qism */}
      <div className="w-full max-w-2xl flex flex-col justify-center px-10 py-16">
        {/* Logo */}
        <div className="mb-6">
          <Link href="/">
            <span className="flex items-center gap-2">
              <Image src="/assets/logo/icon-basket.svg" alt="logo" width={28} height={28} />
              <span className="text-xl font-extrabold text-[#0b224b]">Larkon</span>
            </span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-[#0b224b]">Sign In</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-5">
          Enter your email address and password to access admin panel.
        </p>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/admin/reset-password" className="text-xs text-muted-foreground hover:underline">
                Reset password
              </Link>
            </div>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>

          {/* Remember me */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(v) => setRememberMe(!!v)}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          {/* Kirish tugmasi */}
          <Button type="submit" className="w-full bg-red-100 text-red-600 hover:bg-red-200">
            Sign In
          </Button>
        </form>

        {/* Ijtimoiy login bo‘limi */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-border" />
          <span className="px-2 text-sm text-muted-foreground">OR sign with</span>
          <div className="flex-grow h-px bg-border" />
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-slate-100">
            <Image src="/assets/icons/google.svg" alt="Google" width={18} height={18} />
            Sign in with Google
          </Button>
          <Button className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200">
            <Image src="/assets/icons/facebook.svg" alt="Facebook" width={18} height={18} />
            Sign in with Facebook
          </Button>
        </div>

        {/* Footer link */}
        <p className="mt-5 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account?</span>{" "}
          <Link href="/admin/signup" className="text-[#0b224b] font-bold">
            Sign Up
          </Link>
        </p>
      </div>

      {/* O‘ng tomondagi rasm */}
      <div className="hidden xl:block w-1/2">
        <Image
          src="/assets/images/admin-side.jpg"
          alt="login visual"
          width={960}
          height={1024}
          className="object-cover w-full h-full rounded-l-3xl"
        />
      </div>
    </div>
  );
}