'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { bestSellers } from '@/lib/menuData';
import FoodCard from '@/components/FoodCard';
import { ScrollReveal, StaggerContainer, FloatingParticles } from '@/components/AnimateOnScroll';

const features = [
  {
    icon: '🕐',
    title: 'مفتوح 24 ساعة',
    desc: 'نخدمكم على مدار الساعة طوال أيام الأسبوع، في أي وقت يناسبكم',
  },
  {
    icon: '⛺',
    title: 'خصوصية تامة للعائلات',
    desc: 'خيام بدوية خاصة وفاخرة توفر لعائلتك خصوصية كاملة وأجواء مميزة',
  },
  {
    icon: '🔥',
    title: 'أجواء بدوية أصيلة',
    desc: 'استمتع بتجربة بدوية حقيقية مع أجود المشاوي والمندي على الفحم',
  },
  {
    icon: '🛵',
    title: 'توصيل مجاني للمنازل',
    desc: 'نوصل أشهى المأكولات البدوية إلى باب منزلك',
  },
];

const stats = [
  { value: '+500', label: 'عميل راضٍ يومياً', icon: '😊' },
  { value: '24/7', label: 'دون انقطاع', icon: '⏰' },
  { value: '+70', label: 'صنف في القائمة', icon: '🍽️' },
  { value: '5.0', label: 'تقييم العملاء', icon: '⭐' },
];

