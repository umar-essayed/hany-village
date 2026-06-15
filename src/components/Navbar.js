'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/menu', label: 'قائمة الطعام' },
    { href: '/about', label: 'عنّا' },
    { href: '/book-tent', label: 'احجز خيمتك' },
    { href: '/track', label: 'تتبع طلبك' },
    { href: '/contact', label: 'تواصل معنا' },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-xl shadow-lg shadow-black/40 border-b border-white/[0.06]'
          : 'bg-[#0A0A0A]/70 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className={`relative transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'} group-hover:scale-105`}>
              <Image
                src="/logo.jpg"
                alt="شعار قرية هاني"
                fill
                className="object-contain rounded-full ring-1 ring-[#D4A574]/20"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-extrabold text-lg leading-tight text-[#F5F0EB]">
                قرية هانى
              </span>
              <span className="text-xs font-medium leading-tight text-[#D4A574]">
                للمأكولات البدوية والمشويات
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full font-semibold text-sm text-[#A89B8C] hover:text-[#F5F0EB] hover:bg-white/[0.08] transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              id="cart-toggle-btn"
              onClick={toggleCart}
              className="relative flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.08] text-[#F5F0EB] px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">السلة</span>
              {totalItems > 0 && (
                <span suppressHydrationWarning className="absolute -top-2 -left-2 w-5 h-5 bg-gradient-to-br from-[#D4A574] to-[#E8C547] text-[#0A0A0A] text-xs font-bold rounded-full flex items-center justify-center animate-bounceIn">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/menu"
              className="hidden sm:flex items-center gap-2 btn-gold text-[#0A0A0A] px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105"
            >
              <span>اطلب الآن</span>
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-[#F5F0EB] hover:bg-white/[0.08] transition-colors duration-300"
              aria-label="فتح القائمة"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-[#F5F0EB] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-full bg-[#F5F0EB] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-[#F5F0EB] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#111111]/95 backdrop-blur-xl mx-4 mt-2 rounded-2xl p-4 space-y-1 border border-white/[0.06]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#A89B8C] hover:text-[#F5F0EB] hover:bg-white/[0.06] font-semibold transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/menu"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 mt-3 btn-gold text-[#0A0A0A] px-5 py-3 rounded-xl font-bold transition-all duration-200"
          >
            اطلب الآن
          </Link>
        </div>
      </div>
    </header>
  );
}
