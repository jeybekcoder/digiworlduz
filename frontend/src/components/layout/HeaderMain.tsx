// 📄 Fayl: src/components/layout/HeaderMain.tsx
// 🎯 Maqsad: Pixel-perfect DW dizayndagi header (logo, hotline, category select, search, cart)
// ✅ TECHUS: Next.js + Tailwind CSS + Framer Motion

"use client";

import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderMain() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const [borderDone, setBorderDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const phrases = [
    "iPhone 15 Pro Max",
    "Samsung Galaxy S24",
    "Smart TV 4K",
    "AirPods Max",
    "Oshxona uchun blender",
    "Assalomu Aleykum, Xush kelibsiz!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFocused && !value && borderDone) {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isFocused, value, borderDone, phrases.length]);

  return (
    <div className="w-full bg-white py-[25px] border-b border-[#e5e5e5]">
      <div className="max-w-[1510px] w-full mx-auto px-[20px] grid grid-cols-12 items-center gap-[24px]">

        {/* ✅ LOGO */}
        <div className="col-span-2 flex items-center gap-2 min-w-[140px]">
          <div className="w-[200px] h-[44px] relative">
            <Image
              src="/assets/img/logo/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* ✅ HOTLINE */}
        <div className="group col-span-2 hidden lg:flex items-center gap-[6px] justify-center">
          <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white border-[2px] border-[#fde08d] shadow-sm transition-all duration-300 group-hover:bg-[#fcb900]">
            <svg
              width="25"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fcb900"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 group-hover:stroke-black"
            >
              <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13.81.31 1.6.55 2.38a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.78.24 1.57.42 2.38.55A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div className="leading-[1.2]">
            <span className="text-[13px] text-gray-500">Call Center:</span>
            <h4 className="text-[16px] font-bold text-gray-900">
              <a href="tel:+998781138280" className="hover:underline">
                +998 78 113 82 80
              </a>
            </h4>
          </div>
        </div>

        {/* ✅ SEARCH BAR */}
        <div className="col-span-6 h-[51px]">
          <div
            className="flex items-center h-full border-[2px] border-[#fcb900] rounded-[30px] overflow-hidden bg-white relative transition-all duration-700"
            onTransitionEnd={(e) => {
              if (e.propertyName === "border-color") {
                setBorderDone(true);
              }
            }}
          >
            <button
              type="button"
              className="flex items-center gap-2 h-full pl-6 pr-3 text-[15px] font-normal text-gray-700 focus:outline-none bg-white"
              tabIndex={0}
              aria-label="All Categories"
              title="All Categories"
            >
              <span className="whitespace-nowrap">All Categories</span>
              <ChevronDown className="w-4 h-4 ml-1 text-[#b1b1b1]" />
            </button>
            <div className="h-7 w-px bg-[#fcb900] opacity-100 mx-1"></div>
            <input
              ref={inputRef}
              type="text"
              placeholder=""
              title="Search Products"
              aria-label="Search Products"
              className="flex-1 h-full text-[15px] px-4 bg-transparent outline-none text-black relative z-10"
              id="searchInput"
              onFocus={() => setIsFocused(true)}
              onBlur={() => !value && setIsFocused(false)}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value && (
              <button
                type="button"
                title="Clear search"
                aria-label="Clear search"
                onClick={() => {
                  setValue("");
                  inputRef.current?.focus();
                  setIsFocused(false);
                }}
                className="absolute right-[90px] text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              className="absolute right-0 bg-[#fcb900] text-[15px] text-black font-medium px-8 h-full rounded-r-[30px]"
              aria-label="Search"
              title="Search"
            >
              Search
            </button>

            {!isFocused && !value && (
              <AnimatePresence mode="wait">
                <motion.span
                  key={phrases[currentIndex]}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute left-[270px] pl-1 pointer-events-none h-full flex items-center z-0 text-[15px] italic bg-gradient-to-r from-[#9ca3af] to-[#6b7280] bg-clip-text text-transparent select-none"
                >
                  {phrases[currentIndex]}
                </motion.span>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* ✅ CART INFO */}
        <div className="group col-span-2 hidden lg:flex items-center gap-3 justify-end">
          <a
            href="javascript:void(0);"
            className="relative w-[50px] h-[50px] rounded-full border-[2px] border-[#fcb900] bg-white flex items-center justify-center text-white text-[13px] font-normal transition-all duration-300 ease-out group-hover:bg-[#fcb900]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fcb900"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 group-hover:stroke-black"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-[#fcb900] text-[10px] font-semibold text-white w-5 h-5 rounded-full flex items-center justify-center">
              01
            </span>
          </a>
          <div className="leading-[1.1]">
            <p className="text-xs text-gray-500">My Cart:</p>
            <p className="text-sm font-semibold text-gray-800">$ 255.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
