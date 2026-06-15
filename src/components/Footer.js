import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      <div className="divider-gold" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="شعار قرية هاني"
                  fill
                  className="object-contain rounded-full ring-1 ring-[#D4A574]/20"
                  sizes="64px"
                />
              </div>
              <div>
                <h2 className="font-extrabold text-xl gradient-gold-text">قرية هانى</h2>
                <p className="text-sm text-[#6B5E50]">للمأكولات البدوية والمشويات</p>
              </div>
            </div>
            <p className="text-[#A89B8C] leading-relaxed mb-6 max-w-sm">
              تجربة بدوية أصيلة في قلب الإسكندرية. أجود أنواع المشاوي والمندي في أجواء خيام بدوية خاصة مع خصوصية تامة لعائلتك. مفتوحون 24 ساعة طوال أيام الأسبوع.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/hanyvillageEG"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass hover:bg-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-110 text-[#A89B8C] hover:text-[#F5F0EB]"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/hanyvillage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass hover:bg-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-110 text-[#A89B8C] hover:text-[#F5F0EB]"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/201100999920"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass hover:bg-green-600/20 flex items-center justify-center transition-all duration-300 hover:scale-110 text-[#A89B8C] hover:text-green-400"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="tel:01100999920"
                className="w-10 h-10 rounded-xl glass hover:bg-[#D4A574]/20 flex items-center justify-center transition-all duration-300 hover:scale-110 text-[#A89B8C] hover:text-[#D4A574]"
                aria-label="اتصل بنا"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-[#D4A574] text-lg mb-5">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'الصفحة الرئيسية' },
                { href: '/menu', label: 'قائمة الطعام' },
                { href: '/about', label: 'عنّا' },
                { href: '/book-tent', label: 'حجز خيمة / طاولة' },
                { href: '/track', label: 'تتبع طلبك' },
                { href: '/contact', label: 'تواصل معنا' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A89B8C] hover:text-[#D4A574] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B5E50] group-hover:bg-[#D4A574] transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-[#D4A574] text-lg mb-5">
              معلومات التواصل
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#D4A574] mt-0.5 flex-shrink-0">📍</span>
                <a
                  href="https://maps.app.goo.gl/1rAD8C2SCRaRn9Uf8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A89B8C] hover:text-[#D4A574] transition-colors text-sm leading-relaxed"
                >
                  <strong className="text-[#F5F0EB]">فرع الإسكندرية</strong> — طريق القاهرة الصحراوي الكيلو 30 (بجوار ماكدونالز)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4A574] mt-0.5 flex-shrink-0">📍</span>
                <a
                  href="https://maps.app.goo.gl/Kb7LBkLZAQVfVMB37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A89B8C] hover:text-[#D4A574] transition-colors text-sm leading-relaxed"
                >
                  <strong className="text-[#F5F0EB]">فرع القاهرة</strong> — الشيخ زايد — الكيلو 28 — طريق القاهرة الإسكندرية الصحراوي (أمام داندي مول)
                </a>
              </li>
              <li className="flex flex-col gap-1.5 mt-1">
                {[
                  { num: '01100999920', href: 'tel:01100999920' },
                  { num: '01003290000', href: 'tel:01003290000' },
                  { num: '01114433359', href: 'tel:01114433359' },
                  { num: '01062017000', href: 'tel:01062017000' },
                ].map((p) => (
                  <a
                    key={p.num}
                    href={p.href}
                    className="flex items-center gap-2 text-[#A89B8C] hover:text-[#D4A574] transition-colors text-sm font-mono group"
                  >
                    <span className="text-[#D4A574] text-xs">📞</span>
                    <span className="group-hover:underline" dir="ltr">{p.num}</span>
                  </a>
                ))}
              </li>
              <li className="flex items-center gap-3 mt-1">
                <span className="text-green-500 flex-shrink-0">🟢</span>
                <span className="text-green-400 text-sm font-semibold">مفتوح 24/7 — لا نتوقف أبداً</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider-gold mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B5E50] text-sm">
            © {currentYear} قرية هانى للمأكولات البدوية والمشويات. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-[#6B5E50] text-sm flex-wrap justify-center">
            <a
              href="https://www.instagram.com/hanyvillage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4A574] transition-colors"
            >
              @hanyvillage
            </a>
            <span>•</span>
            <span>الإسكندرية، مصر</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
