// 📄 Fayl: src/components/cards/ProductCard.tsx
// 🛒 Maqsad: DRY, reusable, responsive ProductCard – barcha variantlar uchun universal komponent (default, deal, sidebar, list, horizontal)

import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/ui/StarRating";

interface ProductCardProps {
  image1: string;
  image2: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  description?: string;
  slug?: string;
  showCountdown?: React.ReactNode;
  variant?: "default" | "deal" | "sidebar" | "list" | "horizontal";
}

function PriceBlock({ price, oldPrice }: { price: number; oldPrice?: number }) {
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;
  return (
    <div className="flex items-center gap-3 mb-[10px]">
      <div className="text-[16px] text-[#ff7004] font-semibold">${price.toFixed(2)}</div>
      {oldPrice && (
        <>
          <div className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</div>
          <div className="sr-only">{discount}% discount</div>
        </>
      )}
    </div>
  );
}

export default function ProductCard({
  image1,
  image2,
  name,
  price,
  oldPrice,
  rating,
  description,
  slug = "product-details",
  showCountdown,
  variant = "default",
}: ProductCardProps) {
  const isDeal = variant === "deal";
  const isDefault = variant === "default";
  const isSidebar = variant === "sidebar";
  const isList = variant === "list";
  const isHorizontal = variant === "horizontal";

  return (
    <div
      className={
        isDeal
          ? "w-full max-w-[850px] h-[360px]"
          : isHorizontal
          ? "w-[731px] h-[389px]"
          : isDefault
          ? "w-[280px] h-auto"
          : isSidebar
          ? "w-[200px] h-auto"
          : isList
          ? "w-full h-[140px]"
          : ""
      }
    >
      <div
        className={`bg-white rounded-xl shadow overflow-hidden flex ${
          isDeal || isList || isHorizontal ? "flex-row" : "flex-col"
        }`}
      >
        {/* 🖼 Rasm qismi */}
        <div
          className={`relative ${
            isDeal || isHorizontal
              ? "w-[360px] h-[360px]"
              : isList
              ? "w-[140px] h-[140px]"
              : isSidebar
              ? "w-full h-[180px]"
              : "w-full h-[250px]"
          } flex-shrink-0`}
        >
          <Link href={`/product/${slug}`}>
            <Image
              src={image1}
              alt={name}
              fill
              sizes="100%"
              className="rounded-md object-cover"
              priority
            />
            <Image
              src={image2}
              alt={`${name} hover`}
              fill
              sizes="100%"
              className="absolute top-0 left-0 object-cover rounded-md opacity-0 hover:opacity-100 transition duration-300"
              aria-hidden="true"
            />
          </Link>
          {oldPrice && (
            <span className="absolute top-4 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* ℹ️ Ma’lumot qismi */}
        <div
          className={`flex flex-col justify-between gap-3 p-4 flex-1 ${
            isDeal || isHorizontal ? "pt-[8px] pb-[8px] pr-[20px]" : ""
          }`}
        >
          <Link
            href={`/product/${slug}`}
            className="block text-[15px] font-semibold text-blue-800 leading-tight hover:underline"
          >
            {name}
          </Link>

          <StarRating rating={rating} centered={false} />

          <PriceBlock price={price} oldPrice={oldPrice} />

          {description && (isDeal || isList || isHorizontal) && (
            <p className="text-sm text-gray-500 max-w-full whitespace-normal">
              {description}
            </p>
          )}

          {showCountdown && (
            <div className="mt-2">
              <h4 className="text-[14px] font-medium mb-[8px] text-gray-700">
                Hurry Up! Offer ends in:
              </h4>
              {showCountdown}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
