// 📄 Fayl: src/components/layout/NavbarMain.tsx
// 🎯 Maqsad: DW dizayni asosida ARIA validatsiyadan to‘liq o‘tadigan, menyular + currency/lang dropdownlarni o‘z ichiga olgan responsive navbar (mobil menyu sheet bilan).
// 🔧 Yangilik: Barcha submenu (asosiy menyu, til, valyuta) elementlari parent <NavbarMain> pastki qismidan chiqadigan holatga moslashtirildi (top-full origin-top).

"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSettingsStore } from "@/store/useSettingsStore";
import MenuItem from "@/components/layout/MenuItem";
import Dropdown from "@/components/ui/Dropdown";

interface NavbarMainProps {
  variant?: "default" | "compact";
  transparent?: boolean;
}

export default function NavbarMain({ variant = "default", transparent = false }: NavbarMainProps) {
  const [activeDropdown, setActiveDropdown] = useState<null | "currency" | "language" >(null);
  const pathname = usePathname();

  const { currency, language, changeCurrency, changeLanguage } = useSettingsStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className={clsx(
      "w-full text-sm relative z-50",
      transparent ? "bg-transparent" : "bg-white"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[62px] relative" aria-label="Main navigation">
          {/* Chapdagi menyu */}
          <div className={clsx("flex items-start mr-auto ml-4", variant === "compact" ? "gap-3" : "gap-6")}> 
            <ul className={clsx("inline-flex items-center", variant === "compact" ? "gap-4 flex-wrap" : "gap-[52px] truncate")} role="menubar">
              <MenuItem label="Home" href="/" subItems={["Home Style 1", "Home Style 2", "Home Style 3", "Home Style 4"]} />
              <MenuItem label="Features" href="/features" subItems={["Product Type", "Product Features"]} />
              <MenuItem label="Pages" href="/pages" subItems={["About Us", "Contact"]} />
              <MenuItem label="Shop" href="/shop" subItems={["Shop Grid", "Shop List"]} />
              <MenuItem label="Blog" href="/blog" subItems={["Blog Grid", "Blog Details"]} />
            </ul>
          </div>

          {/* Valyuta va til bloki */}
          <div className="hidden md:flex items-center gap-1 pl-2 ml-auto">
            <Dropdown
              label="Currency"
              value={currency}
              options={["USD", "UZS", "RUB"]}
              onChange={changeCurrency}
              isOpen={activeDropdown === "currency"}
              setOpen={() =>
                setActiveDropdown((prev) => (prev === "currency" ? null : "currency"))
              }
            />
            <div className="h-5 w-px bg-gray-300 mx-1" />
            <Dropdown
              label="Language"
              value={language}
              options={["UZ", "RU", "EN"]}
              onChange={changeLanguage}
              isOpen={activeDropdown === "language"}
              setOpen={() =>
                setActiveDropdown((prev) => (prev === "language" ? null : "language"))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
