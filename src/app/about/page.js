'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer, FloatingParticles } from '@/components/AnimateOnScroll';

const secrets = [
  {
    icon: '🐑',
    title: 'لحوم برقي طازجة 100%',
    desc: 'نعتمد في مطابخنا على أجود أنواع الخراف البرقي التي تُربى في مزارعنا بعناية فائقة، لتضمن لك لحماً طرياً ومذاقاً لا يُقارن.',
  },
  {
    icon: '🔥',
    title: 'تسوية على أصولها',
    desc: 'من المندي المدفون في البراميل، إلى المشاوي على الفحم الهادئ.. نستخدم طرق الطهي البدوية التقليدية التي تحافظ على عصارة اللحم وتشبعه بنكهة الحطب والبهارات السرية.',
  },
  {
    icon: '🕐',
    title: 'كرم الضيافة — مفتوح 24/7',
    desc: 'لأن الكرم البدوي لا يعرف وقتاً، أبوابنا ونيراننا مشتعلة لاستقبالكم على مدار الساعة، طوال أيام الأسبوع.',
  },
];

const experiences = [
  {
    icon: '⛺',
    title: 'خيام بدوية خاصة',
    desc: 'توفر لك ولعائلتك أقصى درجات الخصوصية والراحة في أجواء تراثية ساحرة.',
  },
  {
    icon: '🌳',
    title: 'مساحات خضراء ومنطقة ألعاب',
    desc: 'بيئة آمنة وممتعة لأطفالكم، لتستمتعوا بوجبتكم بينما يصنعون هم أجمل الذكريات.',
  },
  {
    icon: '🎊',
    title: 'استعداد تام للمناسبات',
    desc: 'سواء كانت وليمة عائلية ضخمة أو مناسبة خاصة، نحن مجهزون لاستقبال كبرى العزائم بأعلى مستوى من الخدمة والتشريف.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end pb-12 sm:pb-16 overflow-hidden">
        <Image
          src="/bedouin_tent_interior.jpg"
          alt="قرية هاني — أجواء بدوية أصيلة"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#D4A574]/[0.08] rounded-full blur-[130px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 w-full text-center">
          <ScrollReveal>
            <span className="inline-block glass text-[#D4A574] text-sm font-bold px-4 py-2 rounded-full mb-5">
              📜 عن قرية هاني
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
              قرية هاني..
              <br />
              <span className="text-[#E8C547]">جذور الكرم البدوي</span>،
              <br />
              ومذاق <span className="text-[#D4A574]">الأصالة الذي لا يُنسى</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OUR STORY
      ═══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent" />
        <FloatingParticles count={5} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <ScrollReveal direction="right">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/hero-bg.jpg"
                  alt="حكاية قرية هاني"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
                <div className="absolute bottom-5 right-5 left-5">
                  <span className="glass text-[#E8C547] text-xs font-bold px-3 py-1.5 rounded-full">🔥 منذ الأزل</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal direction="left">
              <div>
                <p className="text-[#D4A574] text-sm font-bold tracking-widest mb-3">حكايتنا</p>
                <h2 className="text-2xl sm:text-3xl font-black text-[#F5F0EB] mb-6 leading-tight">
                  من قلب الصحراء
                  <br />
                  <span className="gradient-gold-text">إلى قلب الإسكندرية</span>
                </h2>
                <div className="space-y-4 text-[#A89B8C] leading-relaxed text-sm sm:text-base">
                  <p>
                    لم تبدأ قصة قرية هاني بمجرد فكرة لافتتاح مطعم، بل بدأت كرسالة وشغف من عائلة <strong className="text-[#F5F0EB]">الجراري</strong> العريقة لنقل تجربة الضيافة البدوية الحقيقية من قلب الصحراء إلى قلب الإسكندرية.
                  </p>
                  <p>
                    أردنا أن نخلق مساحة لا تُقدم فيها مجرد وجبات، بل تُقدم فيها <strong className="text-[#D4A574]">&ldquo;تجربة متكاملة&rdquo;</strong>؛ حيث يجتمع الدفء العائلي، وعبق التراث البدوي، مع روائح الشواء الأصيلة على الحطب.
                  </p>
                  <p className="text-[#F5F0EB] font-bold text-base sm:text-lg border-r-2 border-[#D4A574] pr-4">
                    نحن لا نبيع الطعام، نحن نصنع ذكريات تتوارثها الأجيال في كل خيمة من خيمنا.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECRET / WHY US
      ═══════════════════════════════════════ */}
      <section className="py-20 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#0A0A0A]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#D4A574] text-sm font-bold tracking-widest mb-3">الأصالة ليست كلمة نرددها</p>
              <h2 className="text-2xl sm:text-4xl font-black text-[#F5F0EB]">
                سر <span className="gradient-gold-text">الصنعة</span>
              </h2>
              <p className="text-[#A89B8C] max-w-xl mx-auto mt-3">بل هي معيار نطبقه في كل تفصيلة</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secrets.map((item, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 sm:p-8 text-center hover-lift group">
                <div className="w-16 h-16 rounded-2xl bg-[#D4A574]/10 border border-[#D4A574]/20 flex items-center justify-center text-3xl mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-black text-[#F5F0EB] text-lg mb-3 group-hover:text-[#D4A574] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#A89B8C] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════ */}
      <section className="py-20 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />
        <FloatingParticles count={4} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <ScrollReveal direction="right">
              <div>
                <p className="text-[#D4A574] text-sm font-bold tracking-widest mb-3">تجربة لا مثيل لها</p>
                <h2 className="text-2xl sm:text-3xl font-black text-[#F5F0EB] mb-4 leading-tight">
                  ندرك أهمية
                  <br />
                  <span className="gradient-gold-text">العائلة والخصوصية</span>
                </h2>
                <p className="text-[#A89B8C] text-sm sm:text-base mb-8 leading-relaxed">
                  لذلك صممنا قرية هاني لتكون الملاذ المثالي لراحتكم — أجواء تراثية ساحرة مع خصوصية تامة ومساحات آمنة لأطفالكم.
                </p>

                <div className="space-y-5">
                  {experiences.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-[#D4A574]/10 border border-[#D4A574]/20 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-black text-[#F5F0EB] text-base mb-1 group-hover:text-[#D4A574] transition-colors">{item.title}</h3>
                        <p className="text-[#A89B8C] text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Image Gallery */}
            <StaggerContainer className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <Image src="/bedouin_tent_interior.jpg" alt="خيام بدوية" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                <div className="absolute bottom-3 right-3">
                  <span className="glass text-white text-[10px] font-bold px-2 py-1 rounded-full">⛺ خيام خاصة</span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square mt-6">
                <Image src="/mixed_grill.jpg" alt="مشاوي على الفحم" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                <div className="absolute bottom-3 right-3">
                  <span className="glass text-white text-[10px] font-bold px-2 py-1 rounded-full">🔥 على الفحم</span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square -mt-2">
                <Image src="/mandi_lamb.jpg" alt="مندي بدوي" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                <div className="absolute bottom-3 right-3">
                  <span className="glass text-white text-[10px] font-bold px-2 py-1 rounded-full">🐑 مندي أصيل</span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square mt-6">
                <Image src="/lamb_chops.jpg" alt="ريش ضاني" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                <div className="absolute bottom-3 right-3">
                  <span className="glass text-white text-[10px] font-bold px-2 py-1 rounded-full">🍖 أطباق فاخرة</span>
                </div>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VISION
      ═══════════════════════════════════════ */}
      <section className="py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#0A0A0A]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A574]/[0.04] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 sm:p-12 gold-glow">
              <div className="text-5xl mb-6">🌟</div>
              <p className="text-[#D4A574] text-sm font-bold tracking-widest mb-4">رؤيتنا</p>
              <blockquote className="text-[#F5F0EB] text-lg sm:text-xl font-bold leading-relaxed mb-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                أن نظل الوجهة الأولى والأكثر ثقة لكل باحث عن المذاق البدوي الأصيل والجودة العالية، وأن نحافظ على إرث عائلة الجراري في تقديم ضيافة تليق بكل زائر لقرية هاني.
              </blockquote>
              <div className="divider-gold my-6" />
              <p className="text-[#A89B8C] text-sm">
                — عائلة الجراري
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#111111]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F5F0EB] mb-4">
              تعال <span className="gradient-gold-text">جرب بنفسك</span>
            </h2>
            <p className="text-[#A89B8C] mb-8 text-lg">احجز خيمتك أو اطلب دليفري دلوقتي</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/menu" className="btn-gold text-[#0A0A0A] px-8 py-4 rounded-2xl font-extrabold text-lg transition-all hover:scale-105">
                🛵 اطلب دليفري
              </Link>
              <Link href="/book-tent" className="btn-glass text-[#F5F0EB] px-8 py-4 rounded-2xl font-extrabold text-lg transition-all hover:scale-105">
                ⛺ احجز خيمتك
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
