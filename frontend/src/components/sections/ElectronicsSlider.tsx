// 📄 Fayl: src/components/sections/ElectronicsSlider.tsx
// 📦 Maqsad: Electronic & Digital Products slider — useAutoplaySlider bilan modular, responsive va reusabilityga tayyor qilingan versiya
// 💡 Taklif: Har bir slider bo‘limi mustaqil komponentda bo‘lishi kerak — bu arxitektura aniqroq, testga yengil va professional

"use client";

import React, { useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/cards/ProductCard";
import { useAutoplaySlider } from "@/hooks/useAutoplaySlider";

const electronicsData = [
  {
    id: 1,
    slug: "lg-27ud58-ebuyer",
    image1: "/assets/img/Products/smartphone/product3.jpg",
    image2: "/assets/img/Products/smartphone/product4.jpg",
    name: "LG 27UD58: £347.21, Ebuyer.com",
    price: 560,
    rating: 4,
  },
  {
    id: 2,
    slug: "samsung-c49j89-debenhams",
    image1: "/assets/img/Products/smartphone/product2.jpg",
    image2: "/assets/img/Products/smartphone/product5.jpg",
    name: "Samsung C49J89: £875, Debenhams Plus",
    price: 450,
    rating: 5,
  },
  {
    id: 3,
    slug: "ultra-thin-kitchen-scale",
    image1: "/assets/img/Products/smartphone/product1.jpg",
    image2: "/assets/img/Products/smartphone/product3.jpg",
    name: "High Quality Glass Ultra-Thin Kitchen Scale",
    price: 500,
    rating: 3,
  },
];

export default function ElectronicsSlider() {
  const [sliderRef, instanceRef] = useKeenSlider({ loop: true, slides: { perView: "auto", spacing: 20 } });
  const { startAutoplay, stopAutoplay } = useAutoplaySlider(instanceRef);

  const renderElectronics = useMemo(() => (
    electronicsData.map((item) => (
      <div key={item.id} className="keen-slider__slide">
        <ProductCard
          image1={item.image1}
          image2={item.image2}
          name={item.name}
          price={item.price}
          rating={item.rating}
          slug={item.slug}
          isCentered
        />
      </div>
    ))
  ), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-5 relative">
        <h3 className="text-[22px] font-bold">
          Electronic <span className="text-black font-normal">& Digital Products</span>
        </h3>
        <div className="absolute bottom-0 left-0 w-[50px] h-[2px] bg-yellow-500" />
        <div className="flex gap-2 absolute right-0 -top-1">
          <button
            title="Previous Product"
            aria-label="Previous product"
            onClick={() => instanceRef.current?.prev()}
            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            title="Next Product"
            aria-label="Next product"
            onClick={() => instanceRef.current?.next()}
            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={sliderRef}
        className="keen-slider"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        {renderElectronics}
      </div>
    </div>
  );
}
