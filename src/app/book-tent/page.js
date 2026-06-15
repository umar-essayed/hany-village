'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

const BRANCHES = [
  { id: 'alexandria', label: '🏙️ فرع الإسكندرية', address: 'طريق القاهرة الصحراوي الكيلو 30' },
  { id: 'cairo', label: '🌆 فرع القاهرة', address: 'الشيخ زايد — أمام داندي مول' },
];

const SEATING_OPTIONS = [
  { value: 'خيمة بدوية', label: '⛺ خيمة بدوية خاصة', desc: 'خصوصية تامة، أجواء بدوية فاخرة' },
  { value: 'طاولة عادية', label: '🪑 طاولة عادية', desc: 'في صالة المطعم الرئيسية' },
];

const TIME_SLOTS = [
  { value: '12:00 ظهراً', label: '12:00 ظهراً' },
  { value: '1:00 مساءً', label: '1:00 مساءً' },
  { value: '2:00 مساءً', label: '2:00 مساءً' },
  { value: '3:00 مساءً', label: '3:00 مساءً' },
  { value: '4:00 مساءً', label: '4:00 مساءً' },
  { value: '5:00 مساءً', label: '5:00 مساءً' },
  { value: '6:00 مساءً', label: '6:00 مساءً' },
  { value: '7:00 مساءً', label: '7:00 مساءً' },
  { value: '8:00 مساءً', label: '8:00 مساءً' },
  { value: '9:00 مساءً', label: '9:00 مساءً' },
  { value: '10:00 مساءً', label: '10:00 مساءً' },
  { value: '11:00 مساءً', label: '11:00 مساءً' },
  { value: '12:00 منتصف الليل', label: '12:00 منتصف الليل' },
  { value: '1:00 فجراً', label: '1:00 فجراً' },
  { value: '2:00 فجراً', label: '2:00 فجراً' },
];

