'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartDrawer() {
  const router = useRouter();
  const {
    isOpen,
    closeCart,
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const handleClose = () => {
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        id="cart-drawer"
        className={`fixed top-0 left-0 h-full w-full sm:w-96 z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full bg-[#0F0F0F] border-r border-white/[0.06] flex flex-col shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06] bg-[#0A0A0A]/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#D4A574]/10 rounded-full flex items-center justify-center border border-[#D4A574]/20">
                <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-[#F5F0EB] text-lg">سلة الطلبات</h2>
                {items.length > 0 && (
                  <p className="text-[#6B5E50] text-xs">{items.length} منتج</p>
                )}
              </div>
            </div>
            <button
              id="close-cart-btn"
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center text-[#A89B8C] transition-colors duration-200 border border-white/[0.06]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="text-8xl mb-4 animate-float">🛒</div>
                <h3 className="font-bold text-[#F5F0EB] text-xl mb-2">السلة فارغة</h3>
                <p className="text-[#A89B8C] text-sm mb-6">أضف أطباقك المفضلة من قائمة الطعام</p>
                <button
                  onClick={handleClose}
                  className="btn-gold text-[#0A0A0A] px-6 py-3 rounded-xl font-bold transition-all duration-200"
                >
                  تصفح القائمة
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-[#1A1A1A] rounded-2xl p-3 border border-white/[0.06]"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#F5F0EB] text-sm leading-tight mb-1 truncate">
                        {item.title}
                      </h4>
                      <p className="gradient-gold-text font-bold text-sm">
                        {(item.price * item.quantity).toLocaleString('ar-EG')} ج.م
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center text-[#D4A574] font-bold transition-colors border border-white/[0.04]"
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-bold text-[#F5F0EB] text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center text-[#D4A574] font-bold transition-colors border border-white/[0.04]"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 rounded-full bg-red-500/5 hover:bg-red-500/15 flex items-center justify-center text-red-400 transition-colors mr-1 border border-red-500/10"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-white/[0.06] bg-[#0A0A0A]/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#A89B8C] font-medium">الإجمالي</span>
                <span className="text-2xl font-extrabold gradient-gold-text">
                  {totalPrice.toLocaleString('ar-EG')} ج.م
                </span>
              </div>

              <button
                id="checkout-btn"
                onClick={handleCheckout}
                className="w-full btn-gold text-[#0A0A0A] py-4 rounded-xl font-extrabold text-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>متابعة الطلب</span>
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-2 text-[#6B5E50] hover:text-red-400 text-sm py-2 transition-colors duration-200"
              >
                إفراغ السلة
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
