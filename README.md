# 🏜️ قرية هاني — للمأكولات البدوية والمشويات

موقع إلكتروني متكامل لمطعم **قرية هاني** للمأكولات البدوية والمشويات — فرعين في الإسكندرية والقاهرة.

## 📸 معاينة

### التقنيات
- **Framework:** Next.js 16 (App Router)
- **React:** 19
- **Styling:** Tailwind CSS 4 + Custom Glass Design System
- **State:** Zustand 5 (with localStorage persistence)
- **Backend:** Firebase (Firestore + Admin SDK)
- **Font:** Tajawal (Arabic)

---

## ✨ المميزات

### الصفحات
| الصفحة | الوصف | الرابط |
|---|---|---|
| الرئيسية | Hero + Stats + Features + Best Sellers + Testimonials | `/` |
| قائمة الطعام | 74 صنف في 10 تصنيفات مع بحث وفلاتر | `/menu` |
| عنّا | قصة المطعم + سر الصنعة + رؤيتنا | `/about` |
| حجز خيمة | حجز خيمة/طاولة مع اختيار الفرع | `/book-tent` |
| توصيل | Checkout كامل مع اختيار الفرع | `/checkout` |
| تتبع الطلب | تتبع بالتوكن مع مراحل الطلب | `/track` |
| تواصل معنا | بطاقات تواصل + فروع + خريطة | `/contact` |

### المكونات
| المكون | الوصف |
|---|---|
| `Navbar` | شريط تنقل Glass Morphism مع تقلص عند السكرول |
| `MobileNav` | شريط سفلي للموبايل (5 أيقونات) |
| `Footer` | ذيل بالمعلومات + Social Links |
| `FoodCard` | بطاقة طعام مع "أضف للسلة" + Toast |
| `CartDrawer` | سلة مشتريات (Drawer) |
| `CartToast` | إشعار عند إضافة منتج للسلة |
| `AiChatbot` | شات بوت ذكي (keyword-based) |
| `AnimateOnScroll` | Scroll Reveal + Stagger + Parallax + Floating Particles |

### نظام الطلبات
- ✅ إنشاء طلب مع اختيار الفرع (إسكندرية/قاهرة)
- ✅ تتبع الطلب بتوكن فريد
- ✅ حفظ بيانات العميل (اسم، رقم، عنوان) في localStorage
- ✅ مراحل الطلب (في الانتظار → تأكيد → تحضير → توصيل → تم)
- ✅ API Routes مع Firebase Admin SDK
- ✅ Fallback محلي لو Firebase مش متصل

### نظام الحجز
- ✅ حجز خيمة بدوية أو طاولة عادية
- ✅ اختيار الفرع
- ✅ مواعيد بالتنسيق 12 ساعة
- ✅ عدد الضيوف
- ✅ تتبع الحجز بتوكن

### التصميم
- 🎨 **Liquid Glass Design** — Dark theme مع Glass Morphism
- 📱 **Mobile First** — Responsive بالكامل مع Bottom Nav
- ✨ **Animations** — Scroll Reveal + Stagger + Parallax + Floating Particles
- 🖼️ **34 صورة حقيقية** من Unsplash لكل التصنيفات
- 🌙 **Dark Mode** — أسود دافئ مع ذهبي

---

## 🚀 التثبيت

### المتطلبات
- Node.js 18+
- npm أو yarn
- Firebase project

### الخطوات

```bash
# 1. استنساخ المستودع
git clone https://github.com/YOUR_USERNAME/hany-village.git
cd hany-village

# 2. تثبيت التبعيات
npm install

# 3. إعداد المتغيرات البيئية
cp .env.local.example .env.local
# عدّل .env.local بالقيم الحقيقية من Firebase Console

# 4. تشغيل السيرفر المحلي
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

---

## 🔥 إعداد Firebase

### 1. إنشاء مشروع Firebase
1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. أنشئ مشروع جديد باسم `hany-village`
3. فعّل Firestore Database

### 2. إعداد Client-side
1. Project Settings → Your Apps → Add Web App
2. انسخ القيم إلى `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

### 3. إعداد Server-side (Admin SDK)
1. Project Settings → Service Accounts → Generate New Private Key
2. ضع ملف JSON في جذر المشروع
3. أضف القيم إلى `.env.local`:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

### 4. تحميل المنيو إلى Firebase
```bash
node scripts/seed-menu.mjs
```

### 5. تحديث صور المنتجات
```bash
node scripts/download-images.mjs
node scripts/update-images.mjs
```

---

## 📂 هيكل المشروع