export default function BookTentPage() {
  const { userInfo } = useCartStore();
  const [formData, setFormData] = useState({
    name: userInfo.customerName || '',
    phone: userInfo.customerPhone || '',
    branch: '',
    date: '',
    time: '',
    guestsCount: 2,
    seatingType: 'خيمة بدوية',
    notes: '',
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [trackingToken, setTrackingToken] = useState('');

  const selectedBranch = BRANCHES.find(b => b.id === formData.branch);

  const validate = () => {
    const newErrors = {};
    if (!formData.branch) newErrors.branch = 'اختر الفرع';
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    else if (!/^(01)[0-9]{9}$/.test(formData.phone.trim())) newErrors.phone = 'رقم الهاتف غير صحيح';
    if (!formData.date) newErrors.date = 'التاريخ مطلوب';
    if (!formData.time) newErrors.time = 'الوقت مطلوب';
    if (formData.guestsCount < 1) newErrors.guestsCount = 'عدد الضيوف يجب أن يكون 1 على الأقل';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          branchName: selectedBranch?.label,
          branchAddress: selectedBranch?.address,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTrackingToken(data.trackingToken);
        setStatus('success');
      } else {
        setTrackingToken('LOCAL');
        setStatus('success');
      }
    } catch {
      setTrackingToken('LOCAL');
      setStatus('success');
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      branch: '',
      date: '',
      time: '',
      guestsCount: 2,
      seatingType: 'خيمة بدوية',
      notes: '',
    });
    setStatus('idle');
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bedouin_tent_interior.jpg" alt="خيام بدوية" fill className="object-cover opacity-20" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 to-[#0A0A0A]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4A574]/[0.05] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block glass text-[#D4A574] text-sm font-bold px-4 py-2 rounded-full mb-4">
            ⛺ نظام الحجز
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F5F0EB] mb-3">
            احجز <span className="gradient-gold-text">خيمتك البدوية</span>
          </h1>
          <p className="text-[#A89B8C] text-base sm:text-lg max-w-xl mx-auto">
            استمتع بتجربة فريدة مع عائلتك في خيامنا الفاخرة
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {status === 'success' ? (
          <div className="glass-card rounded-3xl p-8 sm:p-14 text-center animate-fadeInUp">
            <div className="text-7xl mb-5 animate-bounceIn">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F5F0EB] mb-3">تم تأكيد حجزك!</h2>
            <p className="text-[#A89B8C] text-base sm:text-lg leading-relaxed mb-4">
              شكراً <strong className="text-[#F5F0EB]">{formData.name}</strong>! سيتواصل معك فريقنا خلال ساعة.
            </p>

            {selectedBranch && (
              <div className="bg-[#D4A574]/10 border border-[#D4A574]/20 rounded-2xl p-4 mb-5 max-w-md mx-auto">
                <p className="text-[#6B5E50] text-xs mb-1">الحجز في</p>
                <p className="text-[#D4A574] font-black text-lg">{selectedBranch.label.replace(/^[^\s]+\s/, '')}</p>
              </div>
            )}

            {trackingToken && (
              <div className="glass rounded-2xl p-5 mb-6 max-w-md mx-auto">
                <p className="text-[#6B5E50] text-sm mb-2">توكين تتبع الحجز</p>
                <p className="text-[#E8C547] font-mono font-black text-2xl tracking-wider">{trackingToken}</p>
              </div>
            )}

            <div className="glass rounded-2xl p-5 mb-8 text-right max-w-md mx-auto">
              <h4 className="font-bold text-[#D4A574] mb-3 text-center">ملخص الحجز</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#6B5E50]">الفرع:</span><span className="font-bold text-[#F5F0EB]">{selectedBranch?.label.replace(/^[^\s]+\s/, '')}</span></div>
                <div className="flex justify-between"><span className="text-[#6B5E50]">النوع:</span><span className="font-bold text-[#F5F0EB]">{formData.seatingType}</span></div>
                <div className="flex justify-between"><span className="text-[#6B5E50]">التاريخ:</span><span className="font-bold text-[#F5F0EB]">{formData.date}</span></div>
                <div className="flex justify-between"><span className="text-[#6B5E50]">الوقت:</span><span className="font-bold text-[#F5F0EB]">{formData.time}</span></div>
                <div className="flex justify-between"><span className="text-[#6B5E50]">الضيوف:</span><span className="font-bold text-[#F5F0EB]">{formData.guestsCount} أشخاص</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:01100999920" className="btn-gold text-[#0A0A0A] px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 text-center">
                📞 اتصل بنا للتأكيد
              </a>
              <button onClick={resetForm} className="btn-glass text-[#A89B8C] hover:text-[#F5F0EB] px-6 py-3 rounded-xl font-bold transition-all">
                حجز آخر
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* FORM */}
            <form id="reservation-form" onSubmit={handleSubmit} className="lg:col-span-3 glass-card rounded-3xl p-5 sm:p-8">

              {/* Branch Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-[#A89B8C] mb-3">اختر الفرع *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BRANCHES.map((branch) => (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => handleChange('branch', branch.id)}
                      className={`text-right p-4 rounded-2xl transition-all duration-200 border ${
                        formData.branch === branch.id
                          ? 'bg-[#D4A574]/15 border-[#D4A574]/40 shadow-md shadow-[#D4A574]/10'
                          : 'bg-[#1A1A1A] border-white/[0.06] hover:border-[#D4A574]/20'
                      }`}
                    >
                      <div className="font-bold text-[#F5F0EB] mb-1">{branch.label}</div>
                      <div className="text-xs text-[#6B5E50]">{branch.address}</div>
                    </button>
                  ))}
                </div>
                {errors.branch && <p className="text-red-400 text-xs mt-1">{errors.branch}</p>}
              </div>

              <div className="divider-gold mb-6" />

              {/* Seating Type */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-[#A89B8C] mb-3">نوع الجلسة *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleChange('seatingType', opt.value)}
                      className={`text-right p-4 rounded-2xl transition-all duration-200 border ${
                        formData.seatingType === opt.value
                          ? 'bg-[#D4A574]/15 border-[#D4A574]/40 shadow-md shadow-[#D4A574]/10'
                          : 'bg-[#1A1A1A] border-white/[0.06] hover:border-[#D4A574]/20'
                      }`}
                    >
                      <div className="font-bold text-[#F5F0EB] mb-1">{opt.label}</div>
                      <div className="text-xs text-[#6B5E50]">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-[#A89B8C] mb-2">الاسم الكامل *</label>
                  <input id="reservation-name" type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="أدخل اسمك" className={`w-full px-4 py-3 rounded-xl input-glass font-medium ${errors.name ? 'border-red-500/50' : ''}`} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#A89B8C] mb-2">رقم الهاتف *</label>
                  <input id="reservation-phone" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="01XXXXXXXXX" dir="ltr" className={`w-full px-4 py-3 rounded-xl input-glass font-medium ${errors.phone ? 'border-red-500/50' : ''}`} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-[#A89B8C] mb-2">التاريخ *</label>
                  <input id="reservation-date" type="date" min={minDate} value={formData.date} onChange={(e) => handleChange('date', e.target.value)} className={`w-full px-4 py-3 rounded-xl input-glass font-medium ${errors.date ? 'border-red-500/50' : ''}`} />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#A89B8C] mb-2">الوقت *</label>
                  <select id="reservation-time" value={formData.time} onChange={(e) => handleChange('time', e.target.value)} className={`w-full px-4 py-3 rounded-xl input-glass font-medium ${errors.time ? 'border-red-500/50' : ''}`}>
                    <option value="">اختر الوقت</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Guests Count */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-[#A89B8C] mb-2">عدد الضيوف *</label>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => handleChange('guestsCount', Math.max(1, formData.guestsCount - 1))} className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-white/[0.08] flex items-center justify-center text-[#D4A574] font-bold text-lg transition-colors border border-white/[0.06]">−</button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-black text-[#F5F0EB]">{formData.guestsCount}</span>
                    <p className="text-xs text-[#6B5E50] mt-1">شخص</p>
                  </div>
                  <button type="button" onClick={() => handleChange('guestsCount', Math.min(50, formData.guestsCount + 1))} className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-white/[0.08] flex items-center justify-center text-[#D4A574] font-bold text-lg transition-colors border border-white/[0.06]">+</button>
                </div>
                {errors.guestsCount && <p className="text-red-400 text-xs mt-1">{errors.guestsCount}</p>}
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-[#A89B8C] mb-2">ملاحظات إضافية</label>
                <textarea id="reservation-notes" value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)} placeholder="أي متطلبات خاصة (اختياري)" rows={2} className="w-full px-4 py-3 rounded-xl input-glass font-medium resize-none" />
              </div>

              {/* Submit */}
              <button type="submit" id="submit-reservation-btn" disabled={status === 'loading'} className="w-full btn-gold disabled:opacity-50 text-[#0A0A0A] py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3">
                {status === 'loading' ? (
                  <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> جارٍ التأكيد...</>
                ) : (
                  <><span>⛺</span><span>تأكيد الحجز</span></>
                )}
              </button>
            </form>

            {/* SIDEBAR */}
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-black text-[#F5F0EB] text-lg mb-4 flex items-center gap-2">
                  <span className="text-[#D4A574]">✨</span> مميزات الحجز
                </h3>
                {[
                  { icon: '⛺', text: 'خيام بدوية فاخرة مع خصوصية تامة' },
                  { icon: '🔥', text: 'مشاوي طازجة على الفحم الطبيعي' },
                  { icon: '🌙', text: 'أجواء بدوية ساحرة تحت النجوم' },
                  { icon: '👨‍👩‍👧‍👦', text: 'مناسب للعائلات والمجموعات' },
                  { icon: '🕐', text: 'متاح 24 ساعة طوال الأسبوع' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3 text-sm">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[#A89B8C] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Branches Info */}
              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-black text-[#D4A574] text-sm mb-4">📍 فروعنا</h3>
                {BRANCHES.map((branch) => (
                  <div key={branch.id} className="flex items-start gap-3 mb-3">
                    <span className="text-[#D4A574] mt-0.5">{branch.id === 'alexandria' ? '🏙️' : '🌆'}</span>
                    <div>
                      <p className="text-[#F5F0EB] font-bold text-sm">{branch.label.replace(/^[^\s]+\s/, '')}</p>
                      <p className="text-[#6B5E50] text-xs">{branch.address}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-black text-[#D4A574] text-sm mb-3">⏰ أوقات العمل</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B5E50] text-sm">جميع أيام الأسبوع</span>
                    <span className="text-green-400 font-bold text-sm">24 ساعة ✓</span>
                  </div>
                  <div className="glass rounded-xl p-3 text-center border-green-500/20">
                    <span className="text-green-400 font-bold text-sm">🟢 مفتوح الآن</span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 gold-glow">
                <h3 className="font-black text-sm mb-2 text-[#F5F0EB]">تفضل الاتصال المباشر؟</h3>
                <p className="text-[#6B5E50] text-xs mb-4">تواصل معنا لتأكيد الحجز الفوري</p>
                <a href="tel:01100999920" className="flex items-center justify-center gap-2 btn-gold text-[#0A0A0A] px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105">
                  📞 <span dir="ltr">01100999920</span>
                </a>
                <a href="https://wa.me/201100999920" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/20 text-green-300 px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 mt-2">
                  💬 واتساب
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
