// 📄 Fayl: src/components/ui/StarRating.tsx
// ⭐ Maqsad: Reyting yulduzchalarini alohida, reusable, yarim yulduz (half star) qo‘llab-quvvatlaydigan va accessible komponent sifatida chiqarish

import React from "react";

interface StarRatingProps {
  rating: number; // Masalan: 4.5
  centered?: boolean;
}

const StarRating: React.FC<StarRatingProps> = React.memo(({ rating, centered = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className={`flex ${centered ? "justify-center" : ""} text-yellow-500 text-sm my-1`}
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {/* To‘liq yulduzlar */}
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#facc15"
          stroke="#facc15"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <title>Full star</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.5l2.64 5.35 5.9.86-4.27 4.16 1.01 5.87-5.26-2.77-5.26 2.77 1.01-5.87-4.27-4.16 5.9-.86L11.48 3.5z"
          />
        </svg>
      ))}

      {/* Yarim yulduz */}
      {hasHalfStar && (
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <title>Half star</title>
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGradient)"
            stroke="#facc15"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.5l2.64 5.35 5.9.86-4.27 4.16 1.01 5.87-5.26-2.77-5.26 2.77 1.01-5.87-4.27-4.16 5.9-.86L11.48 3.5z"
          />
        </svg>
      )}

      {/* Bo‘sh yulduzlar */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#facc15"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <title>Empty star</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.5l2.64 5.35 5.9.86-4.27 4.16 1.01 5.87-5.26-2.77-5.26 2.77 1.01-5.87-4.27-4.16 5.9-.86L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
});

StarRating.displayName = "StarRating";

export default StarRating;
