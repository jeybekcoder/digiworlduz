/* 📄 Fayl: digiworlduz/frontend/components/MainHeader.tsx
   📁 Joylashuvi: components/
   🌟 Maqsad: Asosiy Header bo‘limi — Logo, Search Bar, Language/Currency/Login/Wishlist/Cart ikonkalari bilan birga; 1:1 pixel-perfect
   💡 Texnologiyalar: React + TypeScript + Tailwind CSS + Next.js (App Router) */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SearchIcon,
  ShoppingCartIcon,
  HeartIcon,
  User2Icon,
  GlobeIcon,
  DollarSignIcon,
} from "lucide-react";

const MainHeader: React.FC = () => {
  return (
    <header className="w-full bg-white py-[15px] border-b border-[#efefef]">
      <div className="max-w-[1510px] mx-auto px-[12px]">
        <div className="flex flex-wrap items-center justify-between">
          {/* 🔹 Logo */}
          <div className="w-[160px]">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={160}
                height={40}
                className="h-auto w-full object-contain"
                priority
              />
            </Link>
          </div>

          {/* 🔍 Search Bar */}
          <div className="flex-1 flex justify-center w-full max-w-[770px] mt-4 md:mt-0">
            <form className="flex w-full h-[45px] overflow-hidden rounded-[5px]">
              {/* Category Dropdown */}
              <select
                title="Search Category"
                className="bg-[#f3f3f3] px-[15px] text-[13px] font-[Rubik] text-[#333] outline-none rounded-l-[5px] h-full appearance-none"
              >
                <option>All Categories</option>
                <option>Computers</option>
                <option>Accessories</option>
              </select>

              {/* Input */}
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 px-[15px] bg-[#f3f3f3] text-[13px] font-[Rubik] text-[#333] outline-none h-full"
              />

              {/* Search Button */}
              <button
                type="submit"
                className="w-[50px] h-full bg-[#fcb900] rounded-r-[5px] flex items-center justify-center hover:bg-[#e0a800] transition duration-300"
              >
                <SearchIcon className="w-[18px] h-[18px] text-white" />
              </button>
            </form>
          </div>

          {/* 🔸 Action Icons */}
          <div className="flex items-center gap-[20px] mt-4 md:mt-0 min-w-[360px] justify-end">
            {/* Language */}
            <div className="flex items-center text-[13px] font-[Rubik] text-[#666] cursor-pointer hover:underline">
              <GlobeIcon className="w-[16px] h-[16px] mr-[5px] text-[#666]" />
              EN
            </div>

            {/* Currency */}
            <div className="flex items-center text-[13px] font-[Rubik] text-[#666] cursor-pointer hover:underline">
              <DollarSignIcon className="w-[16px] h-[16px] mr-[5px] text-[#666]" />
              USD
            </div>

            {/* Login */}
            <Link href="/signin" className="flex items-center text-[13px] font-[Rubik] text-[#666] hover:underline">
              <User2Icon className="w-[16px] h-[16px] mr-[6px] text-[#666]" />
              Login / Register
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex items-center text-[13px] text-[#666] hover:underline">
              <HeartIcon className="w-[18px] h-[18px] text-[#666]" />
              <span className="absolute -top-[6px] -right-[6px] bg-red-500 text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-[Rubik]">
                2
              </span>
            </Link>

            {/* Cart */}
            <div className="relative flex items-center gap-[8px]">
              <Link href="/cart" className="relative w-[40px] h-[40px] rounded-full border border-[#eee] flex items-center justify-center">
                <ShoppingCartIcon className="w-[20px] h-[20px] text-[#111]" />
                <span className="absolute -top-[5px] -right-[5px] bg-[#fcb900] text-white text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center font-[Rubik]">
                  1
                </span>
              </Link>
              <div className="text-[13px] font-[Rubik] text-[#666] leading-[1.2]">
                <p className="text-[#666]">My Cart:</p>
                <p className="text-[#111] font-semibold">$255.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(MainHeader);
