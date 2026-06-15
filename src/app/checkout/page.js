'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, useOrderStore } from '@/store/cartStore';

const BRANCHES = [
  { id: 'alexandria', label: 'فرع الإسكندرية', address: 'طريق القاهرة الصحراوي الكيلو 30 (بجوار ماكدونالز)', mapsUrl: 'https://maps.app.goo.gl/1rAD8C2SCRaRn9Uf8' },
  { id: 'cairo', label: 'فرع القاهرة', address: 'الشيخ زايد — الكيلو 28 — أمام داندي مول', mapsUrl: 'https://maps.app.goo.gl/Kb7LBkLZAQVfVMB37' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalPrice, userInfo, setUserInfo } = useCartStore();
  const { setLastOrder } = useOrderStore();
  const totalPrice = getTotalPrice();

  const [formData, setFormData] = useState({
    customerName: userInfo.customerName || '',
    customerPhone: userInfo.customerPhone || '',
    deliveryAddress: userInfo.deliveryAddress || '',
    branch: userInfo.branch || '',
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [orderResult, setOrderResult] = useState(null);
  const orderCounter = useRef(0);

  const selectedBranch = BRANCHES.find(b => b.id === formData.branch);

  const validate = () => {
    const newErrors = {};
    if (!formData.branch) newErrors.branch = 'اختر الفرع';
    if (!formData.customerName.trim()) newErrors.customerName = 'الاسم مطلوب';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'رقم الهاتف مطلوب';
    else if (!/^(01)[0-9]{9}$/.test(formData.customerPhone.trim())) newErrors.customerPhone = 'رقم الهاتف غير صحيح (01XXXXXXXXX)';
    if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = 'عنوان التوصيل مطلوب';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('loading');

    setUserInfo(formData);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          branchName: selectedBranch?.label,
          branchAddress: selectedBranch?.address,
          items: items.map(({ id, title, quantity, price }) => ({
            itemId: id, title, quantity, price,
          })),
          totalPrice,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrderResult({
          orderId: data.orderId,
          trackingToken: data.trackingToken,
          branch: selectedBranch,
        });
        setLastOrder({
          orderId: data.orderId,
          trackingToken: data.trackingToken,
          items: [...items],
          totalPrice,
          customerName: formData.customerName,
          branch: formData.branch,
          branchName: selectedBranch?.label,
          createdAt: new Date().toISOString(),
        });
        clearCart();
        setStatus('success');
      } else {
        orderCounter.current += 1;
        const fallbackToken = `LOCAL${orderCounter.current}`.toUpperCase();
        setOrderResult({
          orderId: `local-${orderCounter.current}`,
          trackingToken: fallbackToken,
          branch: selectedBranch,
        });
        setLastOrder({
          orderId: `local-${orderCounter.current}`,
          trackingToken: fallbackToken,
          items: [...items],
          totalPrice,
          customerName: formData.customerName,
          branch: formData.branch,
          branchName: selectedBranch?.label,
          createdAt: new Date().toISOString(),
        });
        clearCart();
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (status === 'success' && orderResult) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="glass-card rounded-3xl p-8 sm:p-14 max-w-lg w-full text-center animate-fadeInUp">
          <div className="text-8xl mb-6 animate-bounceIn">🎉</div>
          <h1 className="text-3xl font-black text-[#F5F0EB] mb-3">تم تأكيد طلبك!</h1>
          <p className="text-[#A89B8C] text-lg mb-6">
            شكراً <strong className="text-[#F5F0EB]">{formData.customerName}</strong>! سيتواصل معك فريقنا قريباً.
          </p>

          {/* Branch Info */}
          {orderResult.branch && (
            <div className="bg-[#D4A574]/10 border border-[#D4A574]/20 rounded-2xl p-4 mb-6">
              <p className="text-[#6B5E50] text-sm mb-1">طلبك من</p>
              <p className="text-[#D4A574] font-black text-lg">{orderResult.branch.label}</p>
              <p className="text-[#A89B8C] text-xs mt-1">{orderResult.branch.address}</p>
            </div>
          )}

          <div className="glass rounded-2xl p-5 mb-6 text-right">
            <h4 className="font-bold text-[#D4A574] mb-3 text-center">معلومات التتبع</h4>
            <div className="space-y-3">
              <div className="flex flex-col items-center">
                <span className="text-[#6B5E50] text-sm mb-1">توكين التتبع</span>
                <span className="text-[#E8C547] font-mono font-black text-2xl tracking-wider">{orderResult.trackingToken}</span>
              </div>
              <div className="divider-gold my-3" />
              <div className="flex justify-between text-sm">
                <span className="text-[#6B5E50]">رقم الطلب:</span>
                <span className="text-[#F5F0EB] font-mono text-xs">{orderResult.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B5E50]">الإجمالي:</span>
                <span className="gradient-gold-text font-bold">{totalPrice.toLocaleString('ar-EG')} ج.م</span>
              </div>
            </div>
          </div>

          <p className="text-[#6B5E50] text-sm mb-6">
            احفظ توكين التتبع لمتابعة حالة طلبك لاحقاً
          </p>

          <div className="flex flex-col gap-3">
            <Link href={`/track?token=${orderResult.trackingToken}`} className="btn-gold text-[#0A0A0A] px-6 py-3 rounded-xl font-bold transition-all hover:scale-105">
              📍 تتبع الطلب
            </Link>
            <Link href="/menu" className="btn-glass text-[#A89B8C] hover:text-[#F5F0EB] px-6 py-3 rounded-xl font-bold transition-all">
              متابعة التصفح
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1410] to-[#0A0A0A]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4A574]/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block glass text-[#D4A574] text-sm font-bold px-4 py-2 rounded-full mb-4">
            🛵 إتمام الطلب
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F5F0EB] mb-2">
            <span className="gradient-gold-text">بيانات التوصيل</span>
          </h1>
        </div>
      </div>

      {items.length === 0 && status !== 'success' ? (
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-[#F5F0EB] mb-2">السلة فارغة</h3>
          <p className="text-[#A89B8C] mb-6">أضف أطباقك المفضلة أولاً</p>
          <Link href="/menu" className="btn-gold text-[#0A0A0A] px-6 py-3 rounded-xl font-bold">تصفح القائمة</Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 glass-card rounded-3xl p-6 sm:p-8">
              {/* Branch Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-[#A89B8C] mb-3">اختر الفرع *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BRANCHES.map((branch) => (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => handleChange('branch', branch.id)}
                      className={`text-right p-4 rounded-2xl transition-all duration-200 ${
                        formData.branch === branch.id
                          ? 'bg-[#D4A574]/15 border-[#D4A574]/40 shadow-md shadow-[#D4A574]/10'
                          : 'bg-[#1A1A1A] border-white/[0.06] hover:border-[#D4A574]/20'
                      } border`}
                    >
                      <div className="font-bold text-[#F5F0EB] mb-1">
                        {branch.id === 'alexandria' ? '🏙️' : '🌆'} {branch.label}
                      </div>
                      <div className="text-xs text-[#6B5E50]">{branch.address}</div>
                    </button>
                  ))}
                </div>
                {errors.branch && <p className="text-red-400 text-xs mt-1">{errors.branch}</p>}
              </div>

              <div className="divider-gold mb-6" />

              <h2 className="text-xl font-black text-[#F5F0EB] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D4A574]/20 flex items-center justify-center text-[#D4A574] font-bold text-sm">1</span>
                بيانات التوصيل
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#A89B8C] mb-2">الاسم الكامل *</label>
                  <input type="text" value={formData.customerName} onChange={(e) => handleChange('customerName', e.target.value)} placeholder="أدخل اسمك الكامل" className={`w-full px-4 py-3 rounded-xl input-glass font-medium ${errors.customerName ? 'border-red-500/50' : ''}`} />
                  {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#A89B8C] mb-2">رقم الهاتف *</label>
                  <input type="tel" value={formData.customerPhone} onChange={(e) => handleChange('customerPhone', e.target.value)} placeholder="01XXXXXXXXX" dir="ltr" className={`w-full px-4 py-3 rounded-xl input-glass font-medium ${errors.customerPhone ? 'border-red-500/50' : ''}`} />
                  {errors.customerPhone && <p className="text-red-400 text-xs mt-1">{errors.customerPhone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#A89B8C] mb-2">عنوان التوصيل *</label>
                  <textarea value={formData.deliveryAddress} onChange={(e) => handleChange('deliveryAddress', e.target.value)} placeholder="أدخل عنوانك بالتفصيل (المنطقة، الشارع، علامة مميزة)" rows={3} className={`w-full px-4 py-3 rounded-xl input-glass font-medium resize-none ${errors.deliveryAddress ? 'border-red-500/50' : ''}`} />
                  {errors.deliveryAddress && <p className="text-red-400 text-xs mt-1">{errors.deliveryAddress}</p>}
                </div>
              </div>

              {userInfo.customerName && <p className="text-[#6B5E50] text-xs mt-3">✓ تم تعبئة البيانات من طلبك السابق</p>}
              {status === 'error' && <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">حدث خطأ، حاول مرة أخرى</div>}

              <button type="submit" disabled={status === 'loading'} className="w-full mt-6 btn-gold disabled:opacity-50 text-[#0A0A0A] py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3">
                {status === 'loading' ? (
                  <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> جارٍ الإرسال...</>
                ) : (
                  <><span>✅</span><span>تأكيد الطلب</span></>
                )}
              </button>
            </form>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-black text-[#F5F0EB] text-lg mb-4">🛒 ملخص الطلب</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-[#1A1A1A] rounded-xl p-3 border border-white/[0.04]">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#F5F0EB] text-sm font-bold truncate">{item.title}</h4>
                        <p className="text-[#6B5E50] text-xs">{item.quantity} × {item.price} ج.م</p>
                      </div>
                      <span className="gradient-gold-text font-bold text-sm">{(item.price * item.quantity).toLocaleString('ar-EG')} ج.م</span>
                    </div>
                  ))}
                </div>
                <div className="divider-gold my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-[#A89B8C] font-bold">الإجمالي</span>
                  <span className="text-2xl font-extrabold gradient-gold-text">{totalPrice.toLocaleString('ar-EG')} ج.م</span>
                </div>
              </div>

              {selectedBranch && (
                <div className="glass-card rounded-3xl p-6 gold-glow">
                  <h3 className="font-black text-[#D4A574] text-sm mb-2">📍 الفرع المختار</h3>
                  <p className="text-[#F5F0EB] font-bold">{selectedBranch.label}</p>
                  <p className="text-[#6B5E50] text-xs mt-1">{selectedBranch.address}</p>
                </div>
              )}

              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-black text-[#D4A574] text-sm mb-3">📞 مساعدة؟</h3>
                <p className="text-[#6B5E50] text-xs mb-3">تواصل معنا لأي استفسار</p>
                <a href="tel:01100999920" className="btn-glass text-[#F5F0EB] px-4 py-2 rounded-xl text-sm font-bold w-full flex items-center justify-center gap-2">📞 01100999920</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
