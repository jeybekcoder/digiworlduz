// 📄 Fayl: src/components/sections/DealsSlider.tsx
// 🎯 Maqsad: "Deals Of The Day" slider — admin paneldan keladigan props asosida badge va isNew ni ko‘rsatadigan holatga tozalangan versiya

"use client";

import React, { useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import Countdown from "react-countdown";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/cards/ProductCard";
import CountdownCircle from "@/components/ui/CountdownCircle";
import { useAutoplaySlider } from "@/hooks/useAutoplaySlider";

const dealsData = [
  {
    id: 1,
    slug: "original-mobile-android-phone",
    image1: "/assets/img/Products/smartphone/product1.jpg",
    image2: "/assets/img/Products/smartphone/product2.jpg",
    name: "Original Mobile Android Dual SIM Smart Phone G3",
    rating: 5,
    reviewsCount: 128,
    price: 120,
    oldPrice: 125,
    stockLeft: 4,
    category: "Smartphones",
    isWished: false,
    description: "Typi non habent claritatem insitam, est usus legentis in iis qui facit...",
    date: "2025-12-31T23:59:59",
  },
];

export default function DealsSlider() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: "auto", spacing: 20 },
  });

  const { startAutoplay, stopAutoplay } = useAutoplaySlider(instanceRef);

  const renderDeals = useMemo(
    () =>
      dealsData.map((item) => (
        <div key={item.id} className="keen-slider__slide min-w-[360px] shrink-0 h-[449.5px]">
          <ProductCard
            variant="deal"
            image1={item.image1}
            image2={item.image2}
            name={item.name}
            rating={item.rating}
            reviewsCount={item.reviewsCount}
            price={item.price}
            oldPrice={item.oldPrice}
            description={item.description}
            category={item.category}
            isWished={item.isWished}
            stockLeft={item.stockLeft}
            slug={item.slug}
            showCountdown={
              <Countdown
                date={new Date(item.date)}
                renderer={({ days, hours, minutes, seconds }) => (
                  <CountdownCircle
                    days={days}
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                  />
                )}
              />
            }
          />
        </div>
      )),
    []
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5 relative">
        <h3 className="text-[22px] font-bold">
          Deals <span className="text-black font-normal">Of The Day</span>
        </h3>
        <div className="absolute bottom-0 left-0 w-[50px] h-[2px] bg-yellow-500" />
        <div className="flex gap-2 absolute right-0 -top-1">
          <button
            title="Previous Deal"
            aria-label="Previous deal"
            onClick={() => instanceRef.current?.prev()}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            title="Next Deal"
            aria-label="Next deal"
            onClick={() => instanceRef.current?.next()}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
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
        {renderDeals}
      </div>
    </div>
  );
}