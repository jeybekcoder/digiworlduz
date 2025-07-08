// 📄 Fayl: src/components/sections/HomeBannersSection.tsx
// 🎯 Maqsad: Home sahifadagi uchta banner (rasm)ni ko‘rsatish — DW `index-3.html` layoutiga mos, aniqligi 1px darajasida.
// 📦 Texnologiyalar: React, Next.js, Tailwind CSS, Next <Image> bilan optimallashtirilgan, animatsiyali hover transition

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const bannerData = [
  {
    id: 1,
    image: "/assets/img/banner/banner-1.jpg",
    link: "/product-details",
  },
  {
    id: 2,
    image: "/assets/img/banner/banner-2.jpg",
    link: "/product-details",
  },
  {
    id: 3,
    image: "/assets/img/banner/banner-3.jpg",
    link: "/product-details",
  },
];

export default function HomeBannersSection() {
  return (
    <section className="banner__area pt-[20px] bg-[#f5f6f9] w-full max-w-[1905px] mx-auto">
      <div className="w-full xl:max-w-[1184px] px-[12px] mx-auto">
        <div className="flex flex-wrap -mx-[12px]">
          {bannerData.map((banner) => (
            <div
              key={banner.id}
              className="w-full md:w-1/2 xl:w-1/3 px-[12px] mb-[30px]"
            >
              <div className="banner__item w-img mb-[30px] overflow-hidden rounded-[3px] transition-transform duration-300 ease-in-out hover:scale-[1.02]">
                <Link href={banner.link} className="block">
                  <Image
                    src={banner.image}
                    alt={`Banner ${banner.id}`}
                    width={376}
                    height={246}
                    className="w-full h-[246.969px] object-cover rounded-[3px]"
                    priority
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
