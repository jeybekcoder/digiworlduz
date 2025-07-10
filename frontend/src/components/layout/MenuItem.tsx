// 📄 Fayl: src/components/layout/MenuItem.tsx
// 🎯 Maqsad: MenuItem komponentini alohida qilish, DRY va reusability tamoyiliga mos
// 💡 Afzalliklar: memo bilan re-renderni kamaytiradi, ARIA qo‘llab-quvvatlaydi

"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuItemProps {
  label: string;
  href?: string;
  subItems?: string[];
}

const MenuItem: React.FC<MenuItemProps> = React.memo(({ label, href = "#", subItems = [] }) => {
  const pathname = usePathname();

  return (
    <li
      className="relative group inline-block text-[13px] font-normal text-[#666] h-[62px] leading-[24px] transition-all duration-300 ease-out"
    >
      <Link
        href={href}
        className="block text-[14px] font-medium text-[#222] uppercase leading-[24px] h-[62px] pt-[19px] pb-[19px] px-0 text-left cursor-pointer transition-all duration-300 ease-out"
        role="menuitem"
        tabIndex={0}
        aria-current={pathname === href ? "page" : undefined}
      >
        {label}
        {subItems.length > 0 && <ChevronDown className="w-4 h-4 ml-[0.5px] inline-block align-middle" />}
      </Link>
      {subItems.length > 0 && (
        <ul
          className="absolute left-0 top-full mt-0 origin-top w-48 bg-white border rounded-md shadow-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200"
          role="menu"
        >
          {subItems.map((sub, idx) => (
            <li key={idx} role="none">
              <Link
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex={0}
              >
                {sub}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});

MenuItem.displayName = "MenuItem";

export default MenuItem;
