/* 📄 Fayl: digiworlduz/frontend/components/HeaderTopBar.tsx */
/* 🌟 Maqsad: Pixel-perfect Top Bar dizaynini TECHUS asosida React + TypeScript + Tailwind CSS + Next.js bilan amalga oshirish */

import React from "react";
import Link from "next/link";
import "@/components/HeaderTopBar.css"; // 🎯 Faqat li::after CSS bu yerda

const navItems = [
  { label: "My Account", href: "/account", aria: "My Account" },
  { label: "My Wishlist", href: "/wishlist", aria: "My Wishlist" },
  { label: "Sign In", href: "/signin", aria: "Sign In" },
  { label: "Compare", href: "/compare", aria: "Compare" },
];

const HeaderTopBar: React.FC = () => {
  return (
    <div className="hidden md:block h-[45px] w-screen bg-white font-rubik text-13px font-normal leading-[24px] tracking-[0.00111em] text-[#666] antialiased">
      <div className="max-w-[1510px] mx-auto px-[12px] h-[45px]">
        <div className="flex flex-wrap items-center -mx-[12px] h-[45px]">
          {/* 🔹 Chap matn */}
          <div className="hidden md:block flex-1 px-[12px]">
            <span className="inline font-rubik text-13px font-normal leading-[24px] tracking-[0.00111em] text-[#666] transition-all duration-300 ease-out antialiased">
              Assalomu aleykum!
            </span>
          </div>

          {/* 🔸 O‘ng navigatsiya */}
          <div className="flex-1 px-[12px] flex items-center justify-center md:justify-end">
            <ul className="flex list-none m-0 p-0 h-[45px]">
              {navItems.map((item, index) => (
                <li key={index} className="topbar-link pr-[20px] mr-[20px]">
                  <Link
                    href={item.href}
                    aria-label={item.aria}
                    className="inline-block font-rubik text-13px font-normal text-[#666] leading-[45px] tracking-[0.00111em] transition-all duration-300 ease-out antialiased hover:text-yellow-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeaderTopBar);