const experiences = [
  { title: 'مشاوي على الفحم الطبيعي', desc: 'كل قطعة لحم متبلة بعناية ومشوية على فحم حقيقي عشان الطعم الأصيل', icon: '🔥' },
  { title: 'خيام بدوية فاخرة', desc: 'أجواء خاصة للعائلات والمجموعات مع خصوصية تامة وديكور بدوي أصيل', icon: '⛺' },
  { title: 'مندي برقي في حفرة البرميل', desc: 'خروف كامل مطهي ببطء لساعات على الطريقة البدوية التقليدية', icon: '🐑' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bestSellers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[90svh] sm:min-h-screen flex items-end pb-14 sm:pb-20 overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="قرية هاني"
          fill
          className="object-cover scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
          priority
          quality={90}
        />

        <div className="absolute inset-0 bg-[#0A0A0A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4A574]/[0.1] rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-[#E8C547]/[0.06] rounded-full blur-[120px] animate-floatSlow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
          <div className="inline-flex items-center gap-2 bg-[#0A0A0A]/60 backdrop-blur-md border border-[#D4A574]/30 px-4 py-2 rounded-full mb-5 sm:mb-6 animate-fadeInUp">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[#F5F0EB] text-xs sm:text-sm font-semibold">مفتوحون الآن 24/7 • فرعين: الإسكندرية والقاهرة</span>
          </div>

          <h1 className="text-[1.75rem] sm:text-5xl lg:text-7xl font-black text-white leading-[1.2] mb-4 sm:mb-6 animate-fadeInUp delay-100" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)' }}>
            عش التجربة البدوية
            <br />
            <span className="text-[#E8C547]">الأصيلة</span> في
            <br />
            <span className="text-[#D4A574]">الإسكندرية</span> و<span className="text-[#D4A574]">القاهرة</span>
          </h1>

          <p className="text-white/80 text-base sm:text-xl max-w-xl mb-8 sm:mb-10 leading-relaxed animate-fadeInUp delay-200" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            أجود المشاوي والمندي في أجواء بدوية أصيلة. خيام خاصة، توصيل سريع، ومذاق لن تنساه.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fadeInUp delay-300">
            <Link
              href="/menu"
              className="group flex items-center justify-center gap-3 btn-gold text-[#0A0A0A] px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-base sm:text-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-xl sm:text-2xl group-hover:animate-float">🛵</span>
              <span>اطلب دليفري</span>
            </Link>
            <Link
              href="/book-tent"
              className="group flex items-center justify-center gap-3 bg-white/[0.08] backdrop-blur-md border border-[#D4A574]/30 hover:bg-[#D4A574]/15 text-[#F5F0EB] px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-base sm:text-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-xl sm:text-2xl group-hover:animate-float">⛺</span>
              <span>احجز خيمتك</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8 animate-fadeInUp delay-400 overflow-x-auto pb-1">
            <a href="tel:01100999920" className="flex items-center gap-2 bg-[#0A0A0A]/50 backdrop-blur-md border border-white/[0.08] px-4 py-2 rounded-xl text-[#F5F0EB] hover:bg-white/[0.08] transition-all duration-200 text-sm whitespace-nowrap">
              <span>📞</span>
              <span className="font-mono font-bold" dir="ltr">011 0099 9920</span>
            </a>
            <a href="https://wa.me/201100999920" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600/40 backdrop-blur-md border border-green-500/20 px-4 py-2 rounded-xl text-green-300 transition-all duration-200 text-sm font-bold whitespace-nowrap">
              <span>💬</span>
              <span>واتساب</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="flex flex-col items-center gap-1 text-white/40">
            <span className="text-xs">اكتشف أكثر</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS — individual glass cards
      ═══════════════════════════════════════ */}
      <section className="relative -mt-10 sm:-mt-12 z-20 px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 text-center hover-lift">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-black gradient-gold-text mb-1">{stat.value}</div>
                <div className="text-[#A89B8C] text-xs sm:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXPERIENCE STRIP — text with image
      ═══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent" />

        <FloatingParticles count={6} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#D4A574] text-sm font-bold tracking-widest uppercase mb-4">تجربة لا تُنسى</p>
              <h2 className="text-3xl sm:text-5xl font-black text-[#F5F0EB] mb-6 leading-tight">
                مش بس أكل...
                <br />
                <span className="gradient-gold-text">ده إحساس بدوي أصيل</span>
              </h2>
              <p className="text-[#A89B8C] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                من أول ما تدخل بيت Welcome بابتسامة بدويتك، لحد ما تسيب وأنت مبسوط — كل تفصيلة متفكر فيها عشانك
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left — Image */}
            <ScrollReveal direction="right">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/bedouin_tent_interior.jpg"
                  alt="أجواء بدوية في قرية هاني"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                <div className="absolute bottom-6 right-6 left-6">
                  <span className="glass text-[#E8C547] text-xs font-bold px-3 py-1.5 rounded-full">✨ أجواء ليلية ساحرة</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — Features list */}
            <StaggerContainer className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4A574]/10 border border-[#D4A574]/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 group-hover:bg-[#D4A574]/20 transition-all duration-300">
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-[#F5F0EB] text-lg mb-1 group-hover:text-[#D4A574] transition-colors">{exp.title}</h3>
                    <p className="text-[#A89B8C] text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BEST SELLERS
      ═══════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
              <div>
                <p className="text-[#D4A574] text-sm font-bold tracking-widest mb-3">الأكثر طلباً</p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#F5F0EB]">
                  أطباق <span className="gradient-gold-text">لا تقاوم</span>
                </h2>
              </div>
              <Link href="/menu" className="flex items-center gap-2 text-[#D4A574] hover:text-[#E8C547] font-bold transition-colors duration-200 group">
                <span>عرض القائمة كاملة</span>
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </StaggerContainer>

          {/* CTA Banner */}
          <ScrollReveal delay={200}>
            <div className="mt-20 relative overflow-hidden rounded-3xl">
              <Image
                src="/bedouin_tent_interior.jpg"
                alt="خيام قرية هاني"
                width={1200}
                height={400}
                className="object-cover w-full h-64 sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A]/95 via-[#0A0A0A]/70 to-[#0A0A0A]/30" />
              <div className="absolute inset-0 flex items-center">
                <div className="p-8 sm:p-12 max-w-xl">
                  <span className="inline-block glass text-[#E8C547] text-xs font-bold px-3 py-1.5 rounded-full mb-4">✨ تجربة فريدة</span>
                  <h3 className="text-[#F5F0EB] font-black text-2xl sm:text-3xl mb-3">
                    احجز خيمتك البدوية الآن
                  </h3>
                  <p className="text-[#A89B8C] mb-6 text-sm sm:text-base leading-relaxed">
                    خصوصية تامة، أجواء ساحرة، وأشهى الأطباق البدوية — كل ده في خيمتك الخاصة
                  </p>
                  <Link href="/book-tent" className="inline-flex items-center gap-2 btn-gold text-[#0A0A0A] px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105">
                    ⛺ احجز الآن
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS — Celebrity Customers
      ═══════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent" />
        <FloatingParticles count={4} color="rgba(212, 165, 116, 0.08)" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#D4A574] text-sm font-bold tracking-widest mb-3">بنوثقة عملائنا</p>
              <h2 className="text-2xl sm:text-4xl font-black text-[#F5F0EB] mb-3">
                نجوم <span className="gradient-gold-text">بيختاروا قرية هاني</span>
              </h2>
              <p className="text-[#A89B8C] max-w-lg mx-auto">فنانين ومشاهير بيثقوا في جودتنا وأجوائنا البدوية الأصيلة</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { img: '/custmers/ramy-sapry.jpg', name: 'رامي صبري', title: 'مطرب وملحن' },
              { img: '/custmers/tamer-ashour.jpg', name: 'تامر عاشور', title: 'مطرب' },
              { img: '/custmers/kareem-fouad.jpg', name: 'كريم فؤاد', title: 'إعلامي' },
              { img: '/custmers/ramy-sapry2.jpg', name: 'رامي صبري', title: 'في قرية هاني' },
            ].map((customer, i) => (
              <div key={i} className="group glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={customer.img}
                    alt={customer.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-3 sm:p-4">
                    <p className="text-[#F5F0EB] font-black text-sm sm:text-base">{customer.name}</p>
                    <p className="text-[#D4A574] text-[10px] sm:text-xs font-bold">{customer.title}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#D4A574]/90 text-[#0A0A0A] text-[9px] font-black px-2 py-0.5 rounded-full">⭐ VIP</span>
                  </div>
                </div>
              </div>
            ))}
          </StaggerContainer>

          {/* Review Quote */}
          <ScrollReveal delay={200}>
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <div className="text-4xl mb-4">💬</div>
              <blockquote className="text-[#F5F0EB] text-lg sm:text-xl font-bold leading-relaxed mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                &ldquo;من أفضل المطاعم البدوية اللي جربتها. المشاوي طازجة والمندي خرافي. الأجواء بتحسسك إنك في الصحراء!&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => <span key={i} className="text-[#E8C547] text-lg">⭐</span>)}
              </div>
              <p className="text-[#6B5E50] text-sm">— أكثر من 500 عميل راضٍ يومياً</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT STRIP
      ═══════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#111111]" />
        <FloatingParticles count={4} color="rgba(212, 165, 116, 0.1)" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-[#D4A574] text-sm font-bold tracking-widest mb-4">نحن هنا لخدمتك</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-[#F5F0EB]">
              تواصل معنا <span className="gradient-gold-text">الآن</span>
            </h2>
            <p className="text-[#A89B8C] mb-10 text-lg">
              فريقنا مستعد لخدمتكم على مدار الساعة
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:01100999920" className="flex items-center gap-3 btn-gold text-[#0A0A0A] px-8 py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 hover:scale-105">
                <span>📞</span>
                <span dir="ltr">01100999920</span>
              </a>
              <a href="https://wa.me/201100999920" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/20 text-green-300 px-8 py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 hover:scale-105">
                <span>💬</span>
                <span>واتساب</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
