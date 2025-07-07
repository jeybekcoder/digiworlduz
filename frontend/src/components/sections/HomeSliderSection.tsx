// 📄 Fayl: src/components/sections/HomeSliderSection.tsx
// 🎯 Maqsad: DW `index-3.html` asosidagi layout — container + row + col-xl-2 + col-xl-10 tuzilmasiga to‘liq moslashtirilgan mega-menu + slider + 1905x548px bo‘yicha width height to‘liq moslashtirish. Row padding EMAS, margin ishlatilgan (-mx-[12px]).

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";

const sliderImages = [
  "/assets/img/slider/03/slider-01.jpg",
  "/assets/img/slider/03/slider-02.jpg",
  "/assets/img/slider/03/slider-03.jpg",
];

export default function HomeSliderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="slider__area pt-[30px] bg-[#f5f5f5] w-full">
      <div className="w-full max-w-[1510px] mx-auto">
        <div className="flex flex-wrap -mx-[12px]">
          {/* Chap menyu */}
          <div className="hidden xl:block w-[278px] px-[12px] bg-[#f5f5f5]">
            <div className="cat__menu-wrapper bg-white w-full h-[518px] overflow-hidden">
              <div className="cat-toggle">
                <button
                  type="button"
                  className="cat-toggle-btn w-full text-left text-sm font-medium text-black uppercase border-b border-gray-200 py-4 px-5 flex items-center gap-2 transition-all duration-300 ease-out"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <i className="fas fa-bars"></i> Shop by department
                </button>
                {isMenuOpen && (
                  <div className="cat__menu">
                    <nav id="mobile-menu" className="block">
                      <ul className="text-[13px] text-[#666] font-normal">
                        <li className="relative group">
                          <a href="product.html" className="flex items-center justify-between px-5 h-[45px] hover:text-orange-500">
                            All Categories <ChevronDown className="w-[14px] h-[14px]" />
                          </a>
                          <ul className="mega-menu absolute top-0 left-full w-[800px] h-[466px] bg-white shadow-lg p-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 ease-out overflow-y-auto">
                            {[{
                              title: "Shop Pages",
                              items: ["Standard Shop Page", "Shop Right Sidebar", "Shop Left Sidebar", "Shop 3 Column", "Shop 4 Column"]
                            }, {
                              title: "Product Pages",
                              items: ["Product Details", "Product V2", "Product V3", "Varriable Product", "External Product"]
                            }, {
                              title: "Other Pages",
                              items: ["wishlist", "Shopping Cart", "Checkout", "Login", "Register"]
                            }, {
                              title: "Phone & Tablets",
                              items: ["Catagory 1", "Catagory 2", "Catagory 3", "Catagory 4"]
                            }].map((group, idx) => (
                              <li key={idx} className="mb-4">
                                <a href="product.html" className="font-medium mb-2 block">{group.title}</a>
                                <ul className="mega-item list-disc list-inside text-xs ml-4">
                                  {group.items.map((sub, i) => (
                                    <li key={i}><a href="product-details.html">{sub}</a></li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <a href="product.html" className="flex items-center px-5 h-[45px] hover:text-orange-500">
                            Best Seller Products <span className="ml-2 text-white bg-[#f50963] px-1 rounded text-[10px] leading-[16px] font-semibold">hot!</span>
                          </a>
                        </li>
                        <li>
                          <a href="product.html" className="flex items-center px-5 h-[45px] hover:text-orange-500">
                            Top 10 Offers <span className="ml-2 text-white bg-[#01b258] px-1 rounded text-[10px] leading-[16px] font-semibold">new!</span>
                          </a>
                        </li>
                        <li className="relative group">
                          <a href="product.html" className="flex items-center justify-between px-5 h-[45px] hover:text-orange-500">
                            New Arrivals <ChevronDown className="w-[14px] h-[14px]" />
                          </a>
                          <ul className="submenu absolute top-0 left-full bg-white shadow-lg p-6 text-xs opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 ease-out">
                            <li><a href="product.html">Home Appliances</a></li>
                            <li className="relative group/sub">
                              <a href="product.html" className="flex items-center justify-between">
                                Technology <ChevronRight className="w-3 h-3 ml-2" />
                              </a>
                              <ul className="submenu absolute top-0 left-full bg-white shadow-lg mt-0 ml-2 p-4 text-xs w-[180px]">
                                <li><a href="product.html">Storage Devices</a></li>
                                <li><a href="product.html">Monitors</a></li>
                                <li><a href="product.html">Laptops</a></li>
                              </ul>
                            </li>
                            <li><a href="product.html">Office Equipments</a></li>
                          </ul>
                        </li>
                        {["Phones & Tablets", "Electronics & Digital", "Fashion & Clothings", "Jewelry & Watches", "Health & Beauty", "TV & Audio"].map((item, index) => (
                          <li key={index}>
                            <a href="product.html" className="px-5 h-[45px] flex items-center hover:text-orange-500">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="w-full xl:w-[1184px] px-[12px]">
            <div className="relative w-full h-[518px] overflow-hidden shadow-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <Image
                    src={sliderImages[currentSlide]}
                    alt={`Slider image ${currentSlide + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      currentSlide === idx ? "bg-[#fcb900] w-5" : "bg-white/80"
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}