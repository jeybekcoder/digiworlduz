// 📄 Fayl: src/components/cards/ProductCard.tsx
// 🛒 Maqsad: DRY, reusable, responsive ProductCard – barcha variantlar uchun universal komponent (default, deal, sidebar, list, horizontal)

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/ui/StarRating";
import { ChevronLeft, ChevronRight, Heart, Eye, RefreshCcw, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  image1?: string;
  image2?: string;
  name?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  description?: string;
  slug?: string;
  showCountdown?: React.ReactNode;
  variant?: "default" | "deal" | "sidebar" | "list" | "horizontal";
  category?: string;
  brand?: string;
  isNew?: boolean;
  stockLeft?: number;
  reviewsCount?: number;
  badge?: string;
  isWished?: boolean;
}

function PriceBlock({ price, oldPrice }: { price?: number; oldPrice?: number }) {
  if (typeof price !== "number") return null;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;
  return (
    <div className="flex items-center gap-3 mb-2.5 min-h-[24px]">
      <div className="text-[18px] text-[#ff7004] font-bold">${price.toFixed(2)}</div>
      {oldPrice && (
        <>
          <div className="text-[14px] text-gray-400 line-through">${oldPrice.toFixed(2)}</div>
          <div className="sr-only">{discount}% discount</div>
        </>
      )}
    </div>
  );
}

const HoverActions = () => (
  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-2">
    <button
      title="Quick View"
      aria-label="Quick View"
      className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
    >
      <Eye size={18} className="text-gray-700" />
    </button>
    <button
      title="Compare"
      aria-label="Compare"
      className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
    >
      <RefreshCcw size={18} className="text-gray-700" />
    </button>
    <button
      title="Add to Cart"
      aria-label="Add to Cart"
      className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
    >
      <ShoppingCart size={18} className="text-gray-700" />
    </button>
  </div>
);

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
  category,
  brand,
  isNew,
  stockLeft,
  reviewsCount,
  badge,
  isWished,
}: ProductCardProps) {
  const isDeal = variant === "deal";
  const isDefault = variant === "default";
  const isSidebar = variant === "sidebar";
  const isList = variant === "list";
  const isHorizontal = variant === "horizontal";

  const dealImages = [image1, image2].filter(Boolean) as string[];
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + dealImages.length) % dealImages.length);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % dealImages.length);

  const imageWrapperClass =
    isDeal || isHorizontal
      ? "relative w-[360px] h-[360px]"
      : isList
      ? "relative w-[140px] h-[140px]"
      : isSidebar
      ? "relative w-full h-[180px]"
      : "relative w-full aspect-square bg-gray-50 overflow-hidden";

  return (
    <div
      className={
        isDeal ? "w-full max-w-[850px] h-[450px]"
          : isHorizontal
          ? "w-[731px] h-[389px]"
          : isDefault
          ? "w-[280px] h-[450px]"
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
        } h-full relative`}
      >
        {isWished !== undefined && (
          <button className="absolute top-3 right-3 z-20" title="Add to wishlist" aria-label="Add to wishlist">
            <Heart className={`${isWished ? "fill-red-500 text-red-500" : "text-gray-300"}`} size={18} />
          </button>
        )}

        <div className={`group ${imageWrapperClass} flex-shrink-0 mx-auto`}>
          <Link href={`/product/${slug}`}> 
            {isDeal && dealImages.length > 0 ? (
              <>
                <Image
                  src={dealImages[activeIndex] || "https://via.placeholder.com/360x360?text=Product"}
                  alt={`${name || "Product"} ${activeIndex + 1}`}
                  fill
                  sizes="100%"
                  className="rounded-md object-contain"
                  priority
                />
                {dealImages.length > 1 && (
                  <>
                    <button title="Previous image" aria-label="Previous image" onClick={(e) => { e.preventDefault(); handlePrev(); }} className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full hover:bg-gray-100"> <ChevronLeft size={16} /></button>
                    <button title="Next image" aria-label="Next image" onClick={(e) => { e.preventDefault(); handleNext(); }} className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full hover:bg-gray-100"><ChevronRight size={16} /></button>
                  </>
                )}
              </>
            ) : (
              <>
                <Image
                  src={image1 || "https://via.placeholder.com/280x280?text=Product+Image"}
                  alt={name || "Product image"}
                  fill
                  sizes="100%"
                  className="rounded-md object-contain"
                  priority
                />
                {image2 && (
                  <Image
                    src={image2}
                    alt={`${name || "Product"} hover`}
                    fill
                    sizes="100%"
                    className="absolute top-0 left-0 object-contain rounded-md opacity-0 hover:opacity-100 transition duration-300"
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </Link>
          <HoverActions />
          {isNew && <div className="absolute top-3 left-3 text-[11px] bg-green-600 text-white px-2 py-0.5 rounded-full uppercase">New</div>}
          {badge && <div className="absolute bottom-3 left-3 text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">{badge}</div>}
          {typeof oldPrice === "number" && typeof price === "number" && (
            <span className="absolute top-4 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}
        </div>

        <div className={`flex flex-col justify-start gap-2.5 p-4 flex-1 ${isDeal || isHorizontal ? "pt-[8px] pb-[8px] pr-[20px]" : ""}`}>
          <div className="space-y-1 flex flex-col min-h-full">
            <div className="min-h-[14px]">{category && <div className="text-[12px] text-gray-400 uppercase font-medium tracking-wide">{category}</div>}</div>
            <div className="min-h-[36px]">{name && (<Link href={`/product/${slug}`} className="block text-[15px] font-semibold text-blue-800 leading-tight hover:underline">{name}</Link>)}</div>
            <div className="min-h-[20px]">{typeof rating === "number" && (<div className="flex items-center gap-1"><StarRating rating={rating} centered={false} />{reviewsCount !== undefined && <span className="text-xs text-gray-400">({reviewsCount})</span>}</div>)}</div>
            <div className="min-h-[28px]">{<PriceBlock price={price} oldPrice={oldPrice} />}</div>
            <div className="min-h-[32px]">{description && (isDeal || isList || isHorizontal) && (<p className="text-sm text-gray-500 max-w-full whitespace-normal">{description}</p>)}</div>
            <div className="min-h-[24px]">{stockLeft !== undefined && (<p className="text-[12px] text-orange-500 font-medium">{stockLeft > 0 ? `Only ${stockLeft} left in stock!` : "Out of stock"}</p>)}</div>
            <div className="min-h-[48px]">{showCountdown && (<div><h4 className="text-[14px] font-medium mb-[6px] text-gray-700">Hurry Up! Offer ends in:</h4>{showCountdown}</div>)}</div>
          </div>
          {isDeal && (
            <div className="mt-auto">
              <button
                title="Add to Cart"
                className="w-full text-sm font-medium bg-[#ff7004] text-white py-2 rounded-md hover:bg-orange-600 transition"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
