// 📄 Fayl: src/components/sections/HomeSliderSection.tsx
// 🎯 Maqsad: DW `index-3.html` asosidagi layout — container + row + col-xl-2 + col-xl-10 tuzilmasiga to‘liq moslashtirilgan mega-menu + slider + 1510x518px bo‘yicha width height to‘liq moslashtirish. Row padding EMAS, margin ishlatilgan (-mx-[12px]) QAYTA TIKLANDI. Slider blokidan keyingi bo‘sh joylar tekshirib tozalandi.

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronRight, ChevronDown } from "lucide-react";

const sliderImages = [
  "/assets/img/home-slider/slider-1.jpg",
  "/assets/img/home-slider/slider-2.png",
  "/assets/img/home-slider/slider-3.jpg",
];

export default function HomeSliderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="slider__area pt-[30px] bg-[#f5f5f5] w-full">
      <div className="w-[1510px] h-[518px] px-[12px] mx-auto">
        <div className="w-[1510px] h-[518px] flex flex-wrap -mx-[12px]">
          {/* Chap menyu */}
          <div className="hidden xl:block w-[302px] h-[518px] px-[12px] bg-[#f5f5f5]">
            <div className="cat__menu-wrapper bg-white w-[278px] h-[518px] overflow-hidden">
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
                    <nav id="mobile-menu" className="block" aria-label="Main Categories">
                      <ul className="text-[13px] text-[#666] font-normal divide-y divide-gray-200">
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
          <div className="w-[1208px] h-[518px] px-[12px] flex">
            <div
              className="relative w-[1184px] h-[518px] overflow-hidden shadow-md shrink-0"
              {...handlers}
            >
              {sliderImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ x: index > currentSlide ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: index > currentSlide ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className={clsx(
                    "absolute top-0 left-0 w-full h-full",
                    index === currentSlide ? "z-20" : "z-10"
                  )}
                >
                  <Image
                    src={img}
                    alt={`Slider image ${index + 1}`}
                    fill
                    className="object-cover rounded-[3px]"
                    priority={index === currentSlide}
                  />
                </motion.div>
              ))}

              {/* Arrows - Glassmorphism */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/40 hover:bg-white text-black w-[72px] h-[36px] rounded-[6px] shadow-lg flex items-center justify-center text-[44px] transition-all duration-300 z-30"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/40 hover:bg-white text-black w-[72px] h-[36px] rounded-[6px] shadow-lg flex items-center justify-center text-[44px] transition-all duration-300 z-30"
                aria-label="Next slide"
              >
                ›
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
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
