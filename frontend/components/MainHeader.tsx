"use client";

/* ============================================
📄 Fayl: digiworlduz/frontend/components/MainHeader_DWT3_2.tsx
🎯 Maqsad: DWT 3.2 dizayniga 0.000000001px darajada mos, pixel-perfect Main Header yaratish (rasm asosida joylashuv 100%)
⚙️ Texnologiyalar: React + TypeScript + Tailwind CSS + FontAwesome + TECHUS qoidalari
============================================ */

import React from "react";
import Image from "next/image";
import Select from "react-select";
import { FaShoppingBag } from "react-icons/fa";

export default function MainHeader_DWT3_2() {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "best-seller", label: "Best Seller Products" },
    { value: "top-10", label: "Top 10 Offers" },
    { value: "new", label: "New Arrivals" },
    { value: "phones-tablets", label: "Phones & Tablets" },
    { value: "electronics", label: "Electronics & Digital" },
    { value: "fashion", label: "Fashion & Clothings" },
    { value: "jewelry", label: "Jewelry & Watches" },
    { value: "health", label: "Health & Beauty" },
    { value: "sound", label: "Sound & Speakers" },
    { value: "tv-audio", label: "TV & Audio" },
    { value: "computers", label: "Computers" },
  ];

  return (
    <header className="w-full border-y border-[#ebebeb] py-[0px]">
      <div className="max-w-[1510px] mx-auto px-4">
        <div className="flex items-center justify-between h-[102px]">
          {/* 🔹 Logo + Hotline */}
          <div className="flex items-center gap-[25px] w-[350px] h-full">
            {/* Logo */}
            <a
              href="#"
              title="DigiWorld Homepage"
              aria-label="DigiWorld Homepage"
              className="inline-block relative w-[148px] h-[29px]"
            >
              <Image src="/logo.png" alt="DigiWorld Logo" fill className="object-contain" />
            </a>

            {/* Hotline */}
            <div className="hidden sm:flex items-center gap-[10px] w-[167px] h-[49px]">
              <div className="text-[35px] text-[#666] w-[35px] h-[35px] flex items-center justify-center">
                <i className="fal fa-headset"></i>
              </div>
              <div className="leading-[1.1] w-[117px] h-[49px]">
                <span className="text-[13px] text-[#666] font-rubik block h-[24px] leading-[24px]">
                  Hotline Free:
                </span>
                <h6 className="text-[14px] text-[#222] font-medium font-rubik h-[17px] leading-[16.8px] mb-[8px]">
                  06-900-6789-00
                </h6>
              </div>
            </div>
          </div>

          {/* 🔍 Search Section */}
          <form className="flex items-center h-[50px] border-[2px] border-[#fcb700] rounded-[30px] overflow-hidden max-w-[687.859px] w-full relative">
            {/* Select Wrapper */}
            <div className="absolute left-[20px] top-1/2 -translate-y-1/2 h-[42px] w-[120px] z-[1] flex items-center justify-center">
              <Select
                options={categoryOptions}
                defaultValue={categoryOptions[0]}
                classNamePrefix="react-select"
                aria-label="Kategoriya tanlash"
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "42px",
                    border: "none",
                    borderRadius: "5px",
                    boxShadow: "rgba(68, 68, 68, 0.11) 0px 0px 0px 1px",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontFamily: "Rubik, sans-serif",
                    color: "#6d6d6d",
                    backgroundColor: "#fff",
                    paddingRight: 30,
                    paddingLeft: 0,
                    cursor: "pointer",
                    justifyContent: "center",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    fontSize: "14px",
                    color: "#6d6d6d",
                    lineHeight: "40px",
                    textAlign: "center",
                    width: "100%",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: 0,
                    height: "42px",
                    alignItems: "center",
                    justifyContent: "center",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    padding: 0,
                    height: "42px",
                    alignItems: "center",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: 0,
                    color: "#6d6d6d",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: 0,
                    backgroundColor: "#fff",
                    boxShadow: "rgba(68, 68, 68, 0.11) 0px 0px 0px 1px",
                    fontSize: "14px",
                    fontFamily: "Rubik, sans-serif",
                    color: "#6d6d6d",
                    marginTop: 4,
                    minWidth: 220,
                    zIndex: 9,
                    transform: "matrix(0.75, 0, 0, 0.75, 0, -15.75)",
                    transformOrigin: "110px 0px",
                    transition: "all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out",
                  }),
                  option: (base, state) => ({
                    ...base,
                    fontSize: "14px",
                    fontFamily: "Rubik, sans-serif",
                    fontWeight: state.isSelected ? 700 : 400,
                    backgroundColor: state.isSelected ? "#fcb700" : "#fff",
                    color: state.isSelected ? "#fff" : "#6d6d6d",
                    padding: "10px 6px",
                    minHeight: 40,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    pointerEvents: "auto",
                  }),
                }}
                isSearchable={false}
              />
              {/* Divider */}
              <div className="w-[1px] h-[22.5px] bg-[#e1e1e1] absolute right-[-15px] top-1/2 -translate-y-1/2"></div>
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search For Products..."
              className="h-full text-[13px] text-black font-rubik outline-none px-[180px] pr-[190px] w-full border-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-[160px] h-full text-[14px] font-rubik text-black border-l-[1px] border-[#fcb700] absolute right-0 top-0 bg-[#fcb700]"
            >
              Search
            </button>
          </form>

          {/* 🛒 Cart */}
          <div className="flex items-center gap-3 min-w-[140px] justify-end h-full">
            <div className="w-[50px] h-[50px] rounded-full border border-[#ebebeb] flex items-center justify-center relative">
              <FaShoppingBag className="text-[#222] text-[18px]" />
              <span className="absolute -top-[4px] -right-[4px] bg-[#fcb700] text-white text-[10px] w-[20px] h-[20px] rounded-full flex items-center justify-center">
                01
              </span>
            </div>
            <div className="leading-[1.1]">
              <div className="text-[13px] text-[#666] font-rubik">My Cart:</div>
              <div className="text-[13px] text-[#666] font-rubik">$ 255.00</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
