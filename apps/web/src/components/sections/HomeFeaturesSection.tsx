// 📄 Fayl: src/components/sections/HomeFeaturesSection.tsx
// 🎯 Maqsad: Slider osti xizmatlar afzalliklari bo‘limi — animatsion, hoverda aylanuvchi iconlar, ketma-ket chiqadigan animatsiyalar (staggered), kirishda chiqadigan `motion.div`, Preloader tugaganidan keyin ko‘rinadigan holat, va ARIA accessibility bilan to‘liq moslashtirilgan

"use client";

import React from "react";
import {
  FaRocket,
  FaSync,
  FaHeadset,
  FaThumbsUp,
  FaPercent,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: FaRocket,
    title: "Free Shipping",
    desc: "Free Shipping On All Order",
  },
  {
    icon: FaSync,
    title: "Money Guarantee",
    desc: "30 Day Money Back Guarantee",
  },
  {
    icon: FaHeadset,
    title: "Online Support 24/7",
    desc: "Technical Support Stand By",
  },
  {
    icon: FaThumbsUp,
    title: "Secure Payment",
    desc: "All Payment Method are accepted",
  },
  {
    icon: FaPercent,
    title: "Member Discount",
    desc: "Upto 40% Discount All Products",
  },
];

export default function HomeFeaturesSection({ isLoaded = true }: { isLoaded?: boolean }) {
  return (
    <section className="features__area bg-[#f7f7f7] py-[30px] px-[10px] w-full">
      <div className="max-w-[1510px] mx-auto px-[12px]">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          variants={{
            hidden: {},
            visible: {},
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              aria-label={feature.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="features__item group flex items-center gap-4 bg-white px-5 py-4 border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="features__icon mr-[15px]">
                <feature.icon className="text-[40px] text-[#fcb700] group-hover:rotate-[12deg] group-hover:scale-125 transition-all duration-300" />
              </div>
              <div className="features__content">
                <h6 className="text-[15px] font-semibold text-[#222] mb-[2px] leading-[20px]">
                  {feature.title}
                </h6>
                <p className="text-[13px] text-[#666] leading-[18px]">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}