```
src/
├── app/
│   ├── layout.js              # Root Layout (Navbar + Footer + MobileNav)
│   ├── page.js                # الرئيسية
│   ├── globals.css             # Tailwind + Glass Design System
│   ├── about/page.js           # عنّا
│   ├── menu/page.js            # قائمة الطعام
│   ├── book-tent/page.js       # حجز خيمة
│   ├── checkout/page.js        # إتمام الطلب
│   ├── track/page.js           # تتبع الطلب
│   ├── contact/page.js         # تواصل معنا
│   └── api/
│       ├── menu/route.js       # API: جلب المنيو
│       ├── orders/route.js     # API: إنشاء/تتبع الطلبات
│       └── reservations/route.js # API: الحجوزات
├── components/
│   ├── Navbar.js               # شريط التنقل
│   ├── MobileNav.js            # شريط الموبايل السفلي
│   ├── Footer.js               # الذيل
│   ├── FoodCard.js             # بطاقة الطعام
│   ├── CartDrawer.js           # سلة المشتريات
│   ├── CartToast.js            # إشعار السلة
│   ├── AiChatbot.js            # الشات بوت
│   └── AnimateOnScroll.js      # مكتبة الأنيميشن
├── lib/
│   ├── firebase.js             # Firebase Client
│   ├── firebase-admin.js       # Firebase Admin SDK
│   └── menuData.js             # بيانات المنيو (Static fallback)
└── store/
    └── cartStore.js            # Zustand Store (Cart + Orders)

scripts/
├── seed-menu.mjs               # تحميل المنيو إلى Firebase
├── download-images.mjs         # تحميل صور من Unsplash
├── fix-images.mjs              # إصلاح صور المنتجات
└── update-images.mjs           # تحديث صور في Firebase

public/
├── menu/                       # صور المنتجات (34 صورة)
├── custmers/                   # صور العملاء المشاهير
├── hero-bg.jpg                 # صورة Hero
├── bedouin_tent_interior.jpg   # صورة خيمة
├── logo.jpg                    # الشعار
└── *.jpg                       # صور الطعام الأصلية
```

---

## 🎨 Design System

### الألوان
```
Primary:    #D4A574 (Warm Gold)
Secondary:  #E8C547 (Bright Gold)
Accent:     #C2956A (Sand)
Background: #0A0A0A (Warm Black)
Surface:    #111111 (Dark Surface)
Text:       #F5F0EB (Warm White)
Muted:      #A89B8C (Warm Gray)
```

### Glass Effects
```css
.glass         → rgba(255,255,255,0.06) + blur(20px)
.glass-strong  → rgba(255,255,255,0.10) + blur(30px)
.glass-card    → rgba(255,255,255,0.04) + blur(24px) + shadow
.btn-gold      → gradient(#D4A574 → #C2956A)
.btn-glass     → rgba(255,255,255,0.06) + blur(16px)
```

### الأنيميشن
- `ScrollReveal` — ظهور عند السكرول (up/left/right/scale)
- `StaggerContainer` — ظهور متتالي للعناصر
- `FloatingParticles` — جزيئات متحركة
- `ParallaxLayer` — تأثير Parallax
- `MagneticButton` — زرار يتحرك مع الماوس

---

## 📱 التجربة المحمولة

- **Bottom Nav** — شريط سفلي بـ 5 أيقونات (الرئيسية، القائمة، السلة، تتبع، تواصل)
- **Responsive Cards** — بطاقات تتكيّف مع حجم الشاشة
- **Touch Optimized** — أزرار كبيرة + active states
- **Safe Area** — دعم iPhone notch

---

## 🔧 الأوامر

```bash
npm run dev          # تشغيل السيرفر المحلي
npm run build        # بناء للإنتاج
npm run start        # تشغيل البناء
npm run lint         # فحص ESLint

node scripts/seed-menu.mjs        # تحميل المنيو
node scripts/download-images.mjs  # تحميل الصور
node scripts/update-images.mjs    # تحديث الصور في Firebase
```

---

## 🌐 النشر

### Vercel (موصى به)
```bash
npm i -g vercel
vercel
```

### أو أي استضافة تدعم Node.js
```bash
npm run build
npm run start
```

---

## 📞 التواصل

- **الإسكندرية:** طريق القاهرة الصحراوي الكيلو 30
- **القاهرة:** الشيخ زايد — أمام داندي مول
- **هاتف:** 01100999920
- **واتساب:** [wa.me/201100999920](https://wa.me/201100999920)
- **فيسبوك:** [hanyvillageEG](https://www.facebook.com/hanyvillageEG)

---

## 📄 الرخصة

هذا المشروع مملوك لـ **قرية هاني للمأكولات البدوية والمشويات**.
