'use client';

const contactMethods = [
  {
    id: 'phone-card',
    icon: '📞',
    title: 'اتصل بنا',
    value: '01100999920',
    desc: 'متاح على مدار الساعة',
    action: 'tel:01100999920',
    btnLabel: 'اتصل الآن',
    dir: 'ltr',
  },
  {
    id: 'whatsapp-card',
    icon: '💬',
    title: 'واتساب',
    value: '01100999920',
    desc: 'رد فوري على رسائلكم',
    action: 'https://wa.me/201100999920',
    btnLabel: 'فتح واتساب',
    external: true,
    dir: 'ltr',
  },
  {
    id: 'facebook-card',
    icon: '📘',
    title: 'فيسبوك',
    value: 'قرية هاني',
    desc: 'تابعونا على فيسبوك',
    action: 'https://www.facebook.com/hanyvillageEG',
    btnLabel: 'زيارة الصفحة',
    external: true,
  },
];

const branches = [
  {
    id: 'alex-branch',
    name: 'فرع الإسكندرية',
    icon: '🏙️',
    address: 'طريق القاهرة الصحراوي الكيلو 30 (بجوار ماكدونالز)',
    mapsUrl: 'https://maps.app.goo.gl/1rAD8C2SCRaRn9Uf8',
  },
  {
    id: 'cairo-branch',
    name: 'فرع القاهرة',
    icon: '🌆',
    address: 'الشيخ زايد — الكيلو 28 — أمام داندي مول',
    mapsUrl: 'https://maps.app.goo.gl/Kb7LBkLZAQVfVMB37',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1410] to-[#0A0A0A]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4A574]/[0.05] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block glass text-[#D4A574] text-sm font-bold px-4 py-2 rounded-full mb-4">
            📞 تواصل معنا
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F5F0EB] mb-3">
            نحن <span className="gradient-gold-text">هنا دائماً</span> لخدمتك
          </h1>
          <p className="text-[#A89B8C] text-base sm:text-lg max-w-xl mx-auto">
            لأي استفسار، حجز، أو طلب — فريقنا مستعد على مدار الساعة
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              id={method.id}
              className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 text-center">{method.icon}</div>
              <h3 className="font-black text-[#F5F0EB] text-base text-center mb-1">{method.title}</h3>
              <p className="text-[#D4A574] font-bold text-center mb-1 text-sm" dir={method.dir}>{method.value}</p>
              <p className="text-[#6B5E50] text-xs text-center mb-4">{method.desc}</p>
              <a
                href={method.action}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
                className="mt-auto flex items-center justify-center gap-2 btn-gold text-[#0A0A0A] px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              >
                {method.btnLabel}
              </a>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a
            href="tel:01100999920"
            id="contact-call-btn"
            className="flex items-center justify-center gap-3 btn-gold text-[#0A0A0A] px-8 py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-2xl">📞</span>
            <span dir="ltr">01100999920</span>
          </a>
          <a
            href="https://wa.me/201100999920"
            id="contact-whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/20 text-green-300 px-8 py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-2xl">💬</span>
            <span>واتساب الآن</span>
          </a>
        </div>

        {/* Branches — single section */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-black text-[#F5F0EB] text-center mb-6">
            فروعنا 📍
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {branches.map((branch) => (
              <a
                key={branch.id}
                id={branch.id}
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 sm:p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A574]/10 border border-[#D4A574]/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {branch.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-[#F5F0EB] text-base mb-1 group-hover:text-[#D4A574] transition-colors">{branch.name}</h3>
                  <p className="text-[#A89B8C] text-sm leading-relaxed mb-2">{branch.address}</p>
                  <span className="text-[#D4A574] text-xs font-bold">فتح في خرائط Google ←</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">🕐</div>
            <h3 className="font-black text-[#F5F0EB] text-sm mb-1">أوقات العمل</h3>
            <p className="text-[#D4A574] font-bold">24 ساعة / 7 أيام</p>
            <p className="text-[#6B5E50] text-xs mt-1">لا نتوقف أبداً!</p>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">🛵</div>
            <h3 className="font-black text-[#F5F0EB] text-sm mb-1">خدمة التوصيل</h3>
            <p className="text-green-400 font-bold">الإسكندرية والقاهرة</p>
            <p className="text-[#6B5E50] text-xs mt-1">توصيل سريع لباب منزلك</p>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">🎊</div>
            <h3 className="font-black text-[#F5F0EB] text-sm mb-1">حجز المناسبات</h3>
            <p className="text-[#D4A574] font-bold">حفلات وعزومات</p>
            <p className="text-[#6B5E50] text-xs mt-1">تواصل لمعرفة الباقات</p>
          </div>
        </div>
      </div>
    </div>
  );
}
