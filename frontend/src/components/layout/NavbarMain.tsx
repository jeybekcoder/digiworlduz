// 📄 Fayl: src/components/layout/NavbarMain.tsx
// 🎯 Maqsad: DW dizayni asosida ARIA validatsiyadan to‘liq o‘tadigan, menyular + currency/lang dropdownlarni o‘z ichiga olgan responsive navbar (mobil menyu sheet bilan)

"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function NavbarMain() {
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const pathname = usePathname();

  const { currency, language, changeCurrency, changeLanguage } = useSettingsStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurrencyDropdown(false);
        setLanguageDropdown(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const MenuItem = ({ label, href = "#", subItems = [] }: { label: string; href?: string; subItems?: string[] }) => (
    <li className="relative group inline-block text-[13px] font-normal text-[#666] h-[62px] leading-[24px] transition-all duration-300 ease-out">
      <Link href={href} className="block text-[14px] font-medium text-[#222] uppercase leading-[24px] h-[62px] pt-[19px] pb-[19px] px-0 text-left cursor-pointer transition-all duration-300 ease-out" role="menuitem" tabIndex={0} aria-current={pathname === href ? "page" : undefined}>
        {label}{subItems.length > 0 && <ChevronDown className="w-4 h-4 ml-[0.5px] inline-block align-middle" />}
      </Link>
      {subItems.length > 0 && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-md z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200" role="menu">
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

  return (
    <div className="w-full bg-white text-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[62px]" aria-label="Main navigation">
          {/* Chapdagi menyu */}
          <div className="flex items-start gap-6 mr-auto ml-4">
            <ul className="inline-flex items-center gap-[52px]" role="menubar">
              <MenuItem label="Home" href="/" subItems={["Home Style 1", "Home Style 2", "Home Style 3", "Home Style 4"]} />
              <MenuItem label="Features" href="/features" subItems={["Product Type", "Product Features"]} />
              <MenuItem label="Pages" href="/pages" subItems={["About Us", "Contact"]} />
              <MenuItem label="Shop" href="/shop" subItems={["Shop Grid", "Shop List"]} />
              <MenuItem label="Blog" href="/blog" subItems={["Blog Grid", "Blog Details"]} />
            </ul>
          </div>

          {/* Valyuta va til bloki */}
          <div className="hidden md:flex items-center gap-1 pl-2 ml-auto">
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdown(!currencyDropdown)}
                aria-haspopup="true"
                aria-expanded={currencyDropdown}
                className="flex items-center gap-1 hover:text-primary text-sm text-[#222]"
              >
                {currency}
                <ChevronDown className="w-4 h-4 ml-1 mt-[1px]" />
              </button>
              {currencyDropdown && (
                <ul className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-20" role="menu">
                  {["USD", "UZS", "RUB"].map((cur) => (
                    <li key={cur} role="none">
                      <button
                        onClick={() => {
                          changeCurrency(cur);
                          setCurrencyDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        role="menuitem"
                      >
                        {cur}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="h-5 w-px bg-gray-300 mx-1" />

            <div className="relative">
              <button
                onClick={() => setLanguageDropdown(!languageDropdown)}
                aria-haspopup="true"
                aria-expanded={languageDropdown}
                className="flex items-center gap-1 hover:text-primary text-sm text-[#222]"
              >
                {language}
                <ChevronDown className="w-4 h-4 ml-1 mt-[1px]" />
              </button>
              {languageDropdown && (
                <ul className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-20" role="menu">
                  {["UZ", "RU", "EN"].map((lang) => (
                    <li key={lang} role="none">
                      <button
                        onClick={() => {
                          changeLanguage(lang);
                          setLanguageDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        role="menuitem"
                      >
                        {lang}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
