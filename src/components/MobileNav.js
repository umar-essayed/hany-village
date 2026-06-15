'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();
  const { items, toggleCart } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { href: '/', icon: '🏠', label: 'الرئيسية' },
    { href: '/menu', icon: '🍽️', label: 'القائمة' },
    { action: 'cart', icon: '🛒', label: 'السلة', badge: totalItems },
    { href: '/track', icon: '📍', label: 'تتبع' },
    { href: '/contact', icon: '📞', label: 'تواصل' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-[#0F0F0F]/95 backdrop-blur-xl border-t border-white/[0.08] safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-1">
          {links.map((link) => {
            const isActive = link.href && pathname === link.href;
            const isCart = link.action === 'cart';

            const content = (
              <>
                <div className="relative">
                  <span className={`text-lg ${isActive ? 'scale-110' : ''} transition-transform`}>{link.icon}</span>
                  {link.badge > 0 && (
                    <span className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-gradient-to-br from-[#D4A574] to-[#E8C547] text-[#0A0A0A] text-[9px] font-black rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 font-bold ${isActive ? 'text-[#D4A574]' : 'text-[#6B5E50]'}`}>
                  {link.label}
                </span>
              </>
            );

            if (isCart) {
              return (
                <button
                  key="cart"
                  onClick={toggleCart}
                  className="flex flex-col items-center justify-center py-2 px-3 min-w-[56px] transition-all active:scale-95"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-[56px] transition-all active:scale-95 ${
                  isActive ? 'text-[#D4A574]' : 'text-[#6B5E50]'
                }`}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
