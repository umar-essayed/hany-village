'use client';

import { useState, useMemo } from 'react';
import { menuItems, categories } from '@/lib/menuData';
import FoodCard from '@/components/FoodCard';
import { useCartStore } from '@/store/cartStore';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
      items = [...items].sort((a, b) => (b.priority || 0) - (a.priority || 0));
    } else {
      const catPriority = {};
      categories.forEach(c => { catPriority[c.id] = c.priority || 0; });
      items = [...items].sort((a, b) => {
        const catDiff = (catPriority[b.category] || 0) - (catPriority[a.category] || 0);
        if (catDiff !== 0) return catDiff;
        return (b.priority || 0) - (a.priority || 0);
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const sortedCategories = useMemo(() => {
    const allCat = categories.find(c => c.id === 'all');
    const rest = categories.filter(c => c.id !== 'all').sort((a, b) => (b.priority || 0) - (a.priority || 0));
    return [allCat, ...rest];
  }, []);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1410] via-[#0A0A0A] to-[#111111]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A574]/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B4513]/[0.04] rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block glass text-[#D4A574] text-sm font-bold px-4 py-2 rounded-full mb-5">
            🍽️ قائمة الطعام
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0EB] mb-4">
            اكتشف <span className="gradient-gold-text">نكهات البادية</span>
          </h1>
          <p className="text-[#A89B8C] text-lg max-w-xl mx-auto">
            من المشاوي الفاخرة إلى المندي البدوي الأصيل، كل صنف محضَّر بعناية لإرضائك
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Cart */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <svg
              className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-[#6B5E50]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن طبق..."
              className="w-full pr-12 pl-4 py-3.5 rounded-2xl input-glass font-medium"
            />
          </div>

          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 btn-gold text-[#0A0A0A] px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>السلة</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -left-2 w-6 h-6 bg-[#0A0A0A] text-[#E8C547] text-xs font-bold rounded-full flex items-center justify-center border border-[#E8C547]/30">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {sortedCategories.map((cat) => {
            const count =
              cat.id === 'all'
                ? menuItems.length
                : menuItems.filter((i) => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#D4A574]/20 text-[#D4A574] border border-[#D4A574]/30 shadow-lg shadow-[#D4A574]/10 scale-105'
                    : 'glass text-[#A89B8C] hover:text-[#F5F0EB] hover:border-[#D4A574]/20'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    activeCategory === cat.id ? 'bg-[#D4A574]/20 text-[#D4A574]' : 'bg-white/[0.06] text-[#6B5E50]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#6B5E50] text-sm">
            {filteredItems.length === 0
              ? 'لا توجد نتائج'
              : `عرض ${filteredItems.length} من ${menuItems.length} صنف`}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#D4A574] hover:text-[#E8C547] text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              مسح البحث
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#F5F0EB] mb-2">لا توجد نتائج</h3>
            <p className="text-[#A89B8C]">جرب البحث بكلمة مختلفة أو تصفح فئة أخرى</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <FoodCard item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Catering Banner */}
        <div className="mt-16 glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 text-9xl opacity-30">🎉</div>
            <div className="absolute bottom-0 left-0 text-9xl opacity-30">🍖</div>
          </div>
          <div className="relative z-10">
            <span className="inline-block glass text-[#D4A574] text-sm font-bold px-4 py-2 rounded-full mb-4">
              🎊 للمناسبات والحفلات
            </span>
            <h3 className="text-[#F5F0EB] font-black text-2xl sm:text-3xl mb-3">
              هل تخطط لحفلة أو مناسبة كبيرة؟
            </h3>
            <p className="text-[#A89B8C] mb-6 max-w-xl mx-auto">
              نوفر خدمة الكيترينج الكامل للمناسبات العائلية والحفلات بأفضل الأسعار وأجود الأطباق البدوية
            </p>
            <a
              href="tel:01100999920"
              id="catering-call-btn"
              className="inline-flex items-center gap-2 btn-gold text-[#0A0A0A] px-8 py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 hover:scale-105"
            >
              <span>📞</span>
              <span>اتصل للاستفسار</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
