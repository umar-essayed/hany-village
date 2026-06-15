'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function CartToast() {
  const { items } = useCartStore();
  const prevCountRef = useRef(0);
  const toastRef = useRef(null);
  const timeoutRef = useRef(null);
  const toastElRef = useRef(null);

  useEffect(() => {
    const currentCount = items.reduce((acc, item) => acc + item.quantity, 0);
    if (currentCount > prevCountRef.current && prevCountRef.current > 0) {
      const lastItem = items[items.length - 1];
      if (lastItem && toastElRef.current) {
        toastElRef.current.querySelector('.toast-title').textContent = lastItem.title;
        toastElRef.current.querySelector('.toast-price').textContent = `اتضاف للسلة • ${lastItem.price} ج.م`;
        toastElRef.current.classList.remove('opacity-0', 'translate-y-2');
        toastElRef.current.classList.add('opacity-100', 'translate-y-0');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (toastElRef.current) {
            toastElRef.current.classList.add('opacity-0', 'translate-y-2');
            toastElRef.current.classList.remove('opacity-100', 'translate-y-0');
          }
        }, 2500);
      }
    }
    prevCountRef.current = currentCount;
  }, [items]);

  return (
    <div
      ref={toastElRef}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none opacity-0 translate-y-2 transition-all duration-300"
    >
      <div className="bg-[#1A1A1A]/95 backdrop-blur-xl border border-[#D4A574]/30 rounded-2xl px-5 py-3 shadow-2xl shadow-black/50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm">✓</div>
        <div>
          <p className="toast-title text-[#F5F0EB] font-bold text-sm"></p>
          <p className="toast-price text-[#D4A574] text-xs"></p>
        </div>
      </div>
    </div>
  );
}
