'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useOrderStore } from '@/store/cartStore';

const STATUS_MAP = {
  pending: { label: 'في الانتظار', icon: '⏳', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  confirmed: { label: 'تم التأكيد', icon: '✅', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  preparing: { label: 'جارٍ التحضير', icon: '👨‍🍳', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  delivering: { label: 'في الطريق', icon: '🛵', color: 'text-[#D4A574]', bg: 'bg-[#D4A574]/10 border-[#D4A574]/20' },
  delivered: { label: 'تم التوصيل', icon: '🎉', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
};

function TrackContent() {
  const searchParams = useSearchParams();
  const { lastOrder } = useOrderStore();
  const urlToken = searchParams.get('token');

  const autoToken = urlToken || lastOrder?.trackingToken || '';

  const [token, setToken] = useState(autoToken);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!!autoToken);
  const [error, setError] = useState('');
  const [showSearch, setShowSearch] = useState(!autoToken);
  const didInit = useRef(false);

  const trackOrder = async (trackToken) => {
    if (!trackToken.trim()) return;
    setLoading(true);
    setError('');
    setOrder(null);
    setShowSearch(false);

    try {
      const res = await fetch(`/api/orders?token=${trackToken.trim()}`);
      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.error || 'الطلب غير موجود');
        setShowSearch(true);
      }
    } catch {
      setError('حدث خطأ في الاتصال');
      setShowSearch(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!didInit.current && autoToken) {
      didInit.current = true;
      trackOrder(autoToken);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    trackOrder(token);
  };

  const statusInfo = order ? STATUS_MAP[order.status] || STATUS_MAP.pending : null;

  return (
    <div className="min-h-screen">
      <div className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1410] to-[#0A0A0A]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4A574]/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block glass text-[#D4A574] text-sm font-bold px-4 py-2 rounded-full mb-4">
            📍 تتبع الطلب
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F5F0EB] mb-2">
            تتبع <span className="gradient-gold-text">طلبك</span>
          </h1>
          <p className="text-[#A89B8C]">
            {autoToken && !showSearch ? 'جارٍ تحميل حالة طلبك...' : 'أدخل توكين التتبع لمعرفة حالة طلبك'}
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Loading State */}
        {loading && (
          <div className="glass-card rounded-3xl p-10 text-center">
            <div className="animate-spin w-10 h-10 border-2 border-[#D4A574] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[#A89B8C] font-bold">جارٍ تحميل الطلب...</p>
            {autoToken && <p className="text-[#6B5E50] text-sm font-mono mt-2" dir="ltr">{autoToken}</p>}
          </div>
        )}

        {/* Search Form — shown when no auto token or on error */}
        {showSearch && !loading && (
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 mb-8 animate-fadeInUp">
            <p className="text-[#F5F0EB] font-bold text-center mb-4">🔍 أدخل توكين التتبع</p>
            <div className="flex gap-3">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value.toUpperCase())}
                placeholder="مثال: A1B2C3D4"
                dir="ltr"
                className="flex-1 px-4 py-3 rounded-xl input-glass font-mono font-bold text-center tracking-wider text-lg"
              />
              <button
                type="submit"
                disabled={!token.trim()}
                className="btn-gold disabled:opacity-50 text-[#0A0A0A] px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              >
                🔍
              </button>
            </div>
            {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}
          </form>
        )}

        {/* Order Result */}
        {order && !loading && (
          <div className="glass-card rounded-3xl overflow-hidden animate-fadeInUp">
            {/* Status Header */}
            <div className={`p-6 border-b border-white/[0.06] ${statusInfo.bg}`}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-4xl">{statusInfo.icon}</span>
                <div>
                  <p className={`font-black text-2xl ${statusInfo.color}`}>{statusInfo.label}</p>
                  <p className="text-[#6B5E50] text-sm">طلب #{order.id?.slice(-8)}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4A574] to-[#E8C547] rounded-full transition-all duration-1000"
                  style={{ width: `${((Object.keys(STATUS_MAP).indexOf(order.status || 'pending') + 1) / Object.keys(STATUS_MAP).length) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-6">
              {/* Branch Info */}
              {order.branchName && (
                <div className="bg-[#D4A574]/10 border border-[#D4A574]/20 rounded-2xl p-4 mb-6">
                  <p className="text-[#6B5E50] text-xs mb-1">طلبك من</p>
                  <p className="text-[#D4A574] font-black text-lg">{order.branchName}</p>
                  {order.branchAddress && <p className="text-[#A89B8C] text-xs mt-1">{order.branchAddress}</p>}
                </div>
              )}

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B5E50]">الاسم:</span>
                  <span className="text-[#F5F0EB] font-bold">{order.customerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B5E50]">الهاتف:</span>
                  <span className="text-[#F5F0EB] font-mono" dir="ltr">{order.customerPhone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B5E50]">العنوان:</span>
                  <span className="text-[#F5F0EB] text-left max-w-[60%]">{order.deliveryAddress}</span>
                </div>
                <div className="divider-gold my-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B5E50]">التاريخ:</span>
                  <span className="text-[#F5F0EB]">{new Date(order.createdAt).toLocaleDateString('ar-EG')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B5E50]">الإجمالي:</span>
                  <span className="gradient-gold-text font-bold">{(order.totalPrice || 0).toLocaleString('ar-EG')} ج.م</span>
                </div>
              </div>

              {/* Items */}
              <h4 className="text-[#D4A574] font-bold text-sm mb-3">الأصناف</h4>
              <div className="space-y-2 mb-6">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-[#1A1A1A] rounded-xl p-3 border border-white/[0.04] text-sm">
                    <span className="text-[#F5F0EB]">{item.title}</span>
                    <span className="text-[#A89B8C]">{item.quantity} × {item.price} ج.م</span>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <h4 className="text-[#D4A574] font-bold text-sm mb-4">مراحل الطلب</h4>
              <div className="flex justify-between">
                {Object.entries(STATUS_MAP).map(([key, val], i) => {
                  const currentIndex = Object.keys(STATUS_MAP).indexOf(order.status || 'pending');
                  const isActive = i <= currentIndex;
                  return (
                    <div key={key} className="flex flex-col items-center text-center flex-1">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg mb-1 transition-all ${
                        isActive ? 'bg-[#D4A574]/20 border border-[#D4A574]/30' : 'bg-[#1A1A1A] border border-white/[0.04]'
                      }`}>
                        {val.icon}
                      </div>
                      <span className={`text-[9px] sm:text-[10px] leading-tight ${isActive ? 'text-[#D4A574] font-bold' : 'text-[#6B5E50]'}`}>{val.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Token */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
                <p className="text-[#6B5E50] text-xs mb-1">توكين التتبع</p>
                <p className="text-[#E8C547] font-mono font-black text-lg tracking-wider" dir="ltr">{order.trackingToken}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex flex-col gap-3">
              <button
                onClick={() => trackOrder(order.trackingToken)}
                className="btn-glass text-[#A89B8C] hover:text-[#F5F0EB] px-4 py-3 rounded-xl font-bold text-sm w-full"
              >
                🔄 تحديث الحالة
              </button>
              <button
                onClick={() => { setShowSearch(true); setOrder(null); setToken(''); }}
                className="text-[#6B5E50] hover:text-[#D4A574] text-sm py-2 transition-colors"
              >
                تتبع طلب آخر ←
              </button>
            </div>
          </div>
        )}

        {/* No order and no auto token */}
        {!loading && !order && !showSearch && (
          <div className="glass-card rounded-3xl p-10 text-center animate-fadeInUp">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-[#F5F0EB] mb-2">لا يوجد طلب محفوظ</h3>
            <p className="text-[#A89B8C] text-sm mb-6">لم تقم بطلب بعد، أو اطلب أولاً ثم عد هنا</p>
            <Link href="/menu" className="btn-gold text-[#0A0A0A] px-6 py-3 rounded-xl font-bold inline-block">
              تصفح القائمة
            </Link>
          </div>
        )}

        {/* Back */}
        <div className="text-center mt-8">
          <Link href="/menu" className="text-[#D4A574] hover:text-[#E8C547] font-bold text-sm transition-colors">
            ← العودة للقائمة
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#D4A574] border-t-transparent rounded-full" />
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
