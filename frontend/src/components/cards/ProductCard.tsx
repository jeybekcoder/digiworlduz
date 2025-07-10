// 📄 Fayl: src/components/cards/ProductCard.tsx
// 🛒 Maqsad: DRY, reusable, responsive ProductCard — Countdown dizayniga 1:1 moslashtirildi

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
  isCentered?: boolean;
  showCountdown?: React.ReactNode;
  slug?: string;
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
  isCentered = false,
  showCountdown,
  slug = "product-details",
}: ProductCardProps) {
  return (
    <div className="w-[731px] h-[389px] flex items-start justify-start">
      <div className="w-full h-full bg-white rounded-xl shadow flex gap-[18px] pl-[15px] pr-[15px] pt-[15px] pb-[13px] overflow-hidden">
        {/* Chap taraf: Rasm */}
        <div className="relative w-[360px] h-[360px] shrink-0">
          <Link href={`/product/${slug}`}>
            <Image
              src={image1}
              alt={name}
              fill
              sizes="360px"
              className="rounded-md object-cover w-full h-full"
              priority
            />
            <Image
              src={image2}
              alt={`${name} hover`}
              fill
              sizes="360px"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-md opacity-0 hover:opacity-100 transition duration-300"
              aria-hidden="true"
            />
          </Link>
          {oldPrice && (
            <span className="absolute top-4 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* O‘ng taraf: Ma’lumotlar */}
        <div className="flex flex-col justify-between flex-1 pt-[10px] pb-[6px]">
          <div className="flex flex-col space-y-[14px]">
            <Link
              href={`/product/${slug}`}
              className={`block text-[15px] font-semibold text-blue-800 leading-tight hover:underline ${isCentered ? "text-center" : ""}`}
            >
              {name}
            </Link>

            <StarRating rating={rating} centered={isCentered} />

            <PriceBlock price={price} oldPrice={oldPrice} />

            {description && !isCentered && (
              <p className="text-sm text-gray-500 max-w-full whitespace-normal">
                {description}
              </p>
            )}
          </div>

          {showCountdown && (
            <div className="mt-[20px]">
              <h4 className="text-[14px] font-medium mb-[12px] text-gray-700">
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
