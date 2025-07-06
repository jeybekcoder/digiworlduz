// 📄 Fayl: src/components/sections/HomeSliderSection.tsx
// 🎯 Maqsad: Slider + chap kategoriya menyusi (Shop by Department) — DW dizaynga 1:1 mos mega-menu + 5ta internetdan olingan texnikaga doir rasmli carousel bilan

"use client";

import React, { useState } from "react";
import Image from "next/image";

const sliderImages = [
  "https://cdn.pixabay.com/photo/2016/03/31/20/11/computer-1294045_960_720.png",
  "https://cdn.pixabay.com/photo/2014/04/03/00/39/monitor-309059_960_720.png",
  "https://cdn.pixabay.com/photo/2016/11/29/12/54/computer-1869236_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/01/06/19/15/internet-1952015_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/03/31/18/58/computing-2199941_960_720.jpg",
];

export default function HomeSliderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <section className="pt-[30px] bg-[#f5f5f5]">
      <div className="max-w-[1510px] mx-auto px-[12px]">
        <div className="flex flex-wrap -mx-[12px]">
          {/* Kategoriya menyusi */}
          <div className="hidden xl:block flex-[0_0_20%] max-w-[20%] w-[302px] px-[12px]">
            <div className="cat__menu-wrapper bg-white w-[278px] h-[512px] overflow-hidden">
              <div className="cat-toggle">
                <button
                  type="button"
                  className="cat-toggle-btn inline-block appearance-none bg-white text-[#222] text-[14px] font-medium uppercase h-[61px] leading-[61px] pl-[20px] w-full text-left border-b border-[#ebebeb] rounded-t-[3px]"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <i className="fas fa-bars mr-2"></i> Shop by department
                </button>
                {isMenuOpen && (
                  <div
                    className="cat__menu bg-white"
                    onMouseLeave={() => setHovered(false)}
                  >
                    <nav id="mobile-menu" className="block">
                      <ul className="text-[13px] text-[#666] font-normal">
                        <li
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                          className="relative"
                        >
                          <a href="product.html">
                            All Categories <i className="far fa-angle-down"></i>
                          </a>
                          <ul
                            className={`mega-menu absolute top-0 left-[278px] w-[800px] h-[466px] bg-white shadow-[4.316px_4.168px_20px_rgba(0,0,0,0.1)] text-[13px] text-[#666] font-normal list-disc pl-[50px] pr-[50px] pt-[40px] pb-[10px] z-[1] transition-all duration-300 ease-out ${
                              hovered ? "opacity-100 visible" : "opacity-0 invisible"
                            }`}
                          >
                            <li><a href="product.html">Shop Pages</a>
                              <ul className="mega-item list-disc list-inside text-xs">
                                <li><a href="product-details.html">Standard Shop Page</a></li>
                                <li><a href="product-details.html">Shop Right Sidebar</a></li>
                                <li><a href="product-details.html">Shop Left Sidebar</a></li>
                                <li><a href="product-details.html">Shop 3 Column</a></li>
                                <li><a href="product-details.html">Shop 4 Column</a></li>
                              </ul>
                            </li>
                            <li><a href="product.html">Product Pages</a>
                              <ul className="mega-item list-disc list-inside text-xs">
                                <li><a href="product-details.html">Product Details</a></li>
                                <li><a href="product-details.html">Product V2</a></li>
                                <li><a href="product-details.html">Product V3</a></li>
                                <li><a href="product-details.html">Varriable Product</a></li>
                                <li><a href="product-details.html">External Product</a></li>
                              </ul>
                            </li>
                            <li><a href="product.html">Other Pages</a>
                              <ul className="mega-item list-disc list-inside text-xs">
                                <li><a href="product-details.html">wishlist</a></li>
                                <li><a href="product-details.html">Shopping Cart</a></li>
                                <li><a href="product-details.html">Checkout</a></li>
                                <li><a href="product-details.html">Login</a></li>
                                <li><a href="product-details.html">Register</a></li>
                              </ul>
                            </li>
                            <li><a href="product.html">Phone & Tablets</a>
                              <ul className="mega-item list-disc list-inside text-xs">
                                <li><a href="product-details.html">Catagory 1</a></li>
                                <li><a href="product-details.html">Catagory 2</a></li>
                                <li><a href="product-details.html">Catagory 3</a></li>
                                <li><a href="product-details.html">Catagory 4</a></li>
                              </ul>
                            </li>
                            <li><a href="product.html">Phone & Tablets</a>
                              <ul className="mega-item list-disc list-inside text-xs">
                                <li><a href="product-details.html">Catagory 1</a></li>
                                <li><a href="product-details.html">Catagory 2</a></li>
                                <li><a href="product-details.html">Catagory 3</a></li>
                                <li><a href="product-details.html">Catagory 4</a></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li><a href="product.html">Best Seller Products <span className="cat-label text-red-500">hot!</span></a></li>
                        <li><a href="product.html">Top 10 Offers <span className="cat-label green text-green-500">new!</span></a></li>
                        <li><a href="product.html">New Arrivals <i className="far fa-angle-down"></i></a></li>
                        <li><a href="product.html">Phones & Tablets</a></li>
                        <li><a href="product.html">Electronics & Digital</a></li>
                        <li className="d-laptop-none"><a href="product.html">Fashion & Clothings</a></li>
                        <li className="d-laptop-none"><a href="product.html">Jewelry & Watches</a></li>
                        <li><a href="product.html">Health & Beauty</a></li>
                        <li><a href="product.html">TV & Audio</a></li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="w-full xl:w-10/12 px-[12px]">
            <div className="w-full rounded-md overflow-hidden">
              <div className="grid grid-cols-1 animate-fade">
                {sliderImages.map((src, index) => (
                  <div key={index} className="w-full h-[400px] relative">
                    <Image
                      src={src}
                      alt={`Slider image ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}