// 📄 Fayl: src/components/sections/DealsOfTheDaySection.tsx
// 🌟 Maqsad: DW dizayn asosida "Deals Of The Day" va "Electronic & Digital Products" bo‘limlarini pixel-perfect (1:1) ko‘rinishda yaratish.
// Countdown doiraviy, rasmlar 360x360px, sarlavhalar sariq chiziqli, custom slider arrow tugmalari bilan. 
// 🔄 Ushbu versiyada RESPONSIVE qo‘shildi: rasm o‘lchamlari, flex/grid dizaynlar mobil va planshet uchun optimallashtirildi.

"use client";

import React from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import Countdown from "react-countdown";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dealsData = [
  {
    id: 1,
    image1: "/assets/img/Products/smartphone/product1.jpg",
    image2: "/assets/img/Products/smartphone/product2.jpg",
    name: "Original Mobile Android Dual SIM Smart Phone G3",
    rating: 5,
    price: 120,
    oldPrice: 125,
    description: "Typi non habent claritatem insitam, est usus legentis in iis qui facit...",
    date: "2025-12-31T23:59:59",
  },
];

const electronicsData = [
  {
    id: 1,
    image1: "/assets/img/Products/smartphone/product3.jpg",
    image2: "/assets/img/Products/smartphone/product4.jpg",
    name: "LG 27UD58: £347.21, Ebuyer.com",
    price: 560,
    rating: 4,
  },
  {
    id: 2,
    image1: "/assets/img/Products/smartphone/product2.jpg",
    image2: "/assets/img/Products/smartphone/product5.jpg",
    name: "Samsung C49J89: £875, Debenhams Plus",
    price: 450,
    rating: 5,
  },
  {
    id: 3,
    image1: "/assets/img/Products/smartphone/product1.jpg",
    image2: "/assets/img/Products/smartphone/product3.jpg",
    name: "High Quality Glass Ultra-Thin Kitchen Scale",
    price: 500,
    rating: 3,
  },
];

export default function DealsOfTheDaySection() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: "auto", spacing: 20 },
    slideChanged: () => {},
  });

  const [elecRef, elecInstanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: "auto", spacing: 20 },
    slideChanged: () => {},
  });

  return (
    <section className="deal__area bg-[#f7f7f7] py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Deals of the Day */}
          <div>
            <div className="flex items-center justify-between mb-5 relative">
              <h3 className="text-[22px] font-bold">
                Deals<span className="text-black font-normal">Of The Day</span>
              </h3>
              <div className="absolute bottom-0 left-0 w-[50px] h-[2px] bg-yellow-500"></div>
              <div className="flex gap-2 absolute right-0 -top-1">
                <button
                  title="Previous Deal"
                  onClick={() => instanceRef.current?.prev()}
                  className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  title="Next Deal"
                  onClick={() => instanceRef.current?.next()}
                  className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div ref={sliderRef} className="keen-slider">
              {dealsData.map((item) => (
                <div key={item.id} className="keen-slider__slide w-full bg-white rounded-xl p-6 flex flex-col lg:flex-row gap-6 shadow">
                  <div className="relative w-full max-w-[360px] h-[300px] sm:h-[360px] mx-auto lg:mx-0">
                    <a href="/product-details" title={item.name}>
                      <Image
                        src={item.image1}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover w-full h-full"
                      />
                      <Image
                        src={item.image2}
                        alt={`${item.name} hover`}
                        fill
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-md opacity-0 hover:opacity-100 transition duration-300"
                      />
                    </a>
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
  -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
</span>
                  </div>
                  <div className="flex-1">
                    <a href="/product-details" title={item.name} className="block text-[15px] font-semibold text-blue-800 leading-tight mb-1 hover:underline">
                      {item.name}
                    </a>
                    <div className="flex text-yellow-500 text-sm mb-2">
                      {[...Array(item.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <div className="text-[16px] text-[#ff7004] font-semibold mb-1">${item.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-400 line-through mb-1">${item.oldPrice.toFixed(2)}</div>
                    <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                    <h4 className="text-[14px] font-semibold mb-1 text-gray-800">Hurry Up! Offer ends in:</h4>
                    <Countdown
                      date={new Date(item.date)}
                      renderer={({ days, hours, minutes, seconds }) => (
                        <div className="flex gap-3 flex-wrap">
                          {[{ label: "Days", val: days }, { label: "Hours", val: hours }, { label: "Mins", val: minutes }, { label: "Secs", val: seconds }].map((t, i) => (
                            <div key={i} className="w-14 h-14 rounded-full bg-white shadow flex flex-col items-center justify-center text-[12px]">
                              <span className="text-[16px] font-bold">{t.val}</span>
                              <p>{t.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Electronic & Digital Products */}
          <div>
            <div className="flex items-center justify-between mb-5 relative">
              <h3 className="text-[22px] font-bold">
                Electronic <span className="text-black font-normal">& DigitalProducts</span>
              </h3>
              <div className="absolute bottom-0 left-0 w-[50px] h-[2px] bg-yellow-500"></div>
              <div className="flex gap-2 absolute right-0 -top-1">
                <button
                  title="Previous Product"
                  onClick={() => elecInstanceRef.current?.prev()}
                  className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  title="Next Product"
                  onClick={() => elecInstanceRef.current?.next()}
                  className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div ref={elecRef} className="keen-slider">
              {electronicsData.map((item) => (
                <div key={item.id} className="keen-slider__slide w-full sm:!w-[300px] md:!w-[360px] bg-white rounded-xl p-4 text-center shadow">
                  <div className="relative w-full max-w-[360px] h-[300px] sm:h-[360px] mx-auto">
                    <a href="/product-details" title={item.name}>
                      <Image
                        src={item.image1}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover w-full h-full"
                      />
                      <Image
                        src={item.image2}
                        alt={`${item.name} hover`}
                        fill
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-md opacity-0 hover:opacity-100 transition duration-300"
                      />
                    </a>
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      -34%
                    </span>
                  </div>
                  <a href="/product-details" className="block mt-3 text-[14px] text-blue-800 hover:underline font-medium" title={item.name}>
                    {item.name}
                  </a>
                  <div className="flex justify-center text-yellow-500 text-sm my-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <div className="text-[16px] font-bold text-gray-900">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
