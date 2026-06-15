'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export default function FoodCard({ item }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      id={`food-card-${item.id}`}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-1 active:scale-[0.98]"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 sm:h-52">
        <Image
          src={imgError ? '/mixed_grill.jpg' : item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />

        {item.badge && (
          <div className="absolute top-3 right-3">
            <span className="bg-[#D4A574]/90 text-[#0A0A0A] text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
              {item.badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3">
          <span className="bg-black/40 backdrop-blur-sm text-white/90 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/[0.1]">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-[#F5F0EB] text-base sm:text-lg leading-tight mb-1.5 group-hover:text-[#D4A574] transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-[#A89B8C] text-xs sm:text-sm leading-relaxed mb-3 flex-grow line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
          <div className="flex flex-col">
            {item.price > 0 ? (
              <>
                <span className="text-xl sm:text-2xl font-extrabold gradient-gold-text">
                  {item.price.toLocaleString('ar-EG')}
                </span>
                <span className="text-[10px] text-[#6B5E50] font-medium">جنيه مصري</span>
              </>
            ) : (
              <span className="text-xs sm:text-sm font-bold text-[#D4A574]">السعر حسب الطلب</span>
            )}
            {item.priceNote && (
              <span className="text-[9px] sm:text-[10px] text-[#6B5E50] mt-0.5 leading-tight">{item.priceNote}</span>
            )}
          </div>

          <button
            id={`add-to-cart-${item.id}`}
            onClick={handleAdd}
            disabled={item.price === 0}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              item.price === 0
                ? 'opacity-30 cursor-not-allowed bg-white/[0.05] text-[#6B5E50]'
                : added
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30 scale-95'
                  : 'btn-gold text-[#0A0A0A] hover:scale-105 active:scale-95'
            }`}
          >
            {added ? (
              <>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>تم!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>أضف</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
